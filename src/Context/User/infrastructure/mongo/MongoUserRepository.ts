import MongoRepository from '../../../Shared/infrastructure/mongo/MongoRepository'
import User from '../../domain/User'
import UserRepository from '../../domain/UserRepository'
import UserRequestFactory from '../../domain/UserRequestFactory'
import UserName from '../../domain/value-objects/UserName'

export default class MongoUserRepository extends MongoRepository implements UserRepository {
  collectionName (): string {
    return 'users'
  }

  async save (user: User): Promise<void> {
    await this.persist({ name: user.name.value }, user)
  }

  async search (name: UserName): Promise<User | null> {
    const collection = await this.collection()
    const document = await collection.findOne({ name: name.value })

    return (document != null) ? new User(UserRequestFactory.create({ name: name.value, password: document.password, email: document.email })) : null
  }
}
