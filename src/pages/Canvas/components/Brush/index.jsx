import React from 'react'
import { observer } from 'mobx-react-lite'
import { toJS } from 'mobx'

const Brush = ({ tool }) => {
	const pathData =
      'M ' +
      tool.points
         .map((p) => {
            return `${p.x} ${p.y}`
         })
         .join(' L ')

   return <path 
      className="path" 
      d={pathData} 
      style={toJS(tool.settings)}
   />
}

export default observer(Brush)