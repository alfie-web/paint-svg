// риалтайм рисование
import Tool from "./Tool"

import canvasState from '../store/canvasState'
import toolState from "../store/toolState"

export default class Rect extends Tool {
	start = null

	mouseDownHandler(e) {
		this.start = super.mouseDownHandler(e)
		if (!this.start) return

		const tool = {
			type: 'Rect',
			params: {},
			settings: {
            stroke: toolState.stroke,
            strokeWidth: toolState.lineWidth,
				fill: toolState.fill
         }
		}

		this.toolId = canvasState.addDrawedTool(tool)
	}

	getParams = (e) => {
		let curCoords = this.getCoordsOnSvg(e)

      let w = Math.abs(curCoords.x - this.start.x)
      let h = Math.abs(curCoords.y - this.start.y)

      if (curCoords.x > this.start.x) {
         curCoords.x = this.start.x
      }

      if (curCoords.y > this.start.y) {
         curCoords.y = this.start.y
      }

		return {
			x: curCoords.x,
			y: curCoords.y,
			w,
			h,
		}
	}
}
