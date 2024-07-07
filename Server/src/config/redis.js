const { createClient } = require('redis');

const client = createClient({
    url: 'redis://127.0.0.1:6379',
});

const connectRedis = async () => {
    client
        .on('error', (err) => console.log('Redis Client Error', err))
        .connect();
};

module.exports = { connectRedis, client };
