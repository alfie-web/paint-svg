import React from 'react'

import UserVidget from '../UserVidget'
import './Header.sass'

const Header = () => {
   return (
      <header className="Header">
         <div className="container">
            <UserVidget />
         </div>
      </header>
   )
}

export default Header
