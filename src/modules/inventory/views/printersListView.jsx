"use client";

import { useState } from "react";

import usePrinters from "../viewmodels/printersListVM";
import PrinterCard from "@/shared/components/molecules/PrinterCard";
import PageTitle from "@/shared/components/molecules/PageTitle";
import SidePanel from "@/shared/components/organisms/SidePanel";
import Pagination from "@/shared/components/molecules/Pagination";
import "@/shared/css/views/printersListView.css";

export default function PrintersView() {
    const { 
        brands, series, models,
        printers, loading, error,
        newPrinter, setNewPrinter,
        addBrand, addSeries, addModel,
        saveNewPrinter,
        paginatedPrinters, currentPage, 
        totalPages, goToPage, nextPage, 
        prevPage,
    } = usePrinters();

    const [panelExpanded, setPanelExpanded] = useState(false);

    if (loading) {
        return <p>Cargando impresoras...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
            <main 
                className={`container content ${panelExpanded ? "panel-open" : "panel-closed"}`}
            >

                <PageTitle>
                    Catálogo de impresoras
                </PageTitle>

                <div className="row g-4">

                    {paginatedPrinters.map((printer) => (
                        <div 
                            className="col-12 col-sm-6 col-lg-4 col-xl-3"
                            key={printer.id}
                        >
                            <PrinterCard printer={printer} />
                        </div>
                    ))}

                </div>

                <SidePanel 
                    expanded={panelExpanded}
                    setExpanded={setPanelExpanded}
                    brands={brands}
                    series={series}
                    models={models}
                    newPrinter={newPrinter}
                    setNewPrinter={setNewPrinter}
                    saveNewPrinter={saveNewPrinter}
                    addBrand={addBrand}
                    addSeries={addSeries}
                    addModel={addModel}
                />
                <br/>
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={goToPage} />

            </main>
    );
}