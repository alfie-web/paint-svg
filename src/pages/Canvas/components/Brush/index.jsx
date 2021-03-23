import React from 'react'

const Brush = ({ line }) => {
	const pathData =
      'M ' +
      line.points
         .map((p) => {
            return `${p.x} ${p.y}`
         })
         .join(' L ')

   return <path className="path" d={pathData} />
}

export default Brush








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