import { Router } from 'express'
import getContainer from '../factories'

export default async function register (router: Router): Promise<void> {
  const container = await getContainer()
  const controller = container.get('App.controllers.StatusGetController')
  router.get('/status', (req, res) => {
    void controller.run(req, res) // Async function
  })
}
