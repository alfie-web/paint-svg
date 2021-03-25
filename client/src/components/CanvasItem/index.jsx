import { Link } from 'react-router-dom'

import emptyImg from '../../assets/images/empty.jpg'

const CanvasItem = ({ _id, title, content, usersCount }) => {
   return (
      <div className="Canvases__item">
         <Link to={`/canvas/${_id}`}>
            <div className="Canvases__item-img">
               <img
                  src={content ? content : emptyImg}
                  alt="canvas"
                  onError={(e) => (e.target.src = emptyImg)}
               />
            </div>
            <h3 className="Canvases__item-title">{title}</h3>
            <span className="Canvases__item-usersCount">
               Участников: {usersCount}
            </span>
         </Link>
      </div>
   )
}

export default CanvasItem
