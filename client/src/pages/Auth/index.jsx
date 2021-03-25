import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import usersState from '../../store/usersState'
import LoginForm from './components/LoginForm'

import './Auth.sass'

const AuthPage = () => {
   if (usersState.isAuth) return <Redirect to="/canvases" />

   return (
      <div className="Page Auth">
         <div className="container">
            <Switch>
               <Route exact path={['/', '/login']} component={LoginForm} />
            </Switch>

            <ul className="Auth__info">
               <li>Инструкция:</li>
               <li>
                  1) Авторизуйтесь как Пользователь 1 (user1@mail.ru, 123qweQWE)
               </li>
               <li>
                  2) Откройте эту же страницу в новой вкладке браузера в режиме
                  инкогнито (Ctrl + Shift + n)
               </li>
               <li>
                  3) Авторизуйтесь как Пользователь 2 (user2@mail.ru, 123qweQWE)
               </li>
               <li>4) Выберите Test canvas у каждого пользователя</li>
            </ul>
         </div>
      </div>
   )
}

export default observer(AuthPage)
