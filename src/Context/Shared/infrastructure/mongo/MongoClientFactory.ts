import { MongoClient } from 'mongodb'
import MongoConfig from './MongoConfig'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export default class MongoClientFactory {
  private static client: MongoClient

  static async create (config: MongoConfig): Promise<MongoClient> {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!this.client) {
      // Create client
      this.client = new MongoClient(config.url, { ignoreUndefined: true })
      // Connect client
      await this.client.connect()
    }
    return this.client
  }
}
