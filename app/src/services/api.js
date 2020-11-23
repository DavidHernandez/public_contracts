const baseUrl = 'http://localhost:3000/'
//const baseUrl = 'https://api.ftm.coleseguro.es/'

export default {
  search(query) {
    let url = baseUrl + 'search?'

    for (const parameter in query) {
      const value = query[parameter]

      if (value != '') {
        url += parameter + '=' + value + '&'
      }
    }

    return fetch(url)
      .then(response => response.json())
  },

  getDownloadUrl(query) {
    let url = baseUrl + 'download.csv?'

    for (const parameter in query) {
      const value = query[parameter]

      if (value != '') {
        url += parameter + '=' + value + '&'
      }
    }
    return url
  }
}
