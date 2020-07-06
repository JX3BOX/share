<template>
    <div class="m-archive-box" :loading="loading">
        <!-- 搜索 -->
        <div class="m-archive-search">
            <el-input
                placeholder="请输入关键词"
                v-model="search"
                class="input-with-select"
                @change="commitSearch"
            >
                <el-select
                    v-model="searchType"
                    slot="prepend"
                    placeholder="请选择"
                >
                    <el-option label="作者" value="meta_1"></el-option>
                    <el-option label="标题" value="title"></el-option>
                </el-select>
                <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
            <!-- <el-switch
                    class="u-switch u-hasdata"
                    slot="append"
                    v-model="hasData"
                    active-color="#13ce66"
                    inactive-text="只看有蓝图"
                    @change="commitSearch"
                >
                </el-switch> -->
        </div>

        <!-- 排序 -->
        <div class="m-archive-order">
            <!-- 发布按钮 -->
            <a
                :href="publish_link"
                class="u-publish el-button el-button--primary el-button--small"
            >
                + 发布捏脸数据
            </a>

            <!-- <span class="u-filter u-notice">
                我们尊重和保护原作者版权，部分作品由玩家自发从淘宝购买上传，如有侵权，请联系admin@jx3box.com，我们将立即删除。
            </span> -->

            <!-- meta过滤 -->
            <div class="u-filter" :class="{ on: facetype_visible }">
                <span class="u-label" @click="showFacetype">
                    <span class="u-current-order"
                        ><i class="el-icon-collection-tag"></i> {{ facetype || "全部" }}</span
                    >
                    <span class="u-toggle">
                        <i class="el-icon-arrow-down"></i>
                        <i class="el-icon-arrow-up"></i>
                    </span>
                </span>
                <span class="u-options">
                    <span
                        class="u-mode u-all"
                        :class="{ on: facetype == '' }"
                        @click="filterFacetype('')"
                        ><i class="el-icon-collection-tag"></i> 全部</span
                    >
                    <span
                        class="u-mode"
                        :class="{ on: facetype == '成男' }"
                        @click="filterFacetype('成男')"
                        ><i class="el-icon-collection-tag"></i> 成男</span
                    >
                    <span
                        class="u-mode"
                        :class="{ on: facetype == '成女' }"
                        @click="filterFacetype('成女')"
                        ><i class="el-icon-collection-tag"></i> 成女</span
                    >
                    <span
                        class="u-mode"
                        :class="{ on: facetype == '正太' }"
                        @click="filterFacetype('正太')"
                        ><i class="el-icon-collection-tag"></i> 正太</span
                    >
                    <span
                        class="u-mode"
                        :class="{ on: facetype == '萝莉' }"
                        @click="filterFacetype('萝莉')"
                        ><i class="el-icon-collection-tag"></i> 萝莉</span
                    >
                </span>
            </div>

            <!-- 排序模式 -->
            <div class="u-modes" :class="{ on: order_visible }">
                <span class="u-label" @click="showOrder">
                    <span class="u-current-order"
                        >排序 : {{ currentOrder || "最后更新" }}</span
                    >
                    <span class="u-toggle">
                        <i class="el-icon-arrow-down"></i>
                        <i class="el-icon-arrow-up"></i>
                    </span>
                </span>
                <span class="u-options">
                    <span
                        class="u-mode u-update"
                        :class="{ on: order == 'update' }"
                        @click="reorder('update')"
                        ><i class="el-icon-refresh"></i> 最后更新</span
                    >
                    <span
                        class="u-mode u-podate"
                        :class="{ on: order == 'podate' }"
                        @click="reorder('podate')"
                        ><i class="el-icon-sort"></i> 最早发布</span
                    >
                    <!-- <span
                        class="u-mode u-likes"
                        :class="{ on: order == 'likes' }"
                        @click="reorder('likes')"
                        ><i class="el-icon-star-off"></i> 点赞最多</span
                    >
                    <span
                        class="u-mode u-favs"
                        :class="{ on: order == 'favs' }"
                        @click="reorder('favs')"
                        ><i class="el-icon-star-off"></i> 收藏最多</span
                    >
                    <span
                        class="u-mode u-downs"
                        :class="{ on: order == 'downs' }"
                        @click="reorder('downs')"
                        ><i class="el-icon-download"></i> 下载最多</span
                    > -->
                </span>
            </div>
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
                                <img class="u-pic" :src="showThumb(item)" />
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

        <!-- 空 -->
        <el-alert
            v-else
            class="m-archive-null"
            title="没有找到相关条目"
            type="info"
            center
            show-icon
        >
        </el-alert>

        <!-- 下一页 -->
        <el-button
            class="m-archive-more"
            :class="{ show: hasNextPage }"
            type="primary"
            :loading="loading"
            @click="appendPage(++page)"
            >加载更多</el-button
        >

        <!-- 分页 -->
        <el-pagination
            class="m-archive-pages"
            :page-size="per"
            background
            :hide-on-single-page="true"
            @current-change="changePage"
            :current-page.sync="page"
            layout="total, prev, pager, next, jumper"
            :total="total"
        >
        </el-pagination>
    </div>
</template>

<script>
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
const mark_map = {
    newbie: "新手易用",
    advanced: "进阶推荐",
    recommended: "编辑精选",
    geek: "骨灰必备",
};
const order_map = {
    update: "最后更新",
    podate: "最早发布",
    favs: "收藏最多",
    likes: "点赞最多",
    downs: "下载最多",
};
export default {
    name: "list",
    props: [],
    data: function() {
        return {
            loading: false, //加载状态

            search: "",
            searchType: "meta_1",

            data: [], //数据列表
            page: 1, //当前页数
            total: 1, //总条目数
            pages: 1, //总页数
            per: 32, //每页条目
            order: "", //排序模式
            mark: "", //筛选模式

            filter_visible: false,
            order_visible: false,

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
            params.subtype = this.facetype
            if (this.search) {
                params[this.searchType] = this.search;
            }
            if (this.order) {
                params.order = this.order;
            }
            if (this.mark) {
                params.mark = this.mark;
            }
            return params;
        },
        currentMark: function() {
            return mark_map[this.mark];
        },
        currentOrder: function() {
            return order_map[this.order];
        },
        hasNextPage: function() {
            return this.total > 1 && this.page < this.pages;
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
        commitSearch: function() {
            this.loadPosts();
        },
        filterMark: function(val) {
            this.mark = val;
            this.filter_visible = false;
            this.loadPosts();
        },
        reorder: function(val) {
            this.order = val;
            this.order_visible = false;
            this.loadPosts();
        },
        showFilter: function() {
            this.filter_visible = !this.filter_visible;
        },
        showOrder: function() {
            this.order_visible = !this.order_visible;
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
    components: {},
};
</script>

<style lang="less">
@import "../assets/css/list.less";
</style>
