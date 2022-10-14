import { App } from './App'

// Start the App
new App().start()
  .catch((error) => {
    console.log(error)
    process.exit(1)
  })

// Handle unexpected exceptions
process.on('uncaughtException', err => {
  console.log('uncaughtException', err)
  process.exit(1)
})
