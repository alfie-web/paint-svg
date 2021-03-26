
import Tool from "./Tool"

import canvasState from '../store/canvasState'
import toolState from "../store/toolState"

export default class Line extends Tool {
	start = null

	mouseDownHandler(e) {
		if (e.button !== 0) return
		this.mouseDown = true
		
		this.start = this.getCoordsOnSvg(canvasState.svg, e.clientX, e.clientY)

		this.toolId = canvasState.addDrawedTool({
			type: 'Line',
			params: {},
			settings: {
            stroke: toolState.stroke,
            strokeWidth: toolState.lineWidth
         }
		})
	}

	mouseMoveHandler(e) {
		if (this.mouseDown) {
			const lastToolIndex = canvasState.getToolIndexById(this.toolId)
			const lineParams = this.drawLine(e)

			if (typeof lastToolIndex === 'number') canvasState.draw(lastToolIndex, lineParams)
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