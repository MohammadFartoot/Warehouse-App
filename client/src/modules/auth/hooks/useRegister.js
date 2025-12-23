import api from "../../../core/services/config.js"
import {useMutation} from "@tanstack/react-query";
import toast from "react-hot-toast";


const registerUser = async (formData) => {
    return await api.post("/auth/register", formData);
}

export const useRegister = () => {
    return useMutation({
        mutationFn: registerUser,
        onSuccess: (data) => {
            toast.success("ثبت‌نام با موفقیت انجام شد", {
                position: "top-center",
                style: {
                    fontFamily: "'Vazirmatn-Regular', 'Helvetica', 'Arial', sans-serif",
                    padding: "12px",
                }
            });
            if (import.meta.env.MODE === "development") {
                console.log("User:", data);
            }
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
    });
};