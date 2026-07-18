"use client";

import { useEffect } from "react";
import api from "@/infrastructure/axios/axios";

export default function Page() {
console.log("ENV", process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log("ENV", process.env.NEXT_PUBLIC_SUPABASE_KEY);
    useEffect(() => {

        async function test() {

            const response = await api.get("/printers");

            console.log(response.data);

        }

        test();

    }, []);

    return <h1>Inventory</h1>;

}