import { Router } from 'express'

import TagsController from './controllers/TagsController'
import UsersController from './controllers/UsersController'
import ComplimentsController from './controllers/ComplimentsController'

import { ensureAdmin } from './middlewares/ensureAdmin'

const router = Router()

const usersController = new UsersController()
const tagsController = new TagsController()
const complimentsController = new ComplimentsController()

// users routes
router.post('/users', usersController.store)
router.post('/auth', usersController.authenticate)

// tags routes
router.post('/tags', ensureAdmin, tagsController.store)

// compliments routes
router.post('/compliments', ensureAdmin, complimentsController.store)

export { router }