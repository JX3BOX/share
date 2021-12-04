<template>
    <singlebox :post="post" :stat="stat" v-loading="loading">
        <div class="u-meta u-sub-block" slot="single-header">
            <em class="u-label">类型</em>
            <span class="u-value">{{ post_subtype }}</span>
        </div>
        <div class="m-single-meta">
            <div class="m-single-pics" v-if="meta.pics && meta.pics.length">
                <el-carousel :interval="4000" type="card" arrow="always" height="600px">
                    <el-carousel-item v-for="(item, i) in meta.pics" :key="i">
                        <div class="m-face-pic">
                            <img v-photoswipe:single :src="item.url | showImage" class="u-pic" />
                        </div>
                    </el-carousel-item>
                </el-carousel>
            </div>
            <div class="m-single-author" v-if="origin_author">作者 : <b>{{origin_author}}</b></div>
            <div class="m-single-data">
                <el-divider content-position="left">独家数据分析</el-divider>
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
            </div>-->
        </div>
        <!-- <div class="m-single-file" v-if="file">
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
                                :count="stat.downs"
                            />
                        </template>
                    </el-table-column>
                </el-table>
        </div>-->
        <!-- <el-alert
            class="m-single-notice"
            title="特别说明"
            type="warning"
            description="我们尊重和保护原作者版权，部分作品由网站团队自费从淘宝购买上传无法一一甄别原作是否付费，如有侵权，请联系admin@jx3box.com，我们将立即删除，亦欢迎作者自行上传推广自己作品。"
            show-icon
        ></el-alert>-->

        <Thx class="m-thx" slot="single-append" :postId="id" postType="share" :userId="author_id" :adminBoxcoinEnable="true" :userBoxcoinEnable="true"/>
    </singlebox>
</template>

<script>
import _ from "lodash";
import singlebox from "@jx3box/jx3box-page/src/cms-single";
import { resolveImagePath } from "@jx3box/jx3box-common/js/utils";
import { getPost } from "../service/post.js";
import { getStat, postStat } from "@jx3box/jx3box-common/js/stat";
import facedata from "@jx3box/jx3box-facedat/src/Facedat.vue";

export default {
    name: "single",
    props: [],
    data: function () {
        return {
            loading: false,

            post: {},
            stat: {},
            meta: {},
            author: {},

        };
    },
    computed: {
        id: function () {
            return this.$store.state.id;
        },
        author_id : function (){
            return this.post?.post_author || 0
        },
        post_subtype: function () {
            return _.get(this.post, "post_subtype") || "";
        },
        file: function () {
            return resolveImagePath(_.get(this.post.post_meta, "file"));
        },
        downdata: function () {
            return [
                {
                    author: _.get(this.post.post_meta, "author"),
                    file: this.file,
                    type: this.post_subtype,
                },
            ];
        },
        facedata: function () {
            return _.get(this.post.post_meta, "data");
        },
        origin_author:function (){
            return _.get(this.post.post_meta, "author")
        }
    },
    methods: {
        formatMeta: function (key) {
            let val = _.get(this.meta, key);
            if (Array.isArray(val)) {
                return val.toString();
            } else {
                return val;
            }
        },
    },
    filters: {
        showImage: function (val) {
            return resolveImagePath(val);
        },
    },
    created: function () {
        if (this.id) {
            this.loading = true;
            getPost(this.id, this)
                .then((res) => {
                    this.post = this.$store.state.post = res.data.data;
                    this.$store.state.user_id = this.post.post_author;
                    document.title = this.post.post_title;

                    this.meta = this.$store.state.meta =
                        res.data.data.post_meta;
                    this.post.post_banner =
                        this.meta.pics &&
                        this.meta.pics.length &&
                        this.meta.pics[0]["url"];
                })
                .finally(() => {
                    this.loading = false;
                });

            getStat("share", this.id).then((res) => {
                this.stat = this.$store.state.stat = res.data;
            });
            postStat("share", this.id);
        }
    },
    components: {
        facedata,
        singlebox,
    },
};
</script>

<style lang="less">
@import "../assets/css/single.less";
@import "../assets/css/face.less";
</style>
