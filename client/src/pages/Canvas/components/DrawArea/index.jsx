import { observer } from 'mobx-react-lite'
// import classNames from 'classnames'
import canvasState from '../../../../store/canvasState'

import Brush from '../Brush'
import Rect from '../Rect'
import Ellipse from '../Ellipse'
import Line from '../Line'
import Text from '../Text'


const ToolComponents = {
   Brush,
   Rect,
   Ellipse,
   Line,
   Text
}

const DrawArea = () => {
   return (
      <>
      <svg
         className="Canvas__drawArea"
         xmlns="http://www.w3.org/2000/svg"
         xmlSpace="preserve"
      >
         {canvasState.canvasData.map((tool, index) => {
            if (tool) {
               const Component = ToolComponents[tool.type]

               return (
                  <Component
                     key={tool.id}
                     tool={tool}
                     className={`${tool.type}`}
                     // className={classNames(`${tool.type}`, {
                     //    'animate': canvasState.animateId && canvasState.animateId === tool.id
                     // })}
                  />
               )
            }
            return null
         })}
      </svg>
      </>
   )
}

export default observer(DrawArea)
