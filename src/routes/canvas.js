const { Router } = require('express')

const CanvasController = require('../controllers/Canvas')

const checkAuth = require('../middlewares/checkAuth')

const canvasController = new CanvasController()
const routes = new Router()

routes.get('/', checkAuth, canvasController.getAll)
routes.get('/:id', checkAuth, canvasController.getById)
routes.post('/new', checkAuth, canvasController.create)

module.exports = routes
