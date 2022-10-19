import assert from 'assert'
import { Given, Then } from '@cucumber/cucumber'
import request from 'supertest'
import { application } from './hooks.steps'

// TODO: Fix type error
// Declare request
let _request: any // Should be request.Test
// Declare response
let _response: any // Should be request.Response

Given('I send a GET request to {string}', (route: string) => {
  _request = request(application.httpServer).get(route)
})
Given('I send a PUT request to {string} with body:', (route: string, body: string) => {
  _request = request(application.httpServer).put(route).send(JSON.parse(body))
})

Then('the response status code should be {int}', async (status: number) => {
  _response = await _request.expect(status)
})

Then('the response should be empty', () => {
  assert.deepStrictEqual(_response.body, {})
})

Then('the response should contain {string}', (value: string) => {
  const regexp: RegExp = new RegExp(value)
  assert.match(JSON.stringify(_response.body), regexp)
})
