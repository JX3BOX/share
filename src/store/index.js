import Vue from "vue";
import Vuex from "vuex";
import { getAppID } from "@jx3box/jx3box-common/js/utils";

Vue.use(Vuex);

let store = {
    state: {
        // client
        client: location.href.includes("origin") ? "origin" : "std",
        // post
        id : getAppID(),
        user_id : 0,
        post : '',
    },
    mutations: {},
    getters: {},
    actions: {},
    modules: {},
};

export default new Vuex.Store(store);
