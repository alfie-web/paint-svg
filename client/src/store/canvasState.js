import { makeAutoObservable, runInAction } from 'mobx'
import { nanoid } from 'nanoid'
import canvasAPI from '../api/canvas'
// import loadImage from '../helpers/imageLoader'

// import usersState from './usersState'
import toolState from './toolState'


// import CanvasSockets from '../api/canvasSockets'
import Tools from '../tools'

class CanvasState {
	roomId = null
	canvasSockets = null	// соединение
	users = [] 	// пользователи в комнате
	isFetching = false

	canvas = null	// холст для обработки mouseDown, mouseMove, mouseUp
	svg = null	// svg элемент
	canvasData = []	// Нарисованные фигуры тут 


	// undoList = []	// история действий 
	// redoList = []	// отменённые действия
	canvasMeta = {}	// мета данные о холсте
	
	constructor() {
		makeAutoObservable(this)
	}

	initCanvas(canvas) {
		this.setCanvas(canvas)
		toolState.setTool(new Tools.Brush(canvas))		// дефолтный выбранный инструмент
	}

	setCanvas(canvas) {		
		this.canvas = canvas
		this.svg = canvas.querySelector('svg')	
	}

	setRoomId(roomId) {
		this.roomId = roomId
	}

	addDrawedTool(tool) {		// Добавляю новый нарисованные инструмент
		const toolData = {
			id: nanoid(),
			...tool
		}
		
		runInAction(() => {
			this.canvasData.push(toolData)
		})

		return toolData.id
	}

	getToolById(id) {
		return this.canvasData.findIndex(t => t.id === id)
	}

	// Добавляем точку (для инстумента Brush)
	addPoint(toolIndex, point) {	// пока индекс - потом можно и id придумать
		runInAction(() => {
			this.canvasData[toolIndex].points.push(point)
		})
	}

	// меняем параметры инструмента (рисуем)
	draw(toolIndex, params) {
		runInAction(() => {
			this.canvasData[toolIndex].params = params
		})
	}




	// pushToUndo(data) {
	// 	this.undoList.push(data)
	// }

	// pushToRedo(data) {
	// 	this.redoList.push(data)
	// }

	// // TODO: Порефакторить метод undo и redo
	// undo() {
	// 	if (this.undoList.length > 0) {
	// 		let dataUrl = this.undoList.pop()	
	// 		this.redoList.push(this.canvas.toDataURL())	// Сохранаем текушее состояние канваса чтобы отменить возврат 

	// 		loadImage(dataUrl)
	// 			.then(({ img }) => {
	// 				this.clearCanvas()
	// 				this.setCanvasImage(img)
	// 			})
	// 	} else {
	// 		this.clearCanvas()
	// 	}
	// }

	// redo(image) {
	// 	if (this.redoList.length > 0 || image) {
	// 		let dataUrl = this.redoList.pop()	
	// 		this.undoList.push(image ? image : this.canvas.toDataURL())	

	// 		loadImage(image ? image : dataUrl)
	// 			.then(({ img }) => {
	// 				this.clearCanvas()
	// 				this.setCanvasImage(img)
	// 			})
	// 	}
	// }










	fetchState = async (canvasId, redirectIfError) => {
		this.isFetching = true
		try {
			const { data } = await canvasAPI.getById(canvasId)
			
			this.canvasMeta = {
				title: data.data.title
			}

			this.svg.setAttribute('width', data.data.width)
			this.svg.setAttribute('height', data.data.height)
			
			data.data.content ? this.canvasData = JSON.parse(data.data.content) : this.canvasData = []
			console.log(JSON.parse(data.data.content))
			// this.redo(data.data.content)
			this.setRoomId(canvasId)
			// this.startSocketListeners(canvasId)			

		} catch (e) {
			console.log(e)

			redirectIfError()
		} finally {
			this.isFetching = false
		}
	}

	// startSocketListeners = (id) => {
	// 	this.canvasSockets = new CanvasSockets()

	// 	this.canvasSockets.startSocketListeners({
	// 		roomId: id,
	// 		userId: usersState.user._id,
	// 		userName: usersState.user.fullname, 
	// 		userAvatar: usersState.user.avatar
	// 	})
	// }

	// // Срабатывает, когда текущий пользователь заходит в комнату	(получаем тех кто уже в комнате)
	// onRoomUsers = users => {	
	// 	console.log('Пользователи в комнате', users)
	// 	this.users = users
	// }

	// // Срабатывает, когда тукущий пользователь уже в комнате и в неё вошел другой пользователь
	// onUserJoin = (user) => {	
	// 	console.log('Новый пользователь', user)
	// 	window.flash(`${user.userName} тут!`, 'info', 'bottom-right')
	// 	this.users.push(user)
	// }

	// // Срабатывает, когда пользователь вышел из комнаты (перешел на другой роут) или закрыл вкладку браузера (или пропал интернет)
	// onUserLeave = user => {		
	// 	console.log('Пользователь покинул комнату', user)
	// 	window.flash(`${user.userName} ушёл!`, 'info', 'bottom-right')
	// 	this.users = this.users.filter(u => u.userId !== user.userId)
	// }

	// onRoomError = error => {
	// 	console.log('Ошибка соединения', error)
	// 	window.location.href = '/canvases'
	// }

	// onDraw = ({ tool }) => {
	// 	Tools[tool.type].draw({
	// 		ctx: this.context,
	// 		saved: this.canvas.toDataURL(),
	// 		...tool,
	// 		clear: true
	// 	})
	// 	this.saved = this.canvas.toDataURL()
	// }

	// onStopDrawing = () => {
	// 	this.context.beginPath()

	// 	console.log('onStopDrawing')

	// 	// TODO: Вынести в отдельную функцию
	// 	this.context.strokeStyle = toolState.strokeStyle
	// 	this.context.fillStyle = toolState.fillStyle
	// 	this.context.lineWidth = toolState.lineWidth
	// }
}

export default new CanvasState()
