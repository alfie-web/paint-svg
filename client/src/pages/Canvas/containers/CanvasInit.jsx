import { useEffect } from 'react'

import canvasState from '../../../store/canvasState'
import { useHistory, useParams } from 'react-router-dom'

// import Canvas from '../components/Canvas'
import Drawing from '../components/Drawing'

const CanvasInit = () => {
   const { id } = useParams()
   const history = useHistory()

   

   useEffect(() => {
      if (!id) return history.push('/canvases')

      const redirectIfError = () => {
         history.push('/canvases')
      }

      canvasState.fetchState(id, redirectIfError)

      return () => {
         canvasState.canvasSockets.leaveRoom(id)
      }
   }, [id, history])

   return <Drawing />
   // return <Canvas />
}

export default CanvasInit
