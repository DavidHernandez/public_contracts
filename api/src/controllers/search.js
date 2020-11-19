import Elastic from '../elastic.js'
import Term from '../filters/Term.js'
import Terms from '../filters/Terms.js'
import Prefix from '../filters/Prefix.js'
import Wildcard from '../filters/Wildcard.js'


const FILTERS = {
  term: Term,
  terms: Terms,
  prefix: Prefix,
}

export default function search(req, res) {
  const client = new Elastic()
  const { query } = req
  const page = query.page ? query.page : 0
  const filter = []
  const fields = {
    title: 'title',
    entity: 'contractingAuthority',
    processing: 'processingType',
  }

  for (const field in fields) {
    const elasticField = fields[field]
    if (query[field]) {
      const comparer = query[field + 'Comparer']
      filter.push(FILTERS[comparer].toJson(elasticField, query[field]))
    }
  }

  const search = {}
  if (filter !== []) {
    search['query'] = {
      bool: {
        filter
      }
    }
  }

  client.search(search, page)
    .then(results => {
      res.send(results.body.hits)
    })

}
