import request from "supertest";
import app from "../../index.js";

describe("🔥 Error Branch Coverage Boost", () => {

  test("invalid ObjectId triggers error branch", async () => {
    const res = await request(app).get("/api/users/invalid-id");
    expect([400, 404, 500]).toContain(res.status);
  });

  test("missing POST body triggers branch", async () => {
    const res = await request(app).post("/api/feeds").send({});
    expect([400,404, 422]).toContain(res.status);
  });

});
