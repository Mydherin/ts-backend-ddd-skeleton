import convict from 'convict'
import Path from 'path'

// Define config params
const config = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'dev', 'test'],
    default: 'production',
    env: 'NODE_ENV'
  },
  mongo: {
    url: {
      doc: 'The Mongo connection URL',
      format: String,
      env: 'MONGO_URL',
      default: 'mongodb://localhost:27017/app'
    }
  }
})

// Load default config
config.loadFile(Path.join(__dirname, '/default.json'))

// Load enviroment config
config.loadFile(Path.join(__dirname, `/${config.get('env')}.json`))

export default config
