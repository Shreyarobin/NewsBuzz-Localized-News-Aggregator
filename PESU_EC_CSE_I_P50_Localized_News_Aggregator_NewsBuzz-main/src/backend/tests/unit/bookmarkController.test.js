import { jest } from "@jest/globals";

// Mock Article model
jest.unstable_mockModule("../../models/articleModel.js", () => ({
  default: {
    findById: jest.fn()
  }
}));

// Mock User model
jest.unstable_mockModule("../../models/userModel.js", () => ({
  default: {
    findById: jest.fn()
  }
}));

const { addBookmark, removeBookmark, getBookmarks } = 
  await import("../../controllers/bookmarkController.js");
const User = (await import("../../models/userModel.js")).default;
const Article = (await import("../../models/articleModel.js")).default;

const mockResponse = () => ({
  status: jest.fn().mockReturnThis(),
  json: jest.fn()
});

describe("Bookmark Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("addBookmark", () => {
    test("adds bookmark successfully", async () => {
      const req = {
        user: { _id: "user123" },
        body: { articleId: "article456" }
      };
      const res = mockResponse();
      
      const mockArticle = {
        _id: "article456",
        title: "Test Article",
        select: jest.fn().mockReturnThis()
      };
      
      const mockUser = {
        _id: "user123",
        bookmarks: [],
        save: jest.fn().mockResolvedValue(true)
      };
      
      Article.findById.mockReturnValue({
        select: jest.fn().mockResolvedValue(mockArticle)
      });
      User.findById.mockResolvedValue(mockUser);
      
      await addBookmark(req, res);
      
      expect(mockUser.bookmarks).toContain("article456");
      expect(mockUser.save).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: "Bookmarked",
        articleId: "article456"
      });
    });

    test("returns 400 when articleId missing", async () => {
      const req = {
        user: { _id: "user123" },
        body: {}
      };
      const res = mockResponse();
      
      await addBookmark(req, res);
      
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "articleId required"
      });
    });

    test("returns 404 when article not found", async () => {
      const req = {
        user: { _id: "user123" },
        body: { articleId: "nonexistent" }
      };
      const res = mockResponse();
      
      Article.findById.mockReturnValue({
        select: jest.fn().mockResolvedValue(null)
      });
      
      await addBookmark(req, res);
      
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "Article not found"
      });
    });

    test("handles already bookmarked article", async () => {
      const req = {
        user: { _id: "user123" },
        body: { articleId: "article456" }
      };
      const res = mockResponse();
      
      const mockArticle = {
        _id: "article456",
        title: "Test Article"
      };
      
      const mockUser = {
        _id: "user123",
        bookmarks: [{ toString: () => "article456" }],
        save: jest.fn()
      };
      
      Article.findById.mockReturnValue({
        select: jest.fn().mockResolvedValue(mockArticle)
      });
      User.findById.mockResolvedValue(mockUser);
      
      await addBookmark(req, res);
      
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: "Already bookmarked"
      });
    });
  });

  describe("removeBookmark", () => {
    test("removes bookmark successfully", async () => {
      const req = {
        user: { _id: "user123" },
        params: { articleId: "article456" }
      };
      const res = mockResponse();
      
      const mockUser = {
        _id: "user123",
        bookmarks: [{ toString: () => "article456" }],
        save: jest.fn().mockResolvedValue(true)
      };
      
      User.findById.mockResolvedValue(mockUser);
      
      await removeBookmark(req, res);
      
      expect(mockUser.save).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: "Bookmark removed"
      });
    });

    test("returns 404 when user not found", async () => {
      const req = {
        user: { _id: "user123" },
        params: { articleId: "article456" }
      };
      const res = mockResponse();
      
      User.findById.mockResolvedValue(null);
      
      await removeBookmark(req, res);
      
      expect(res.status).toHaveBeenCalledWith(404);
    });
  });

  describe("getBookmarks", () => {
    test("returns user bookmarks", async () => {
      const req = { user: { _id: "user123" } };
      const res = mockResponse();
      
      const mockUser = {
        _id: "user123",
        bookmarks: [
          { _id: "article1", title: "Test 1" },
          { _id: "article2", title: "Test 2" }
        ]
      };
      
      User.findById.mockReturnValue({
        populate: jest.fn().mockResolvedValue(mockUser)
      });
      
      await getBookmarks(req, res);
      
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        articles: mockUser.bookmarks
      });
    });

    test("returns 404 when user not found", async () => {
      const req = { user: { _id: "user123" } };
      const res = mockResponse();
      
      User.findById.mockReturnValue({
        populate: jest.fn().mockResolvedValue(null)
      });
      
      await getBookmarks(req, res);
      
      expect(res.status).toHaveBeenCalledWith(404);
    });
  });
});