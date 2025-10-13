"use server"
import axios from "axios";
import { getSession } from "./session";


const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
        "Accept": "application/json",
    },
});


// Request Interceptor: Attach token to request
apiClient.interceptors.request.use(async (config) => {
    const token = await getSession();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});


export default apiClient;
