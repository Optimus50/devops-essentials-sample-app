const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//create Todo Schema
const TodoSchema = new Schema({
   username: {
      type: Schema.Types.ObjectId,
      ref: 'users'

   },
   todo: {
      type: String
   },
   isDone: {
      type: Boolean
   },
   hasAttachment: {
      type: Boolean
   },
   date: {
      type: Date,
      default: Date.now
   }
});

module.exports = Todo = mongoose.model('todo', TodoSchema);