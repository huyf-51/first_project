const { Server } = require('socket.io');
const Message = require('../models/Message');
const User = require('../models/User');

const socketConfig = (server) => {
    const io = new Server(server, {
        cors: {
            origin: 'http://localhost:3000',
        },
    });

    const activeUser = new Map();

    io.use((socket, next) => {
        if (socket.handshake.headers.token === 'secret') {
            next();
        }
    });
    io.on('connection', (socket) => {
        socket.on('add user', (userId) => {
            activeUser.set(userId, socket.id);
        });

        socket.on('send message', async (msg) => {
            const socketId = activeUser.get(msg.to);
            const userId = await Message.findOne({ from: msg.from });
            let userInfo;
            if (!userId) {
                const user = await User.findOne({ _id: msg.from });
                const { password, refreshToken, role, googleId, ...other } =
                    user?._doc;
                userInfo = other;
            }
            socket.to(socketId).emit('receive message', msg, userInfo);
        });
    });
};

module.exports = socketConfig;
