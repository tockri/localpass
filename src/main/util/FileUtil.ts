import fs from 'fs'
import path from 'path'

const HOME_DIR = process.env[process.platform == 'win32' ? 'USERPROFILE' : 'HOME'] || ''
if (!HOME_DIR) {
  throw new Error('HOME not found')
}

const configPath = (fileName: string): string => path.join(HOME_DIR, '.localpass', fileName)

const projectPath = (fileName: string): string =>
  path.normalize(path.join(__dirname, '..', '..', '..', fileName))

const exists = (filePath: string): boolean => fs.existsSync(filePath)

const read = (filePath: string): Promise<string> =>
  new Promise((resolve, reject) => {
    if (fs.existsSync(filePath)) {
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    } else {
      reject(new Error('File not found'))
    }
  })

const write = (filePath: string, data: string): Promise<void> =>
  new Promise((resolve, reject) => {
    const dir = path.dirname(filePath)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    fs.writeFile(filePath, data, 'utf8', (err) => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })

const unlink = (filePath: string): Promise<void> =>
  new Promise((resolve, reject) => {
    if (!fs.existsSync(filePath)) {
      resolve()
    } else {
      fs.unlink(filePath, (err) => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    }
  })

export const FileUtil = {
  exists,
  configPath,
  projectPath,
  read,
  write,
  unlink
} as const
