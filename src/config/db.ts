import * as mongoose from 'mongoose';

export class DataBase {
    private DB_URI = 'mongodb://127.0.0.1/restful-api';
    private DB_CONNECTION;

    constructor() {}

    createConnection() {
        mongoose.connect(this.DB_URI);  
        this.logger(this.DB_URI);      
    }

    logger(uri) {
        this.DB_CONNECTION = mongoose.connection;
        this.DB_CONNECTION.on('connected', () => console.log(`Mongoose is connected on ${uri}`));
        this.DB_CONNECTION.on('error', error => console.error.bind(console, `Connection Error: ${error}`));
        this.DB_CONNECTION.on('disconnected', () => console.log(`Mongoose is disconnected on ${uri}`));
    }

    closeConnection(message, callback) {
        this.DB_CONNECTION.close(() => {
            console.log(`Mongoose is desconnected: ${message}`);
            callback();
        });
    }
}

export default new DataBase();