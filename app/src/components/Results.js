import ResultsTemplate from '../templates/results'
import Result from './Result'
import Bus from '../bus'

export default class Results extends HTMLElement {
  constructor() {
    super()
    this.shadowDOM = this.attachShadow({ mode: 'closed' })
    this.shadowDOM.appendChild(ResultsTemplate.content.cloneNode(true))

    this.resultsContainer = this.shadowDOM.getElementById('results')
    this.totalContainer = this.shadowDOM.getElementById('total')
    this.mainContainer = this.shadowDOM.getElementById('wrapper')

    this.results
  }

  connectedCallback() {
    Bus.subscribe('searchResponse', results => {
      this.results = results
      this.showResults()
    })
  }

  showResults() {
    if (!this.hasResults()) {
      this.mainContainer.classList.add('hidden')
      return
    }

    this.mainContainer.removeAttribute('class')
    this.addResults()
    this.addTotal()
  }

  addTotal() {
    this.totalContainer.innerHTML = this.results.total.value
    console.log(this.totalContainer)
  }

  addResults() {
    this.resultsContainer.childNodes.forEach(child => {
      this.resultsContainer.removeChild(child)
    })

    this.results.hits.forEach(item => {
      const result = document.createElement('contracts-result')
      result.addData(item)
      this.resultsContainer.appendChild(result)
    })
  }

  hasResults() {
    return this.results !== undefined && this.results.hits.length > 0
  }
}

window.customElements.define("contracts-results", Results)
