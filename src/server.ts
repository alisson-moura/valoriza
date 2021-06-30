require('dotenv').config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
})

import express, { NextFunction, Response, Request, response } from 'express'
import 'express-async-errors'
import './database'

import { router } from './routes'
import { ErrorProvider } from './providers/ErrorProvider'

const app = express()
app.use(express.json())
app.use(router)

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof ErrorProvider) {
    return response.status(err.statusCode).json({ error: err.message })
  }
  console.log(err)
  return response.status(500).json({ error: 'Internal Server Error.' })
})

app.listen(process.env.HTTP_PORT, () => console.log('Server is running on port 3000'))