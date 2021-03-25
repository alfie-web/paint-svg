const CanvasModel = require('../models/Canvas')

let canvases = {}

const getUsers = (roomId) => {
   const users = canvases[roomId] || []
   return users
}

const addUser = async ({ socketId, roomId, userId, userName, userAvatar }) => {
   //Clean the data
   roomId = roomId.trim().toLowerCase()

   //Validate the data
   if (!roomId || !userId) {
      return {
         error: 'userId и roomId обязательны!',
      }
   }

   // проверяем в БД
   const isExist = await CanvasModel.findOne({
      users: userId,
      _id: roomId,
   })
   // console.log('isExist', isExist)
   if (!isExist)
      return {
         error: 'Недостаточно прав',
      }

   // создаём комнату, если такой нету
   if (!canvases[roomId]) {
      canvases[roomId] = []
   }

   //Check for existing user
   // TODO: Подумать как грамотно это разрулить
   const existingUser = canvases[roomId].find((user) => {
      return user.userId === userId
   })
   if (existingUser) {
      return {
         error: 'Пользователь уже существует',
      }
   }

   //Store user
   const user = { socketId, userId, userName, userAvatar }
   canvases[roomId].push(user)

   return canvases[roomId]
}

const removeUser = ({ socketId, roomId }) => {
   if (roomId && canvases[roomId]) {
      const index = canvases[roomId].findIndex(
         (user) => user.socketId === socketId
      )

      if (index !== -1) {
         return canvases[roomId].splice(index, 1)[0]
      }
   } else {
      // Версия для disconnect (так как неизвестно в какой комнате был юзер)
      let isDelete = false
      Object.entries(canvases).forEach((o) => {
         if (isDelete) return
         const i = o[1].findIndex((u) => u.socketId === socketId)
         if (i >= 0) {
            isDelete = {
               ...o[1].splice(i, 1)[0],
               roomId: o[0],
            }
         }
      })
      return isDelete
   }
}

module.exports = {
   addUser,
   removeUser,
   getUsers,
}
