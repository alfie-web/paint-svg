
// import Tool from "./Tool"

// import canvasState from '../store/canvasState'
// import toolState from "../store/toolState"

// export default class Rect extends Tool {
// 	start = null

// 	mouseDownHandler(e) {
// 		if (e.button !== 0) return
// 		this.mouseDown = true
		
// 		this.start = this.getCoordsOnSvg(canvasState.svg, e.clientX, e.clientY)

// 		const newTool = {
// 			type: 'Rect',
// 			params: {},
// 			settings: {
//             stroke: toolState.stroke,
//             strokeWidth: toolState.lineWidth,
// 				fill: toolState.fill
//          }
// 		}

// 		this.toolId = canvasState.addDrawedTool(newTool)
// 	}

// 	mouseMoveHandler(e) {
// 		if (this.mouseDown) {
// 			const lastToolIndex = canvasState.getToolIndexById(this.toolId)
// 			const rectParams = this.drawRect(e)

// 			if (typeof lastToolIndex === 'number') {
// 				canvasState.draw(lastToolIndex, rectParams)
// 			}
// 		}
// 	}


// 	// static draw({ x, y, ctx, strokeStyle, lineWidth }) {

// 	// }

// 	drawRect = (e) => {
// 		let curCoords = this.getCoordsOnSvg(canvasState.svg, e.clientX, e.clientY)
//       let w = Math.abs(curCoords.x - this.start.x)
//       let h = Math.abs(curCoords.y - this.start.y)

//       if (curCoords.x > this.start.x) {
//          curCoords.x = this.start.x
//       }

//       if (curCoords.y > this.start.y) {
//          curCoords.y = this.start.y
//       }

// 		return {
// 			x: curCoords.x,
// 			y: curCoords.y,
// 			w,
// 			h,
// 		}
// 	}
// }
























// риалтайм рисование
import Tool from "./Tool"

import canvasState from '../store/canvasState'
import toolState from "../store/toolState"

export default class Rect extends Tool {
	start = null

	mouseDownHandler(e) {
		if (e.button !== 0) return
		this.mouseDown = true
		
		this.start = this.getCoordsOnSvg(canvasState.svg, e.clientX, e.clientY)

		this.toolId = canvasState.addDrawedTool({
			type: 'Rect',
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
			const rectParams = this.drawRect(e)

			if (typeof lastToolIndex === 'number') {
				canvasState.draw(lastToolIndex, rectParams)
				canvasState.drawToOther(lastToolIndex, rectParams)
			}
		}
	}


	// static draw({ x, y, ctx, strokeStyle, lineWidth }) {

	// }

	drawRect = (e) => {
		let curCoords = this.getCoordsOnSvg(canvasState.svg, e.clientX, e.clientY)
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
