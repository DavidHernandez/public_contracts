import express from 'express'
import path from 'path'
import cors from 'cors'
import search from './controllers/search.js'
import download from './controllers/download.js'

const app = express()
app.use(cors())

const port = 3000

app.get('/search', search)
app.get('/download.csv', download)

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})
