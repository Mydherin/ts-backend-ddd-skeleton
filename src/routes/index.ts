import { Router } from 'express'
import glob from 'glob'
import path from 'path'

export async function registerRoutes (router: Router): Promise<void> {
  // Read *.route.ts files in routes folder
  const routes = glob.sync(path.join(__dirname, '/**/*.route.*'))
  // Register the routes for each file
  await routes.map(async route => await register(route, router))
}

async function register (routePath: string, router: Router): Promise<void> {
  // Import register method from route file
  let register = await import(routePath)
  register = register.default
  // Register routes on router
  await register(router)
}
