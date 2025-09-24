import api from "../../../core/services/config.js"
import {useMutation} from "@tanstack/react-query";
import toast from "react-hot-toast";


const deleteProducts = async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return await api.delete("/products");
}

export const useDeleteProducts = () => {
    return useMutation({
        mutationFn: deleteProducts,
        onSuccess: () => {
            toast.success("حذف محصولات با موفقیت انجام شد", {
                position: "top-right",
                style: {
                    fontFamily: "'Vazirmatn-Regular', 'Helvetica', 'Arial', sans-serif",
                    padding: "12px",
                }
            });
        },
        onError: (error) => {
            const message = error?.response?.data?.message || "نقص فنی در حذف محصولات";
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
    })
}