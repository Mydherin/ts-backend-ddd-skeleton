import User from '../../../../src/Context/User/domain/User'
import UserRepository from '../../../../src/Context/User/domain/UserRepository'
import UserName from '../../../../src/Context/User/domain/value-objects/UserName'

export default class MockUserRepository implements UserRepository {
  private readonly saveMock: jest.Mock

  constructor () {
    this.saveMock = jest.fn()
  }

  async save (user: User): Promise<void> {
    this.saveMock(user)
  }

  async search (_name: UserName): Promise<User | null> {
    if (this.saveMock.mock.lastCall === undefined) {
      return null
    } else {
      return new User(this.saveMock.mock.lastCall[0])
    }
  }

  assertSaveHaveBeenCalledWith (user: User): void {
    expect(this.saveMock).toHaveBeenCalledWith(user)
  }
}
