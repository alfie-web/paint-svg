// риалтайм рисование
import Tool from './Tool'

import canvasState from '../store/canvasState'
import toolState from '../store/toolState'

// TODO:
// Вынести mouseDownHandler в Tool
// Избавиться от getToolIndexById искать объект по id
// или мейби вообще его целиком сохранять в this.toolId

// А что если сохранять в стейт только при mouseUp
// А в момент move в локальном стейте у компоненты Brush


export default class Brush extends Tool {
   bufferSize = 8
   buffer = []

   mouseDownHandler(e) {
      const curCoords = super.mouseDownHandler(e)
      if (!curCoords) return

      this.appendToBuffer({ x: curCoords.x, y: curCoords.y })

      const tool = {
         type: 'Brush',
         params: [{ x: curCoords.x, y: curCoords.y }],
         settings: {
            stroke: toolState.stroke,
            strokeWidth: toolState.lineWidth
         }
      }

      this.toolId = canvasState.addDrawedTool(tool)
   }

   mouseMoveHandler(e) {
      setTimeout(() => {    // добавляет плавный эффект задержки при рисовании
         super.mouseMoveHandler(e)
      }, 20)
   }

   mouseUpHandler() {
      this.mouseDown = false
      this.buffer = []

      // canvasState.drawToOther(this.toolId)
   }

   getParams(e) {
      const curCoords = this.getCoordsOnSvg(e)  // => { x, y }

      this.appendToBuffer(curCoords)
      const pt = this.getAveragePoint(0)

      return pt
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
