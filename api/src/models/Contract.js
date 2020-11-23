export default class Contract {
  constructor(summary, id, link, title, updated, contractType, contractSubtype, status, budget, processType, processingType, contractingAuthority, region) {
    this.summary = summary
    this.id = id
    this.link = link
    this.title = title
    this.updated = updated
    this.contractType = contractType
    this.contractSubtype = contractSubtype
    this.status = status
    this.budget = budget
    this.processType = processType
    this.processingType = processingType
    this.contractingAuthority = contractingAuthority
    this.region = region
  }

  toJson() {
    return {
      summary: this.summary,
      id: this.id,
      link: this.link,
      title: this.title,
      updated: this.updated,
      contractType: this.contractType,
      contractSubtype: this.contractSubtype,
      status: this.status,
      budget: this.budget,
      processType: this.processtype,
      processingType: this.processingType,
      contractingAuthority: this.contractingAuthority,
      region: this.region
    }
  }
}
