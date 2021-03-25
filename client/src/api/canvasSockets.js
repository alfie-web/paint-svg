import io from 'socket.io-client'
import canvasState from '../store/canvasState'
import usersState from '../store/usersState'

class CanvasSockets {
   constructor() {
      this.socket = null
   }

   startSocketListeners = ({ roomId, userId, userName, userAvatar }) => {
      this.socket = io('wss://collaborative-paint-app.herokuapp.com')

      this.joinRoom({ roomId, userId, userName, userAvatar })

      this.socket.on('FE-user-join', canvasState.onUserJoin)
      this.socket.on('FE-room-users', canvasState.onRoomUsers)
      this.socket.on('FE-user-leave', canvasState.onUserLeave)
      this.socket.on('FE-room-error', canvasState.onRoomError)

      this.socket.on('FE-draw', canvasState.onDraw)
      this.socket.on('FE-stop-drawing', canvasState.onStopDrawing)
   }

   joinRoom = ({ roomId, userId, userName, userAvatar }) => {
      this.socket.emit('BE-join-room', { userId, roomId, userName, userAvatar })
   }

   leaveRoom = (roomId) => {
      console.log('leave room')
      if (!this.socket) return
      this.socket.emit('BE-leave-room', { roomId })

      this.socket.disconnect()
   }

   draw = (tool) => {
      this.socket.emit(
         'BE-draw',
         JSON.stringify({
            roomId: canvasState.roomId,
            userId: usersState.user._id,
            tool,
         })
      )
   }

   stopDrawing = () => {
      this.socket.emit(
         'BE-stop-drawing',
         JSON.stringify({
            roomId: canvasState.roomId,
            userId: usersState.user._id,
         })
      )
   }
}

export default CanvasSockets
