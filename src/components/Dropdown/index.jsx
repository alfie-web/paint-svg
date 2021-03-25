import { useRef } from 'react'
import classNames from 'classnames'

import './Dropdown.sass'
import useOutsideClick from '../../helpers/useOutsideClick'

const Dropdown = ({
   isVisible,
   children,
   className,
   hide = () => {},
   allowClass = '',
}) => {
   const dropdownRef = useRef(null)

   useOutsideClick(dropdownRef, hide, allowClass)

   return isVisible ? (
      <div ref={dropdownRef} className={classNames('Dropdown', className)}>
         {children}
      </div>
   ) : null
}

export default Dropdown
