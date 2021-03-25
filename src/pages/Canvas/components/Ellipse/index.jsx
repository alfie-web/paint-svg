import React from 'react'
import { observer } from 'mobx-react-lite'
import { toJS } from 'mobx'

const Ellipse = ({ tool }) => {
   const { cx, cy, rx, ry } = tool.params

   return (
      <ellipse
         className="ellipse"
         cx={cx}
         cy={cy}
         rx={rx}
         ry={ry}
         style={toJS(tool.settings)}
      />
   )
}

export default observer(Ellipse)
