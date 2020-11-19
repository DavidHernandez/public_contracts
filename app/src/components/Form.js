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
    this.titleComparerInput = this.shadowDOM.getElementById('title-comparer')
    this.entityComparerInput = this.shadowDOM.getElementById('entity-comparer')
    this.processingComparerInput = this.shadowDOM.getElementById("processing-comparer")
    this.submitButton = this.shadowDOM.getElementById("submit")

    this.title = ''
    this.entity = ''
    this.processing = ''

    this.titleComparer = 'term'
    this.entityComparer = 'term'
    this.processingComparer = 'term'
  }

  connectedCallback() {
    this.titleComparerInput.addEventListener('change', this.updateTitleComparer.bind(this))
    this.entityComparerInput.addEventListener('change', this.updateEntityComparer.bind(this))
    this.processingComparerInput.addEventListener('change', this.updateProcessingComparer.bind(this))
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

  updateTitleComparer(event) {
    this.titleComparer = event.target.value
  }

  updateEntityComparer(event) {
    this.entityComparer = event.target.value
  }

  updateProcessingComparer(event) {
    this.processingComparer = event.target.value
  }

  submitForm() {
    const { title, entity, processing, titleComparer, entityComparer, processingComparer } = this
    Bus.publish('search', { title, entity, processing, titleComparer, entityComparer, processingComparer })
  }
}

window.customElements.define("contracts-form", ContractsForm)
