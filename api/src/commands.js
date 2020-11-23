import Api from './elastic/api.js'
import { parseFile, parseString } from './parsers/xml.js'
import fs from 'fs'
import https from 'https'
import StreamZip from 'node-stream-zip'

const DATA_FOLDER = './data'
const client = new Api()

function indexCommand() {
  fs.readdir(DATA_FOLDER, (err, files) => {
    if (err) {
      console.log(err)
      return
    }

    files.forEach(file => {
      const fileName = './data/' + file
      parseFile(fileName)
    })
  })
}

function indexAllCommand() {
  const types = {
    completo: '643/licitacionesPerfilesContratanteCompleto3_2020',
    agregadas: '1044/PlataformasAgregadasSinMenores_2020',
    menores: '1143/contratosMenoresPerfilesContratantes_2020',
  }
  for (const type in types) {
    const path = types[type]
    for (let i = 6; i < 11; i++) {
      indexFile(type, path, i)
    }
  }
}

function indexFile(type, path, month) {
  const url = generateFileUrl(path, month)
  const zipPath = './' + type + month + '.zip'
  downloadFile(zipPath, url, () => {
    const zip = new StreamZip({
      file: zipPath,
      storeEntries: true
    });

    zip.on('error', (err) => console.log('error opening the file'))

    zip.on('entry', (entry) => {
      console.log('processing ' + url)
      if ('/' === entry.name[entry.name.length - 1]) {
        return;
      }

      console.log('[FILE]', entry.name);
      zip.stream(entry.name, function (err, stream) {
        if (err) { console.error('Error:', err.toString()); return; }

        stream.on('error', function (err) { console.log('[ERROR]', err); return; });

        let xml = ''
        stream.on('data', chunk => xml += chunk)

        stream.on('end', () => {
          parseString(xml)
        })
      })
    })
  })
}

function generateFileUrl(type, month) {
  const urlBase = 'https://contrataciondelestado.es/sindicacion/sindicacion_'
  let url = urlBase + type
  if (month < 10) {
    url += '0'
  }
  url += month + '.zip'

  return url
}

function downloadFile(zipPath, url, callback) {
  const file = fs.createWriteStream(zipPath);
  https.get(url, (response) => {
    response.pipe(file)

    file.on('error', () => {
      file.close()
    })
    file.on('finish', callback)
  })
  .on('error', (e) => {
    console.error(e)
  })
}

function searchCommand() {
  let search = {}
  if (process.argv[3] !== undefined) {
    search = JSON.parse(process.argv[3])
  }
  client.search(search)
    .then(result => {
      console.log(result)
      console.log(result.body.hits.hits)
      console.log(result.body.hits.total)
    })
}

function deleteIndexCommand() {
  client.clean()
}

const commands = {
  'index-data': indexCommand,
  'index-all': indexAllCommand,
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
