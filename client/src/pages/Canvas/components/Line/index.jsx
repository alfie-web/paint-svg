import React from 'react'
import { observer } from 'mobx-react-lite'
import { toJS } from 'mobx'

const Line = ({ tool, className }) => {
   const { x1, y1, x2, y2 } = tool.params

   return (
      <line
         className={`line ${className}`}
         x1={x1}
         y1={y1}
         x2={x2}
         y2={y2}
         // style={toJS(tool.settings)}
         {...toJS(tool.settings)}
         fill="none"
      />
   )
}

export default observer(Line)
