import request from "supertest";
import app from "../index.js";

describe("News Categorization API", () => {
  test("should return categorized news successfully", async () => {
    const response = await request(app).get("/api/news/categories");
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });
});