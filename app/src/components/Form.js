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
    this.typeInput = this.shadowDOM.getElementById("type")
    this.subtypeInput = this.shadowDOM.getElementById("subtype")
    this.titleComparerInput = this.shadowDOM.getElementById('title-comparer')
    this.entityComparerInput = this.shadowDOM.getElementById('entity-comparer')
    this.processingComparerInput = this.shadowDOM.getElementById("processing-comparer")
    this.typeComparerInput = this.shadowDOM.getElementById("type-comparer")
    this.subtypeComparerInput = this.shadowDOM.getElementById("subtype-comparer")
    this.submitButton = this.shadowDOM.getElementById("submit")

    this.title = ''
    this.entity = ''
    this.processing = ''
    this.type = ''
    this.subtype = ''

    this.titleComparer = 'term'
    this.entityComparer = 'term'
    this.processingComparer = 'term'
    this.typeComparer = 'term'
    this.subtypeComparer = 'term'
  }

  connectedCallback() {
    this.titleComparerInput.addEventListener('change', this.updateTitleComparer.bind(this))
    this.entityComparerInput.addEventListener('change', this.updateEntityComparer.bind(this))
    this.processingComparerInput.addEventListener('change', this.updateProcessingComparer.bind(this))
    this.typeComparerInput.addEventListener('change', this.updateTypeComparer.bind(this))
    this.subtypeComparerInput.addEventListener('change', this.updateSubtypeComparer.bind(this))
    this.titleInput.addEventListener('change', this.updateTitle.bind(this))
    this.entityInput.addEventListener('change', this.updateEntity.bind(this))
    this.processingInput.addEventListener('change', this.updateProcessing.bind(this))
    this.typeInput.addEventListener('change', this.updateType.bind(this))
    this.subtypeInput.addEventListener('change', this.updateSubtype.bind(this))
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

  updateType(event) {
    this.type = event.target.value
  }

  updateSubtype(event) {
    this.subtype = event.target.value
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

  updateTypeComparer(event) {
    this.typeComparer = event.target.value
  }

  updateSubtypeComparer(event) {
    this.subtypeComparer = event.target.value
  }

  submitForm() {
    const { title, entity, processing, type, subtype, titleComparer, entityComparer, processingComparer, typeComparer, subtypeComparer } = this
    Bus.publish('search', { title, entity, processing, type, subtype, titleComparer, entityComparer, processingComparer, typeComparer, subtypeComparer })
  }
}

window.customElements.define("contracts-form", ContractsForm)
