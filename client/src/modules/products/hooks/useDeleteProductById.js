import api from "../../../core/services/config.js"
import {useMutation} from "@tanstack/react-query";
import toast from "react-hot-toast";


const deleteProductById = async (id) => {
    return await api.delete(`/products/${id}`);
}


export const useDeleteProductById = () => {
    return useMutation({
        mutationFn: deleteProductById,
        onSuccess: () => {
            toast.success("حذف محصول با موفقیت انجام شد", {
                position: "top-right",
                style: {
                    fontFamily: "'Vazirmatn-Regular', 'Helvetica', 'Arial', sans-serif",
                    padding: "12px",
                }
            });
        },
        onError: (error) => {
            const message = error?.response?.data?.message || "نقص فنی در حذف محصول";
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