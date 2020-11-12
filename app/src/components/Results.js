import ResultsTemplate from '../templates/results'
import Bus from '../bus'

export default class Results extends HTMLElement {
  constructor() {
    super()
    this.shadowDOM = this.attachShadow({ mode: 'closed' })
    this.shadowDOM.appendChild(ResultsTemplate.content.cloneNode(true))
  }
}
