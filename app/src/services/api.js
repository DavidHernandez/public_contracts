const baseUrl = 'http://localhost:3000/'
//const baseUrl = 'https://api.ftm.coleseguro.es/'

function getUrlParameters(query) {
  let parameters = ''
  for (const parameter in query) {
    if (parameter.includes('Comparer')) {
      continue
    }
    const value = query[parameter]
    const comparerValue = query[parameter + 'Comparer']

    if (value != '') {
      parameters += parameter + '=' + value + '&' + parameter + 'Comparer=' + comparerValue + '&'
    }
  }

  return parameters
}

export default {
  search(query) {
    const url = baseUrl + 'search?' + getUrlParameters(query)

    return fetch(url)
      .then(response => response.json())
  },

  getDownloadUrl(query) {
    const url = baseUrl + 'download.csv?' + getUrlParameters(query)

    return url
  }
}
