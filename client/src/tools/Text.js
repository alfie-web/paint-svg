
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

		// ЧТо если возвращать весь созанный инструмент
		this.toolId = canvasState.addDrawedTool({
			type: 'Text',
			params: textParams,
			settings: {
            fill: toolState.stroke,
         }
		})
		// И вообще избавиться от этой штуки, а брать её в this.toolId (ну переимоновать в this.tool)
		runInAction(() => {
			canvasState.editedTextTool = {
				toolId: this.toolId,
				...textParams
			}
		})
	}

	mouseMoveHandler(e) {

	}

	mouseUpHandler(e) {
		if (this.mouseDown) {

		}
	}
}
