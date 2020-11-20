import { Client } from '@elastic/elasticsearch'

const INDEX_NAME = 'contracts'
const ITEMS_PER_PAGE = 50
const MAX_ITEMS = 10000

export default class Api {
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
    const parameters = {
      index: INDEX_NAME,
      size: ITEMS_PER_PAGE,
      from: ITEMS_PER_PAGE * page,
      body: query
    }

    return this.client.search(parameters)
  }

  searchAll(query) {
    const parameters = {
      index: INDEX_NAME,
      size: 10000,
      body: query
    }

    return this.client.search(parameters)

  }

  clean() {
    this.client.indices.delete({
      index: INDEX_NAME
    })
  }
}
