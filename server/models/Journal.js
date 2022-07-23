const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const defaultCover = require('../utils/defaultCover');
const pageSchema = require("./Page")


const journalSchema =  new Schema(
  {
    authorName: {
      type: String,
      required: true,
    },
    journalName: {
      type: String,
      max_length: 50,
      required: true,
    },
    pages: [pageSchema],
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
    isDaily: {
      type: Boolean,
      required: true,
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
    coverImage: {
      type: String,
      default: defaultCover(this.journalName, this.authorName)
    }
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
)

journalSchema.virtual('pageCount').get(function () {
  return this.pages.length;
});

const Journal = model('Journal', journalSchema);

module.exports = Journal;