"use client";

import { useMemo, useState } from "react";

export default function AddModal({
    show,
    type,
    brands = [],
    series = [],
    onClose,
    onSave,
}) {

    const [brand, setBrand] = useState("");
    const [seriesId, setSeriesId] = useState("");
    const [name, setName] = useState("");

    const [image, setImage] = useState(null);


    const filteredSeries = useMemo(() => {
        return series.filter(
            (serie) => serie.brand_id === Number(brand)
        );
    }, [brand, series]);

    if (!show) return null;

    const handleSubmit = (e) => {
        e.preventDefault();

        switch (type) {

            case "brand":
                onSave(type, {
                    brand: name,
                });
                break;

            case "series":
                onSave(type, {
                    brandId: Number(brand),
                    series: name,
                });
                break;

            case "model":
                onSave(type, {
                    seriesId: Number(seriesId),
                    model: name,
                    image: image,
                });
                break;

            default:
                break;
        }

        setBrand("");
        setSeriesId("");
        setName("");

        onClose();
    };

    return (
        <>
            <div
                className="modal fade show d-block"
                tabIndex="-1"
                style={{ backgroundColor: "rgba(0,0,0,.5)" }}
            >
                <div className="modal-dialog">
                    <div className="modal-content">

                        <form onSubmit={handleSubmit}>

                            <div className="modal-header">
                                <h5 className="modal-title">

                                    {type === "brand" && "Nueva marca"}
                                    {type === "series" && "Nueva serie"}
                                    {type === "model" && "Nuevo modelo"}

                                </h5>

                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={onClose}
                                />
                            </div>

                            <div className="modal-body">

                                {type === "series" && (
                                    <div className="mb-3">

                                        <label className="form-label">
                                            Marca
                                        </label>

                                        <select
                                            className="form-select"
                                            value={brand}
                                            onChange={(e) =>
                                                setBrand(e.target.value)
                                            }
                                            required
                                        >
                                            <option value="">
                                                Seleccione una marca
                                            </option>

                                            {brands.map((brand) => (
                                                <option
                                                    key={brand.id}
                                                    value={brand.id}
                                                >
                                                    {brand.brand}
                                                </option>
                                            ))}

                                        </select>

                                    </div>
                                )}

                                {type === "model" && (
                                    <>
                                        <div className="mb-3">

                                            <label className="form-label">
                                                Marca
                                            </label>

                                            <select
                                                className="form-select"
                                                value={brand}
                                                onChange={(e) => {
                                                    setBrand(e.target.value);
                                                    setSeriesId("");
                                                }}
                                                required
                                            >
                                                <option value="">
                                                    Seleccione una marca
                                                </option>

                                                {brands.map((brand) => (
                                                    <option
                                                        key={brand.id}
                                                        value={brand.id}
                                                    >
                                                        {brand.brand}
                                                    </option>
                                                ))}

                                            </select>

                                        </div>

                                        <div className="mb-3">

                                            <label className="form-label">
                                                Serie
                                            </label>

                                            <select
                                                className="form-select"
                                                value={seriesId}
                                                disabled={!brand}
                                                onChange={(e) =>
                                                    setSeriesId(e.target.value)
                                                }
                                                required
                                            >
                                                <option value="">
                                                    Seleccione una serie
                                                </option>

                                                {filteredSeries.map((serie) => (
                                                    <option
                                                        key={serie.id}
                                                        value={serie.id}
                                                    >
                                                        {serie.series}
                                                    </option>
                                                ))}

                                            </select>

                                        </div>
                                    </>
                                )}

                                <div className="mb-3">

                                    <label className="form-label">

                                        {type === "brand" && "Marca"}
                                        {type === "series" && "Serie"}
                                        {type === "model" && "Modelo"}

                                    </label>

                                    <input
                                        className="form-control"
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                        required
                                    />

                                </div>
                                {type === "model" && (
                                    <div className="mb-3">
                                        
                                        <label className="form-label">
                                            Imagen
                                        </label>

                                        <input
                                            type="file"
                                            className="form-control"
                                            accept="image/*"
                                            onChange={(e) => setImage(e.target.files[0])}
                                        />

                                    </div>
                                )}


                            </div>

                            <div className="modal-footer">

                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={onClose}
                                >
                                    Cancelar
                                </button>

                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Guardar
                                </button>

                            </div>

                        </form>

                    </div>
                </div>
            </div>
        </>
    );
}