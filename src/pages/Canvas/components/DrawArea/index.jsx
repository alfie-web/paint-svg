import React from 'react'

import Brush from '../Brush'
import Rect from '../Rect'

const ToolComponents = {
	Brush,
	Rect
}

const DrawArea = ({ tools }) => {
	return (
		<svg className="drawing">
         {tools.map((tool, index) => {
				const Component = ToolComponents[tool.type]

				return (
					<Component key={index} line={tool} />
				)
			})}
      </svg>
	)
}

export default DrawArea