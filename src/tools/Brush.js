
import Tool from "./Tool"

import canvasState from '../store/canvasState'

export default class Brush extends Tool {
	mouseDownHandler(e) {
		this.mouseDown = true

		const curCoords = this.getCoordsOnSvg(canvasState.svg, e.clientX, e.clientY)

		canvasState.addDrawedTool({
			type: 'Brush',
			points: [{ x: curCoords.x, y: curCoords.y }]
		})
	}

	mouseMoveHandler(e) {
		if (this.mouseDown) {
			const curCoords = this.getCoordsOnSvg(canvasState.svg, e.clientX, e.clientY)
			const lastTool = canvasState.canvasData.length - 1

			canvasState.addPoint(lastTool, { x: curCoords.x, y: curCoords.y})
		}
	}


	// static draw({ x, y, ctx, strokeStyle, lineWidth }) {

	// }
}















// Более понятное получение координат
// import Tool from "./Tool"

// import canvasState from '../store/canvasState'

// export default class Brush extends Tool {
// 	mouseDownHandler(e) {
// 		this.mouseDown = true
		
//       const point = this.relativeCoordinatesForEvent(e)

// 		canvasState.addDrawedTool({
// 			type: 'Brush',
// 			points: [point]
// 		})
// 	}

// 	mouseMoveHandler(e) {
// 		if (this.mouseDown) {
// 			const point = this.relativeCoordinatesForEvent(e)
// 			const lastTool = canvasState.canvasData.length - 1

// 			canvasState.addPoint(lastTool, point)
// 		}
// 	}


// 	// static draw({ x, y, ctx, strokeStyle, lineWidth }) {

// 	// }

// 	relativeCoordinatesForEvent(mouseEvent) {
//       const boundingRect = this.canvas.getBoundingClientRect()
//       return {
//          x: mouseEvent.clientX - boundingRect.left,
//          y: mouseEvent.clientY - boundingRect.top,
//       }
//    }
// }
