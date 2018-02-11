import * as express from 'express';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import * as process from 'process';

export enum Environment {
    DEV = 1,
    QA = 2,
    HOM = 3, 
    PROD = 4 
}

export class App {

    public app: express.Application;
    private morgan: morgan.Morgan;
    private bodyParser;

    private environment: Environment; 
    private port: number;   

    constructor(port: number = 3000) {
        let context=this;                
        this.port = port;
        this.setEnvironment();

        this.app = express();
        this.middleware();
        this.routes();  
        
        this.app.listen(context.port, () => console.log(`Server is running on port ${context.port} on ENV=${Environment[context.environment]}`));
    }

    middleware() {
        this.app.use(morgan('dev'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
    }

    routes() {
        let context=this;
        this.app.route('/').get((req, res) => res.status(200).json({ 
            'environment': Environment[context.environment]
        }));
    }

    private setEnvironment() {
        let context=this;
        process.argv.forEach((val, index) => {
            switch(val) {
                case '--dev':
                    context.environment = Environment.DEV;
                    break;
                case '--qa':
                    context.environment = Environment.QA;
                    break;
                case '--hom':
                    context.environment = Environment.HOM;
                    break;
                case '--prod':
                    context.environment = Environment.PROD;
                    break;
            }

            if(context.environment) return;
        });

        if(!context.environment) context.environment = Environment.DEV;
    }
}