import * as fs from 'fs';
import * as Log from 'log';

export class Logger {
    private getLogger(level) {
        const dir = './log'
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
    
        const path = `${dir}/${new Date().toLocaleDateString()}.log`;
        const file = fs.createWriteStream(path, {flags:'a'});
        return new Log(level, file);
    }
    
    appendError(message) { 
        const logError = this.getLogger('error');
        logError.error(message);
    }
}

export default new Logger();