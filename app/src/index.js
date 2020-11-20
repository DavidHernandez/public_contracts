import Form from './components/Form'
import Results from './components/Results'
import Bus from './bus'
import Api from './services/api'

Bus.subscribe('search', query => {
  Api.search(query).then(results => {
    results['query'] = query
    Bus.publish('searchResponse', results)
  })
})

Bus.subscribe('downloadResults', query => {
  const url = Api.getDownloadUrl(query)
  window.open(url)
})
