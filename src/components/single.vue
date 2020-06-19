<template>
    <div class="m-single-box" :loading="loading">

        <!-- 头部 -->
        <header class="m-single-header">

            <!-- 标题 -->
            <div class="m-single-title">
                <a class="u-title u-sub-block" :href="url">{{title}}</a>
            </div>

            <!-- 信息 -->
            <div class="m-single-info">

                <!-- 用户名 -->
                <div class="u-author u-sub-block">
                    <i class="u-author-icon"><img svg-inline src="../assets/img/single/author.svg"/></i>
                    <a class="u-name" :href="author_link">{{ author_name }}</a>
                </div>

                <!-- 自定义字段 -->
                <div class="u-meta u-sub-block">
                    <em class="u-label">首领</em>
                    <span class="u-value">
                        {{ formatMeta("fb_boss") }}
                    </span>
                </div>

                <!-- 发布日期 -->
                <span class="u-podate u-sub-block" title="发布日期">
                    <i class="u-icon-podate"><img svg-inline src="../assets/img/single/podate.svg"/></i>
                    <time>{{ post_date }}</time>
                </span>

                <!-- 最后更新 -->
                <span class="u-modate u-sub-block" title="最后更新">
                    <i class="u-icon-modate"><img svg-inline src="../assets/img/single/modate.svg"/></i>
                    <time>{{ update_date }}</time>
                </span>

                <!-- 编辑 -->
                <a class="u-edit u-sub-block" :href="edit_link" v-if="canEdit">
                    <i class="u-icon-edit el-icon-edit-outline"></i>
                    <span>编辑</span>
                </a>
            </div>

            <!-- 操作 -->
            <div class="m-single-panel">
                <Fav />
            </div>

        </header>

        <!-- 文章前 -->
        <div class="m-single-prepend">

            <!-- 摘要 -->
            <div class="m-single-excerpt" v-if="excerpt">
                <el-divider content-position="left">Excerpt</el-divider>
                {{ excerpt }}
            </div>

        </div>

        <!-- 文章内容 -->
        <div class="m-single-post">
            <el-divider content-position="left">JX3BOX</el-divider>
            <div class="m-single-content">
                <Article :content="post.post_content" directorybox="#directory"/>
            </div>
        </div>

        <!-- 文章后 -->
        <div class="m-single-append"></div>

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
// 助手函数
import _ from "lodash";
import dateFormat from "../utils/dateFormat";
import { authorLink, editLink } from "@jx3box/jx3box-common/js/utils.js";
// 变量模块
import { __Links } from "@jx3box/jx3box-common/js/jx3box.json";
import User from "@jx3box/jx3box-common/js/user.js";
// 数据服务
import { getPost } from "../service/post.js";

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
        title : function (){
            return _.get(this.post,'post_title') || '无标题' 
        },
        url : function (){
            return location.href
        },
        author_link: function() {
            return authorLink(_.get(this.author,'uid'));
        },
        author_name : function (){
            return _.get(this.author,'name') || '匿名'
        },
        post_date : function (){
            return dateFormat(new Date(_.get(this.post,'post_date')));
        },
        update_date : function (){
            return dateFormat(new Date(_.get(this.post,'post_modified')));
        },
        edit_link: function() {
            return editLink(_.get(this.post,'post_type'), _.get(this.post,'ID'));
        },
        canEdit: function() {
            return (
                _.get(this.post,'post_author') == User.getInfo().uid ||
                User.getInfo().group > 60
            );
        },
        excerpt : function (){
            return _.get(this.post,'post_excerpt')
        }
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
    filters: {},
    created: function() {
        if (this.id) {
            this.loading = true;
            getPost(this.id,this)
                .then((res) => {
                    this.post = this.$store.state.post = res.data.data.post;
                    this.meta = this.$store.state.meta =
                        res.data.data.post.post_meta;
                    this.setting = this.$store.state.setting =
                        res.data.data.post;
                    this.author = this.$store.state.author =
                        res.data.data.author;
                    this.$store.state.status = true;
                })
                .finally(() => {
                    this.loading = false;
                });
        }
    },
};
</script>

<style lang="less">
@import "../assets/css/single.less";
</style>
