import * as mongoose from 'mongoose';
import User from './schema';

const getAll = () => {
    return User.find({});
}

const getById = (id) => {
    return User.findById(id);
}

const create = (user) => {
    return User.create(user);
}

const update = (id, user) => {    
    return User.findByIdAndUpdate(id, user);
}

const remove = (id) => {
    return User.remove(id);
}

export { getAll, getById, create, update, remove };