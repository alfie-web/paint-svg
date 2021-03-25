import React from 'react'

import ToolBar from './components/ToolBar'
import SettingsBar from './components/SettingsBar'
import Drawing from './components/Drawing'

import './Canvas.sass'

const CanvasPage = () => {
	return (
		<div className="Page CanvasPage">
			<ToolBar />
			<SettingsBar />
			<Drawing />
		</div>
	)
}

export default CanvasPage
