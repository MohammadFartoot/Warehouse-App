import api from "../../../core/services/config.js"
import {useMutation} from "@tanstack/react-query";
import toast from "react-hot-toast";


const getProductById = async (id) => {
    return await api.get(`/products/${id}`);
}

export const useGetProductById = () => {
    return useMutation({
        mutationFn: getProductById,
        onSuccess: (data) => {
            toast.success("دریافت محصول با موفقیت انجام شد", {
                position: "top-right",
                style: {
                    fontFamily: "'Vazirmatn-Regular', 'Helvetica', 'Arial', sans-serif",
                    padding: "12px",
                }
            });
            if (import.meta.env.MODE === "development") {
                console.log("Product:", data);
            }
        },
        onError: (error) => {
            const message = error.response?.data?.message || "نقص فنی در دریافت محصول";
            toast.error(message, {
                position: "top-right",
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
}