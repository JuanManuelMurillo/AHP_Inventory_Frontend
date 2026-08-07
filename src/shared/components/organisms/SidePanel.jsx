"use client";

import { useState } from "react";
import "@/shared/css/components/organisms/SidePanel.css";
import PageTitle from "@/shared/components/molecules/PageTitle";
import NewPrinterForm from "@/shared/components/molecules/NewPrinterForm";

export default function SidePanel({
    brands,
    series,
    models,
    newPrinter,
    setNewPrinter,
    saveNewPrinter,
    addBrand,
    addSeries,
    addModel,
    expanded,
    setExpanded,
}) {

    const [registerOpen, setRegisterOpen] = useState(false);

    return (
        <div
            className={`side-panel ${expanded ? "expanded" : ""}`}
        >
            <button
                className="btn btn-outline-secondarytoggle-btn"
                onClick={() => setExpanded(!expanded)}
            >
                {expanded ? "❯" : "❮"}
            </button>

            {expanded && (
                <div className="side-panel-content">
                <PageTitle
                as="h3"
                >
                    Menú
                </PageTitle>

                    {/* Aquí irán tus filtros */}

                {!registerOpen && (
                    <button
                        className="btn w-100 mb-3 btn-success"
                        onClick={() => setRegisterOpen(!registerOpen)}
                    >
                        Nueva impresora
                    </button>
                )}


                    {registerOpen && (
                        <NewPrinterForm 
                            onCancel={() => setRegisterOpen(false)}
                            brands={brands}
                            series={series}
                            models={models}
                            newPrinter={newPrinter}
                            setNewPrinter={setNewPrinter}
                            handleSubmit={saveNewPrinter}
                            addBrand={addBrand}
                            addSeries={addSeries}
                            addModel={addModel}
                        />
                    )}

                    <hr/>

                </div>
            )}
        </div>
    );
}