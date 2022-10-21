import User from '../../../../src/Context/User/domain/User'
import UserRepository from '../../../../src/Context/User/domain/UserRepository'
import UserId from '../../../../src/Context/User/domain/value-objects/UserId'

export default class MockUserRepository implements UserRepository {
  private readonly saveMock: jest.Mock
  private readonly searchMock: jest.Mock

  constructor () {
    this.saveMock = jest.fn()
    this.searchMock = jest.fn()
  }

  async save (user: User): Promise<void> {
    this.saveMock(user)
  }

  async search (id: UserId): Promise<User | null> {
    this.searchMock(id)
    return null
  }

  assertSearchHaveBeenCalledWith (id: UserId): void {
    expect(this.saveMock).toHaveBeenCalledWith(id)
  }

  assertSaveHaveBeenCalledWith (user: User): void {
    expect(this.saveMock).toHaveBeenCalledWith(user)
  }
}
