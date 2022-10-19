import InvalidEmailError from '../../../../src/Context/Shared/domain/errors/InvalidEmailError'
import InvalidPasswordError from '../../../../src/Context/Shared/domain/errors/InvalidPasswordError'
import InvalidUsernamedError from '../../../../src/Context/Shared/domain/errors/InvalidUsernameError'
import InvalidUuidError from '../../../../src/Context/Shared/domain/errors/InvalidUuidError'
import UserCreator from '../../../../src/Context/User/application/UserCreator'
import User from '../../../../src/Context/User/domain/User'
import UserEmail from '../../../../src/Context/User/domain/value-objects/UserEmail'
import UserId from '../../../../src/Context/User/domain/value-objects/UserId'
import UserName from '../../../../src/Context/User/domain/value-objects/UserName'
import UserPassword from '../../../../src/Context/User/domain/value-objects/UserPassword'
import MockUserRepository from '../__mocks__/MockUserRepository'

let repository: MockUserRepository
let creator: UserCreator

function test (id: string, name: string, password: string, email: string): void {
  const request = {
    id: new UserId(id),
    name: new UserName(name),
    password: new UserPassword(password),
    email: new UserEmail(email)
  }
  const user: User = new User(request)
  creator.run({ id: request.id.value, name: request.name.value, password: request.password.value, email: request.email.value })
  repository.assertSaveHaveBeenCalledWith(user)
}

beforeAll(() => {
  repository = new MockUserRepository()
  creator = new UserCreator(repository)
})

describe('A valid user', () => {
  it('should be create a user', () => {
    test('0766c602-d4d4-48b6-9d50-d3253123275e', 'mydherin', 'P@ssw0rd', 'some-email@email.com')
  })
})

describe('A invalid uuid', () => {
  it('should throw an invalid uuid error', () => {
    expect(() => test('066c602-d4d4-48b6-9d50-d3253123275e', 'mydherin', 'P@ssw0rd', 'some-email@email.com')).toThrow(InvalidUuidError)
  })
})

describe('A invalid username', () => {
  it('should throw an invalid username error', () => {
    expect(() => test('0766c602-d4d4-48b6-9d50-d3253123275e', '@mydherin', 'P@ssw0rd', 'some-email@email.com')).toThrow(InvalidUsernamedError)
  })
})

describe('A invalid password', () => {
  it('should throw an invalid password error', () => {
    expect(() => test('0766c602-d4d4-48b6-9d50-d3253123275e', 'mydherin', '1234', 'some-email@email.com')).toThrow(InvalidPasswordError)
  })
})

describe('A invalid email', () => {
  it('should throw an invalid email error', () => {
    expect(() => test('0766c602-d4d4-48b6-9d50-d3253123275e', 'mydherin', 'P@ssw0rd', 'email.com')).toThrow(InvalidEmailError)
  })
})
