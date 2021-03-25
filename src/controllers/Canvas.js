const { validationResult } = require('express-validator')
const createError = require('http-errors')

const CanvasModel = require('../models/Canvas')

class CanvasController {
   getAll = async (req, res, next) => {
      const userId = req.user._id

      try {
         const canvases = await CanvasModel.find({ users: userId })

         res.json({
            status: 'success',
            data: canvases,
         })
      } catch (e) {
         return next(createError(500, 'Самсинг вент ронг'))
      }
   }

   getById = async (req, res, next) => {
      const userId = req.user._id
      const canvasId = req.params.id

      try {
         const canvas = await CanvasModel.findOne({
            users: userId,
            _id: canvasId,
         })

         if (!canvas) return next(createError(403, 'У вас недостаточно прав'))

         res.json({
            status: 'success',
            data: canvas,
         })
      } catch (e) {
         return next(createError(500, 'Самсинг вент ронг'))
      }
   }

   // TODO: Сделать ограничение на количество пользователей
   create = async (req, res, next) => {
      const userId = req.user._id
      const postData = {
         title: req.body.title,
         width: req.body.width,
         height: req.body.height,
         author: userId,
         users: req.body.users ? [...req.body.users, userId] : [userId],
      }

      // Валидируем данные
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
         return next(createError(400, 'Некорректные данные'))
      }

      try {
         const newCanvas = new CanvasModel(postData)
         await newCanvas.save()

         res.json({
            status: 'success',
            data: newCanvas,
         })
      } catch (e) {
         return next(createError(500, 'Самсинг вент ронг'))
      }
   }
}

module.exports = CanvasController
