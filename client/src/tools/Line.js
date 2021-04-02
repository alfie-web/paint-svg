// риалтайм рисование
import Tool from "./Tool"

import canvasState from '../store/canvasState'
import toolState from "../store/toolState"

export default class Line extends Tool {
	start = null

	mouseDownHandler(e) {
		this.start = super.mouseDownHandler(e)
		if (!this.start) return

		const tool = {
			type: 'Line',
			params: {},
			settings: {
            stroke: toolState.stroke,
            strokeWidth: toolState.lineWidth
         }
		}

		this.toolId = canvasState.addDrawedTool(tool)
	}

	getParams = (e) => {
		let curCoords = this.getCoordsOnSvg(e)

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
