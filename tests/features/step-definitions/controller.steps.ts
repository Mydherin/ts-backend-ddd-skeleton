import assert from 'assert'
import { Given, Then } from '@cucumber/cucumber'
import request from 'supertest'
import { application } from './hooks.steps'

// TODO: Fix type error
let _request: any // Should be request.Test
let _response: any // Should be request.Response

Given('I send a GET request to {string}', (route: string) => {
  _request = request(application.httpServer).get(route)
})

Then('the response status code should be {int}', (status: number) => {
  _response = _request.expect(status)
})

Then('the response should be empty', () => {
  assert.deepStrictEqual(_response.body, {})
})
