import { Router } from 'express'

import TagsController from './controllers/TagsController'
import UsersController from './controllers/UsersController'
import ComplimentsController from './controllers/ComplimentsController'

import { ensureAdmin } from './middlewares/ensureAdmin'
import { ensureAuthenticated } from './middlewares/ensureAuthenticated'

const router = Router()

const usersController = new UsersController()
const tagsController = new TagsController()
const complimentsController = new ComplimentsController()

// users routes
router.post('/users', usersController.store)
router.post('/auth', usersController.authenticate)
router.get('/users', ensureAuthenticated, usersController.index)
router.get('/users/:id', ensureAuthenticated, usersController.show)

// tags routes
router.post('/tags', ensureAuthenticated, ensureAdmin, tagsController.store)
router.get('/tags', ensureAuthenticated, ensureAdmin, tagsController.index)

// compliments routes
router.post('/compliments', ensureAuthenticated, complimentsController.store)
router.get('/compliments/:id', ensureAuthenticated, complimentsController.index)

router.get('/', ensureAuthenticated, (request, response) => {
  return response.status(200).json({})
})

export { router }