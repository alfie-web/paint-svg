
import Tool from "./Tool"

import canvasState from '../store/canvasState'

export default class Line extends Tool {
	start = null

	mouseDownHandler(e) {
		if (e.button !== 0) return
		this.mouseDown = true
		
		this.start = this.getCoordsOnSvg(canvasState.svg, e.clientX, e.clientY)

		canvasState.addDrawedTool({
			type: 'Line',
			params: {}
		})
	}

	mouseMoveHandler(e) {
		if (this.mouseDown) {
			const lastTool = canvasState.canvasData.length - 1
			const lineParams = this.drawLine(e)

			canvasState.draw(lastTool, lineParams)
		}
	}

	// static draw({ x, y, ctx, strokeStyle, lineWidth }) {

	// }

	drawLine = (e) => {
		let curCoords = this.getCoordsOnSvg(canvasState.svg, e.clientX, e.clientY)
      let x2 = curCoords.x
      let y2 = curCoords.y

		return {
			x1: this.start.x,
			y1: this.start.y,
			x2,
			y2,
		}
	}
}
