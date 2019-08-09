import * as mongoose from 'mongoose';
import User from './schema';

export class UserRepository {
    getAll() {
        return User.find({});
    }
    
    getById(id) {
        return User.findById(id);
    }
    
    create(user) {
        return User.create(user);
    }
    
    update(id, user) {    
        return User.findByIdAndUpdate(id, user);
    }
    
    remove(id) {
        return User.remove(id);
    }
}

export default new UserRepository();