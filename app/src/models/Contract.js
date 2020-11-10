//import Sequelize from 'sequelize'

export default class Contract {
  constructor(summary, id, link, title, updated, contractType, contractSubtype, status, budget, processType, processingType, contractingAuthority, rawData) {
    //this.client = new Sequelize(
      //'contracts',
      //'root',
      //'root',
      //{
        //dialect: 'mysql',
        //host: 'db'
      //}
    //)

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
    this.rawData = rawData
  }

  //get model() {
    //return client.sequelize('contracts', {
      //id: {
        //type: Sequelize.STRING,
        //allowNull:false,
        //primaryKey:true
      //},
      //summary: { type: Sequelize.STRING },
      //link: { type: Sequelize.STRING },
      //title: { type: Sequelize.STRING },
      //updated: { type: Sequelize.DATE },
      //contractType: { type: Sequelize.STRING },
      //contractSubtype: { type: Sequelize.STRING },
      //status: { type: Sequelize.STRING },
      //processType: { type: Sequelize.STRING },
      //processingType: { type: Sequelize.STRING },
      //contractingAuthority: { type: Sequelize.STRING },
    //})
  //}

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
      rawData: this.rawData
    }
  }
}
