import { MongoClient } from 'mongodb'
import { EnvironmentArranger } from '../EnvironmentArranger'

export class MongoEnvironmentArranger implements EnvironmentArranger {
  private readonly client: Promise<MongoClient>

  constructor (client: Promise<MongoClient>) {
    this.client = client
  }

  public async arrange (): Promise<void> {
    await this.cleanDatabase()
  }

  protected async cleanDatabase (): Promise<void> {
    const collections = await this.collections()
    const client = await this.client

    for (const collection of collections) {
      await client.db().collection(collection).deleteMany({})
    }
  }

  private async collections (): Promise<string[]> {
    const client = await this.client
    const collections = await client.db().listCollections(undefined, { nameOnly: true }).toArray()

    return collections.map(collection => collection.name)
  }

  public async close (): Promise<void> {
    return await (await this.client).close()
  }
}
