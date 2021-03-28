
// риалтайм рисование
import Tool from "./Tool"

import canvasState from '../store/canvasState'
import toolState from "../store/toolState"
import { runInAction } from "mobx"

export default class Text extends Tool {
	start = null

	mouseDownHandler(e) {
		this.start = super.mouseDownHandler(e)
		if (!this.start) return

		const textParams = {
			x: this.start.x,
			y: this.start.y,
			text: ''
		}

		this.toolId = canvasState.addDrawedTool({
			type: 'Text',
			params: textParams,
			settings: {
            // stroke: toolState.stroke,
         }
		})
		runInAction(() => {
			canvasState.editedTextTool = {
				toolId: this.toolId,
				...textParams
			}
		})
	}

	mouseMoveHandler(e) {
		// if (this.mouseDown) {
		// 	const lastToolIndex = canvasState.getToolIndexById(this.toolId)
		// 	const rectParams = this.drawRect(e)

		// 	if (typeof lastToolIndex === 'number') {
		// 		canvasState.draw(lastToolIndex, rectParams)
		// 		canvasState.drawToOther(lastToolIndex, rectParams)
		// 	}
		// }
	}

	mouseUpHandler(e) {
		if (this.mouseDown) {
			// const lastToolIndex = canvasState.getToolIndexById(this.toolId)
			// const rectParams = this.drawRect(e)

			// if (typeof lastToolIndex === 'number') {
			// 	canvasState.draw(lastToolIndex, rectParams)
			// 	canvasState.drawToOther(lastToolIndex, rectParams)
			// }
		}
	}
}
