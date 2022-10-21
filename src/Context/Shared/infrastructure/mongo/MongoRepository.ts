import { Collection, MongoClient } from 'mongodb'
import Aggregate from '../../domain/Aggregate'

export default abstract class MongoRepository {
  private readonly client: Promise<MongoClient>

  constructor (client: Promise<MongoClient>) {
    this.client = client
  }

  protected abstract collectionName (): string

  protected async collection (): Promise<Collection> {
    return (await this.client).db().collection(this.collectionName())
  }

  protected async persist (id: Object, aggregate: Aggregate): Promise<void> {
    // Get collection name
    const collection = await this.collection()
    // Define document
    const document = { ...aggregate.toPrimitives() }
    // Update
    await collection.updateOne(id, { $set: document }, { upsert: true })
  }
}
