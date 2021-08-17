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
            <!-- 搜索 -->
            <div class="m-archive-search" slot="search-before">
                <a :href="publish_link" class="u-publish el-button el-button--primary">+ 分享捏脸</a>
                <el-input placeholder="请输入搜索内容" v-model="search" class="input-with-select">
                    <span slot="prepend">关键词</span>
                    <!-- <el-select
                        v-model="searchType"
                        slot="prepend"
                        placeholder="请选择"
                        @change="loadPosts"
                    >
                        <el-option label="作者" value="meta_1"></el-option>
                        <el-option label="标题" value="title"></el-option>
                    </el-select>-->
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </div>

            <!-- <template slot="filter"> -->
            <!-- 版本过滤 -->
            <!-- <clientBy @filter="filter" :type="client"></clientBy> -->
            <!-- </template> -->

            <!-- 精选 -->
            <div class="m-face-rec">
                <el-radio-group v-model="rec" size="small" @change="updateMark">
                    <el-radio-button :label="key" v-for="(item,key) in recmap" :key="key"></el-radio-button>
                </el-radio-group>
            </div>

            <!-- 列表 -->
            <div class="m-face-list" v-if="data && data.length">
                <!-- <el-row class="u-list" :gutter="20"> -->
                <!-- <el-col :span="3"> -->
                <li class="u-item" v-for="(item, i) in data" :key="i">
                    <a class="u-face" :target="target" :href="item.ID | postLink">
                        <i class="u-img">
                            <img class="u-pic" :src="showThumb(item)" loading="lazy" />
                        </i>
                        <span class="u-author">@{{showAuthor(item)}}</span>
                    </a>
                    <span class="u-op" v-if="isEditor">
                        <i
                            class="u-op-hot"
                            title="设为热门"
                            :class="{on:hasMark(item,'newbie')}"
                            @click="setMark(item,'newbie')"
                        >♥</i>
                        <i
                            class="u-op-rec"
                            title="设为推荐"
                            :class="{on:hasMark(item,'advanced')}"
                            @click="setMark(item,'advanced')"
                        >✿</i>
                        <i
                            class="u-op-star"
                            title="设为精选"
                            :class="{on:hasMark(item,'recommended')}"
                            @click="setMark(item,'recommended')"
                        >★</i>
                    </span>
                    <span class="u-op u-readOnly" v-else>
                        <i
                            class="u-op-hot"
                            :class="{on:hasMark(item,'newbie')}"
                            v-if="hasMark(item,'newbie')"
                        >♥</i>
                        <i
                            class="u-op-rec"
                            :class="{on:hasMark(item,'advanced')}"
                            v-if="hasMark(item,'advanced')"
                        >✿</i>
                        <i
                            class="u-op-star"
                            :class="{on:hasMark(item,'recommended')}"
                            v-if="hasMark(item,'recommended')"
                        >★</i>
                    </span>
                    <!-- <a
                        class="u-down u-btn-down el-button el-button--default is-plain el-button--mini"
                        :class="{ 'is-disabled': !showFile(item) }"
                        :href="showFile(item)"
                    >
                        <i class="el-icon-download"></i>
                        <span>立即下载</span>
                    </a>-->
                </li>
                <!-- </el-col> -->
                <!-- </el-row> -->
            </div>

            <!-- 排序过滤 -->
            <orderBy class="m-face-order" @filter="filter"></orderBy>
        </listbox>
    </div>
</template>

