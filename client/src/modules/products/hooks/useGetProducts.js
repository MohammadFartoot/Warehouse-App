import api from "../../../core/services/config.js"
import {useQuery} from "@tanstack/react-query";
import toast from "react-hot-toast";


const getProducts = async (page, limit, search) => {
    const url = search
        ? `/products?page=${page}&limit=${limit}&name=${search}`
        : `/products?page=${page}&limit=${limit}`;

    const res = await api.get(url);
    if (import.meta.env.MODE === "development") {
        console.log("Res:", res.data);
    }
    return res.data;
}


export const useGetProducts = (page = 1, limit = 10, search = "") => {
     return useQuery({
        queryKey: ["products", page, search],
        queryFn: () => getProducts(page, limit, search),
        cacheTime: 300000,
        staleTime: 120000,
        keepPreviousData: true,
        onSuccess: () => {
            toast.success("دریافت محصولات با موفقیت انجام شد", {
                position: "top-right",
                style: {
                    fontFamily: "'Vazirmatn-Regular', 'Helvetica', 'Arial', sans-serif",
                    padding: "12px",
                }
            });
        },
    });
}



