import api from './'

const canvasAPI = {
   getAll: () => api.get('/canvas'),
   getById: (canvasId) => api.get(`/canvas/${canvasId}`),
   getConnectedUsers: (usersStr) =>
      api.get(`/canvas/connected?users=${usersStr}`),
}

export default canvasAPI
