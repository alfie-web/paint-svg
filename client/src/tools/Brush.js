import Tool from './Tool'

import canvasState from '../store/canvasState'
import toolState from '../store/toolState'

// TODO:
// Вынести mouseDownHandler в Tool
// Избавиться от getToolIndexById искать объект по id
// или мейби вообще его целиком сохранять в this.toolId


export default class Brush extends Tool {
   bufferSize = 8
   buffer = []

   mouseDownHandler(e) {
      const curCoords = super.mouseDownHandler(e)
      if (!curCoords) return
  
      const tool = {
         type: 'Brush',
         params: `M ${curCoords.x} ${curCoords.y} L ${curCoords.x + 0.1} ${curCoords.y + 0.1} `,
         // params: `M ${curCoords.x} ${curCoords.y} `,
         settings: {
            stroke: toolState.stroke,
            strokeWidth: toolState.lineWidth
         }
      }
      
      this.toolId = canvasState.addDrawedTool(tool)
      
      this.appendToBuffer({ x: curCoords.x, y: curCoords.y })
   }

   mouseUpHandler() {
      this.mouseDown = false
      this.buffer = []
   }

   getParams(e) {
      const curCoords = this.getCoordsOnSvg(e)  // => { x, y }

      this.appendToBuffer(curCoords)
      const pt = this.getAveragePoint(0)

      if (!pt || !pt.x || !pt.y) return
      return `L ${pt.x} ${pt.y} `
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
