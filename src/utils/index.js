import { toast } from "react-hot-toast";

export const customToast = (type, message) => {
    type === "ok" ? toast.success(message, {
        position: "bottom-right"
    }) : toast.error(message, {
        position: "bottom-right"
    });
}