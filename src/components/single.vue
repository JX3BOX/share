<template>
    <div class="m-single-box" :loading="loading">
        <!-- 头部 -->
        <header class="m-single-header">
            <!-- 标题 -->
            <div class="m-single-title">
                <a class="u-title u-sub-block" :href="url">{{ title }}</a>
            </div>

            <!-- 信息 -->
            <div class="m-single-info">
                <!-- 用户名 -->
                <div class="u-author u-sub-block">
                    <i class="u-author-icon"
                        ><img svg-inline src="../assets/img/single/author.svg"
                    /></i>
                    <a class="u-name" :href="author_link">{{ author_name }}</a>
                </div>

                <!-- 自定义字段 -->
                <div class="u-meta u-sub-block">
                    <em class="u-label">类型</em>
                    <span class="u-value">
                        {{ post_subtype }}
                    </span>
                </div>

                <!-- 发布日期 -->
                <span class="u-podate u-sub-block" title="发布日期">
                    <i class="u-icon-podate"
                        ><img svg-inline src="../assets/img/single/podate.svg"
                    /></i>
                    <time>{{ post_date }}</time>
                </span>

                <!-- 最后更新 -->
                <span class="u-modate u-sub-block" title="最后更新">
                    <i class="u-icon-modate"
                        ><img svg-inline src="../assets/img/single/modate.svg"
                    /></i>
                    <time>{{ update_date }}</time>
                </span>

                <!-- 查看次数 -->
                <span class="u-views u-sub-block">
                    <i class="el-icon-view"></i>
                    {{ setting.views }}
                </span>

                <!-- 编辑 -->
                <a class="u-edit u-sub-block" :href="edit_link" v-if="canEdit">
                    <i class="u-icon-edit el-icon-edit-outline"></i>
                    <span>编辑</span>
                </a>
            </div>
        </header>

        <!-- 文章前 -->
        <div class="m-single-prepend">
            <div class="m-single-meta">
                <div class="m-single-pics" v-if="meta.pics && meta.pics.length">
                    <el-carousel :interval="4000" arrow="always" height="600px">
                        <el-carousel-item
                            v-for="(item, i) in meta.pics"
                            :key="i"
                        >
                            <div class="m-face-pic">
                                <img
                                    v-photoswipe:single
                                    :src="item.url | showImage"
                                    class="u-pic"
                                />
                            </div>
                        </el-carousel-item>
                    </el-carousel>
                </div>
                <div class="m-single-data">
                    <el-divider content-position="left"
                        >独家数据分析</el-divider
                    >
                    <facedata v-if="facedata" :data="facedata" />
                </div>
                <!-- <div class="m-single-actions">
                    <Like
                        class="u-like"
                        mode="heart"
                        :count="post.likes"
                        :showCount="true"
                        txt="喜欢"
                    />
                </div> -->
            </div>
            <div class="m-single-file" v-if="file">
                <el-table :data="downdata">
                    <el-table-column prop="author" label="数据作者">
                    </el-table-column>
                    <el-table-column prop="type" label="数据体型">
                    </el-table-column>
                    <el-table-column prop="file" label="数据下载">
                        <template slot-scope="scope">
                            <Down
                                classes="u-down el-button el-button--primary el-button--small"
                                :url="scope.row.file"
                                :showCount="true"
                                :count="post.downs"
                            />
                        </template>
                    </el-table-column>
                </el-table>
            </div>

            <el-alert
                class="m-single-notice"
                title="特别说明"
                type="warning"
                description="我们尊重和保护原作者版权，部分作品由玩家自发从淘宝购买上传无法一一甄别原作是否付费，如有侵权，请联系admin@jx3box.com，我们将立即删除。"
                show-icon
            >
            </el-alert>
        </div>

        <!-- 文章内容 -->
        <div class="m-single-post">
            <el-divider content-position="left">JX3BOX</el-divider>
            <div class="m-single-content">
                <Article :content="post.post_content" />
            </div>
        </div>

        <!-- 文章后 -->
        <div class="m-single-append">
            <!-- 操作 -->
            <div class="m-single-panel" v-if="!loading">
                <div class="u-minigroup">
                    <!-- <Print class="u-fn" :title="title" /> -->
                    <QRcode class="u-fn" />
                    <Sharing class="u-fn" :title="title" />
                </div>
                <Fav />
            </div>
        </div>

        <!-- 评论 -->
        <div class="m-single-comment">
            <el-divider content-position="left">评论</el-divider>
            <Comment :post-id="id" />
        </div>

        <!-- 底部 -->
        <footer class="m-single-footer">
            <!-- <ins
                class="adsbygoogle"
                style="display:block;max-width:100%;overflow:hidden;margin:10px;"
                data-ad-client="ca-pub-4388499329141185"
                data-ad-slot="1787190081"
                data-ad-format="auto"
                data-full-width-responsive="true"
            ></ins> -->
        </footer>
    </div>
