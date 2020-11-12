import ContractsFormTemplate from '../templates/form'
import Bus from '../bus'

export default class ContractsForm extends HTMLElement {
  constructor() {
    super()
    this.shadowDOM = this.attachShadow({ mode: 'closed' })
    this.shadowDOM.appendChild(ContractsFormTemplate.content.cloneNode(true))

    this.titleInput = this.shadowDOM.getElementById('title')
    this.entityInput = this.shadowDOM.getElementById('entity')
    this.processingInput = this.shadowDOM.getElementById("processing")
    this.submitButton = this.shadowDOM.getElementById("submit")

    this.title = ''
    this.entity = ''
    this.processing = ''
  }

  connectedCallback() {
    this.titleInput.addEventListener('change', this.updateTitle.bind(this))
    this.entityInput.addEventListener('change', this.updateEntity.bind(this))
    this.processingInput.addEventListener('change', this.updateProcessing.bind(this))
    this.submitButton.addEventListener('click', this.submitForm.bind(this))
  }

  updateTitle(event) {
    this.title = event.target.value
  }

  updateEntity(event) {
    this.entity = event.target.value
  }

  updateProcessing(event) {
    this.processing = event.target.value
  }

  submitForm() {
    const { title, entity, processing } = this
    Bus.publish('search', {title, entity, processing})
  }
}

window.customElements.define("contracts-form", ContractsForm)
