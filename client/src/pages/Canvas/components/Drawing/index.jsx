import React, { useRef, useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import canvasState from '../../../../store/canvasState'

import DrawArea from '../DrawArea'
import TextInput from '../TextInput'
import Preloader from '../../../../components/Preloader'
import classNames from 'classnames'

const Drawing = () => {
   const drawAreaRef = useRef()

   useEffect(() => {
      canvasState.initCanvas(drawAreaRef.current)
      // !canvasState.isFetching && canvasState.initCanvas(drawAreaRef.current)
   }, [])

   return (
      <>
         <div className="Canvas">
            { canvasState.editedTextTool && <TextInput /> }

            <div
               className={classNames('Canvas__element', {
                  'Canvas__element--loading': canvasState.isFetching || !canvasState.canvas
               })}
               ref={drawAreaRef}
            >
               <DrawArea />
            </div>
         </div>
      {
         (canvasState.isFetching || !canvasState.canvas) && 
         <div className="Canvas__overlay">
            <Preloader />
         </div>
      }
      </>
   )
}

export default observer(Drawing)