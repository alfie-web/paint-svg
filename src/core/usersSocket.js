const users = []

const addUser = ({ socketId, roomId, userId }) => {
   //Clean the data
   roomId = roomId.trim().toLowerCase()

   //Validate the data
   if (!roomId || !userId) {
      return {
         error: 'userId and roomId are required!',
      }
   }

   //Check for existing user
   const existingUser = users.find((user) => {
      return user.roomId === roomId && user.userId === userId
   })

   //Validate peerId
   if (existingUser) {
      return {
         error: 'Пользователь уже существует',
      }
   }

   //Store user
   const user = { socketId, roomId, userId }
   users.push(user)
   return user
}

const removeUser = (socketId) => {
   const index = users.findIndex((user) => user.socketId === socketId)

   if (index !== -1) {
      return users.splice(index, 1)[0]
   }
}

const removeUserById = (userId) => {
   const index = users.findIndex((user) => user.userId === userId)

   if (index !== -1) {
      return users.splice(index, 1)[0]
   }
}

const getUser = (socketId) => {
   return users.find((user) => user.socketId === socketId)
}

const getUsersInRoom = (roomId) => {
   return users.filter((user) => user.roomId === roomId.trim().toLowerCase())
}

module.exports = {
   addUser,
   removeUser,
   removeUserById,
   getUser,
   getUsersInRoom,
}
