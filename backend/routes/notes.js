const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Notes = require("../models/Notes");
const fetchuser = require("../middleware/fetchuser");

//get all the notes
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    let notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error");
  }
});

//adding notes-Route-2
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "enter a valid title").isLength({ min: 3 }),
    body("description", "description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      //Notes is assumed to be a model (possibly a Mongoose model) representing a collection/table in a database for storing notes.
      //const note = new Notes({ title, description, tag, user: req.user.id }); creates a new instance of the Notes model with the provided data (title, description, tag, and user).
      let note = await Notes.create({
        title: req.body.title,
        description: req.body.description,
        tag: req.body.tag,
        user: req.user.id,
      });
      /*
    alternatively:
    
    const note = new Notes({ title, description, tag, user: req.user.id });
    const savedNote = await note.save();
    res.json(savedNote); */

      res.json(note);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server Error");
    }
  }
);

//updating an existing note-login is required
//Route-3
router.put(
  "/updatenote/:id",
  fetchuser,
  [
    body("title", "enter a valid title").isLength({ min: 3 }),
    body("description", "description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const { title, description, tag } = req.body;
    try {
      const newNote = {};
      if (title) {
        newNote.title = title;
      }
      if (description) {
        newNote.description = description;
      }
      if (tag) {
        newNote.tag = tag;
      }

      let note = await Notes.findById(req.params.id);
      if (!note) {
        return res.status(404).send("not found");
      }
      if (note.user.toString() !== req.user.id) {
        return res.status(401).send("not allowed");
      }
      note = await Notes.findByIdAndUpdate(
        req.params.id,
        { $set: newNote },
        { new: true }
      );
      res.send(note);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server Error");
    }
  }
);

//deleting an existing note-login is required
//Route-4
router.delete(
  "/deletenote/:id",
  fetchuser,

  async (req, res) => {
    try {
      let note = await Notes.findById(req.params.id);
      if (!note) {
        return res.status(404).send("not found");
      }
      if (note.user.toString() !== req.user.id) {
        return res.status(401).send("not allowed");
      }
      note = await Notes.findByIdAndDelete(req.params.id);
      res.send("Note has been deleted successfully");
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server Error");
    }
  }
);

module.exports = router;
