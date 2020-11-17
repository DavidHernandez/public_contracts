export default {
  search(query) {
    let url = 'http://api.ftm.coleseguro.es:3000/search?'

    for (const parameter in query) {
      const value = query[parameter]

      if (value != '') {
        url += parameter + '=' + value + '&'
      }
    }

    return fetch(url)
      .then(response => response.json())
  }
}
