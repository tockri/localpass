import { execSync } from 'child_process'
import fs from 'fs'
import { FileUtil } from '../main/util/FileUtil'

const DATABASE_URL = FileUtil.configUrl('sqlite.db')
const DATABASE_URL_FOR_TEST = FileUtil.projectUrl('testDb/sqlite.db')

/**
 * .env を生成する
 */
function makeEnv(): void {
  const envPath = FileUtil.projectPath('.env')
  console.log(`env path: ${envPath}`)
  if (!fs.existsSync(envPath)) {
    const envContent = `DATABASE_URL=${DATABASE_URL}`
    fs.writeFileSync(envPath, envContent)
    console.log(`created .env file: \n${envContent}`)
  } else {
    console.log('.env file already exists')
  }
}

/**
 * .env.test を生成する
 */
function makeEnvTest(): void {
  const envPath = FileUtil.projectPath('.env.test')
  console.log(`env.test path: ${envPath}`)
  if (!fs.existsSync(envPath)) {
    const envContent = `DATABASE_URL=${DATABASE_URL_FOR_TEST}`
    fs.writeFileSync(envPath, envContent)
    console.log(`created .env.test file: \n${envContent}`)
  } else {
    console.log('.env.test file already exists')
  }
}

/**
 * testDb/sqlite.db を生成・更新する
 */
function setupTestDb(): void {
  execSync('prisma db push --schema prisma/local.prisma', {
    env: { DATABASE_URL: DATABASE_URL_FOR_TEST }
  })
}

makeEnv()
makeEnvTest()
setupTestDb()
