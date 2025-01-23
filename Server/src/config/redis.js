const { createClient } = require('redis');
let instance;

class Redis {
    #client;
    constructor() {
        if (instance) {
            throw new Error('You already initialize Redis instance');
        } else {
            this.#client = createClient({
                url: 'redis://127.0.0.1:6379',
            });
        }
    }
    connect() {
        this.#client
            .on('error', (err) => console.log('Redis Client Error', err))
            .connect();
    }
    getClient() {
        return this.#client;
    }
    static getRedisInstance() {
        if (!instance) {
            instance = new Redis();
        }
        return instance;
    }
}

module.exports = Redis;
