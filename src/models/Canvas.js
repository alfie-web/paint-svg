const { models, model, Schema, SchemaTypes } = require('mongoose')

const schema = new Schema(
   {
      title: {
         type: String,
         required: true,
         default: 'Новый холст',
      },
      content: {
         type: String,
         default: null,
      },
      author: {
         type: SchemaTypes.ObjectId,
         ref: 'User',
      },
      width: {
         type: Number,
         default: 600,
      },
      height: {
         type: Number,
         default: 400,
      },
      users: [
         {
            type: SchemaTypes.ObjectId,
            ref: 'User',
         },
      ],
   },
   {
      timestamps: true,
   }
)

module.exports = models.Canvas || model('Canvas', schema)
