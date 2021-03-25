import { makeAutoObservable, action } from 'mobx'

import api from '../api'
import usersAPI from '../api/users'

import usersState from './usersState'

class AppState {
   initialized = false

   constructor() {
      makeAutoObservable(this)
   }

   init = async () => {
      console.log('init')
      try {
         const { data } = await usersAPI.refreshTokens()
         localStorage.setItem('ATE', JSON.stringify(data.data.exp))
         api.defaults.headers.common['token'] = data.data.accessToken
      } catch (e) {}

      const authPromise = usersState.getMe()
      Promise.all([authPromise])
         .then(
            action('init', (error) => {
               this.initialized = true
            })
         )
         .catch(() => {
            console.log('NNNN')
            action('init', (error) => {
               this.initialized = true
            })
         })
   }
}

export default new AppState()
