import React from 'react'
import { observer } from 'mobx-react-lite'
import { toJS } from 'mobx'

const Brush = ({ tool, className }) => {
	const pathData =
      'M ' +
      tool.points
         .map((p) => {
            return `${p.x} ${p.y}`
         })
         .join(' L ')

   return <path 
      className={className}
      d={pathData}
      {...toJS(tool.settings)}
      fill="none"
   />
}

export default observer(Brush)