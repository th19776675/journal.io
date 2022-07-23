const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const defaultCover = require('../utils/defaultCover');


const journalSchema = new Schema(
  {
    authorName: {
      type: String,
      required: true,
    },
    journalName: {
      type: String,
      max_length: 20,
      required: true,
    },
    desc: {
      type: String
    },
    pages: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Page',
      }
    ],
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
    isDaily: {
      type: Boolean,
      default: false,
    },
    nextEditable: {
      type: Date,
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
    coverImage: {
      type: String,
      default: defaultCover(this.journalName, this.authorName)
    },
    template: {
      type: Schema.Types.ObjectId,
      ref: 'Template',
      // default: randomTemplate(),
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