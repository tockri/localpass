import { describe, expect, test } from 'vitest'
import { CryptoFilter } from './CryptoFilter'

describe('CryptoFilter', () => {
  const testOne = (password: string, text: string) => {
    // Arrange
    const cf = new CryptoFilter(password)

    // Act
    const encrypted = cf.in(text)
    const decrypted = cf.out(encrypted)

    // Assert
    expect(encrypted).not.toBe(text)
    expect(decrypted).toBe(text)
  }

  test('ascii password and ascii short text', () => {
    testOne('password', 'text')
  })

  test('ascii password and ascii long text', () => {
    testOne('password', 'text'.repeat(100))
  })

  test('ascii password and non-ascii text', () => {
    testOne('password', 'あいうえお')
  })

  test('non-ascii password and ascii short text', () => {
    testOne('あいうえおかきくけこ', 'text')
  })

  test('non-ascii password and ascii long text', () => {
    testOne('あいうえおかきくけこ', 'text'.repeat(100))
  })

  test('non-ascii password and non-ascii text', () => {
    testOne('あいうえおかきくけこ', 'あいうえお')
  })

  test('reject short password', () => {
    expect(() => new CryptoFilter('short')).toThrow('Password must be at least 8 characters')
  })
})
