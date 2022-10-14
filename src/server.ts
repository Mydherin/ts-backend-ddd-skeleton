import bodyParser from 'body-parser'
import compress from 'compression'
import errorHandler from 'errorhandler'
import express, { Request, Response } from 'express'
import Router from 'express-promise-router'
import helmet from 'helmet'
import * as http from 'http'
import httpStatus from 'http-status'
import { registerRoutes } from './routes'

export class Server {
  private readonly express: express.Express
  private readonly port: string
  private httpServer?: http.Server

  constructor (port: string) {
    this.port = port
    this.express = express()
    this.express.use(bodyParser.json())
    this.express.use(bodyParser.urlencoded({ extended: true }))
    this.express.use(helmet.xssFilter())
    this.express.use(helmet.noSniff())
    this.express.use(helmet.hidePoweredBy())
    this.express.use(helmet.frameguard({ action: 'deny' }))
    this.express.use(compress())
    const router = Router()
    router.use(errorHandler())
    this.express.use(router)

    registerRoutes(router)

    router.use((err: Error, _req: Request, res: Response, _next: Function) => {
      console.log(err)
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json(
        {
          error: err.message
        })
    })

    this.express.use((_req, res, _next) => {
      res.status(httpStatus.NOT_FOUND).json(
        {
          error: 'Not found'
        }
      )
    })
  }

  async listen (): Promise<void> {
    return await new Promise(resolve => {
      this.httpServer = this.express.listen(this.port, () => {
        console.log(
          `App is running at http://localhost:${this.port} in ${this.express.get('env') as string} mode`
        )
        console.log('  Press CTRL-C to stop\n')
        resolve()
      })
    })
  }

  getHTTPServer (): http.Server | undefined {
    return this.httpServer
  }

  async stop (): Promise<void> {
    return await new Promise((resolve, reject) => {
      if (this.httpServer != null) {
        this.httpServer.close(error => {
          if (error != null) {
            return reject(error)
          }
          return resolve()
        })
      }

      return resolve()
    })
  }
}
