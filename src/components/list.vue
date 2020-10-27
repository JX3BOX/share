<template>
    <div class="m-archive" v-loading="loading">
        <listbox
            :data="data"
            :total="total"
            :pages="pages"
            :per="per"
            :page="page"
            @appendPage="appendPage"
            @changePage="changePage"
        >
            <template slot="filter">
                <a
                :href="publish_link"
                class="u-publish el-button el-button--primary el-button--small"
            >
                + 分享脸型妆容
            </a>
                <!-- 排序过滤 -->
                <orderBy @filter="filter"></orderBy>
            </template>
            <!-- 搜索 -->
            <div class="m-archive-search" slot="search-before">
                <el-input
                    placeholder="请输入关键词"
                    v-model="search"
                    class="input-with-select"
                    @change="loadPosts"
                >
                    <span slot="prepend">搜 索</span>
                    <!-- <el-select
                        v-model="searchType"
                        slot="prepend"
                        placeholder="请选择"
                        @change="loadPosts"
                    >
                        <el-option label="作者" value="meta_1"></el-option>
                        <el-option label="标题" value="title"></el-option>
                    </el-select> -->
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </div>

        <!-- 列表 -->
        <div class="m-face-list" v-if="data.length">
            <el-row class="u-list" :gutter="20">
                <el-col :span="3" v-for="(item, i) in data" :key="i">
                    <li class="u-item" >
                        <a
                            class="u-face"
                            :target="target"
                            :href="item.post.ID | postLink"
                        >
                            <i>
                                <img class="u-pic" :src="showThumb(item)" loading="lazy"/>
                                <!-- <span class="u-author">{{showAuthor(item)}}</span> -->
                            </i>
                        </a>
                        <a
                            class="u-down u-btn-down el-button el-button--default is-plain el-button--mini"
                            :class="{ 'is-disabled': !showFile(item) }"
                            :href="showFile(item)"
                            ><i class="el-icon-download"></i
                            ><span>立即下载</span></a
                        >
                    </li>
                </el-col>
            </el-row>
        </div>
        </listbox>

    </div>
</template>

<script>
import listbox from "@jx3box/jx3box-page/src/cms-list.vue";
import { cms as mark_map } from "@jx3box/jx3box-common/js/mark.json";
import _ from "lodash";
import { getPosts } from "../service/post";
import dateFormat from "../utils/dateFormat";
import { __ossMirror } from "@jx3box/jx3box-common/js/jx3box";
import {
    showAvatar,
    authorLink,
    showMinibanner,
    publishLink,
    buildTarget,
    resolveImagePath,
} from "@jx3box/jx3box-common/js/utils";
export default {
    name: "list",
    props: [],
    data: function() {
        return {
            loading: false, //加载状态

            search: "",
            // searchType: "meta_1",

            data: [], //数据列表
            page: 1, //当前页数
            total: 1, //总条目数
            pages: 1, //总页数
            per: 32, //每页条目

            order: "", //排序模式
            mark: "", //筛选模式

            facetype : '',
            facetype_visible : '',
        };
    },
    computed: {
        subtype: function() {
            return this.$store.state.subtype;
        },
        params: function() {
            let params = {
                per: this.per,
                subtype: this.subtype,
            };
            // params.subtype = this.facetype
            if (this.search) {
                params.search = this.search;
            }
            if (this.order) {
                params.order = this.order;
            }
            if (this.mark) {
                params.mark = this.mark;
            }
            return params;
        },
        target: function() {
            return buildTarget();
        },
        // 根据栏目定义
        defaultBanner: function() {
            return "";
        },
        publish_link: function(val) {
            return publishLink("share");
        },
    },
    methods: {
        loadPosts: function(i = 1, append = false) {
            let query = Object.assign(this.params, {
                page: i,
            });
            this.loading = true;
            getPosts(query, this)
                .then((res) => {
                    if (append) {
                        this.data = this.data.concat(res.data.data.list);
                    } else {
                        window.scrollTo(0, 0);
                        this.data = res.data.data.list;
                    }
                    this.total = res.data.data.total;
                    this.pages = res.data.data.pages;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        changePage: function(i) {
            this.loadPosts(i);
        },
        appendPage: function(i) {
            this.loadPosts(i, true);
        },
        filter : function (o){
            this[o['type']] = o['val']
            this.loadPosts();
        },
        showBanner: function(val) {
            return val ? showMinibanner(val) : this.defaultBanner;
        },
        showThumb: function(item) {
            let url = _.get(item.post.post_meta, "pics[0]['url']");
            if (url) {
                return (
                    resolveImagePath(url) + "?x-oss-process=style/face_thumb"
                );
            } else {
                // TODO:默认占位图
                return "";
            }
        },
        showAuthor(item) {
            return _.get(item.post.post_meta, "author") || "匿名";
        },
        showFile(item) {
            let url = _.get(item.post.post_meta, "file") || "";
            if (url) {
                return resolveImagePath(url);
            } else {
                return "";
            }
        },
        filterFacetype:function (val){
            this.facetype = val
            this.loadPosts()
        },
        showFacetype : function (){
            this.facetype_visible = !this.facetype_visible;
        }
    },
    filters: {
        dateFormat: function(val) {
            return dateFormat(new Date(val));
        },
        showAvatar: function(val) {
            return showAvatar(val);
        },
        authorLink: function(val) {
            return authorLink(val);
        },
        postLink: function(val) {
            return "./?pid=" + val;
        },
        isHighlight: function(val) {
            return val ? `color:${val};font-weight:600;` : "";
        },
        showMark: function(val) {
            return mark_map[val];
        },
    },
    created: function() {
        this.loadPosts(1);
    },
    components: {
        listbox
    },
};
</script>

<style lang="less">
@import "../assets/css/list.less";
</style>
