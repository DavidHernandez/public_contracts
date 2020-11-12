import Form from './components/Form'
import Results from './components/Results'
import Bus from './bus'
import Api from './services/api'

Bus.subscribe('search', query => {
  Api.search(query).then(results => {
    Bus.publish('searchResponse', results)
  })
})
