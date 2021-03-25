import { makeAutoObservable } from 'mobx'
import usersAPI from '../api/users'
import api from '../api'
import canvasesState from './canvasesState'

class UsersState {
   user = null
   isAuth = false
   isFetching = false

   constructor() {
      makeAutoObservable(this)
   }

   getMe = () => {
      return usersAPI
         .getMe()
         .then(({ data }) => {
            this.isAuth = true
            this.user = data.data

            window.flash('Вы успешно авторизованы!', 'success')
         })
         .catch((e) => {
            console.log('Самсинг вент ронг', e)
         })
   }

   login = async (formData) => {
      this.isFetching = true
      try {
         const { data } = await usersAPI.login(formData)

         console.log('data', data)
         localStorage.setItem('ATE', JSON.stringify(data.data.exp))

         api.defaults.headers.common['token'] = data.data.accessToken

         await this.getMe()
      } catch (e) {
         window.flash(e.response.data.message, 'error')
      } finally {
         this.isFetching = false
      }
   }

   logout = async () => {
      await usersAPI.removeToken()

      this.user = null
      this.isAuth = false
      canvasesState.items = null

      localStorage.removeItem('ATE')
      api.defaults.headers.common['token'] = ''
   }
}

export default new UsersState()
