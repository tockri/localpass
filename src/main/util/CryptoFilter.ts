import crypto from 'crypto'
import { TextFilter } from './TextFilter'

export class CryptoFilter implements TextFilter {
  private readonly secretKey: Buffer

  constructor(password: string) {
    if (password.length < 8) {
      throw new Error('Password must be at least 8 characters')
    }
    const hash = crypto.createHash('sha256')
    hash.update(password)
    this.secretKey = Buffer.from(hash.digest('binary').substring(0, 32), 'binary')
  }

  // 暗号化。ivを先頭に付与
  in(text: string): string {
    const iv = crypto.randomBytes(16)
    const cipher = crypto.createCipheriv('aes-256-cbc', this.secretKey, iv)
    let encrypted = cipher.update(text, 'utf8', 'hex')
    encrypted += cipher.final('hex')
    return iv.toString('hex') + encrypted
  }

  // 復号
  out(text: string): string {
    // 先頭16byteはiv
    const iv = Buffer.from(text.slice(0, 32), 'hex')
    const encrypted = text.slice(32)
    const decipher = crypto.createDecipheriv('aes-256-cbc', this.secretKey, iv)
    let decrypted = decipher.update(encrypted, 'hex', 'utf8')
    decrypted += decipher.final('utf8')
    return decrypted
  }
}
