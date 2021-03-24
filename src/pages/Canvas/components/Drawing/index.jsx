import React, { useState, useRef, useEffect } from 'react'

import canvasState from '../../../../store/canvasState'

import DrawArea from '../DrawArea'

const Drawing = () => {
   const [state, setState] = useState({
      tools: [],
      isDrawing: false
   })

   const drawAreaRef = useRef()

   useEffect(() => {
      canvasState.initCanvas(drawAreaRef.current)

      // document.addEventListener('mouseup', handleMouseUp)

      // return () => document.removeEventListener('mouseup', handleMouseUp)
   })


   // const handleMouseDown = (mouseEvent) => {
   //    if (mouseEvent.button !== 0) {
   //       return
   //    }

   //    const point = relativeCoordinatesForEvent(mouseEvent)

   //    setState((prevState) => ({
   //       tools: [...prevState.tools, {
   //          type: 'Brush',
   //          points: [point]
   //       }],   // ДОБАВЛЯЕМ НОВУЮ ТОЧКУ
   //       isDrawing: true,
   //    }))
   // }

   // const handleMouseMove = (mouseEvent) => {
   //    if (!state.isDrawing) {
   //       return
   //    }

   //    const point = relativeCoordinatesForEvent(mouseEvent)

   //    setState((prevState) => ({
   //       ...prevState,
   //       tools: prevState.tools.map((l, i) => {
   //          if (i === prevState.tools.length - 1) {
   //             return {
   //                ...l,
   //                points: [
   //                   ...l.points,
   //                   point
   //                ]
   //             }
   //          } 
   //          return l
   //       }),
   //    }))
   // }

   // const handleMouseUp = () => {
   //    setState({ ...state, isDrawing: false })
   // }

   // const relativeCoordinatesForEvent = (mouseEvent) => {
   //    const boundingRect = drawAreaRef.current.getBoundingClientRect()
   //    return {
   //       x: mouseEvent.clientX - boundingRect.left,
   //       y: mouseEvent.clientY - boundingRect.top,
   //    }
   // }

   return (
      <div
         className="drawArea"
         ref={drawAreaRef}
         // onMouseDown={handleMouseDown}
         // onMouseMove={handleMouseMove}
      >
         <DrawArea 
            // tools={state.tools} 
         />
      </div>
   )
}


export default Drawing





















// import React, { useState, useRef, useEffect } from 'react'

// import DrawArea from '../DrawArea'

// const Drawing = () => {
//    const [state, setState] = useState({
//       tools: [],
//       isDrawing: false
//    })

//    const drawAreaRef = useRef()


//    useEffect(() => {
//       document.addEventListener('mouseup', handleMouseUp)

//       return () => document.removeEventListener('mouseup', handleMouseUp)
//    })


//    const handleMouseDown = (mouseEvent) => {
//       if (mouseEvent.button !== 0) {
//          return
//       }

//       const point = relativeCoordinatesForEvent(mouseEvent)

//       setState((prevState) => ({
//          tools: [...prevState.tools, {
//             type: 'Brush',
//             points: [point]
//          }],   // ДОБАВЛЯЕМ НОВУЮ ТОЧКУ
//          isDrawing: true,
//       }))
//    }

//    const handleMouseMove = (mouseEvent) => {
//       if (!state.isDrawing) {
//          return
//       }

//       const point = relativeCoordinatesForEvent(mouseEvent)

//       setState((prevState) => ({
//          ...prevState,
//          tools: prevState.tools.map((l, i) => {
//             if (i === prevState.tools.length - 1) {
//                return {
//                   ...l,
//                   points: [
//                      ...l.points,
//                      point
//                   ]
//                }
//             } 
//             return l
//          }),
//       }))
//    }

//    const handleMouseUp = () => {
//       setState({ ...state, isDrawing: false })
//    }

//    const relativeCoordinatesForEvent = (mouseEvent) => {
//       const boundingRect = drawAreaRef.current.getBoundingClientRect()
//       return {
//          x: mouseEvent.clientX - boundingRect.left,
//          y: mouseEvent.clientY - boundingRect.top,
//       }
//    }

//    return (
//       <div
//          className="drawArea"
//          ref={drawAreaRef}
//          onMouseDown={handleMouseDown}
//          onMouseMove={handleMouseMove}
//       >
//          <DrawArea tools={state.tools} />
//       </div>
//    )
// }


// export default Drawing























// // С immutable.js
// import React, { useState, useRef, useEffect } from 'react'
// import Immutable from 'immutable'

// import DrawArea from '../DrawArea'

// const Drawing = () => {
//    const [state, setState] = useState({
//       lines: new Immutable.List(),
//       isDrawing: false
//    })

//    const drawAreaRef = useRef()


//    useEffect(() => {
//       document.addEventListener('mouseup', handleMouseUp)

//       return () => document.removeEventListener('mouseup', handleMouseUp)
//    })

//    const handleMouseDown = (mouseEvent) => {
//       if (mouseEvent.button !== 0) {
//          return
//       }

//       const point = relativeCoordinatesForEvent(mouseEvent)

//       setState((prevState) => ({
//          lines: prevState.lines.push(new Immutable.List([point])),   // ДОБАВЛЯЕМ НОВУЮ ТОЧКУ
//          isDrawing: true,
//       }))
//    }

//    const handleMouseMove = (mouseEvent) => {
//       if (!state.isDrawing) {
//          return
//       }

//       const point = relativeCoordinatesForEvent(mouseEvent)

//       setState((prevState) => ({
//          ...state,
//          lines: prevState.lines.updateIn([prevState.lines.size - 1], (line) => {  // ОБНОВЛЯЕМ ПОСЛЕДНЮЮ ТОЧКУ В СПИСКЕ
//             console.log(line)
//             return line.push(point)
//          }),
//       }))
//    }

//    const handleMouseUp = () => {
//       setState({ ...state, isDrawing: false })
//    }

//    const relativeCoordinatesForEvent = (mouseEvent) => {
//       const boundingRect = drawAreaRef.current.getBoundingClientRect()
//       return new Immutable.Map({
//          x: mouseEvent.clientX - boundingRect.left,
//          y: mouseEvent.clientY - boundingRect.top,
//       })
//    }

//    return (
//       <div
//          className="drawArea"
//          ref={drawAreaRef}
//          onMouseDown={handleMouseDown}
//          onMouseMove={handleMouseMove}
//       >
//          <DrawArea lines={state.lines} />
//       </div>
//    )
// }


// export default Drawing



