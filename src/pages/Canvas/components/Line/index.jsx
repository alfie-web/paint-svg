import React from 'react'
import { observer } from 'mobx-react-lite'

const Line = ({ tool }) => {
   const { x1, y1, x2, y2 } = tool.params
   
   // return <line className="line" x1="0" y1="80" x2="100" y2="20" />
   return <line className="line" x1={x1} y1={y1} x2={x2} y2={y2} />
}

export default observer(Line)