import axios from "axios";
import { __next } from "@jx3box/jx3box-common/js/jx3box.json";

const stat = __next + 'api/post/'    //TODO:
// const stat = "api/post/";

function getStat(id) {
    return axios
        .get(stat + id + "/stat/")
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            console.log(err);
        });
}

function postStat(id) {
    let type = location.pathname.split('/')[1]
    return axios.get(stat + id + "/summary", {
        params: {
            type: type,
            actions: "views",
        },
    });
}

export { getStat, postStat };
