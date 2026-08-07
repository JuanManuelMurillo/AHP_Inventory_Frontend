export default class Printer {

    constructor(data) {

        // Información específica de la impresora
        this.id = data.id;
        this.serialNumber = data.serial_number;
        this.measurer = data.measurer;
        this.type = data.type;
        this.availability = data.availability;
        this.notes = data.notes;


        // Modelo
        this.model = data.models.model;
        this.imageUrl = data.models.image_url;


        // Serie
        this.series = data.models.series.series;


        // Marca
        this.brand = data.models.series.brands.brand;
    }
}