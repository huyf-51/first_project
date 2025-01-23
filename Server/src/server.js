require('dotenv').config();
const configSocket = require('./config/socket');
const MongoDB = require('../src/config/db');
const Redis = require('../src/config/redis');
const app = require('./app');
const port = 3001;
const redisClient = Redis.getRedisInstance();
const mongoDBClient = MongoDB.getMongoDBClient();

redisClient.connect();
mongoDBClient.connect();

const server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

configSocket(server);
