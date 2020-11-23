import { FOLDER_STATES, CONTRACT_TYPES, CONTRACT_SUBTYPES, PROCESS_CODES, URGENCY_CODES, NUTS_CODES } from '../maps.js'
import Api from '../elastic/api.js'
import fs from 'fs'
import xml2js from 'xml2js'
import Contract from '../models/Contract.js'

const parseXmlString = xml2js.parseString
const client = new Api()

function parseFile(file) {
  fs.readFile(file, 'utf-8', (err, xmlString) => {
    if (err) {
      console.log(err)
      return
    }

    parseString(xmlString)
  })
}

function parseString(xmlString) {
  parseXmlString(xmlString, function (err, result) {
    if (err) {
      console.log(err)
      return
    }

    const entries = result.feed.entry
    entries.forEach(entry => {
      saveEntry(entry)
    })
  })
}

function saveEntry(entry) {
  const folderData = getItem(entry['cac-place-ext:ContractFolderStatus'])
  const procurementProject = getItem(folderData['cac:ProcurementProject'])

  const statusCode = getItem(folderData['cbc-place-ext:ContractFolderStatusCode'])

  const contract = new Contract(
    getItem(entry.summary),
    getItem(entry.id),
    getItem(entry.link, '$').href,
    getItem(entry.title),
    getItem(entry.updated),
    getContractType(procurementProject),
    getContractSubtype(procurementProject),
    FOLDER_STATES[statusCode],
    getBudget(procurementProject),
    getProcessType(folderData),
    getProcessingType(folderData),
    getContractingAuthority(folderData),
    getRegion(procurementProject)
  )

  indexItem(contract.toJson())
}

function getContractingAuthority(folderData) {
  const contractingParty = getItem(folderData['cac-place-ext:LocatedContractingParty'])
  const party = getItem(contractingParty['cac:Party'])
  const partyName = getItem(party['cac:PartyName'])
  const name = getItem(partyName['cbc:Name'])

  return name
}

function getRegion(procurementProject) {
  const realizedLocation = getItem(procurementProject['cac:RealizedLocation'])
  if (!('cbc:CountrySubentityCode' in realizedLocation)) {
    console.log('ERROR EXTRACTING REGION', realizedLocation)
    return ''
  }
  const code = getItem(realizedLocation['cbc:CountrySubentityCode'])

  const region = NUTS_CODES[code]
  if (region === undefined) {
    console.log('ERROR EXTRACTING REGION', code)
  }
  return region
}

function getTenderingProcess(folderData) {
  return getItem(folderData['cac:TenderingProcess'])
}

function getProcessingType(folderData) {
  const tenderingProcess = getTenderingProcess(folderData)
  const urgencyCode = getItem(tenderingProcess['cbc:UrgencyCode'])

  return URGENCY_CODES[urgencyCode]
}

function getProcessType(folderData) {
  const tenderingProcess = getTenderingProcess(folderData)
  const processCode = getItem(tenderingProcess['cbc:ProcedureCode'])

  return PROCESS_CODES[processCode]
}

function getContractSubtype(procurementProject) {
  let contractSubtype = getItem(procurementProject['cbc:SubTypeCode'])

  if (contractSubtype == undefined) {
    return ''
  }

  contractSubtype = getItem(contractSubtype)

  const type = getContractType(procurementProject)

  if (type in CONTRACT_SUBTYPES) {
    return CONTRACT_SUBTYPES[type][contractSubtype]
  }
  console.log('NOT FOUND: ', type)
  return ''
}

function getContractType(procurementProject) {
  const contractType = getItem(procurementProject['cbc:TypeCode'])

  return CONTRACT_TYPES[contractType]
}

function getBudget(procurementProject) {
  const budget = getItem(procurementProject['cac:BudgetAmount'])

  return getItem(budget['cbc:TotalAmount'])
}

function getItem(item, component = '_') {
  if (Array.isArray(item)) {
    item = item[0]
  }

  if (item == undefined) {
    return item
  }

  if (item[component] !== undefined) {
    return item[component]
  }

  return item
}

function indexItem(entry) {
  client.index(entry)
}

export {
  parseFile,
  parseString
}
