import api, { authInstance } from '../api'

const usersAPI = {
   getMe: () => api.get('/users/getMe'),
   login: (formData) => authInstance.post('/users/login', formData),
   refreshTokens: () => authInstance.post('/users/refresh-tokens'),
   removeToken: () => api.delete('/users/remove-token'),
}

export default usersAPI
