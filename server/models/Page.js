const { Schema, model } = require('mongoose');

const pageSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    isPlain: {
      type: Boolean,
      default: false,
    },
  }
)

const Page = model('Page', pageSchema);

module.exports = Page