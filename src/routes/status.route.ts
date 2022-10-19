import { Router } from 'express'
import StatusGetController from '../controllers/StatusGetController'

export default function register (router: Router): void {
  const controller = new StatusGetController()
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  router.get('/status', async (req, res) => {
    await controller.run(req, res)
  })
}
