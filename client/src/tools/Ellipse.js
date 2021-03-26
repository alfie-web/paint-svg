
import Tool from "./Tool"

import canvasState from '../store/canvasState'
import toolState from "../store/toolState"

export default class Ellipse extends Tool {
	start = null

	mouseDownHandler(e) {
		if (e.button !== 0) return
		this.mouseDown = true
		
		this.start = this.getCoordsOnSvg(canvasState.svg, e.clientX, e.clientY)

		this.toolId = canvasState.addDrawedTool({
			type: 'Ellipse',
			params: {},
			settings: {
            stroke: toolState.stroke,
            strokeWidth: toolState.lineWidth,
				fill: toolState.fill
         }
		})
	}

	mouseMoveHandler(e) {
		if (this.mouseDown) {
			const lastToolIndex = canvasState.getToolIndexById(this.toolId)
			const ellipseParams = this.drawEllipse(e)

			if (typeof lastToolIndex === 'number') canvasState.draw(lastToolIndex, ellipseParams)
		}
	}


	// draw({ x, y, ctx, strokeStyle, lineWidth }) {

	// }

	drawEllipse = (e) => {
		let curCoords = this.getCoordsOnSvg(canvasState.svg, e.clientX, e.clientY)

		let rx = (curCoords.x - this.start.x) * 0.5   /// radius for x based on input
		let ry = (curCoords.y - this.start.y) * 0.5   /// radius for y based on input

		let cx = this.start.x + rx      
		let cy = this.start.y + ry

		return {
			rx: Math.abs(rx),
			ry: Math.abs(ry),
			cx, 
			cy
		}
	}
}
