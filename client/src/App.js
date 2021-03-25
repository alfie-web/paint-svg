
// import CanvasPage from './pages/Canvas'

// function App() {
//    return <div className="App">
//       <CanvasPage />
//    </div>
// }

// export default App



import { useEffect } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import eventEmitter from './helpers/eventEmitter'

import appState from './store/appState'
import usersState from './store/usersState'
import CanvasesPage from './pages/Canvases'
import CanvasPage from './pages/Canvas'
import AuthPage from './pages/Auth'
import Flash from './components/Flash'
import Preloader from './components/Preloader'

window.flash = (message, type = 'success', position = 'top-right') =>
   eventEmitter.emit('flash', { message, type, position })

const ROUTES = [
   { path: '/', component: AuthPage, auth: 'all' },
   { path: '/canvases', component: CanvasesPage, auth: true },
   { path: ['/canvas', '/canvas/:id'], component: CanvasPage, auth: true },
]

function createRoutes(isAuth) {
   return (
      <Switch>
         {ROUTES.map(
            (route, i) =>
               (route.auth === isAuth || route.auth === 'all') && (
                  <Route
                     key={i}
                     exact
                     path={route.path}
                     component={route.component}
                  />
               )
         )}
         <Redirect from="*" to="/" />
      </Switch>
   )
}

function App() {
   useEffect(() => {
      !appState.initialized && appState.init()
   })

   if (!appState.initialized) return <Preloader />

   return (
      <>
         <Flash />
         <div className="App">{createRoutes(usersState.isAuth)}</div>
      </>
   )
}

export default observer(App)
