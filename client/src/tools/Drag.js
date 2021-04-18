import Tool from "./Tool"

export default class Drag extends Tool {
	selected = null
	start = null
	startTransform = this.getTranslate()

	mouseDownHandler(e) {
		this.start = super.mouseDownHandler(e)
		const allowClasses = ['Brush', 'Rect', 'Ellipse', 'Line', 'Path']
		
		if (allowClasses.includes(e.target.classList[0])) {
			this.selected = e.target
			this.startTransform = this.getTranslate()

			// this.canvas.style.cursor = 'move'
		}
	}

	mouseMoveHandler(e) {
		if (this.mouseDown && this.selected) {
			const mouseCoords = this.getCoordsOnSvg(e)

			let x = this.startTransform.x + mouseCoords.x - this.start.x
			let y = this.startTransform.y + mouseCoords.y - this.start.y

			this.selected.style.transform = `translate(${x}px, ${y}px)`
		}
	}

	mouseUpHandler() {
		this.mouseDown = false
		this.selected = null
		
		// this.canvas.style.cursor = 'crosshair'
	}

	getTranslate() {
		if (this.selected) {
			var style = window.getComputedStyle(this.selected)
			var matrix = new window.WebKitCSSMatrix(style.transform)
			return {
				x: matrix.m41,
				y: matrix.m42,
			}
		}
		return 0
	 }
}
