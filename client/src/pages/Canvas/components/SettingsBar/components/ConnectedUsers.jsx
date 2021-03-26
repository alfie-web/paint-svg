import { observer } from 'mobx-react-lite'

import canvasState from '../../../../../store/canvasState'
import Avatar from '../../../../../components/Avatar'

const ConnectedUsers = () => {
   return canvasState.users.length ? (
      <div className="SettingBar__users">
         {canvasState.users.map((u) => (
            <Avatar
               userName={u.userName}
               key={u.userId}
               min
               url={u.userAvatar}
            />
         ))}
      </div>
   ) : null
}

export default observer(ConnectedUsers)
