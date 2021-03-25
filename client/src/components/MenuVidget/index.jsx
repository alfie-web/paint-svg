import { useState } from 'react'
import { observer } from 'mobx-react-lite'

import usersState from '../../store/usersState'
import Dropdown from '../Dropdown'
import IconButton from '../IconButton'

import './MenuVidget.sass'
import { Link } from 'react-router-dom'

const MenuVidget = () => {
   const [isVisible, setIsVisible] = useState(false)

   return usersState.user ? (
      <div className="MenuVidget">
         <IconButton
            className="MenuVidget__btn"
            onClick={() => setIsVisible(!isVisible)}
            title="Меню"
            icon={
               <svg
                  width="23"
                  height="22"
                  viewBox="0 0 23 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
               >
                  <path d="M0 1C0 0.447715 0.447715 0 1 0H22C22.5523 0 23 0.447715 23 1C23 1.55228 22.5523 2 22 2H1C0.447715 2 0 1.55228 0 1Z" />
                  <path d="M0 11C0 10.4477 0.447715 10 1 10H22C22.5523 10 23 10.4477 23 11C23 11.5523 22.5523 12 22 12H1C0.447715 12 0 11.5523 0 11Z" />
                  <path d="M0 21C0 20.4477 0.447715 20 1 20H22C22.5523 20 23 20.4477 23 21C23 21.5523 22.5523 22 22 22H1C0.447715 22 0 21.5523 0 21Z" />
               </svg>
            }
            isActive={isVisible}
         />

         <Dropdown
            isVisible={isVisible}
            className="MenuVidget__dropdown"
            hide={() => setIsVisible(false)}
            allowClass=".MenuVidget"
         >
            <Link className="UserVidget__dropdown-item" to="/canvases">
               Холсты
            </Link>
         </Dropdown>
      </div>
   ) : null
}

export default observer(MenuVidget)
