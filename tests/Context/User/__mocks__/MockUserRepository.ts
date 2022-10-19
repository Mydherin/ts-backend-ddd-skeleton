import User from '../../../../src/Context/User/domain/User'
import UserRepository from '../../../../src/Context/User/domain/UserRepository'

export default class MockUserRepository implements UserRepository {
  private readonly saveMock: jest.Mock

  constructor () {
    this.saveMock = jest.fn()
  }

  save (user: User): void {
    this.saveMock(user)
  }

  assertSaveHaveBeenCalledWith (user: User): void {
    expect(this.saveMock).toHaveBeenCalledWith(user)
  }
}
