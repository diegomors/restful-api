import * as fs from 'fs';
import * as express from 'express';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';

import { DataBase } from './modules/commom/database/db';
import { UserController } from './modules/v1/user/controller';

export class App {

    private app: express.Application;
    private morgan: morgan.Morgan;
    private bodyParser;

    public config: any;
    private dataBase: DataBase;

    constructor() {                        
        this.setEnvironment();
        this.createDataBaseConnection();

        this.app = express();
        this.middleware();
        this.routes();                 
    }

    listen(port, callback) {
        this.app.listen(port, callback);
    }

    createDataBaseConnection() {        
        this.dataBase = new DataBase(this.config);
    }

    closeDataBaseConnection(message, callback) {
        this.dataBase.closeConnection(message, ()=> callback());
    }

    middleware() {
        this.app.use(morgan('dev'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
    }

    routes() {
        const context=this;
        this.app.route('/').get((req, res) => res.status(200).json({                         
            'status': 'OK',
            'date': new Date().toISOString(),
            'environment': context.config.env
        }));

        new UserController(this.app);
    }

    private setEnvironment() {  
        const env = (process.env.NODE_ENV || "dev").trim();        
        const rawdata = fs.readFileSync(`resources/${env}-properties.json`, 'UTF-8');
        this.config = JSON.parse(rawdata);
    }
}