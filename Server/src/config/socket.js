const { Server } = require('socket.io');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');
const { client } = require('../config/redis');

const socketConfig = async (server) => {
    const io = new Server(server, {
        cors: {
            origin: 'http://localhost:3000',
            credentials: true,
        },
    });

    global._io = io;

    // io.use(async (socket, next) => {
    //     const cookies = socket.handshake.headers.cookie;
    //     if (cookies.includes('refreshToken')) {
    //         const refreshToken = cookies.slice(
    //             cookies.indexOf('refreshToken') + 13
    //         );
    //         jwt.verify(
    //             refreshToken,
    //             process.env.refreshToken,
    //             async (error, decoded) => {
    //                 if (error) {
    //                     return next(
    //                         new AppError('you dont have permission', 403)
    //                     );
    //                 }

    //                 const user = await User.findOne({ _id: decoded.id });

    //                 if (!user) {
    //                     return next(
    //                         new AppError('you dont have permission', 403)
    //                     );
    //                 }
    //                 next();
    //             }
    //         );
    //     }
    // });
    io.use(async (socket, next) => {
        const sessionId = socket.handshake.auth.sessionId;
        const activeUser = await client.exists(sessionId);
        if (activeUser) {
            const userId = await client.hGet(sessionId, 'userId');
            socket.userId = userId;
            socket.sessionId = sessionId;
            return next();
        }
        next(new AppError('you dont have permission', 403));
    });

    io.on('connection', async (socket) => {
        await client.hSet(socket.sessionId, 'connected', 'true');
        socket.join(socket.userId);

        socket.on('send message', async (msg) => {
            if (msg.from === socket.userId) {
                socket
                    .to(socket.userId)
                    .to(msg.to)
                    .emit('receive message', msg);
            }
        });

        socket.on('disconnect', async (reason) => {
            console.log('reason disconnect>>>', reason);
            const activeUser = await client.exists(socket.sessionId);
            if (activeUser) {
                await client.hSet(socket.sessionId, 'connected', 'false');
            }
        });
    });
};

module.exports = socketConfig;
