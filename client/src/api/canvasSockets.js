// реалтайм рисование
import io from 'socket.io-client'
import canvasState from '../store/canvasState'
import usersState from '../store/usersState'

class CanvasSockets {
   constructor() {
      this.socket = null
   }

   startSocketListeners = ({ roomId, userId, userName, userAvatar }) => {
      // this.socket = io('ws://localhost:8989')
      this.socket = io('wss://collaborative-paint-app.herokuapp.com')

      this.joinRoom({ roomId, userId, userName, userAvatar })

      this.socket.on('FE-user-join', canvasState.onUserJoin)
      this.socket.on('FE-room-users', canvasState.onRoomUsers)
      this.socket.on('FE-user-leave', canvasState.onUserLeave)
      this.socket.on('FE-room-error', canvasState.onRoomError)

      this.socket.on('FE-start-drawing', canvasState.onStartDrawing)
      this.socket.on('FE-drawing', canvasState.onDrawing)
      this.socket.on('FE-undo-redo', canvasState.onUndoRedo)

      // this.socket.on('FE-draw', canvasState.onDraw)
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



   startDrawing = (tool) => {
      this.socket.emit('BE-start-drawing', JSON.stringify({
         roomId: canvasState.roomId,
         userId: usersState.user._id,
         tool,
      }))
   }

   drawing = (toolId, params) => {
      this.socket.emit('BE-drawing', JSON.stringify({
         roomId: canvasState.roomId,
         userId: usersState.user._id,
         toolId,
         params
      }))
   }

   undoRedo = (type) => {
      this.socket.emit('BE-undo-redo', JSON.stringify({
         roomId: canvasState.roomId,
         userId: usersState.user._id,
         type
      }))
   }
}

export default CanvasSockets
