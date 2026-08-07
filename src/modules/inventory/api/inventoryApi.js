import supabase from "@/infrastructure/supabase/supabase";
import Printer from "../models/Printer";

const printerApi = {

    async getBrands() {
        const { data, error } = await supabase
            .from("brands")
            .select("*");

        if (error) throw error;

        return data;
    },

    async getSeries() {
        const { data, error } = await supabase
            .from("series")
            .select("*");

        if (error) throw error;

        return data;
    },

    async getModels() {
        const { data, error } = await supabase
            .from("models")
            .select("*");

        if (error) throw error;

        return data;
    },

    async getPrinters() {
        const { data, error } = await supabase
            .from("printers")
            .select(`
                *,
                models (
                    *,
                    series (
                        *,
                        brands (*)
                    )
                )
            `);

        if (error) throw error;
        return data.map(printer => new Printer(printer));
    },

    async createPrinter(printer) {

        const printerStructured = {
            model: printer.model,
            serial_number: printer.serialNumber,
            type: printer.status,
            measurer: printer.measurer || null,
            notes: printer.notes || null,
            availability: printer.availability,
            client: printer.client || null,
        };
        const { data, error } = await supabase
            .from("printers")
            .insert(printerStructured)
            .select();

        if (error) throw error;

        return data[0];
    },

    async addBrand(brandName) {
        const {data, error} = await supabase
        .from("brands")
        .insert([
            { 
                brand: brandName 
            },
        ])
        .select()

        if(error) throw error;

        return data;
    },

    async addSeries(seriesName, brandId) {
        const {data, error} = await supabase
        .from("series")
        .insert([
            {
                series: seriesName,
                brand_id: brandId,
            },
        ])
        .select()

        if(error) throw error;

        return data;
    },

    async addModel(modelName, seriesId, imageUrl) {
        const {data, error} = await supabase
        .from("models")
        .insert([
            {
                model: modelName,
                image_url: imageUrl,
                series_id: seriesId,
            },
        ])
        .select()

        if(error) throw error;

        return data;
    },

    async uploadImage(formData) {

        const response = await fetch("/api/upload", {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            throw new Error("No se pudo subir la imagen");
        }

        return await response.json();
    }

};

export default printerApi;