import ResultsTemplate from '../templates/results'
import Result from './Result'
import Bus from '../bus'

const MAX_ITEMS_PER_PAGE = 50

export default class Results extends HTMLElement {
  constructor() {
    super()
    this.shadowDOM = this.attachShadow({ mode: 'closed' })
    this.shadowDOM.appendChild(ResultsTemplate.content.cloneNode(true))

    this.fields = [
      'title', 'entity', 'processing', 'type', 'subtype', 'region', 'status'
    ]

    this.resultsContainer = this.shadowDOM.getElementById('results')
    this.totalContainer = this.shadowDOM.getElementById('total')
    this.mainContainer = this.shadowDOM.getElementById('wrapper')
    this.downloadButton = this.shadowDOM.getElementById('download')
    this.pagerContainer = this.shadowDOM.getElementById('pager')

    this.results
  }

  connectedCallback() {
    Bus.subscribe('searchResponse', results => {
      this.results = results
      this.showResults()
    })

    this.downloadButton.addEventListener('click', this.downloadResults.bind(this))
  }

  downloadResults() {
    const query = this.getQuery()
    Bus.publish('downloadResults', query)
  }

  getQuery() {
    const query = {}
    this.actOnFields((field, comparer) => {
      query[field] = this.results.query[field]
      query[comparer] = this.results.query[comparer]
    })

    return query
  }

  showResults() {
    if (!this.hasResults()) {
      this.mainContainer.classList.add('hidden')
      return
    }

    this.mainContainer.removeAttribute('class')
    this.addResults()
    this.addTotal()
    this.addPager()
  }

  addTotal() {
    const currentPage = this.getCurrentPage()
    const startingItem = currentPage * MAX_ITEMS_PER_PAGE + 1
    const endingItem = (currentPage + 1) * MAX_ITEMS_PER_PAGE

    this.totalContainer.innerHTML = startingItem + ' a ' + endingItem + ' de ' + this.results.total.value
  }

  addResults() {
    this.resultsContainer.innerHTML = ''

    this.results.hits.forEach(item => {
      const result = document.createElement('contracts-result')
      result.addData(item)
      this.resultsContainer.appendChild(result)
    })
  }

  hasResults() {
    return this.results !== undefined && this.results.hits.length > 0
  }

  addPager() {
    this.removeButtons()

    const currentPage = this.getCurrentPage()

    if (!this.isFirstPage()) {
      this.addButton(currentPage, currentPage - 1)
    }

    const pageIndicator = document.createElement('span')
    pageIndicator.innerHTML = currentPage + 1
    this.pagerContainer.appendChild(pageIndicator)

    if (this.hasMorePages()) {
      this.addButton(currentPage + 2, currentPage + 1)
    }
  }

  removeButtons() {
    this.pagerContainer.innerHTML = ''
  }

  addButton(text, page) {
    const query = this.getQuery()
    query[page] = page

    const button = document.createElement('button')
    button.innerHTML = text
    button.addEventListener('click', () => {
      Bus.publish('search', query)
      window.scrollTo(0, 0);
    })

    this.pagerContainer.appendChild(button)
  }

  hasMorePages() {
    if (!this.hasResults()) {
      return false
    }

    const { page } = this.results.query
    const { hits } = this.results
    const total = this.results.total.value

    if (total <= (page + 1) * MAX_ITEMS_PER_PAGE) {
      return false
    }

    return true
  }

  isFirstPage() {
    const { page } = this.results.query

    return page === 0 || page === undefined
  }

  getCurrentPage() {
    const { page } = this.results.query
    if (page === undefined) {
      return 0
    }

    return page
  }

  actOnFields(callback) {
    this.fields.forEach(field => {
      const comparer = field + 'Comparer'
      callback(field, comparer)
    })
  }
}

window.customElements.define("contracts-results", Results)
