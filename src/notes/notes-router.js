const express = require('express');
const path = require('path');
const xss = require('xss');
const NotesService = require('./notes-service.js');

const nRouter = express.Router();
const jsonParser = express.json();

const noteFormat = note => ({
  id: note.id,
  name: xss(note.name),
  modified: note.modified,
  folder_id: note.folder_id,
  content: xss(note.content)  
});

nRouter.route('/')
  .get((req, res, next) => {
    NotesService.getAllNotes( req.app.get('db') )
    .then(notes => { res.json(notes.map(noteFormat)) })
    .catch(next)
  })
  .post(jsonParser, (req, res, next) => {
    const { name, content, folder_id } = req.body;
    const newNoteInfo = { name, content, folder_id };

    for (const [key, value] of Object.entries(newNoteInfo)) {
      if (value == null) {
          return res.status(400).json({
              error: { message: `Missing '${key}' in request body` }
          })
      }
  }

    NotesService.addNewNote( req.app.get('db'), newNoteInfo)
      .then(note => {
        res.status(201)
        .location(path.posix.join(req.originalUrl +`/${note.id}`))
        .json(noteFormat(note))
      })
      .catch(next)
  })

  nRouter.route('/:note_id')
    .all((req, res, next) => {
      NotesService.getNoteById( req.app.get('db'), req.params.note_id )
        .then(note => {
          if(!note) { return res.status(404).json({error: {message: 'Note does not exist'} }) }
          res.note = note;
          next();
        })
        .catch(next)
    })
    .get((req, res, next) => {
      return res.json(noteFormat(res.note))
    })
    .delete((req, res, next) => {
      NotesService.deleteNote( req.app.get('db'), req.params.note_id )
      .then(() => { res.status(204).end() })
      .catch(next)
    })

module.exports = nRouter;