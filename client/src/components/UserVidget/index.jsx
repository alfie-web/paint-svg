import { useState } from 'react'
import { observer } from 'mobx-react-lite'

import usersState from '../../store/usersState'
import Avatar from '../Avatar'
import Dropdown from '../Dropdown'

import './UserVidget.sass'

const UserVidget = () => {
   const [isVisible, setIsVisible] = useState(false)

   return usersState.user ? (
      <div className="UserVidget">
         <div
            className="UserVidget__avatar"
            onClick={() => setIsVisible(!isVisible)}
         >
            <Avatar
               userName={usersState.user.fullname}
               min
               url={usersState.user.avatar}
            />
         </div>

         <Dropdown
            isVisible={isVisible}
            className="UserVidget__dropdown"
            hide={() => setIsVisible(false)}
            allowClass=".UserVidget"
         >
            <div
               className="UserVidget__dropdown-item"
               onClick={usersState.logout}
            >
               Выйти
            </div>
         </Dropdown>
      </div>
   ) : null
}

export default observer(UserVidget)
