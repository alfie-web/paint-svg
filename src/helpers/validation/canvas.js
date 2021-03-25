const { check } = require('express-validator/src')

module.exports = [
   check('width').isFloat({ min: 400, max: 2000 }),
   check('height').isFloat({ min: 400, max: 2000 }),
]
