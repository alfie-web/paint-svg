import classNames from 'classnames'

import './IconButton.sass'

const IconButton = ({ className, onClick, title, isActive, icon, disabled }) => {
   return (
      <button
         className={classNames('IconButton', className, { 
            active: isActive,
            disabled: disabled
         })}
         onClick={onClick}
         title={title}
         disabled={disabled}
      >
         {icon}
      </button>
   )
}

export default IconButton
