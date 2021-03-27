import React from 'react'
import { observer } from 'mobx-react-lite'
import { toJS } from 'mobx'

const Rect = ({ tool, className }) => {
   const { x, y, w, h } = tool.params

   return (
      <rect
      className={className}
         x={x}
         y={y}
         width={w}
         height={h}
         {...toJS(tool.settings)}
      />
   )
}

export default observer(Rect)