</template>

<script>
import Article from "@jx3box/jx3box-editor/src/Article.vue";
// 助手函数
import _ from "lodash";
import dateFormat from "../utils/dateFormat";
import {
    authorLink,
    editLink,
    resolveImagePath,
} from "@jx3box/jx3box-common/js/utils.js";
// 变量模块
import { __Links } from "@jx3box/jx3box-common/js/jx3box.json";
import User from "@jx3box/jx3box-common/js/user.js";
// 数据服务
import { getPost } from "../service/post.js";
import { getStat, postStat } from "../service/stat.js";
import facedata from "@/components/facedata.vue";

export default {
    name: "single",
    props: [],
    data: function() {
        return {
            loading: false,

            post: {},
            setting: {},
            meta: {},
            author: {},
        };
    },
    computed: {
        id: function() {
            return this.$store.state.pid;
        },
        title: function() {
            return _.get(this.post, "post_title") || this.post_subtype;
        },
        url: function() {
            return location.href;
        },
        author_link: function() {
            return authorLink(_.get(this.author, "uid"));
        },
        author_name: function() {
            return _.get(this.author, "name") || "匿名";
        },
        post_date: function() {
            return dateFormat(new Date(_.get(this.post, "post_date")));
        },
        post_subtype: function() {
            return _.get(this.post, "post_subtype") || "空";
        },
        update_date: function() {
            return dateFormat(new Date(_.get(this.post, "post_modified")));
        },
        edit_link: function() {
            return editLink(
                _.get(this.post, "post_type"),
                _.get(this.post, "ID")
            );
        },
        canEdit: function() {
            return (
                _.get(this.post, "post_author") == User.getInfo().uid ||
                User.getInfo().group > 60
            );
        },
        excerpt: function() {
            return _.get(this.post, "post_excerpt");
        },
        file: function() {
            return resolveImagePath(_.get(this.post.post_meta, "file"));
        },
        downdata: function() {
            return [
                {
                    author: _.get(this.post.post_meta, "author"),
                    file: this.file,
                    type: this.post_subtype,
                },
            ];
        },
        facedata: function() {
            return _.get(this.post.post_meta, "data");
        },
    },
    methods: {
        formatMeta: function(key) {
            let val = _.get(this.meta, key);
            if (Array.isArray(val)) {
                return val.toString();
            } else {
                return val;
            }
        },
    },
    filters: {
        showImage: function(val) {
            return resolveImagePath(val);
        },
    },
    created: function() {
        if (this.id) {
            this.loading = true;
            getPost(this.id, this)
                .then((res) => {
                    this.post = this.$store.state.post = res.data.data.post;
                    this.meta = this.$store.state.meta =
                        res.data.data.post.post_meta;
                    // this.setting = this.$store.state.setting =
                    //     res.data.data.post;
                    this.author = this.$store.state.author =
                        res.data.data.author;
                    this.$store.state.status = true;
                })
                .finally(() => {
                    this.loading = false;
                });

            getStat(this.id).then((data) => {
                if (data) this.setting = this.$store.state.setting = data;
            });
            postStat(this.id);
        }
    },
    components: {
        facedata,
        Article,
    },
};
</script>

<style lang="less">
@import "../assets/css/single.less";
@import "../assets/css/face.less";
</style>
