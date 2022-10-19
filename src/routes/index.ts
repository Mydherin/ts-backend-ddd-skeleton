import { Router } from 'express'
import glob from 'glob'
import path from 'path'

export function registerRoutes (router: Router): void {
  // Read *.route.ts files in routes folder
  const routes = glob.sync(path.join(__dirname, '/**/*.route.*'))
  // Register the routes for each file
  routes.map(route => register(route, router))
}

function register (routePath: string, router: Router): void {
  // Import register method from route file
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  let register = require(routePath)
  register = register.default
  // Register routes on router
  register(router)
}
