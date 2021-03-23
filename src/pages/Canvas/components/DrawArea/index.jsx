import React from 'react'

import Line from '../Line'

const DrawArea = ({ lines }) => {
	return (
		<svg className="drawing">
         {lines.map((line, index) => (
            <Line key={index} line={line} />
         ))}
      </svg>
	)
}

export default DrawArea