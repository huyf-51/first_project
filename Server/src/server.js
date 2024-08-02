require('dotenv').config();
const configSocket = require('./config/socket');
const { connectDB } = require('../src/config/db');
const { connectRedis } = require('../src/config/redis');
const app = require('./app');
const port = 3001;

connectRedis();
connectDB();

const server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

configSocket(server);
