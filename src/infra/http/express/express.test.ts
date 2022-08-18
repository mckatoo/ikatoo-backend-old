
import request from "supertest";
import app from "./app";

describe('Express Test', () => {
  it('should index ok', async () => {
    const response = await request(app).get("/").send()

    expect(response.status).toBe(200)
  });
});
