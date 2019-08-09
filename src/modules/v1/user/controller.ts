import * as httpStatus from 'http-status';
import { BaseController } from '../../commom/controller';
import repository from './repository';

export class UserController extends BaseController {
    constructor(app) {
        super();
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
            super.sendResponse(req, res, httpStatus.OK, users);
        } catch (error) {
            this.handleError(error, req, res);
        }
    }

    async getById(req, res) {
        try {
            const id = { _id: req.params.id };
            if(!id) {
                super.sendResponse(req, res, httpStatus.OK, 'User not found');
            }

            const user = await repository.getById(id);
            if(!user) {
                super.sendResponse(req, res, httpStatus.OK, 'User not found');
            } else {
                super.sendResponse(req, res, httpStatus.OK, user);
            }
        } catch (error) {
            super.handleError(error, req, res);
        }
    }

    async create(req, res) {
        try {
            const body = req.body;
            const user = await repository.create(body);
            super.sendResponse(req, res, httpStatus.CREATED, 'User created successful');
        } catch (error) {
            super.handleError(error, req, res);
        }
    }

    async update(req, res) {
        try {
            const id = { _id: req.params.id };
            const body = req.body;
            const user = await repository.update(id, body);
            super.sendResponse(req, res, httpStatus.OK, 'User updated successful');
        } catch (error) {
            super.handleError(error, req, res);
        }
    }

    async remove(req, res) {
        try {
            const id = { _id: req.params.id };
            const user = await repository.remove(id);
            super.sendResponse(req, res, httpStatus.OK, 'User deleted successful');
        } catch (error) {
            super.handleError(error, req, res);
        }
    }

}