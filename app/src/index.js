import express from 'express'
import Elastic from './elastic.js'

const app = express()
const port = 3000

const client = new Elastic()

app.get('/search', (req, res) => {
  const page = req.query.page ? req.query.page : 0
  client.search({}, page)
    .then(results => {
      res.send(results.body.hits)
    })
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})
