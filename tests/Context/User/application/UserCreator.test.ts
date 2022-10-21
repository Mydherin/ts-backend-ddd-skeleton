import InvalidEmailError from '../../../../src/Context/Shared/domain/errors/InvalidEmailError'
import InvalidPasswordError from '../../../../src/Context/Shared/domain/errors/InvalidPasswordError'
import InvalidUsernamedError from '../../../../src/Context/Shared/domain/errors/InvalidUsernameError'
import DuplicatedUserError from '../../../../src/Context/User/application/errors/DuplicatedUserError'
import UserCreator from '../../../../src/Context/User/application/UserCreator'
import User from '../../../../src/Context/User/domain/User'
import UserEmail from '../../../../src/Context/User/domain/value-objects/UserEmail'
import UserName from '../../../../src/Context/User/domain/value-objects/UserName'
import UserPassword from '../../../../src/Context/User/domain/value-objects/UserPassword'
import MockUserRepository from '../__mocks__/MockUserRepository'

let repository: MockUserRepository
let creator: UserCreator

async function testBase (name: string, password: string, email: string): Promise<void> {
  const request = {
    name: new UserName(name),
    password: new UserPassword(password),
    email: new UserEmail(email)
  }
  const user: User = new User(request)
  await creator.run({ name: request.name.value, password: request.password.value, email: request.email.value })
  repository.assertSaveHaveBeenCalledWith(user)
}

beforeAll(() => {
  repository = new MockUserRepository()
  creator = new UserCreator(repository)
})

test('A valid user', async () => {
  await testBase('mydherin', 'P@ssw0rd', 'some-email@email.com')
})

test('A duplicated user', async () => {
  await expect(testBase('mydherin', 'P@ssw0rd', 'some-email@email.com')).rejects.toThrow(DuplicatedUserError)
})

test('Invalid user', async () => {
  await expect(testBase('@mydherin', 'P@ssw0rd', 'some-email@email.com')).rejects.toThrow(InvalidUsernamedError)
})

test('Invalid password', async () => {
  await expect(testBase('mydherin', '1234', 'some-email@email.com')).rejects.toThrow(InvalidPasswordError)
})

test('Invalid email', async () => {
  await expect(testBase('mydherin', 'P@ssw0rd', 'ail.com')).rejects.toThrow(InvalidEmailError)
})
