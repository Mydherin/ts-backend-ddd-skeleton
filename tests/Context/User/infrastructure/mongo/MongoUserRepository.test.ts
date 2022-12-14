import { ContainerBuilder } from 'node-dependency-injection'
import User from '../../../../../src/Context/User/domain/User'
import UserEmail from '../../../../../src/Context/User/domain/value-objects/UserEmail'
import UserName from '../../../../../src/Context/User/domain/value-objects/UserName'
import UserPassword from '../../../../../src/Context/User/domain/value-objects/UserPassword'
import MongoUserRepository from '../../../../../src/Context/User/infrastructure/mongo/MongoUserRepository'
import getContainer from '../../../../../src/factories'
import { EnvironmentArranger } from '../../../Shared/infrastructure/EnvironmentArranger'

let container: ContainerBuilder
let repository: MongoUserRepository
let environmentArranger: EnvironmentArranger

beforeEach(async () => {
  // Instance container dependency injection
  container = await getContainer()
  repository = container.get('App.Context.User.infrastructure.mongo.MongoUserRepository')
  environmentArranger = container.get('App.tests.Context.Shared.infrastructure.MongoEnvironmentArranger')
  await environmentArranger.arrange()
})

afterAll(async () => {
  await environmentArranger.arrange()
  await environmentArranger.close()
})

describe('Mongo User Repository', () => {
  it('should save an user', async () => {
    // Create new User
    const expectedUser = new User({
      name: new UserName('Mydherin'),
      password: new UserPassword('P@ssw0rd'),
      email: new UserEmail('email@email.com')
    })
    // Save it using mongo user repository
    await repository.save(expectedUser)
    // Get user
    const user = await repository.search(expectedUser.name)
    expect(user).toEqual(expectedUser)
  })
})
