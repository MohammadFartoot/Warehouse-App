import axios from "axios";
import {getCookie} from "../utils/cookie.js";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
})

api.interceptors.request.use(req => {
        const token = getCookie("token");

        if (token) {
            req.headers["Authorization"] = `Bearer ${token}`;
        }

        return req;
    },
    error => {
    if (import.meta.env.MODE === "development") {
        console.error(error);
    }
        return Promise.reject(error);
    }
);

api.interceptors.response.use(res => {
        return res;
    },
    error => {
        if (import.meta.env.MODE === "development") {
            console.error(error);
        }
        return Promise.reject(error);
    }
);


export default api;