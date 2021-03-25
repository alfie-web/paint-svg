import React, { useRef, useEffect } from 'react'

import canvasState from '../../../../store/canvasState'

import DrawArea from '../DrawArea'

const Drawing = () => {
   const drawAreaRef = useRef()

   useEffect(() => {
      canvasState.initCanvas(drawAreaRef.current)
   })

   return (
      <div className="Canvas">
         <div
            className="Canvas__element"
            ref={drawAreaRef}
         >
            <DrawArea />
         </div>
      </div>
   )
}

export default Drawing