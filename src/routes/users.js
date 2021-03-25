const { Router } = require('express')

const UserController = require('../controllers/User')
const userValidations = require('../helpers/validation/newUser')
const loginValidations = require('../helpers/validation/login')

const checkAuth = require('../middlewares/checkAuth')

const userController = new UserController()
const routes = new Router()

routes.get('/getMe', checkAuth, userController.getMe)
routes.post('/login', loginValidations, userController.login)
routes.post('/create', userValidations, userController.create)
routes.post('/refresh-tokens', userController.refreshTokens)
routes.delete('/remove-token', checkAuth, userController.removeToken)

module.exports = routes
