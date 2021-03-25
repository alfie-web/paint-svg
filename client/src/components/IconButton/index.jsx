import classNames from 'classnames'

import './IconButton.sass'

const IconButton = ({ className, onClick, title, isActive, icon }) => {
   return (
      <button
         className={classNames('IconButton', className, { active: isActive })}
         onClick={onClick}
         title={title}
      >
         {icon}
      </button>
   )
}

export default IconButton
