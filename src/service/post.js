import { $cms } from "@jx3box/jx3box-common/js/https";

function getMyPost(params) {
    return $cms().get("/api/cms/posts/my", {
        params: params,
    });
}

function getPosts(params) {
    let query = {
        type: "share",
    };
    if (params) {
        query = Object.assign(query, params);
    }
    return $cms().get("/api/cms/posts", {
        params: query,
    });
}
function getPost(id) {
    return $cms().get(`/api/cms/post/${id}`);
}

function getMyPostCount() {
    return $cms().get("/api/cms/posts/user/my/count");
}

function setPost(id, data) {
    return $cms().put(`/api/cms/post/${id}/setting`, data);
}

export { getPosts, getPost, getMyPostCount, getMyPost, setPost };
