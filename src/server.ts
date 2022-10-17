import bodyParser from 'body-parser'
import compress from 'compression'
import errorHandler from 'errorhandler'
import express, { Request, Response, Router } from 'express'
import helmet from 'helmet'
import * as http from 'http'
import httpStatus from 'http-status'
import { registerRoutes } from './routes'

// Server class, it represents an enriched http server
export class Server {
  private readonly express: express.Express // Express object
  private readonly port: string // Server port
  private httpServer?: http.Server // Http server

  constructor (port: string) {
    // Define port
    this.port = port

    // Define express object
    this.express = express()

    // Define router, it can handle promises
    const router = Router()

    // Define all middlewares
    this.express.use(bodyParser.json()) // It allows to get the body request as an object
    this.express.use(bodyParser.urlencoded({ extended: true })) // It allows to get the urlencoded data as an object
    this.express.use(helmet.xssFilter()) // Add XSS protection
    this.express.use(helmet.noSniff()) // Mitigate MIME type sniffing
    this.express.use(helmet.hidePoweredBy()) // Remove X-Powered-By header which give less information about tech you are using plus save bandwidth
    this.express.use(helmet.frameguard({ action: 'deny' })) // It protects against clickjacking attacks
    this.express.use(compress()) // It tries to compress every response body saving bandwidth
    this.express.use(router) // Assing the router to the express object
    this.express.use(this.notFound) // Handle not found error
    if (process.env.NODE_ENV === 'dev') {
      this.express.use(errorHandler()) // Handle any unexpected exception an show details on client side
    }
    this.express.use(this.internalSeverError) // Handle any unexpected exception as 500 Internal Server Error

    // Register all routes
    void registerRoutes(router) // Async function
  }

  // Not found json middleware
  /// It can be use as router middleware
  private notFound (_req: Request, res: Response, _next: Function): void {
    res.status(httpStatus.NOT_FOUND).json(
      {
        error: 'Not Found Error'
      }
    )
  }

  // Internal server error json middleware
  /// It can be use as router middleware
  private internalSeverError (err: Error, _req: Request, res: Response, _next: Function): void {
    console.log(err)
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json(
      {
        error: 'Internal Server Error'
      })
  }

  // Start the server listening
  listen (): void {
    // Start listenning and save http server object to handle it in the future
    this.httpServer = this.express.listen(this.port, () => {
      console.log(
        `Server is running at http://localhost:${this.port} in ${this.express.get('env') as string} mode`
      )
      console.log('  Press CTRL-C to stop\n')
    })
  }

  // Return http server object
  getHTTPServer (): http.Server | undefined {
    return this.httpServer
  }

  // Stop http server
  stop (): void {
    if (this.httpServer != null) {
      this.httpServer.close(error => {
        if (error != null) {
          console.log(error)
        } else {
          console.log('Server was closed')
        }
      })
    }
  }
}
