import * as mongoose from 'mongoose';

const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    autoIndex: false, // Don't build indexes
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
  };

export class DataBase {
    private db: mongoose.Connection;
    private uri: string;

    constructor(config:any) {
        const dbhost = (config.dbhost || '127.0.0.1').trim();
        const dbname = (config.dbname || 'restful-db').trim();

        this.uri = `mongodb://${dbhost}/${dbname}`;
        mongoose.connect(this.uri, options);

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