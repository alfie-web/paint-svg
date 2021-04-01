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


	// undoList = []	// история действий 
	// redoList = []	// отменённые действия
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
		if (this.canvasData[toolIndex].params.length < 400) {		// ограничение длины линии (иначе утечки памяти)
			runInAction(() => {
				this.canvasData[toolIndex].params.push(point)
			})
		}
	}

	// меняем параметры инструмента (рисуем)
	changeToolParams(toolIndex, params) {
		runInAction(() => {
			this.canvasData[toolIndex].params = params
		})
	}


	// drawToOther(index, params) {
	// 	const tool = toJS(this.canvasData[index])
   //    this.canvasSockets.drawing(tool.id, params)
	// }


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
		console.log(params)
		this.draw(toolId, params)

		// throttle(this.canvasSockets.drawing(toolId, params), 1000)
		this.canvasSockets.drawing(toolId, params)
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
		console.log(toolId, params)
		this.draw(toolId, params)
	}
}

export default new CanvasState()
