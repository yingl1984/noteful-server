const express = require('express');
const path = require('path');
const xss = require('xss');
const FoldersService = require('./folders-service');

const fRouter = express.Router();
const jsonParser = express.json();

const folderFormat = folder => ({
  id: folder.id,
  name: xss(folder.name)
});

fRouter.route('/')
  .get((req, res, next) => {
    FoldersService.getAllFolders( req.app.get('db') )
    .then(folders => { res.json(folders.map(folderFormat)) })
    .catch(next)
  })
  .post(jsonParser, (req, res, next) => {
    const { name } = req.body;
    const newFolder = { name };

    for (const [key, value] of Object.entries(newFolder)) {
      if (!value) {
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` },
        });
      }
    }

    FoldersService.addFolder( req.app.get('db'), newFolder)
      .then(folder => {
        res.status(201)
        .location(path.posix.join(req.originalUrl +`/${folder.id}`))
        .json(folderFormat(folder))
      })
      .catch(next)
    })

  fRouter.route('/:folder_id')
    .all((req, res, next) => {
      FoldersService.getById( req.app.get('db'), req.params.folder_id )
        .then(folder => {
          if(!folder) {
              res.status(404).json(
                  {error: {message: 'Folder does not exist'} 
              }) 
          }
          res.folder = folder;
          next();
        })
        .catch(next)
    })
    .get((req, res, next) => {
      return res.json(folderFormat(res.folder))
    })
    .delete((req, res, next) => {
      FoldersService.deleteFolder( req.app.get('db'), req.params.folder_id )
      .then(() => { res.status(204).end() })
      .catch(next)
    })

module.exports = fRouter;