import Elastic from '../elastic.js'


export default function search(req, res) {
  const client = new Elastic()
  const page = req.query.page ? req.query.page : 0
  let search = {}
  const must = []

  if (req.query.title) {
    must.push({ match: { title: req.query.title } })
  }
  if (req.query.entity) {
    must.push({ match: { contractingAuthority: req.query.entity } })
  }
  if (req.query.processing) {
    must.push({ match: { processingType: req.query.processing } })
  }

  if (must !== []) {
    search = {
      query: {
        bool: {
          must
        }
      }
    }
  }

  client.search(search, page)
  .then(results => {
    res.send(results.body.hits)
  })

}
