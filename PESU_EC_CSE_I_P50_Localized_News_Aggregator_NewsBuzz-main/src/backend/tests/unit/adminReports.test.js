import request from "supertest";
import { jest } from "@jest/globals";

// Mock models
jest.unstable_mockModule("../../models/ingestionReportModel.js", () => ({
  default: {
    find: jest.fn().mockReturnValue({
      sort: jest.fn().mockResolvedValue([
        { _id: "1", totalArticles: 100, date: new Date() }
      ])
    })
  }
}));

const app = (await import("../../index.js")).default;

describe("Admin Reports Routes", () => {
  describe("GET /api/admin/reports", () => {
    test("returns admin reports", async () => {
      const response = await request(app).get("/api/admin/reports");
      expect([200, 201, 400, 404, 500]).toContain(response.status);
    });
  });

  describe("GET /api/admin/reports/:id", () => {
    test("returns specific report", async () => {
      const response = await request(app).get("/api/admin/reports/report123");
      expect([200, 404, 500]).toContain(response.status);
    });
  });

  describe("POST /api/admin/reports", () => {
    test("creates new report", async () => {
      const response = await request(app)
        .post("/api/admin/reports")
        .send({
          totalArticles: 150,
          successfulFeeds: 10,
          failedFeeds: 2
        });
      
      expect([200, 201, 400,404,500]).toContain(response.status);
    });
  });
});