import { Client } from '@elastic/elasticsearch'

const INDEX_NAME = 'contracts'

export default class Elastic {
  constructor() {
    this.client = new Client({ node: 'http://elastic:9200' })
  }

  index(item) {
    this.client.index({
      index: INDEX_NAME,
      body: item
    })
  }

  search(query) {
    this.client.search({
      index: INDEX_NAME,
      body: query
    })
    .then(result => {
      console.log(result)
      //console.log(result.body.hits.hits)
      console.log(result.body.hits.total)
    })
  }

  clean() {
    this.client.indices.delete({
      index: INDEX_NAME
    })
  }
}
