import axios from "axios";
import { ENV } from "../config/env";

const api = axios.create({
    baseURL: `${ENV.SUPABASE_URL}/rest/v1`,
    headers: {
        apikey: ENV.SUPABASE_KEY,
        Authorization: `Bearer ${ENV.SUPABASE_KEY}`,
        "Content-Type": "application/json"
    }
});

export default api;