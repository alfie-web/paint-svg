import React from 'react'

import ToolBar from './components/ToolBar'
import Drawing from './components/Drawing'

import './Canvas.sass'

const CanvasPage = () => {
	return (
		<div className="Page CanvasPage">
			<ToolBar />
			<Drawing />
		</div>
	)
}

export default CanvasPage
