// import React from 'react'
// import { observer } from 'mobx-react-lite'
// import { toJS } from 'mobx'

// const Brush = ({ tool }) => {
// 	const pathData =
//       'M ' +
//       tool.points
//          .map((p) => {
//             console.log(toJS(p))
//             if (Array.isArray(toJS(p))) {
//                return p.map(pt => ` L${pt.x} ${pt.y}`).join('')
//             }
            
//             return ` L${p.x} ${p.y}`
//          }).join('')
//          // .join(' L ')

//    // const pathData =
//    //    'M ' +
//    //    tool.points
//    //       .map((p) => {
//    //          return `${p.x} ${p.y}`
//    //       })
//    //       .join(' L ')

//    return <path className="path" d={pathData} />
// }

// export default observer(Brush)









import React from 'react'
import { observer } from 'mobx-react-lite'

const Brush = ({ tool }) => {
	const pathData =
      'M ' +
      tool.points
         .map((p) => {
            return `${p.x} ${p.y}`
         })
         .join(' L ')

   return <path className="path" d={pathData} />
}

export default observer(Brush)







// С immutable.js
// import React from 'react'

// const Line = ({ line }) => {
// 	const pathData =
//       'M ' +
//       line
//          .map((p) => {
//             return `${p.get('x')} ${p.get('y')}`
//          })
//          .join(' L ')

//    return <path className="path" d={pathData} />
// }

// export default Line