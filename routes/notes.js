const express = require('express');
const {body} = require('express-validator/check');

const isAuth = require('../middleware/isAuth');
const notesControler = require('../controllers/notes');

const router = express.Router();

router.post('/createNote', isAuth, notesControler.createNote);

router.get('/fetchNotes', isAuth, notesControler.fetchNotes);

router.get('/note/delete:noteId', isAuth, notesControler.deleteNote);



module.exports = router;