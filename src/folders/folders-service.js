const FoldersService = {
    getAllFolders(knex) {
      return knex.select('*').from('noteful_folders')
    },
    addFolder(knex, newFolder) {
      return knex
        .insert(newFolder)
        .into('noteful_folders')
        .returning('*')
        .then(rows => {
            return rows[0]
        })
    },
    getById(knex, folderId) {
      return knex
        .from('noteful_folders')
        .select('*')
        .where('id', folderId)
        .first()
    },
    deleteFolder(knex, folderId) {
      return knex('noteful_folders')
        .where('id', folderId)
        .delete()
    },
    updateFolder(knex, folderId, newFolderInfo) {
      return knex('noteful_folders')
        .where({folderId})
        .update(newFolderInfo)
    }
  }
  
  module.exports = FoldersService;  