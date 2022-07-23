const { Schema, model } = require('mongoose');

const pageSchema = new Schema(
  {
    pageCount: {
      type: Number,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  }
)

module.exports = pageSchema