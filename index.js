const fs = require('node:fs/promises')
const path = require('node:path')

// Ejercicio 2
async function writeFile (filePath, data, callback) {
  const folderPath = path.join(__dirname, filePath)

  try {
    await fs.mkdir(folderPath, { recursive: true })
  } catch(err) {
    return callback(err)
  }

  try {
    await fs.writeFile(`${filePath}.txt`, data)
  } catch(err) {
    return callback(err)
  }

  callback()
}

// Ejercicio 3
async function readFileAndCount (word, callback) {
  if (!word) {
    return callback(new Error('No se ha especificado la palabra a buscar'))
  }

  const filePath = process.argv[2]
  if (!filePath) {
    return callback(new Error('No se ha especificado el path del archivo'))
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
  const lowerWord = word.toLocaleLowerCase()
  
  const amount = words.filter(w => {
    return w.toLocaleLowerCase().includes(lowerWord)
  }).length

  return callback(null, amount)
}

module.exports = {
  writeFile,
  readFileAndCount
}
