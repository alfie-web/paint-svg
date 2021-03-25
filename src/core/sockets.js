// Реалтайм курсорное рисование

const { addUser, getUsers, removeUser } = require('./canvasSockets')
const UserModel = require('../models/User')

module.exports = (httpServer) => {
   const io = require('socket.io')(httpServer, {
      cors: {
         origin: 'http://localhost:3000',
      },
   })

   io.use((socket, next) => {
      console.log('socket.io middleware')
      next()
      // if (isValid(socket.request)) {
      //   	next();
      // } else {
      //   next(new Error("invalid"));
      // }
   })

   // коннектимся
   io.on('connection', (socket) => {
      console.log(`New User connected: ${socket.id}`)

      // дисконектимся с соединения
      socket.on('disconnect', () => {
         const { userId, roomId, userName } = removeUser({
            socketId: socket.id,
         })
         // console.log('disconnected user', userId)

         if (userId && roomId) {
            socket
               .to(roomId)
               .emit('FE-user-leave', { userId, socketId: socket.id, userName })
         }

         socket.disconnect()
         console.log('User disconnected!')
      })

      // джойнимся к комнате
      // (возможно лучше вынести в контроллер, типо когда заправиваем канвас,
      // там и чекаем а есть лы мы вообше в списке users и  джойним к комнате)
      socket.on(
         'BE-join-room',
         async ({ userId, roomId, userName, userAvatar }) => {
            if (!userId && !roomId && !userName) return
            console.log('BE-join-room', userName)

            socket.join(roomId)

            const { error } = await addUser({
               socketId: socket.id,
               roomId,
               userId,
               userName,
               userAvatar,
            })
            if (error) {
               console.log('error', error)
               socket.emit('FE-room-error', error)
               return
            }

            const users = getUsers(roomId) // [{socketId, userId, userName}]

            socket.broadcast.to(roomId).emit('FE-user-join', {
               userId,
               socketId: socket.id,
               userName,
               userAvatar,
            }) // оповещаю всех о том что новый юзер
            socket.emit('FE-room-users', users) // себе передаю всех, кто уже в комнате
         }
      )

      // покидаем комнату
      socket.on('BE-leave-room', ({ roomId, leaver }) => {
         console.log('BE-leave-room')
         // delete socketList[socket.id];
         const { userId, userName } = removeUser({
            roomId,
            socketId: socket.id,
         })

         socket.broadcast
            .to(roomId)
            .emit('FE-user-leave', { socketId: socket.id, userId, userName })

         socket.leave(roomId)
      })

      // обрабатывает действия на холсте
      socket.on('BE-draw', (state) => {
         const { roomId, userId, tool } = JSON.parse(state)
         // Надо найти пользователя, кто отпправляет данные

         socket.broadcast.to(roomId).emit('FE-draw', { tool })
      })

      socket.on('BE-stop-drawing', (state) => {
         const { roomId, userId } = JSON.parse(state)
         socket.broadcast.to(roomId).emit('FE-stop-drawing')
      })
   })
}
