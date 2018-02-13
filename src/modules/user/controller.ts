import * as repository from './repository';
import * as httpStatus from 'http-status';

const sendResponse = function(res, statusCode, data) {
    res.status(statusCode).json({ 'result': data });
}

export class UserController {
    constructor(app) {
        this.createRoutes(app);
    }

    createRoutes(app) {
        app.route('/api/v1/users').get(this.getAll);
        app.route('/api/v1/users/:id').get(this.getById);
        app.route('/api/v1/users').post(this.create);
        app.route('/api/v1/users/:id').put(this.update);
        app.route('/api/v1/users/:id').delete(this.remove);
    }

    async getAll(req, res) {
        try {
            const users = await repository.getAll();
            sendResponse(res, httpStatus.OK, users);
        } catch (error) {
            this.handleError(error, res);
        }
    }

    async getById(req, res) {
        try {
            const id = { _id: req.params.id };
            if(!id) {
                sendResponse(res, httpStatus.OK, 'Usuário não foi encontrado');
            }

            const user = await repository.getById(id);
            if(!user) {
                sendResponse(res, httpStatus.OK, 'Usuário não foi encontrado');
            } else {
                sendResponse(res, httpStatus.OK, user);
            }
        } catch (error) {
            this.handleError(error, res);
        }
    }

    async create(req, res) {
        try {
            const body = req.body;
            const user = await repository.create(body);
            sendResponse(res, httpStatus.CREATED, 'Usuário criado com sucesso');
        } catch (error) {
            this.handleError(error, res);
        }
    }

    async update(req, res) {
        try {
            const id = { _id: req.params.id };
            const body = req.body;
            const user = await repository.update(id, body);
            sendResponse(res, httpStatus.OK, 'Usuário atualizado com sucesso');
        } catch (error) {
            this.handleError(error, res);
        }
    }

    async remove(req, res) {
        try {
            const id = { _id: req.params.id };
            const user = await repository.remove(id);
            sendResponse(res, httpStatus.OK, 'Usuário deletado com sucesso');
        } catch (error) {
            this.handleError(error, res);
        }
    }

    handleError(err, res) {
        console.log(`Erro: ${ err.message }`)
        sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, `Erro: ${ err.message }`);
    }

}