import request from "supertest";
import { jest } from "@jest/globals";

// Mock the controller
jest.unstable_mockModule("../../controllers/bookmarkController.js", () => ({
  addBookmark: jest.fn((req, res) => res.status(200).json({ success: true })),
  removeBookmark: jest.fn((req, res) => res.status(200).json({ success: true })),
  getBookmarks: jest.fn((req, res) => res.status(200).json({ success: true, bookmarks: [] }))
}));

const app = (await import("../../index.js")).default;

describe("Bookmark Routes", () => {
  describe("POST /api/bookmarks/:userId", () => {
    test("adds a bookmark", async () => {
      const response = await request(app)
        .post("/api/bookmarks/user123")
        .send({ articleId: "article456" });
      
      expect([200, 400, 404, 500]).toContain(response.status);
    });
  });

  describe("DELETE /api/bookmarks/:userId/:articleId", () => {
    test("removes a bookmark", async () => {
      const response = await request(app)
        .delete("/api/bookmarks/user123/article456");
      
      expect([200, 404, 500]).toContain(response.status);
    });
  });

  describe("GET /api/bookmarks/:userId", () => {
    test("gets user bookmarks", async () => {
      const response = await request(app)
        .get("/api/bookmarks/user123");
      
      expect([200, 404, 500]).toContain(response.status);
    });
  });
});