// // import throttle from "../helpers/throttle"

// import canvasState from "../store/canvasState"

// export default class Tool {
// 	constructor(canvas) {
// 		this.canvas = canvas
// 		this.container = canvas.parentElement

// 		this.mouseDown = false
// 		this.toolId = null	// ID текущего добавленного инструмента (чтобы редактировать)

// 		this.destroyEvents()
// 		this.listen()
// 	}

// 	// set fillStyle(color) {
// 	// 	this.ctx.fillStyle = color
// 	// }
// 	// set strokeStyle(color) {
// 	// 	this.ctx.strokeStyle = color
// 	// }
// 	// set lineWidth(width) {
// 	// 	this.ctx.lineWidth = width
// 	// }

// 	listen() {
// 		this.canvas.onmousedown = this.mouseDownHandler.bind(this)
// 		this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
// 		// this.canvas.onmousemove = throttle(this.mouseMoveHandler.bind(this), 10)
// 		this.canvas.onmouseup = this.mouseUpHandler.bind(this)
// 	}

// 	destroyEvents() {
// 		this.canvas.onmousemove = null
// 		this.canvas.onmousedown = null
// 		this.canvas.onmouseup = null

// 		window.onmousemove = null
// 		window.onmousedown = null
// 		window.onmouseup = null

// 		document.documentElement.style.cursor = 'auto'
// 		this.canvas.style.cursor = 'crosshair'
// 	}

// 	mouseDownHandler() {
		
// 	}
// 	mouseMoveHandler() {}

// 	mouseUpHandler(e) {
// 		if (e.button !== 0) return
		
// 		this.toolId && canvasState.drawToOther(this.toolId)
// 		this.mouseDown = false
// 	}

// 	// благодаря этой функции я получаю координаты курсора мыши относительно svg элемента
// 	// если бы брал просто e.clientX, e.clientY, то нужно было бы учитывать и координаты самого svg относительно документа
// 	getCoordsOnSvg(elem, x, y) {		
// 		let p = canvasState.svg.createSVGPoint()
// 		p.x = x
// 		p.y = y
// 		return p.matrixTransform(elem.getScreenCTM().inverse())
// 	}
// }





















// риалтайм рисование
// import throttle from "../helpers/throttle"

import canvasState from "../store/canvasState"

export default class Tool {
	constructor(canvas) {
		this.canvas = canvas
		this.container = canvas.parentElement

		this.mouseDown = false
		this.toolId = null	// ID текущего добавленного инструмента (чтобы редактировать)

		this.destroyEvents()
		this.listen()
	}

	// set fillStyle(color) {
	// 	this.ctx.fillStyle = color
	// }
	// set strokeStyle(color) {
	// 	this.ctx.strokeStyle = color
	// }
	// set lineWidth(width) {
	// 	this.ctx.lineWidth = width
	// }

	listen() {
		this.canvas.onmousedown = this.mouseDownHandler.bind(this)
		this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
		this.canvas.onmouseup = this.mouseUpHandler.bind(this)

		this.canvas.ontouchstart = this.mouseDownHandler.bind(this)
		this.canvas.ontouchmove = this.mouseMoveHandler.bind(this)
		this.canvas.ontouchend = this.mouseUpHandler.bind(this)
		this.canvas.ontouchclose = this.mouseUpHandler.bind(this)
	}

	destroyEvents() {
		this.canvas.onmousemove = null
		this.canvas.onmousedown = null
		this.canvas.onmouseup = null

		window.onmousemove = null
		window.onmousedown = null
		window.onmouseup = null

		this.canvas.ontouchstart = null
		this.canvas.ontouchmove = null
		this.canvas.ontouchend = null
		this.canvas.ontouchclose = null
		window.ontouchstart = null
		window.ontouchmove = null
		window.ontouchend = null
		window.ontouchclose = null

		document.documentElement.style.cursor = 'auto'
		this.canvas.style.cursor = 'crosshair'
	}

	mouseDownHandler(e) {
		const allowEvents = ['mousedown', 'touchstart']

      if (e.button && e.button !== 0) return
      if (!allowEvents.includes(e.type)) return

      this.mouseDown = true

		return this.getCoordsOnSvg(e)
	}

	mouseMoveHandler(e) {
		if (this.mouseDown) {
			const lastToolIndex = canvasState.getToolIndexById(this.toolId)
			const params = this.getParams(e)

			if (typeof lastToolIndex === 'number') {
				canvasState.draw(lastToolIndex, params)
				canvasState.drawToOther(lastToolIndex, params)
			}
		}
	}

	mouseUpHandler() {
		this.mouseDown = false

		// canvasState.drawToOther(this.toolId)
	}

	getParams() {}
	// благодаря этой функции я получаю координаты курсора мыши относительно svg элемента
	// если бы брал просто e.clientX, e.clientY, то нужно было бы учитывать и координаты самого svg относительно документа
	getCoordsOnSvg(e) {
		const elem = canvasState.svg	
		let p = canvasState.svg.createSVGPoint()
		p.x = e.clientX ? e.clientX : e.touches[0].clientX
		p.y = e.clientY ? e.clientY : e.touches[0].clientY
		return p.matrixTransform(elem.getScreenCTM().inverse())
	}
}

