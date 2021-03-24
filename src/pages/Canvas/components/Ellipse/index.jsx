import React from 'react'
import { observer } from 'mobx-react-lite'

const Ellipse = ({ tool }) => {
   const { cx, cy, rx, ry } = tool.params
   
   return <ellipse className="ellipse" cx={cx} cy={cy} rx={rx} ry={ry} />
   // return <ellipse className="ellipse" cx = "120" cy = "50" rx = "100" ry = "50" />
}

export default observer(Ellipse)

