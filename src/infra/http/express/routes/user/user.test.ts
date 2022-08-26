import app from "@infra/http/express/app";
import request from "supertest";

describe("Express - User", () => {
  it("should create user without id", async () => {
    const response = await request(app).post("/user").send({
      name: "Test User",
      username: "test_user_sdfj",
      email: "test@user2.com",
      password: "123teste312",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  });

  it("should create user with id", async () => {
    const response = await request(app).post("/user").send({
      id: "9bec9383-5a22-4a70-9242-cfc3f3926ca8",
      name: "Milton Carlos Katoo",
      username: "milton",
      email: "milton@katoo.com",
      password: "teste12345",
    });

    expect(response.status).toBe(201);
    expect(response.body).not.toHaveProperty("password");
    expect(response.body).toHaveProperty(
      "id",
      "9bec9383-5a22-4a70-9242-cfc3f3926ca8"
    );
  });

  it("should authenticate a valid user", async () => {
    const user = await request(app).get("/user").send();
  });

  it("should not authenticate a invalid user", async () => {
    const user = await request(app).get("/user").send();
  });

  it("should get user data an through access token", async () => {
    const user = await request(app).get("/user").send();
  });

  it("should not get user data an through invalid access token", async () => {
    const user = await request(app).get("/user").send();
  });

  it("should renew access token and refresh token", async () => {
    const user = await request(app).get("/user").send();
  });

  it("should not renew access token and refresh token", async () => {
    const user = await request(app).get("/user").send();
  });
});
