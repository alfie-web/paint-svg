import React from 'react'
import { observer } from 'mobx-react-lite'

const Rect = ({ tool }) => {
   const { x, y, w, h } = tool.params
   
   return <rect className="rect" x={x} y={y} width={w} height={h} />
}

export default observer(Rect)
