import Api from '../elastic/api.js'
import formatQuery from '../elastic/formatQuery.js'

export default function download(req, res) {
  const client = new Api()
  const { query } = req

  const search = formatQuery(query)

  client.searchAll(search)
    .then(results => {
      const { hits } = results.body.hits
      let csv = `id, link, titulo, "fecha actualizacion", "tipo de contrato", "subtipo de contrato", estado, presupuesto, "tipo de tramitacion", "organo contratante", "tipo de concurso", "region"\r\n`

      hits.map(hit => {
        const data = hit['_source']
        const { id, link, title, updated, contractType, contractSubtype, status, budget, processingType, contractingAuthority, processType, region } = data
        csv += `"${cleanup(id)}","${cleanup(link)}","${cleanup(title)}","${cleanup(updated)}",`
          + `"${cleanup(contractType)}","${cleanup(contractSubtype)}","${cleanup(status)}",`
          + `"${cleanup(budget)}","${cleanup(processingType)}","${cleanup(contractingAuthority)}","${cleanup(processType)}","${cleanup(region)}"\r\n`
      })

      res.set('Content-Type', 'text/csv');
      res.send(csv)
    })
}

function cleanup(string = '') {
  let newString = ''
  try {
    newString = string.split("\r").join('')
    newString = newString.split("\n").join('')
    newString = newString.split("\t").join('')
    newString = newString.split(`"`).join('\'')
    newString = newString.split(`“`).join('\'')
    newString = newString.split(`”`).join('\'')
  }
  catch (e) {
    return string
  }
  return newString
}
