import { jest } from "@jest/globals";
import {
  getMostReadCategories,
  getArticleEngagement,
  getIngestionStats
} from "../../controllers/analyticsController.js";

// Mock response object
const mockResponse = () => {
  return {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
  };
};

describe("Analytics Controller", () => {
  test("getMostReadCategories returns data", async () => {
    const req = {};
    const res = mockResponse();
    
    const Article = (await import("../../models/articleModel.js")).default;
    jest.spyOn(Article, "aggregate").mockResolvedValue([
      { _id: "Tech", totalViews: 50 }
    ]);
    
    await getMostReadCategories(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
  });

  test("getArticleEngagement returns article list", async () => {
    const req = {};
    const res = mockResponse();
    
    const Article = (await import("../../models/articleModel.js")).default;
    jest.spyOn(Article, "find").mockReturnValue({
      sort: jest.fn().mockResolvedValue([
        { title: "Test Article", category: "Tech", views: 20 }
      ])
    });
    
    await getArticleEngagement(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
  });

  test("getIngestionStats returns logs", async () => {
    const req = {};
    const res = mockResponse();
    
    const IngestionLog = (await import("../../models/ingestionLogModel.js")).default;
    jest.spyOn(IngestionLog, "find").mockReturnValue({
      sort: jest.fn().mockReturnValue({
        limit: jest.fn().mockResolvedValue([
          { log: "Ingestion completed" }
        ])
      })
    });
    
    await getIngestionStats(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
  });
});