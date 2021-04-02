// риалтайм рисование
import throttle from "../helpers/throttle"

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

	listen() {
		this.canvas.onmousedown = this.mouseDownHandler.bind(this)
		this.canvas.onmousemove = throttle(this.mouseMoveHandler.bind(this), 10)	// задержка, в том числе и анимация плавного рисования
		this.canvas.onmouseup = this.mouseUpHandler.bind(this)

		this.canvas.ontouchstart = this.mouseDownHandler.bind(this)
		this.canvas.ontouchmove = throttle(this.mouseMoveHandler.bind(this), 10)
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
			const params = this.getParams(e)

			canvasState.drawToOther(this.toolId, params)
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

