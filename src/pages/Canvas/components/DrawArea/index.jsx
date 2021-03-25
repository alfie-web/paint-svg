import React from 'react'
import { observer } from 'mobx-react-lite'

import canvasState from '../../../../store/canvasState'

import Brush from '../Brush'
import Rect from '../Rect'
import Ellipse from '../Ellipse'
import Line from '../Line'

const ToolComponents = {
	Brush,
	Rect,
	Ellipse,
	Line
}

const DrawArea = () => {
	return (
		<svg className="Canvas__drawArea">
         {canvasState.canvasData.map((tool, index) => {
				const Component = ToolComponents[tool.type]

				return (
					<Component key={index} tool={tool} />
				)
			})}
      </svg>
	)
}

export default observer(DrawArea)