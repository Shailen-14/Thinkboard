import { Note } from "../models/note.model.js";

export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find();

    return res.status(200).json(notes);
  } catch (error) {
    console.error(`Error in getAllNotes controller: ${error.message}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getNoteById = async (req, res) => {
  try {
    const { id } = req.params;

    const note = await Note.findById(id);

    if (!note) {
      return res
        .status(404)
        .json({ message: `Note with ID ${id}, does not exist` });
    }

    return res.status(201).json(note);
  } catch (error) {
    console.error(`Error in createNote controller: ${error.message}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newNote = await Note.create({ title, content });

    return res.status(201).json(newNote);
  } catch (error) {
    console.error(`Error in createNote controller: ${error.message}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const editNoteById = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const updatedNote = await Note.findByIdAndUpdate(
      id,
      {
        $set: { title, content },
      },
      { new: true },
    );

    if (!updatedNote) {
      return res
        .status(404)
        .json({ message: `Note with ID ${id}, does not exist` });
    }

    return res.status(200).json(updatedNote);
  } catch (error) {
    console.error(`Error in editNoteById controller: ${error.message}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteNoteById = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedNote = await Note.findByIdAndDelete(id);

    if (!deletedNote) {
      return res
        .status(404)
        .json({ message: `Note with ID ${id}, does not exist` });
    }

    return res
      .status(200)
      .json({ message: `Post with ID ${id}, deleted successfully` });
  } catch (error) {
    console.error(`Error in deleteNoteById controller: ${error.message}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
