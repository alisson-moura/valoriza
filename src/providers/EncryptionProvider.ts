import { hash, compare } from 'bcryptjs'

class EncryptProvider {
  async encrypt(value: string): Promise<string> {
    return hash(value, 8)
  }

  async compare(value: string, encryptedValue: string) {
    return compare(value, encryptedValue)
  }
}
export { EncryptProvider }