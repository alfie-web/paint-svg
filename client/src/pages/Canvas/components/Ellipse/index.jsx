import React from 'react'
import { observer } from 'mobx-react-lite'
import { toJS } from 'mobx'

const Ellipse = ({ tool, className }) => {
   const { cx, cy, rx, ry } = tool.params

   return (
      <ellipse
      className={className}
         cx={cx}
         cy={cy}
         rx={rx}
         ry={ry}
         {...toJS(tool.settings)}
      />
   )
}

export default observer(Ellipse)
