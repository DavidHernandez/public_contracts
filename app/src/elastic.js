import { Client } from '@elastic/elasticsearch'

const INDEX_NAME = 'contracts'
const ITEMS_PER_PAGE = 50

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

  search(query, page = 0) {
    return this.client.search({
      index: INDEX_NAME,
      size: ITEMS_PER_PAGE,
      from: ITEMS_PER_PAGE * page,
      body: query
    })
  }

  clean() {
    this.client.indices.delete({
      index: INDEX_NAME
    })
  }
}
