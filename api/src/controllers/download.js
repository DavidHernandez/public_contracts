import Api from '../elastic/api.js'
import formatQuery from '../elastic/formatQuery.js'

export default function download(req, res) {
  const client = new Api()
  const { query } = req

  const search = formatQuery(query)

  client.searchAll(search)
    .then(results => {
      const { hits } = results.body.hits
      let csv = `id, link, title, updated, contractType, contractSubtype, status, budget, processingType, contractingAuthority\r\n`

      hits.map(hit => {
        const data = hit['_source']
        const { id, link, title, updated, contractType, contractSubtype, status, budget, processingType, contractingAuthority } = data
        csv += `"${cleanup(id)}","${cleanup(link)}","${cleanup(title)}","${cleanup(updated)}",`
          + `"${cleanup(contractType)}","${cleanup(contractSubtype)}","${cleanup(status)}",`
          + `"${cleanup(budget)}","${cleanup(processingType)}","${cleanup(contractingAuthority)}"\r\n`
      })

      res.set('Content-Type', 'text/csv');
      res.send(csv)
    })
}

function cleanup(string) {
  string = string.split("\r").join('')
  string = string.split("\n").join('')
  string = string.split("\t").join('')
  string = string.split(`"`).join('\'')
  string = string.split(`“`).join('\'')
  string = string.split(`”`).join('\'')
  return string
}
