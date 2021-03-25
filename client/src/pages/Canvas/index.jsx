import React from 'react'

import ToolBar from './components/ToolBar'
import SettingsBar from './components/SettingsBar'
// import Drawing from './components/Drawing'
import CanvasInit from './containers/CanvasInit'

import './Canvas.sass'

const CanvasPage = () => {
	return (
		<div className="Page CanvasPage">
			<ToolBar />
			<SettingsBar />
			<CanvasInit />
		</div>
	)
}

export default CanvasPage
