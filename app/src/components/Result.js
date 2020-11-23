import ResultTemplate from '../templates/result'
import Bus from '../bus'

export default class Result extends HTMLElement {
  constructor() {
    super()
    this.shadowDOM = this.attachShadow({ mode: 'closed' })
    this.shadowDOM.appendChild(ResultTemplate.content.cloneNode(true))

    this.link = this.shadowDOM.getElementById('link')
    this.type = this.shadowDOM.getElementById('type')
    this.subtype = this.shadowDOM.getElementById('subtype')
    this.processing = this.shadowDOM.getElementById('processing')
    this.contracting = this.shadowDOM.getElementById('contracting')
    this.status = this.shadowDOM.getElementById('status')
    this.region = this.shadowDOM.getElementById('region')
    this.budget = this.shadowDOM.getElementById('budget')
  }

  addData(data) {
    const result = data._source
    const { link, title, contractType, contractSubtype, status, budget, processingType, contractingAuthority, region } = result

    this.link.href = link
    this.link.innerHTML = title
    this.budget.innerHTML = budget
    this.type.innerHTML = contractType
    this.subtype.innerHTML = contractSubtype
    this.processing.innerHTML = processingType
    this.contracting.innerHTML = contractingAuthority
    this.status.innerHTML = status
    this.region.innerHTML = region
  }
}

window.customElements.define("contracts-result", Result)
