import express from 'express';
import {
    getNotes,
    createNote,
    updateNote,
    setImportant,
    deleteNote,
    getNoteByID,
    getNoteBySearch, getNoteByTag
} from '../controllers/note.controller.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/getall', auth, getNotes);
router.get('/search', auth, getNoteBySearch);
router.get('/tag', auth, getNoteByTag);
router.post('/create', auth, createNote);

router.get("/:id", auth, getNoteByID);
router.put('/:id/update', auth, updateNote);
router.patch('/:id/important', auth, setImportant);
router.delete('/:id/delete', auth, deleteNote);

export default router;