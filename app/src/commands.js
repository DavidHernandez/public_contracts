import Elastic from './elastic.js'
import parseFile from './parsers/xml.js'
import fs from 'fs'

const DATA_FOLDER = './data'
const client = new Elastic()

function indexCommand() {
  fs.readdir(DATA_FOLDER, (err, files) => {
    if (err) {
      console.log(err)
      return
    }

    //const file = files[0]
    files.forEach(file => {
      const fileName = './data/' + file
      parseFile(fileName)
    })
  })
}

function searchCommand() {
  let search = {}
  if (process.argv[3] !== undefined) {
    search = JSON.parse(process.argv[3])
  }
  client.search(search)
}

function deleteIndexCommand() {
  client.clean()
}

const commands = {
  'index-data': indexCommand,
  'search': searchCommand,
  'delete': deleteIndexCommand,
}

function printMessage(message) {
    process.stdout.write(message)
    process.stdout.write('\n')
}

export default function execute(command) {
  console.log('Executing command \'' + command + '\'')
  if (command === undefined) {
    printMessage('You need to provide a command. Valid commands: index-data, search, delete')
    printMessage('./index.js [command]')
    return
  }

  command = command.replace('\n', '')

  if (!(command in commands)) {
    printMessage('Invalid command. Valid commands: index-data')
    return
  }

  commands[command]()
}
