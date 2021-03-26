import Tool from './Tool'

import canvasState from '../store/canvasState'
import toolState from '../store/toolState'

// import { toJS } from 'mobx'

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

      this.toolId = canvasState.addDrawedTool({
         type: 'Brush',
         points: [{ x: curCoords.x, y: curCoords.y }],
         settings: {
            stroke: toolState.stroke,
            strokeWidth: toolState.lineWidth
         }
      })
   }

   mouseMoveHandler(e) {
      if (this.mouseDown) {
         const curCoords = this.getCoordsOnSvg( // => { x, y }
            canvasState.svg,
            e.clientX,
            e.clientY
         )

         const lastToolIndex = canvasState.getToolIndexById(this.toolId)

         this.appendToBuffer(curCoords)
         const pt = this.getAveragePoint(0)

         if (pt && typeof lastToolIndex === 'number') {
            setTimeout(() => {    // добавляет плавный эффект задержки при рисовании
               canvasState.addPoint(lastToolIndex, pt)
            }, 30)
         }
      }
   }

   mouseUpHandler() {
      this.mouseDown = false
      this.buffer = []

      // console.log(toJS(canvasState.canvasData))
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