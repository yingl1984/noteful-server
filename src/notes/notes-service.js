const NotesService = {
    getAllNotes(knex) {
      return knex.select('*').from('noteful_notes')
    },
    addNewNote(knex, newNote) {
      return knex
        .insert(newNote)
        .into('noteful_notes')
        .returning('*')
        .then(rows => {
            return rows[0]
        })
    },
    getNoteById(knex, noteId) {
      return knex('noteful_notes')
        .select('*')
        .where('id', noteId)
        .first()
    },
    deleteNote(knex, noteId) {
      return knex('noteful_notes')
        .where('id', noteId)
        .delete()
    },
    updateNote(knex, noteId, newNoteData) {
      return knex('noteful_notes')
        .where('id', noteId)
        .update(newNoteData)
    }
  }
  
  module.exports = NotesService;