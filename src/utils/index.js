import axios from "axios";
import { BASE_URI } from "constants";
import { toast } from "react-hot-toast";

export const customToast = (type, message) => {
    type === "ok" ? toast.success(message, {
        position: "bottom-right"
    }) : toast.error(message, {
        position: "bottom-right"
    });
}

export function handleUserDelete(userId) {
    axios
        .delete(`${BASE_URI}user?id=${userId}`)
        .then(({ data }) => {
            if (data.status === 404) {
                customToast("no", data.message)
            } else {
                const { _id } = JSON.parse(sessionStorage.getItem("user"));
                customToast("ok", data.message);
                if (userId === _id) {
                    sessionStorage.removeItem("user");
                    location.assign("/register");
                }
                location.reload();
            }
        })
        .catch((err) => console.error(err));
}
export function changeUserStatus(userId) {
    axios.put(`${BASE_URI}user?id=${userId}`)
        .then(({ data }) => console.log(data))
        .catch(err => console.log(err))
}

export function handleUserActions(userId, actionType) {
    actionType === "status" ? changeUserStatus(userId) : handleUserDelete(userId);
}