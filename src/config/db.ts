import * as mongoose from 'mongoose';

export class DataBase {
    private db: mongoose.Connection;
    private uri: string;

    constructor(host:string, database:string) {
        this.uri = `mongodb://${host}/${database}`;
        mongoose.connect(this.uri);

        this.db = mongoose.connection;
        this.db.on('error', console.error.bind(console, 'Mongoose connection error:'));
        this.db.on('connected', () => console.log(`Mongoose is connected on ${this.uri}`));
        this.db.on('disconnected', () => console.log(`Mongoose is disconnected on ${this.uri}`));
    }

    closeConnection(message, callback) {
        this.db.close(() => {
            console.log(`Mongoose is closed: ${message}`);
            callback();
        });
    }
}