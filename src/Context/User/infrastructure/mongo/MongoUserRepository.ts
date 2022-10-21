import MongoRepository from '../../../Shared/infrastructure/mongo/MongoRepository'
import User from '../../domain/User'
import UserRepository from '../../domain/UserRepository'
import UserRequestFactory from '../../domain/UserRequestFactory'
import UserId from '../../domain/value-objects/UserId'

export default class MongoUserRepository extends MongoRepository implements UserRepository {
  collectionName (): string {
    return 'users'
  }

  async save (user: User): Promise<void> {
    await this.persist(user.id.value, user)
  }

  async search (id: UserId): Promise<User | null> {
    const collection = await this.collection()
    const document = await collection.findOne({ _id: id.value })

    return (document != null) ? UserRequestFactory.create({ id: id.value, name: document.name, password: document.password, email: document.email }) : null
  }
}
