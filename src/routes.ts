import { Router } from 'express'
import TagsController from './controllers/TagsController'
import UsersController from './controllers/UsersController'
import { ensureAdmin } from './middlewares/ensureAdmin'

const router = Router()

const usersController = new UsersController()
const tagsController = new TagsController()

// users routes
router.post('/users', usersController.store)
router.post('/auth', usersController.authenticate)

// tags routes
router.post('/tags', ensureAdmin, tagsController.store)

export { router }