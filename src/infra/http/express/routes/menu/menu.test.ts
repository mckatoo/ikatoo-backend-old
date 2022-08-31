import request from 'supertest'

import app from '@infra/http/express/app'
import { mockedPublicMenu } from './mock'

describe('Menu', () => {
  it('should create menu', async () => {
    const response = await request(app).post('/menu').send({
      menu: mockedPublicMenu
    })

    expect(response.status).toBe(201)
  })

  it.skip('should get a public menu', async () => {
    const response = await request(app).get('/menu/public').send()

    expect(response.body).toMatchObject(mockedPublicMenu)
  })
})
