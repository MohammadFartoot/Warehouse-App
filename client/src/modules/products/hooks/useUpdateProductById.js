import api from "../../../core/services/config.js"
import {useMutation} from "@tanstack/react-query";
import toast from "react-hot-toast";


const updateProductById = async ({id, data}) => {
    await new Promise(resolve => setTimeout(resolve, 500));
     return await api.put(`/products/${id}`, data);
}

export const useUpdateProductById = () => {
    return useMutation({
        mutationFn: updateProductById,
        onError: (error) => {
            const message = error?.response?.data?.message || "نقص فنی در ویرایش محصول";
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