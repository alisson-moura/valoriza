import express from 'express'
import 'express-async-errors'
import './database'

const app = express()
app.listen(3000, () => console.log('Server is running on port 3000'))