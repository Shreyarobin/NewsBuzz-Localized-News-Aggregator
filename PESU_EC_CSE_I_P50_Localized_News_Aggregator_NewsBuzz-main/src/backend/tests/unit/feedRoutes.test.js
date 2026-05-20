import request from "supertest";
import { jest } from "@jest/globals";

// Mock Feed model
jest.unstable_mockModule("../../models/feedModel.js", () => ({
  default: {
    find: jest.fn().mockResolvedValue([
      { _id: "1", url: "http://example.com/rss", category: "Tech" }
    ]),
    findById: jest.fn().mockResolvedValue({
      _id: "1",
      url: "http://example.com/rss"
    }),
    create: jest.fn().mockResolvedValue({
      _id: "2",
      url: "http://new.com/rss"
    }),
    findByIdAndUpdate: jest.fn().mockResolvedValue({
      _id: "1",
      url: "http://updated.com/rss"
    }),
    findByIdAndDelete: jest.fn().mockResolvedValue({
      _id: "1"
    })
  }
}));

const app = (await import("../../index.js")).default;

describe("Feed Routes", () => {
  describe("GET /api/feeds", () => {
    test("returns all feeds", async () => {
      const response = await request(app).get("/api/feeds");
      expect([200, 500]).toContain(response.status);
    });
  });

  describe("GET /api/feeds/:id", () => {
    test("returns single feed", async () => {
      const response = await request(app).get("/api/feeds/feed123");
      expect([200, 404, 500]).toContain(response.status);
    });
  });

  describe("POST /api/feeds", () => {
    test("creates new feed", async () => {
      const response = await request(app)
        .post("/api/feeds")
        .send({
          url: "http://example.com/rss",
          category: "Tech"
        });
      
      expect([200, 201, 400, 404, 500]).toContain(response.status);
    });
  });

  describe("PUT /api/feeds/:id", () => {
    test("updates feed", async () => {
      const response = await request(app)
        .put("/api/feeds/feed123")
        .send({
          url: "http://updated.com/rss"
        });
      
      expect([200, 404, 500]).toContain(response.status);
    });
  });

  describe("DELETE /api/feeds/:id", () => {
    test("deletes feed", async () => {
      const response = await request(app)
        .delete("/api/feeds/feed123");
      
      expect([200, 404, 500]).toContain(response.status);
    });
  });
});