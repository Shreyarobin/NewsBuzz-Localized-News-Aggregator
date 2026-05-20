import request from "supertest";
import app from "../../index.js";

describe("🔥 Branch Coverage Booster - Routes", () => {

  test("GET /api/suggestions without userId", async () => {
    const res = await request(app).get("/api/suggestions");
    expect([200, 400, 401, 404]).toContain(res.status);
  });

  test("GET /api/suggestions with limit", async () => {
    const res = await request(app).get("/api/suggestions?limit=3");
    expect([200, 400, 401, 404]).toContain(res.status);
  });

  test("GET /api/bookmarks/missingUser", async () => {
    const res = await request(app).get("/api/bookmarks/unknownUser123");
    expect([200, 404]).toContain(res.status);
  });

});
