import Api from '../elastic/api.js'
import formatQuery from '../elastic/formatQuery.js'


export default function search(req, res) {
  const client = new Api()
  const { query } = req
  const page = query.page ? query.page : 0

  const search = formatQuery(query)

  client.search(search, page)
    .then(results => {
      res.send(results.body.hits)
    })

}
