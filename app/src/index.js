import Form from './components/Form'
import Bus from './bus'
import Api from './services/api'

Bus.subscribe('search', query => {
  console.log('search!')
  Api.search(query).then(results => {
    Bus.publish('searchResponse', results)
  })
})
