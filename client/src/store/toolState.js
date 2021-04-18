import { makeAutoObservable } from "mobx"

class ToolState {
	tool = null
	// fill = 'rgba(0,0,0,0)'
	fill = 'none'
	stroke = 'rgba(0,0,0,1)'
	lineWidth = 2

	constructor() {
		makeAutoObservable(this)
	}

	setTool(tool) {		// Экшен
		this.tool = tool
	}

	setFillColor(color) {		// Экшен
	// 	this.tool.fill = color		// используем setter ооп
		this.fill = color
	}

	setStrokeColor(color) {		// Экшен
		// this.tool.stroke = color		// используем setter ооп
		this.stroke = color
	}

	setLineWidth(width) {		// Экшен
		// this.tool.lineWidth = width		// используем setter ооп
		this.lineWidth = width
	}
}

export default new ToolState()