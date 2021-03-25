import Tool from './Tool'

import canvasState from '../store/canvasState'
import toolState from '../store/toolState'

// TODO:
// переименовать в Pen
// порефакторить метод getCoordsOnSvg - чтобы принимал только event

export default class Brush extends Tool {
   bufferSize = 8
   buffer = []

   mouseDownHandler(e) {
      if (e.button !== 0) return
      this.mouseDown = true

      const curCoords = this.getCoordsOnSvg(
         canvasState.svg,
         e.clientX,
         e.clientY
      )

      this.appendToBuffer({ x: curCoords.x, y: curCoords.y })

      canvasState.addDrawedTool({
         type: 'Brush',
         points: [{ x: curCoords.x, y: curCoords.y }],
         styles: {
            stroke: toolState.stroke,
            strokeWidth: toolState.lineWidth
         }
      })
   }

   mouseMoveHandler(e) {
      if (this.mouseDown) {
         const curCoords = this.getCoordsOnSvg(
            // => { x, y }
            canvasState.svg,
            e.clientX,
            e.clientY
         )
         const lastTool = canvasState.canvasData.length - 1

         this.appendToBuffer(curCoords)
         const pt = this.getAveragePoint(0)

         if (pt) {
            setTimeout(() => {
               // добавляет плавный эффект задержки при рисовании
               canvasState.addPoint(lastTool, pt)
            }, 100)
         }
      }
   }

   mouseUpHandler() {
      this.mouseDown = false
      this.buffer = []

      // canvasState.canvasSockets.stopDrawing()
   }

   appendToBuffer = function (pt) {
      this.buffer.push(pt)
      while (this.buffer.length > this.bufferSize) {
         this.buffer.shift()
      }
   }

   getAveragePoint = function (offset) {
      var len = this.buffer.length
      if (len % 2 === 1 || len >= this.bufferSize) {
         var totalX = 0
         var totalY = 0
         var pt, i
         var count = 0
         for (i = offset; i < len; i++) {
            count++
            pt = this.buffer[i]
            totalX += pt.x
            totalY += pt.y
         }
         return {
            x: totalX / count,
            y: totalY / count,
         }
      }
      return null
   }
}

// import Tool from "./Tool"

// import canvasState from '../store/canvasState'

// // TODO: переименовать в Pen
// export default class Brush extends Tool {
// 	mouseDownHandler(e) {
// 		this.mouseDown = true

// 		const curCoords = this.getCoordsOnSvg(canvasState.svg, e.clientX, e.clientY)

// 		canvasState.addDrawedTool({
// 			type: 'Brush',
// 			points: [{ x: curCoords.x, y: curCoords.y }]
// 		})
// 	}

// 	mouseMoveHandler(e) {
// 		if (this.mouseDown) {
// 			const curCoords = this.getCoordsOnSvg(canvasState.svg, e.clientX, e.clientY)
// 			const lastTool = canvasState.canvasData.length - 1

// 			// setTimeout(() => {	// добавит прикольный эффект задержки
// 				canvasState.addPoint(lastTool, { x: curCoords.x, y: curCoords.y})
// 			// }, 100)
// 		}
// 	}

// 	// static draw({ x, y, ctx, strokeStyle, lineWidth }) {

// 	// }
// }

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
