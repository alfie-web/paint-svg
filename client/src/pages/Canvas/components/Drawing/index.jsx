import React, { useRef, useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import canvasState from '../../../../store/canvasState'

import DrawArea from '../DrawArea'
import TextInput from '../TextInput'
import Preloader from '../../../../components/Preloader'

const Drawing = () => {
   const drawAreaRef = useRef()

   useEffect(() => {
      canvasState.initCanvas(drawAreaRef.current)
   }, [])

   return (
      <>
      <div className="Canvas">
         { canvasState.editedTextTool && <TextInput /> }

         <div
            className="Canvas__element"
            ref={drawAreaRef}
         >
            <DrawArea />
         </div>
      </div>
      {
         canvasState.isFetching && 
         <div className="Canvas__overlay">
            <Preloader />
         </div>
      }
      </>
   )
}

export default observer(Drawing)
// export default Drawing