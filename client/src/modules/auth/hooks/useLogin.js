import api from "../../../core/services/config.js"
import {useMutation} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {setCookie} from "../../../core/utils/cookie.js";


const loginUser = async (formData) => {
    return await api.post("/auth/login", formData)
}

export const useLogin = () => {
    return useMutation({
        mutationFn: loginUser,
        onSuccess: (res) => {
            const token = res?.data?.token;
            setCookie("token", token);
            toast.success("ورود با موفقیت انجام شد", {
                position: "top-center",
                style: {
                    fontFamily: "'Vazirmatn-Regular', 'Helvetica', 'Arial', sans-serif",
                    padding: "12px",
                }
            });
        },
        onError: (error) => {
            const message = error?.response?.data?.message || "خطایی رخ داده است";
            toast.error(message, {
                position: "top-center",
                style: {
                    fontFamily: "'Vazirmatn-Regular', 'Helvetica', 'Arial', sans-serif",
                    padding: "12px",
                }
            });
            if (import.meta.env.MODE === "development") {
                console.error(error);
            }
        }
    })
}