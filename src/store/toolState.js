import { makeAutoObservable } from "mobx"

class ToolState {
	tool = null
	fillStyle = '#000000'
	strokeStyle = '#000000'
	lineWidth = 1

	constructor() {
		makeAutoObservable(this)
	}

	setTool(tool) {		// Экшен
		this.tool = tool
	}

	setFillColor(color) {		// Экшен
	// 	this.tool.fillStyle = color		// используем setter ооп
		this.fillStyle = color
	}

	setStrokeColor(color) {		// Экшен
		// this.tool.strokeStyle = color		// используем setter ооп
		this.strokeStyle = color
	}

	setLineWidth(width) {		// Экшен
		// this.tool.lineWidth = width		// используем setter ооп
		this.lineWidth = width
	}
}

export default new ToolState()