const mongoose = require("mongoose");
const { Schema } = mongoose;

const NotesSchema = new Schema({
  /* The combination of these two lines suggests that the user field in this model will store MongoDB ObjectIds, 
  and it references documents from the "User" model. The purpose of this reference is to associate documents 
  from one collection (the current model) with documents from another collection (the "User" model) using their ObjectIds.

This type of schema design is commonly used to create relationships between different collections in MongoDB. 
For example, if you have a collection of notes, you can use this user field to associate each note with the user who created it, 
without embedding all the user information directly in the note document. By doing so, you can efficiently query and retrieve 
related data from both collections */
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", //this line indicates the reference model for the user field
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    default: "General",
  },
  date: {
    type: String,
    default: new Date().toISOString(),
  },
});

module.exports = mongoose.model("Notes", NotesSchema);
