import config from '../config'
import MongoConfig from './MongoConfig'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export default class MongoConfigFactory {
  static create (): MongoConfig {
    // Get config
    const url = config.get('mongo.url')
    // Return Mongo Config Object
    return { url }
  }
}
