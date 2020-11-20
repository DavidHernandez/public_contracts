import Term from '../filters/Term.js'
import Terms from '../filters/Terms.js'
import Prefix from '../filters/Prefix.js'
import Wildcard from '../filters/Wildcard.js'

const FILTERS = {
  term: Term,
  terms: Terms,
  prefix: Prefix,
}

const ENABLED_FIELDS = {
  title: 'title',
  entity: 'contractingAuthority',
  processing: 'processingType',
  type: 'contractType',
  subtype: 'contractSubtype',
}

export default function formatQuery(query) {
  const filter = []

  for (const field in ENABLED_FIELDS) {
    const elasticField = ENABLED_FIELDS[field]

    if (query[field]) {
      const comparer = query[field + 'Comparer']
      filter.push(FILTERS[comparer].toJson(elasticField, query[field].toLowerCase()))
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

  return search
}
