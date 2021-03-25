import React from 'react'
import { observer } from 'mobx-react-lite'
import { toJS } from 'mobx'

const Rect = ({ tool }) => {
   const { x, y, w, h } = tool.params

   return (
      <rect
         className="rect"
         x={x}
         y={y}
         width={w}
         height={h}
         {...toJS(tool.settings)}
         // style={toJS(tool.settings)}
      />
   )
}

export default observer(Rect)
