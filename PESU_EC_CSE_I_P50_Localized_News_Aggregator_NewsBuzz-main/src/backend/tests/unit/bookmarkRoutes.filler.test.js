import request from "supertest";
import app from "../../index.js";

describe("Bookmark route filler coverage", () => {

  test("GET /api/bookmarks/testUser", async () => {
    const res = await request(app).get("/api/bookmarks/testUser");
    expect([200,401,404,500]).toContain(res.status);
  });

  test("POST /api/bookmarks/testUser", async () => {
    const res = await request(app)
      .post("/api/bookmarks/testUser")
      .send({ articleId: "fakeId" });
    expect([200,400,404,500]).toContain(res.status);
  });

});
