import { Server } from './server'
import * as http from 'http'

export class App {
  server?: Server

  async start (): Promise<void> {
    // Get the server port from a enviroment variable or set 5001 as default
    const port = (process.env.PORT === undefined) ? '5001' : process.env.PORT
    this.server = new Server(port)
    return await this.server.listen()
  }

  get httpServer (): http.Server | undefined {
    return this.server?.getHTTPServer()
  }

  async stop (): Promise<void> {
    return await this.server?.stop()
  }
}
