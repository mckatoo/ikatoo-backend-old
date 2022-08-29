import app from "@infra/http/express/app";
import request from "supertest";

describe("Express - Auth", () => {
  const user = {
    id: "9bec9383-5a22-4a70-9242-cfc3f3926ca8",
    name: "Milton Carlos Katoo",
    username: "milton",
    email: "milton@katoo.com",
    password: "teste12345",
  }
  
  beforeAll(async () => {
    await request(app).post("/user").send(user);
  });

  it("should authenticate a valid username", async () => {
    // const token = await request(app).post("/auth").send({
    //   username: user.username,
    //   password: user.password
    // });
  });

  // it("should not authenticate a invalid user", async () => {
  //   const login = await request(app).post("/auth").send();
  // });

  // it("should get user data an through access token", async () => {
  //   const login = await request(app).post("/auth").send();
  // });

  // it("should not get user data an through invalid access token", async () => {
  //   const login = await request(app).post("/auth").send();
  // });

  // it("should renew access token and refresh token", async () => {
  //   const login = await request(app).post("/auth").send();
  // });

  // it("should not renew access token and refresh token", async () => {
  //   const login = await request(app).post("/auth").send();
  // });
});
