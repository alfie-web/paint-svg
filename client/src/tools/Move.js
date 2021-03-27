import Tool from "./Tool"

export default class Move extends Tool {
	constructor(canvas) {
		super(canvas)		// Вызываем родительский конструктор

		this.startX = 0
		this.startY = 0

		this.listen()

		document.documentElement.style.cursor = 'move'
		this.canvas.style.cursor = 'move'
	}

	listen() {
		window.onmousedown = this.mouseDownHandler.bind(this)
		window.onmousemove = this.mouseMoveHandler.bind(this)
		window.onmouseup = this.mouseUpHandler.bind(this)

		window.ontouchstart = this.mouseDownHandler.bind(this)
		window.ontouchmove = this.mouseMoveHandler.bind(this)
		window.ontouchend = this.mouseUpHandler.bind(this)
		window.ontouchclose = this.mouseUpHandler.bind(this)
	}

	mouseDownHandler(e) {
		super.mouseDownHandler(e)

		const pageX = e.pageX ? e.pageX : e.touches[0].pageX
		const pageY = e.pageY ? e.pageY : e.touches[0].pageY
		
		this.startX = this._getContainerCoord('left') - pageX		// текущую позуцию left - позиция левого края относительно документа 
		this.startY = this._getContainerCoord('top') - pageY		// текущую позуцию top - позиция верхнего края относительно документа
	}

	mouseMoveHandler(e) {
		if (!this.mouseDown) return 

		// предыдущие позиция (для того, чтобы опредилить направление скрола)
		let prevL = this._getContainerCoord('left')	
		let prevT = this._getContainerCoord('top')

		const pageX = e.pageX ? e.pageX : e.touches[0].pageX
		const pageY = e.pageY ? e.pageY : e.touches[0].pageY

		this._setPos('left', this.startX + pageX)		// точка старта по x + позиция левого края относительно документа 
		this._setPos('top', this.startY + pageY)  	// точка старта по y + позиция верхнего края относительно документа 

		const curL = this._getContainerCoord('left')
		const curT = this._getContainerCoord('top')
		const d = this.container.getBoundingClientRect()

		const canvasW = d.width
		const canvasH = d.height

		if (d.left < 0 && Math.abs(d.left) > canvasW - 100) {	// проверяю зашли ли за левую границу	(с оффсетом 100)
			if (prevL > curL) {		// и если продолжаем скролить влево
				this._setPos('left', prevL)	// блокируем
			}
		} 
		if (d.top < 0 && Math.abs(d.top) > canvasH - 100) {	// проверяю зашли ли за верхнюю границу
			if (prevT > curT) {		// и если продолжаем скролить вверх
				this._setPos('top', prevT)	// блокируем
			}
		} 
		if (d.right - canvasW + 100 > window.innerWidth) {	// проверяю зашли ли за правую границу
			if (prevL < curL) {		// и если продолжаем скролить вправо
				this._setPos('left', prevL)	// блокируем
			}
		} 
		if (d.bottom - canvasH + 100 > window.innerHeight) {	// проверяю зашли ли за нижнюю границу
			if (prevT < curT) {		// и если продолжаем скролить вниз
				this._setPos('top', prevT)	// блокируем
			}
		}
	}

	mouseUpHandler(e) {
		this.mouseDown = false
	}

	_getContainerCoord(dir) {
		const val = this.container.style[dir] || 0
		return parseInt(val)
	}
	
	_setPos(dir, val) {
		this.container.style[dir] = val + 'px'
		return val
	}
}