"use client";

import { useEffect, useState } from "react";
import printerApi from "@/modules/inventory/api/inventoryApi";

import { uploadImage } from "@/infrastructure/supabase/storage";
import { usePagination } from "@/shared/components/molecules/Pagination";

const PAGE_SIZE = 20;

export default function usePrinters() {

    const [brands, setBrands] = useState([]);
    const [series, setSeries] = useState([]);
    const [models, setModels] = useState([]);

    const [printers, setPrinters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [newPrinter, setNewPrinter] = useState({
        brand: "",
        series: "",
        model: "",
        serialNumber: "",
        status: "",
        measurer: "",
        notes: "",
        availability: "",
        client: ""
    });

    const {
        currentPage,
        totalPages,
        paginatedItems: paginatedPrinters,
        goToPage,
        nextPage,
        prevPage,
    } = usePagination(printers, PAGE_SIZE);

    const saveNewPrinter = async (event) => {

        try{
            setLoading(true);

            event.preventDefault();

            const form = event.currentTarget;

            if(!form.checkValidity()) {
                event.stopPropagation();
                return;
            }
            await printerApi.createPrinter(newPrinter);

            const updatedPrinters = await printerApi.getPrinters();
            setPrinters(updatedPrinters);

        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }


    }

    async function addBrand(brand) {
        try {
            setLoading(true);

            const newBrand = await printerApi.addBrand(brand);

            const updatedBrands = await printerApi.getBrands();
            setBrands(updatedBrands);

            return newBrand;
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    async function addSeries(series, brandId) {
        try{
            setLoading(true);

            const newSeries = await printerApi.addSeries(series, brandId);

            const updatedSeries = await printerApi.getSeries();
            setSeries(updatedSeries);

            return newSeries;
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    async function addModel(modelName, seriesId, imageFile) {
        try {
            setLoading(true);

            const selectedSeries = series.find(
                s => s.id === Number(seriesId)
            );

            const selectedBrand = brands.find(
                b => b.id === selectedSeries.brand_id
            );

            const imageName = `${selectedBrand.brand}_${selectedSeries.series}_${modelName}`
                .replace(/\s+/g, "_")
                .toUpperCase();

            const { imageUrl } = await uploadImage(
                imageFile,
                imageName
            );

            const newModel = await printerApi.addModel(
                modelName,
                seriesId,
                imageUrl
            );

            const updatedModels = await printerApi.getModels();
            setModels(updatedModels);

            return newModel;

        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {

        async function getInfo() {
            try {

                setLoading(true);

                const [brandsData, seriesData, modelsData] = await Promise.all([
                    printerApi.getBrands(),
                    printerApi.getSeries(),
                    printerApi.getModels()
                ]);

                setBrands(brandsData);
                setSeries(seriesData);
                setModels(modelsData);

            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        async function loadPrinters() {
            try {

                setLoading(true);

                const data = await printerApi.getPrinters();
                setPrinters(data);

            } catch (error) {
                setError(error.message);

            } finally {
                setLoading(false);
            }
        }

        getInfo();

        loadPrinters();

    }, []);


    return {
        brands,
        series,
        models,
        printers,
        loading,
        error,
        newPrinter,
        setNewPrinter,
        saveNewPrinter,
        addBrand,
        addSeries,
        addModel,

        paginatedPrinters,
        currentPage,
        totalPages,
        goToPage,
        nextPage,
        prevPage,
    };
}