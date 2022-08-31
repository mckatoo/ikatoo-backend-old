import { randomUUID } from 'crypto'
import { User, UserProps } from './user.entity'

describe('Test User Test', () => {
  const userData: UserProps = {
    name: 'test name',
    email: 'test@email.com',
    username: 'user1',
    password: 'pass123'
  }

  it('constructor without id', () => {
    const user = new User(userData)

    expect(user.props).toStrictEqual(userData)
    expect(user.id).toBeDefined()
  })

  it('constructor with id', () => {
    const id = randomUUID()

    const user = new User(userData, id)

    expect(user.props).toStrictEqual(userData)
    expect(user.id).toBe(id)
  })

  it('should update name', () => {
    const user = new User(userData)
    user.updateName('new name')

    expect(user.name).toBe('new name')
  })

  it('should update username', () => {
    const user = new User(userData)
    user.updateUsername('new username')

    expect(user.username).toBe('new username')
  })

  it('should update email', () => {
    const user = new User(userData)
    user.updateEmail('new@email.com')

    expect(user.email).toBe('new@email.com')
  })

  it('should update password', () => {
    const user = new User(userData)
    user.updatePassword('newPass')

    expect(user.password).toBe('newPass')
  })
})
