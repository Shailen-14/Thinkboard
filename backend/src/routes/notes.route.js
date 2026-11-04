import { Router } from "express";

import {
  getAllNotes,
  createNote,
  editNoteById,
  deleteNoteById,
  getNoteById
} from "../controllers/notes.controller.js";

const router = Router();

router.get("/", getAllNotes);
router.get("/:id", getNoteById);
router.post("/", createNote);
router.put("/:id", editNoteById);
router.delete("/:id", deleteNoteById);

export default router;
