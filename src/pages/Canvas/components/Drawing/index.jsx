import React, { useState, useRef, useEffect } from 'react'
import Immutable from 'immutable'

import DrawArea from '../DrawArea'

const Drawing = () => {
   const [state, setState] = useState({
      lines: new Immutable.List(),
      isDrawing: false
   })

   const drawAreaRef = useRef()


   useEffect(() => {
      document.addEventListener('mouseup', handleMouseUp)

      return () => document.removeEventListener('mouseup', handleMouseUp)
   })

   const handleMouseDown = (mouseEvent) => {
      if (mouseEvent.button !== 0) {
         return
      }

      const point = relativeCoordinatesForEvent(mouseEvent)

      setState((prevState) => ({
         lines: prevState.lines.push(new Immutable.List([point])),
         isDrawing: true,
      }))
   }

   const handleMouseMove = (mouseEvent) => {
      if (!state.isDrawing) {
         return
      }

      const point = relativeCoordinatesForEvent(mouseEvent)

      setState((prevState) => ({
         ...state,
         lines: prevState.lines.updateIn([prevState.lines.size - 1], (line) =>
            line.push(point)
         ),
      }))
   }

   const handleMouseUp = () => {
      setState({ ...state, isDrawing: false })
   }

   const relativeCoordinatesForEvent = (mouseEvent) => {
      const boundingRect = drawAreaRef.current.getBoundingClientRect()
      return new Immutable.Map({
         x: mouseEvent.clientX - boundingRect.left,
         y: mouseEvent.clientY - boundingRect.top,
      })
   }

   return (
      <div
         className="drawArea"
         ref={drawAreaRef}
         onMouseDown={handleMouseDown}
         onMouseMove={handleMouseMove}
      >
         <DrawArea lines={state.lines} />
      </div>
   )
}


export default Drawing



