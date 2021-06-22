import { Router } from 'express'
import UsersController from './controllers/UsersController'

const router = Router()

const usersController = new UsersController()

// users routes
router.post('/users', usersController.store)

export { router }