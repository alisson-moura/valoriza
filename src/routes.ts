import { Router } from 'express'
import TagsController from './controllers/TagsController'
import UsersController from './controllers/UsersController'

const router = Router()

const usersController = new UsersController()
const tagsController = new TagsController()

// users routes
router.post('/users', usersController.store)

// tags routes
router.post('/tags', tagsController.store)

export { router }