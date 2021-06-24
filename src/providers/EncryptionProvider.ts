import { hash, compare } from 'bcryptjs'

class EncryptionProvider {
  async encrypt(value: string): Promise<string> {
    return hash(value, 8)
  }

  async compare(value: string, encryptedValue: string): Promise<boolean> {
    return compare(value, encryptedValue)
  }
}
export { EncryptionProvider }