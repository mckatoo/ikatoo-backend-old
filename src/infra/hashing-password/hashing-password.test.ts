import { comparePassword, hashPassword } from '.'

describe('Hashing password', () => {
  it('should generate a hash password and compare', async () => {
    const password = 'test123'

    const hash = await hashPassword(10, password)

    expect(hash).toBeDefined()
    expect(await comparePassword(password, hash)).toBe(true)
  })
})
