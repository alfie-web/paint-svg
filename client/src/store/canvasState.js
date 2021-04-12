// риалтайм рисование
import { makeAutoObservable, runInAction, toJS } from 'mobx'
import { nanoid } from 'nanoid'
import canvasAPI from '../api/canvas'

import usersState from './usersState'
import toolState from './toolState'

import CanvasSockets from '../api/canvasSockets'
import Tools from '../tools'

class CanvasState {
	roomId = null
	canvasSockets = null	// соединение
	users = [] 	// пользователи в комнате
	isFetching = false

	canvas = null	// холст для обработки mouseDown, mouseMove, mouseUp
	svg = null	// svg элемент
	canvasData = []	// Нарисованные фигуры тут 
	undoList = []	// отменённые действий 
	canvasMeta = {}	// мета данные о холсте

	editedTextTool = null	// текущий редактируемый текст инструмент
	
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

		this.canvasSockets.startDrawing(toolData)

		return toolData.id
	}

	getToolIndexById(id) {
		return this.canvasData.findIndex(t => t.id === id)
	}

	// Добавляем точку (для инстумента Brush)
	addPoint(toolIndex, point) {	// пока индекс - потом можно и id придумать
		runInAction(() => {
			this.canvasData[toolIndex].params += point
		})
	}

	// меняем параметры инструмента (рисуем)
	changeToolParams(toolIndex, params) {
		runInAction(() => {
			this.canvasData[toolIndex].params = params
		})
	}

	draw(toolId, params) {
		const toolIndex = this.getToolIndexById(toolId)

		if (!params) return
		if (typeof toolIndex !== 'number' || toolIndex < 0) return 

      const findedTool = toJS(this.canvasData[toolIndex])

		if (findedTool) {
         if (findedTool.type === 'Brush') {
            this.addPoint(toolIndex, params)		// можно даже передавать сразу инстумент а не toolIndex
         } else {
            this.changeToolParams(toolIndex, params)	// можно даже передавать сразу инстумент
         }

			return findedTool
      }
	}

	drawToOther(toolId, params) {
		this.draw(toolId, params)

		this.canvasSockets.drawing(toolId, params)
	}

	undo(withSocket = true) {
		if (this.canvasData.length) {
			runInAction(() => {
				const lastTool = this.canvasData.pop()
				this.undoList.push(lastTool)
			})
			withSocket && this.canvasSockets.undoRedo('undo')
		}
	}

	redo(withSocket = true) {
		if (this.undoList.length) {
			runInAction(() => {
				const lastTool = this.undoList.pop()
				lastTool && this.canvasData.push(lastTool)
			})
			withSocket && this.canvasSockets.undoRedo('redo')
		}
	}






	fetchState = async (canvasId, redirectIfError) => {
		this.isFetching = true
		try {
			const { data } = await canvasAPI.getById(canvasId)
			
			this.canvasMeta = {
				title: data.data.title
			}

			this.svg.setAttribute('width', data.data.width)
			this.svg.setAttribute('height', data.data.height)
			
			const canvasData = data.data.content ? JSON.parse(data.data.content) : []
			this.canvasData = canvasData

			// this.redo(data.data.content)
			this.setRoomId(canvasId)
			this.startSocketListeners(canvasId)			

		} catch (e) {
			console.log(e)

			redirectIfError()
		} finally {
			this.isFetching = false
		}
	}

	startSocketListeners = (id) => {
		this.canvasSockets = new CanvasSockets()

		this.canvasSockets.startSocketListeners({
			roomId: id,
			userId: usersState.user._id,
			userName: usersState.user.fullname, 
			userAvatar: usersState.user.avatar
		})
	}

	// Срабатывает, когда текущий пользователь заходит в комнату	(получаем тех кто уже в комнате)
	onRoomUsers = users => {	
		console.log('Пользователи в комнате', users)
		this.users = users
	}

	// Срабатывает, когда тукущий пользователь уже в комнате и в неё вошел другой пользователь
	onUserJoin = (user) => {	
		console.log('Новый пользователь', user)
		window.flash(`${user.userName} тут!`, 'info', 'bottom-right')
		this.users.push(user)
	}

	// Срабатывает, когда пользователь вышел из комнаты (перешел на другой роут) или закрыл вкладку браузера (или пропал интернет)
	onUserLeave = user => {		
		console.log('Пользователь покинул комнату', user)
		window.flash(`${user.userName} ушёл!`, 'info', 'bottom-right')
		this.users = this.users.filter(u => u.userId !== user.userId)
	}

	onRoomError = error => {
		console.log('Ошибка соединения', error)
		window.location.href = '/canvases'
	}

	onStartDrawing = ({ tool }) => {
		runInAction(() => {
			this.canvasData.push(tool)
		})
	}

	onDrawing = ({ toolId, params }) => {
		this.draw(toolId, params)
	}

	onUndoRedo = (type) => {
		this[type](false)
	}
}

export default new CanvasState()
