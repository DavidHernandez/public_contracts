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
    this.regionInput = this.shadowDOM.getElementById("region")
    this.statusInput = this.shadowDOM.getElementById("status")

    this.titleComparerInput = this.shadowDOM.getElementById('title-comparer')
    this.entityComparerInput = this.shadowDOM.getElementById('entity-comparer')
    this.processingComparerInput = this.shadowDOM.getElementById("processing-comparer")
    this.typeComparerInput = this.shadowDOM.getElementById("type-comparer")
    this.subtypeComparerInput = this.shadowDOM.getElementById("subtype-comparer")
    this.regionComparerInput = this.shadowDOM.getElementById("region-comparer")
    this.statusComparerInput = this.shadowDOM.getElementById("status-comparer")

    this.submitButton = this.shadowDOM.getElementById("submit")

    this.title = ''
    this.entity = ''
    this.processing = ''
    this.type = ''
    this.subtype = ''
    this.region = ''
    this.status = ''

    this.titleComparer = 'term'
    this.entityComparer = 'term'
    this.processingComparer = 'term'
    this.typeComparer = 'term'
    this.subtypeComparer = 'term'
    this.regionComparer = 'term'
    this.statusComparer = 'term'
  }

  connectedCallback() {
    this.titleInput.addEventListener('change', this.updateTitle.bind(this))
    this.entityInput.addEventListener('change', this.updateEntity.bind(this))
    this.processingInput.addEventListener('change', this.updateProcessing.bind(this))
    this.typeInput.addEventListener('change', this.updateType.bind(this))
    this.subtypeInput.addEventListener('change', this.updateSubtype.bind(this))
    this.regionInput.addEventListener('change', this.updateRegion.bind(this))
    this.statusInput.addEventListener('change', this.updateStatus.bind(this))

    this.titleComparerInput.addEventListener('change', this.updateTitleComparer.bind(this))
    this.entityComparerInput.addEventListener('change', this.updateEntityComparer.bind(this))
    this.processingComparerInput.addEventListener('change', this.updateProcessingComparer.bind(this))
    this.typeComparerInput.addEventListener('change', this.updateTypeComparer.bind(this))
    this.subtypeComparerInput.addEventListener('change', this.updateSubtypeComparer.bind(this))
    this.regionComparerInput.addEventListener('change', this.updateRegionComparer.bind(this))
    this.statusComparerInput.addEventListener('change', this.updateStatusComparer.bind(this))

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

  updateRegion(event) {
    this.region = event.target.value
  }

  updateStatus(event) {
    this.status = event.target.value
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

  updateRegionComparer(event) {
    this.regionComparer = event.target.value
  }

  updateStatusComparer(event) {
    this.statusComparer = event.target.value
  }

  submitForm() {
    const { title, entity, processing, type, subtype, region, status, titleComparer, entityComparer, processingComparer, typeComparer, subtypeComparer, regionComparer, statusComparer } = this
    Bus.publish('search', { title, entity, processing, type, subtype, region, status, titleComparer, entityComparer, processingComparer, typeComparer, subtypeComparer, regionComparer, statusComparer })
  }
}

window.customElements.define("contracts-form", ContractsForm)
