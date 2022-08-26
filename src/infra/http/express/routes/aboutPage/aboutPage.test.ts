import app from "@infra/http/express/app";
import request from "supertest";

describe("Express - About Page", () => {
  it("should create about page without id", async () => {
    const response = await request(app).post("/about").send({
      title: "title",
      description: "description",
      user_id: "user_id_express",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  });

  it("should create about page withid", async () => {
    const response = await request(app).post("/about").send({
      id: "about_page_id",
      title: "title",
      description: "description",
      user_id: "user_id_express_withid",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id", "about_page_id");
  });

  it("should get about page data", async () => {
    const response = await request(app)
      .get("/about/user_id_express_withid")
      .send();

    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual({
      id: "about_page_id",
      title: "title",
      description: "description",
      user_id: "user_id_express_withid",
      image: {
        src: "",
        alt: ""
      },
      skills: []
    });
  });
});
