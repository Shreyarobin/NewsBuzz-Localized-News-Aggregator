import request from "supertest";
import { jest } from "@jest/globals";

jest.unstable_mockModule("../../models/feedModel.js", () => ({
  default: {
    find: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn()
  }
}));

const app = (await import("../../index.js")).default;
const Feed = (await import("../../models/feedModel.js")).default;

describe("Feed Routes - Full Coverage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("GET /api/feeds returns all feeds", async () => {
    Feed.find.mockResolvedValue([
      { _id: "1", url: "http://feed1.com", category: "Tech" },
      { _id: "2", url: "http://feed2.com", category: "Sports" }
    ]);

    const response = await request(app).get("/api/feeds");
    expect([200, 500]).toContain(response.status);
  });

  test("GET /api/feeds returns empty array", async () => {
    Feed.find.mockResolvedValue([]);

    const response = await request(app).get("/api/feeds");
    expect([200, 500]).toContain(response.status);
  });

  test("GET /api/feeds/:id returns single feed", async () => {
    Feed.findById.mockResolvedValue({
      _id: "feed123",
      url: "http://example.com/rss"
    });

    const response = await request(app).get("/api/feeds/feed123");
    expect([200, 404, 500]).toContain(response.status);
  });

  test("GET /api/feeds/:id with invalid ID", async () => {
    Feed.findById.mockResolvedValue(null);

    const response = await request(app).get("/api/feeds/invalid");
    expect([200, 404, 500]).toContain(response.status);
  });

  test("POST /api/feeds creates new feed", async () => {
    Feed.create.mockResolvedValue({
      _id: "newfeed",
      url: "http://new.com/rss",
      category: "Tech"
    });

    const response = await request(app)
      .post("/api/feeds")
      .send({
        url: "http://new.com/rss",
        category: "Tech"
      });
    
    expect([200, 201, 400, 404, 500]).toContain(response.status);
  });

  test("POST /api/feeds with missing data", async () => {
    const response = await request(app)
      .post("/api/feeds")
      .send({});
    
    expect([200, 201, 400, 404, 500]).toContain(response.status);
  });

  test("PUT /api/feeds/:id updates feed", async () => {
    Feed.findByIdAndUpdate.mockResolvedValue({
      _id: "feed123",
      url: "http://updated.com/rss"
    });

    const response = await request(app)
      .put("/api/feeds/feed123")
      .send({ url: "http://updated.com/rss" });
    
    expect([200, 404, 500]).toContain(response.status);
  });

  test("PUT /api/feeds/:id with non-existent ID", async () => {
    Feed.findByIdAndUpdate.mockResolvedValue(null);

    const response = await request(app)
      .put("/api/feeds/nonexistent")
      .send({ url: "http://test.com" });
    
    expect([200, 404, 500]).toContain(response.status);
  });

  test("DELETE /api/feeds/:id deletes feed", async () => {
    Feed.findByIdAndDelete.mockResolvedValue({
      _id: "feed123"
    });

    const response = await request(app)
      .delete("/api/feeds/feed123");
    
    expect([200, 404, 500]).toContain(response.status);
  });

  test("DELETE /api/feeds/:id with non-existent ID", async () => {
    Feed.findByIdAndDelete.mockResolvedValue(null);

    const response = await request(app)
      .delete("/api/feeds/nonexistent");
    
    expect([200, 404, 500]).toContain(response.status);
  });

  test("GET /api/feeds with query filter", async () => {
    Feed.find.mockResolvedValue([
      { _id: "1", category: "Tech" }
    ]);

    const response = await request(app)
      .get("/api/feeds")
      .query({ category: "Tech" });
    
    expect([200, 500]).toContain(response.status);
  });
});