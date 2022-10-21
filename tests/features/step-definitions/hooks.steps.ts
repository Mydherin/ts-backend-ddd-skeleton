import { AfterAll, BeforeAll } from '@cucumber/cucumber'
import { App } from '../../../src/App'
import getContainer from '../../../src/factories'
import { EnvironmentArranger } from '../../Context/Shared/infrastructure/EnvironmentArranger'

let application: App
let envinromentArranger: EnvironmentArranger

BeforeAll(async () => {
  const container = await getContainer()
  envinromentArranger = container.get('App.tests.Context.Shared.infrastructure.MongoEnvironmentArranger')
  await envinromentArranger.arrange()
  application = new App()
  application.start()
})

AfterAll(async () => {
  await envinromentArranger.arrange()
  await envinromentArranger.close()
  application.stop()
})

export { application }
