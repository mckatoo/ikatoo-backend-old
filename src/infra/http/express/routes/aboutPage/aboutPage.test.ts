import app from "@infra/http/express/app";
import request from "supertest";
import { randomUUID } from "crypto";

describe('Express - About Page', () => {
  it('should create about page without id', async () => {
    const response = await request(app).post("/about").send({
      title: "title",
      description: "description",
    })

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty("id")
  });

  it('should create about page withid', async () => {
    const id = randomUUID()
    const response = await request(app).post("/about").send({
      id,
      title: "title",
      description: "description",
    })

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty("id", id)
  });

  it('should get about page data', async () => {
    const aboutPageData = await request(app).post("/about").send({
      title: "title",
      description: "description",
    })
    const response = await request(app).get("/about").send()

    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual(aboutPageData.body);
  });
});
