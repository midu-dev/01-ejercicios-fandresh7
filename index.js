const fs = require('node:fs/promises')
const path = require('node:path')

// Ejercicio 2
async function writeFile (filePath, data, callback) {
  const folderPath = path.join(__dirname, filePath)
  const completePath = path.join(folderPath, 'testfile.txt')

  await fs.mkdir(folderPath, { recursive: true })

  await fs.writeFile(completePath, data)
  callback()
}

// Ejercicio 3
async function readFileAndCount (word, callback) {
  if (!word) {
    return callback(new Error('No se ha especificado la palabra a buscar'))
  }
  word = word.toLocaleLowerCase()

  const filePath = process.argv[2]
  if (!filePath) {
    return callback(new Error('No se ha especificado el path del archivo'), 0)
  }

  const completePath = path.join(__dirname, filePath)
  let fileContent = ''

  try {
    fileContent = await fs.readFile(completePath, 'utf-8')
  } catch (err) {
    console.log(`No se encontró el archivo: ${filePath}`)
    return callback(null, 0)
  }

  const words = fileContent.split(' ')
  const amount = words.filter(w => {
    return w.toLocaleLowerCase().includes(word)
  }).length

  return callback(null, amount)
}

module.exports = {
  writeFile,
  readFileAndCount
}
