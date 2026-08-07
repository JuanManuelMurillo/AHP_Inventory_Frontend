import "../../css/components/molecules/PrinterCard.css";
import Image from "next/image";
import { getPrinterImage } from "@/infrastructure/supabase/storage";

export default function PrinterCard({ printer }) {
    return (
        <div className="card printer-card shadow-sm h-100">

            {/* Imagen */}
            <div className="printer-image-container position-relative">

                <div className="printer-brand">
                    {printer.brand}
                </div>

                <div className="printer-image">
                    <Image
                        src={getPrinterImage(printer.imageUrl)}
                        alt={`${printer.brand} ${printer.series} ${printer.model}`}
                        width={300}
                        height={200}
                        loading="eager"
                        className="printer-img"
                    />
                </div>

            </div>


            {/* Información */}
            <div className="card-body">

                <h5 className="printer-title">
                    {printer.series} {printer.model}
                </h5>


                <p className="printer-serial">
                    {printer.serialNumber}
                </p>


                <p className="printer-info">
                    {printer.type}
                </p>


                <p className="printer-info">
                    <strong>Medidor:</strong> {printer.measurer}
                </p>

            </div>

        </div>
    );
}