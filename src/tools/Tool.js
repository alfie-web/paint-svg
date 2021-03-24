// import throttle from "../helpers/throttle"
import canvasState from "../store/canvasState"

export default class Tool {
	constructor(canvas) {
		this.canvas = canvas
		this.container = canvas.parentElement
		// this.ctx = canvas.getContext('2d')
		this.mouseDown = false

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
		// this.canvas.onmousemove = throttle(this.mouseMoveHandler.bind(this), 10)
		this.canvas.onmouseup = this.mouseUpHandler.bind(this)
	}

	destroyEvents() {
		this.canvas.onmousemove = null
		this.canvas.onmousedown = null
		this.canvas.onmouseup =null

		// window.onmousemove = null
		// window.onmousedown = null
		// window.onmouseup =null

		// document.documentElement.style.cursor = 'auto'
	}

	mouseDownHandler() {
		
	}
	mouseMoveHandler() {}

	mouseUpHandler() {
		this.mouseDown = false
		// console.log('mouseUpHandler')

		// this.ctx.beginPath()
		// canvasState.canvasSockets.stopDrawing()
	}

	// getCoords(e) {
	// 	const coords = this.container.getBoundingClientRect()

	// 	return {
	// 		coordX: e.pageX - e.target.offsetLeft - coords.left,
	// 		coordY: e.pageY - e.target.offsetTop - coords.top
	// 	}
	// }

	// благодаря этой функции я получаю координаты курсора мыши относительно svg элемента
	// если бы брал просто e.clientX, e.clientY, то нужно было бы учитывать и координаты самого svg относительно документа
	getCoordsOnSvg(elem, x, y) {		
		let p = canvasState.svg.createSVGPoint()
		p.x = x
		p.y = y
		return p.matrixTransform(elem.getScreenCTM().inverse())
	}
}

