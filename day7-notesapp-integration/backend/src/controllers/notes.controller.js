const NotesModel = require("../models/notes.model");

const createNotesController = async (req, res) => {
  try {
    let { title, description } = req.body;

    let newNote = await NotesModel.create({
      title,
      description,
    });

    return res.status(201).json({
      message: "Note created successfully",
      data: newNote,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const getAllNotesController = async (req, res) => {
  try {
    const allNotes = await NotesModel.find();

    res.status(200).json({
      message: "All notes fetched",
      data: allNotes,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const getSingleNoteController = async (req, res) => {
  try {
    let noteId = req.params.id;

    let note = await NotesModel.findById(noteId);

    res.status(200).json({
      message: "Note fetched successfully",
      data: note,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const updatedNotesController = async (req, res) => {
  try {
    let noteId = req.params.id;
    let body = req.body;

    let updatedNote = await NotesModel.findByIdAndUpdate(noteId, body);

    return res.status(200).json({
      message: "Note updated successfully",
      data: updatedNote,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const singleEntityUpdateController = async (req, res) => {
  try {
    let noteId = req.params.id; //retrieve the note id from the request parameters
    let body = req.body;  //retrieve the body from the request to get the fields that need to be updated

    let updatedNote = await NotesModel.findByIdAndUpdate(noteId, body, {
      new: true, //this option ensures that the updated document is returned instead of the original one
    });

    return res.status(200).json({
      message: "Note updated successfully",
      data: updatedNote,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const deleteNoteController = async (req, res) => {
  try {
    let noteId = req.params.id;

    await NotesModel.findByIdAndDelete(noteId);

    return res.status(200).json({
      message: "Note deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  createNotesController,
  getAllNotesController,
  getSingleNoteController,
  updatedNotesController,
  singleEntityUpdateController,
  deleteNoteController,
 };