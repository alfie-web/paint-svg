import React from 'react'
import { observer } from 'mobx-react-lite'
import { toJS } from 'mobx'

// import canvasState from '../../../../store/canvasState'

const Brush = ({ tool, className }) => {
   // console.log(toJS(tool))

	const pathData =
      'M ' +
      tool.points
         .map((p) => {
            return `${p.x} ${p.y}`
         })
         .join(' L ')

   return <path 
      // вынести в родительский компонент
      className={`path ${className}`}
      d={pathData}
      {...toJS(tool.settings)}
      fill="none"
   />
}

export default observer(Brush)