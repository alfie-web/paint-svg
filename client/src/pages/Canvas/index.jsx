import { useRef } from 'react'

import useFullScreen from '../../helpers/useFullScreen'
import ToolBar from './components/ToolBar'
import SettingsBar from './components/SettingsBar'
// import Drawing from './components/Drawing'
import CanvasInit from './containers/CanvasInit'

import './Canvas.sass'

const CanvasPage = () => {
   const pageRef = useRef()
   const { isFullscreen, handleFullscreen } = useFullScreen(pageRef)

   return (
      <div className="Page CanvasPage" ref={pageRef}>
         <ToolBar 
				isFullscreen={isFullscreen}
            handleFullscreen={handleFullscreen}
			/>
         <SettingsBar />
         <CanvasInit />
      </div>
   )
}

export default CanvasPage
