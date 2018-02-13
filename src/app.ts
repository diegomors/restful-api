import * as express from 'express';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';

import { DataBase } from './config/db';
import { UserController } from './modules/user/controller';

export class App {

    public app: express.Application;
    private morgan: morgan.Morgan;
    private bodyParser;

    public environment: Environment; 
    public host: string;
    public port: number;   

    private dataBase: DataBase;

    constructor() {                        
        this.setEnvironment();
        this.setURI();
        this.createDataBaseConnection();

        this.app = express();
        this.middleware();
        this.routes();                 
    }

    createDataBaseConnection() {
        this.dataBase = new DataBase(this.host, 'restful-api');
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
        let context=this;
        this.app.route('/').get((req, res) => res.status(200).json({ 
            'environment': Environment[context.environment],
            'message': 'It Works!'
        }));

        new UserController(this.app);
    }

    private setURI() {
        this.host = process.env.HOST || 'localhost';
        this.port = +(process.env.PORT || 3000);
    }

    private setEnvironment() {        
        switch(process.env.NODE_ENV) {
            case 'qa':
                this.environment = Environment.QA;
                break;
            case 'hom':
                this.environment = Environment.HOM;
                break;
            case 'prod':
                this.environment = Environment.PROD;
                break;
            default:
                this.environment = Environment.DEV;
                break;
        }
    }
}

export enum Environment {
    DEV = 1,
    QA = 2,
    HOM = 3, 
    PROD = 4 
}