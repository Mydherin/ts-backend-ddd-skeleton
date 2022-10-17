import { AfterAll, BeforeAll } from '@cucumber/cucumber'
import { App } from '../../../src/App'

let application: App

BeforeAll(() => {
  application = new App()
  application.start()
})

AfterAll(() => {
  application.stop()
})

export { application }
