import React from 'react'
import CanvasItem from '../../../components/CanvasItem'

const CanvasList = ({ items }) => {
   return (
      <div className="Canvases__list">
         {items.map((canvas) => (
            <CanvasItem
               key={canvas._id}
               _id={canvas._id}
               title={canvas.title}
               content={canvas.content}
               usersCount={canvas.users.length}
            />
         ))}
      </div>
   )
}

export default CanvasList
