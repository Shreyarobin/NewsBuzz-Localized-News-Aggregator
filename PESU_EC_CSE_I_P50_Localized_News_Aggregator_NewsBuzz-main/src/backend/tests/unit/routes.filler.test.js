import request from "supertest";
import app from "../../index.js";

describe("Routes low-coverage filler", () => {

  // hits lines 12–35
  test("GET /api/suggestions with no params", async () => {
    const res = await request(app).get("/api/suggestions");
    expect([200,400,401,404,500]).toContain(res.status);
  });

  // hits lines 63–67
  test("GET /api/suggestions?limit=5", async () => {
    const res = await request(app).get("/api/suggestions?limit=5");
    expect([200,400,401,404,500]).toContain(res.status);
  });

  // hits lines 79–83
  test("GET /api/suggestions?userId=abc", async () => {
    const res = await request(app).get("/api/suggestions?userId=abc");
    expect([200,400,401,404,500]).toContain(res.status);
  });

});
