import { $ } from "./axios";
import { __server } from "@jx3box/jx3box-common/data/jx3box.json";
const API_LIST = "post/list";
const API_SINGLE = "post/find";
import failCallback from "../utils/fail";

function getPosts(params, vm) {
    let query = {
        type: "share",
    };
    if (params) {
        query = Object.assign(query, params);
    }

    return $.get(API_LIST, {
        params: query,
    }).catch((err) => {
        failCallback(err, vm);
    });
}
function getPost(pid, vm) {
    return $.get(API_SINGLE, {
        params: {
            id: pid,
        },
    }).catch((err) => {
        failCallback(err, vm);
    });
}

export { getPosts, getPost };
