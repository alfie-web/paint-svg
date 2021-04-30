
import axios from 'axios'
import usersAPI from './users'

// TODO:
// Видимо придётся сохранять токен в переменной

let baseURL

if (process.env.NODE_ENV !== 'production') {
   baseURL = 'http://localhost:8989/api'
} else {
   baseURL = 'https://collaborative-paint-app.herokuapp.com/api'
}

const axiosConfig = {
   withCredentials: true,
   baseURL: baseURL,
   headers: {
      'X-Requested-With': 'XMLHttpRequest',
   },
}

const instance = axios.create(axiosConfig) // для обычных запросов, в том числе и с accessToken-ом
export const authInstance = axios.create(axiosConfig) // для авторизации и рефреша токенов

instance.interceptors.request.use(
   async function (config) {
      const ATExpiresIn = localStorage.getItem('ATE')

      // console.log('AXIOS_CONFIG', config)
      if (ATExpiresIn) {
         if (Date.now() >= +ATExpiresIn * 1000) {
            try {
               const { data } = await usersAPI.refreshTokens()

               config.headers.token = data.accessToken || ''   // я как понял эта херня сохраняет 1 раз, только для текущего http запроса

            } catch (e) {
               console.log('e', e)
            }
         }
      }

      return config
   },
   function (error) {
      return Promise.reject(error)
   }
)

export default instance
