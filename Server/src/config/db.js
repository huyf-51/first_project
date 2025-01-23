const mongoose = require('mongoose');
require('dotenv').config();
let instance;

class MongoDB {
    #url;
    constructor() {
        if (instance) {
            throw new Error('You already initalize MongoDB instance');
        } else {
            this.#url = process.env.MONGODB_URI;
        }
    }
    async connect() {
        try {
            await mongoose.connect(this.#url);
            console.log('DB connected');
        } catch (error) {
            console.log(error);
        }
    }
    static getMongoDBClient() {
        if (!instance) {
            instance = new MongoDB();
        }
        return instance;
    }
}

module.exports = MongoDB;
