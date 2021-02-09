import * as Project from '../../../models/Project'
import server from '../../../server'
import supertest from 'supertest'

jest.mock('../../../models/Project')

let jestServer
let request

beforeAll(async (done) => {
  jestServer = server.listen(done)
  request = await supertest.agent(jestServer)
})
​
afterAll(async (done) => {
  await server.close(done)
})