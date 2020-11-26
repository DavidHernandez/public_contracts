import ContractsFormTemplate from '../templates/form'
import Bus from '../bus'

export default class ContractsForm extends HTMLElement {
  constructor() {
    super()
    this.shadowDOM = this.attachShadow({ mode: 'closed' })
    this.shadowDOM.appendChild(ContractsFormTemplate.content.cloneNode(true))

    this.fields = [
      'title', 'entity', 'processing', 'type', 'subtype', 'region', 'status'
    ]

    this.actOnFields((field, input, comparer) => {
      const comparerId = field + '-comparer'
      const comparerInput = comparer + 'Input'

      this[input] = this.shadowDOM.getElementById(field)
      this[comparerInput] = this.shadowDOM.getElementById(comparerId)
      this[field] = ''
      this[comparer] = 'term'
    })

    this.submitButton = this.shadowDOM.getElementById("submit")
  }

  connectedCallback() {
    this.actOnFields((field, input, comparer) => {
      const comparerInput = comparer + 'Input'
      this[input].addEventListener('change', (event) => this.extractData(field, event))
      this[comparerInput].addEventListener('change', (event) => this.extractData(comparer, event))
    })

    this.submitButton.addEventListener('click', this.submitForm.bind(this))
  }

  extractData(field, event) {
    this[field] = event.target.value
  }

  actOnFields(callback) {
    this.fields.forEach(field => {
      const input = field + 'Input'
      const comparer = field + 'Comparer'
      callback(field, input, comparer)
    })
  }

  submitForm() {
    const query = {}
    this.actOnFields((field, input, comparer) => {
      query[field] = this[field]
      query[comparer] = this[comparer]
    })
    Bus.publish('search', query)
  }
}

window.customElements.define("contracts-form", ContractsForm)
