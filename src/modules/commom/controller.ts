import logger from './logger/logger';

export class BaseController {

    sendResponse(req, res, statusCode, data) {
        res.status(statusCode).json({ 'result': data });
    }

    handleError(err, req, res) {
        console.error(`Error: ${ err.message }`);
        logger.appendError(`[${req.url}] - ${err.message}`);
        this.sendResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, `Error: ${ err.message }`);
    }

}