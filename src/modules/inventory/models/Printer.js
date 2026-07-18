export default class Printer {
    constructor(data) {
        this.id = data.id;
        this.model = data.model;
        this.serialNumber = data.serial_number;
        this.type = data.type;
        this.measurer = data.measurer;
        this.notes = data.notes;
        this.availability = data.availability;
        this.clientId = data.client;
        this.seriesId = data.series_id;
    }

}