<script>
import listbox from "@jx3box/jx3box-page/src/cms-list.vue";
import { cms as mark_map } from "@jx3box/jx3box-common/data/mark.json";
import _ from "lodash";
import { getPosts, setPost } from "../service/post";
import dateFormat from "../utils/dateFormat";
import { __imgPath, __ossMirror } from "@jx3box/jx3box-common/data/jx3box";
import {
    showAvatar,
    authorLink,
    showMinibanner,
    publishLink,
    buildTarget,
    resolveImagePath,
    getAppType,
    getThumbnail,
    showBanner,
} from "@jx3box/jx3box-common/js/utils";
import User from "@jx3box/jx3box-common/js/user";
export default {
    name: "list",
    props: [],
    data: function () {
        return {
            loading: false, //加载状态

            search: "",
            // searchType: "meta_1",

            data: [], //数据列表
            page: 1, //当前页数
            total: 1, //总条目数
            pages: 1, //总页数
            appendMode: false, //追加模式

            order: "update", //排序模式
            mark: "", //筛选模式
            client: this.$store.state.client, //版本选择

            facetype: "",
            facetype_visible: "",

            rec: "全部",
            recmap: {
                全部: "",
                热门: "newbie",
                推荐: "advanced",
                精选: "recommended",
            },
            markmap: {
                newbie: "热门",
                advanced: "推荐",
                recommended: "精选",
            },
            isEditor: User.isEditor(),
        };
    },
    computed: {
        subtype: function () {
            // return this.$store.state.subtype;
            return this.$route.query.subtype;
        },
        resetParams: function () {
            return [this.subtype, this.search, this.mark, this.client];
        },
        params: function () {
            let params = {
                per: this.per,
                page: ~~this.page || 1,
                sticky: 1,
            };
            let optionalParams = [
                "subtype",
                "search",
                "order",
                "mark",
                // "client",    //捏脸不区分怀旧服|正式服
            ];
            optionalParams.forEach((item) => {
                if (this[item]) {
                    params[item] = this[item];
                }
            });
            return params;
        },
        target: function () {
            return buildTarget();
        },
        // 根据栏目定义
        defaultBanner: function () {
            return "";
        },
        publish_link: function (val) {
            return publishLink("share");
        },

        // 每页条数
        per: function () {
            let max_width = window.innerWidth - 345;
            let perline = Math.floor(max_width / 210);
            let count = ~~perline * 4 || 32;
            return count;
        },
    },
    methods: {
        loadPosts: function () {
            this.loading = true;
            getPosts(this.params, this)
                .then((res) => {
                    if (this.appendMode) {
                        this.data = this.data.concat(res.data.data.list);
                    } else {
                        this.data = res.data.data.list;
                    }
                    this.total = res.data.data.total;
                    this.pages = res.data.data.pages;
                })
                .finally(() => {
                    this.appendMode = false;
                    this.loading = false;
                });
        },
        changePage: function (i) {
            this.appendMode = false;
            this.page = i;
            window.scrollTo(0, 0);
        },
        appendPage: function (i) {
            this.appendMode = true;
            this.page = i;
        },
        filter: function (o) {
            this.appendMode = false;
            this[o["type"]] = o["val"];
        },
        showBanner: function (val) {
            return val ? showMinibanner(val) : this.defaultBanner;
        },
        showThumb: function (item) {
            let url = _.get(item.post_meta, "pics[0]['url']");
            if (url) {
                // return (
                //     resolveImagePath(url) + "?x-oss-process=style/face_thumb"
                // );
                return showBanner(url, "face");
            } else {
                return __imgPath + "image/face/null2.png";
            }
        },
        showAuthor(item) {
            return _.get(item.post_meta, "author") || "匿名";
        },
        showFile(item) {
            let url = _.get(item.post_meta, "file") || "";
            if (url) {
                return resolveImagePath(url);
            } else {
                return "";
            }
        },
        filterFacetype: function (val) {
            this.facetype = val;
            this.loadPosts();
        },
        showFacetype: function () {
            this.facetype_visible = !this.facetype_visible;
        },
        updateMark: function (val) {
            this.mark = this.recmap[this.rec];
            this.page = 1
        },
        hasMark: function (item, key) {
            return item.mark?.includes(key);
        },
        setMark: function (item, key) {
            let hasKey = item.mark?.includes(key);
            item.mark = hasKey ? [] : [key];

            let msg = hasKey ? "取消" : "设置";
            msg += this.markmap[key];
            msg += "成功";

            setPost(item.ID, {
                mark: item.mark,
            }).then((res) => {
                this.$notify({
                    title: "成功",
                    message: msg,
                    type: "success",
                });
            });
        },
    },
    filters: {
        dateFormat: function (val) {
            return dateFormat(new Date(val));
        },
        showAvatar: function (val) {
            return showAvatar(val);
        },
        authorLink: function (val) {
            return authorLink(val);
        },
        postLink: function (val) {
            // return "./?pid=" + val;
            return location.origin + "/" + getAppType() + "/" + val;
        },
        isHighlight: function (val) {
            return val ? `color:${val};font-weight:600;` : "";
        },
        showMark: function (val) {
            return mark_map[val];
        },
    },
    watch: {
        subtype: function () {
            this.search = "";
            this.page = 1
        },
        params: {
            deep: true,
            immediate: true,
            handler: function () {
                this.loadPosts();
            },
        },
        "$route.query.page": function (val) {
            this.page = ~~val;
        },
    },
    created: function () {
        this.page = ~~this.$route.query.page || 1;
    },
    components: {
        listbox,
    },
};
</script>

<style lang="less">
@import "../assets/css/list.less";
</style>
