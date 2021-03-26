import axios from 'axios'
import usersAPI from './users'

// const baseURL = 'https://collaborative-paint-app.herokuapp.com/api'
const baseURL = 'http://localhost:8989/api'

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
         if (Date.now() >= ATExpiresIn * 1000) {
            try {
               const { data } = await usersAPI.refreshTokens()

               if (data.status === 'success') {
                  localStorage.setItem('ATE', JSON.stringify(data.data.exp))

                  config.headers.token = data.data.accessToken || ''
               }
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