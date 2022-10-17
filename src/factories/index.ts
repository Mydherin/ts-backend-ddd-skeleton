import { ContainerBuilder, YamlFileLoader } from 'node-dependency-injection'
import path from 'path'

export default async function getContainer (): Promise<ContainerBuilder> {
  const container = new ContainerBuilder()
  const loader = new YamlFileLoader(container)
  const env = (process.env.NODE_ENV === undefined) ? 'dev' : process.env.NODE_ENV

  await loader.load(path.join(__dirname, `application_${env}.yaml`))
  return container
}
