import { jest } from "@jest/globals";

jest.unstable_mockModule("../../services/suggestionService.js", () => ({
  getPersonalizedSuggestions: jest.fn()
}));

const { personalizedSuggestions } = await import("../../controllers/suggestionController.js");
const { getPersonalizedSuggestions } = await import("../../services/suggestionService.js");

const mockResponse = () => ({
  status: jest.fn().mockReturnThis(),
  json: jest.fn()
});

describe("Suggestion Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("returns personalized suggestions", async () => {
    const req = {
      user: {
        _id: "user123",
        interests: ["Tech", "Sports"]
      }
    };
    const res = mockResponse();
    
    const mockSuggestions = [
      { _id: "1", title: "Tech Article", category: "Tech" },
      { _id: "2", title: "Sports Article", category: "Sports" }
    ];
    
    getPersonalizedSuggestions.mockResolvedValue(mockSuggestions);
    
    await personalizedSuggestions(req, res);
    
    expect(getPersonalizedSuggestions).toHaveBeenCalledWith(req.user);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      articles: mockSuggestions
    });
  });

  test("handles errors", async () => {
    const req = {
      user: { _id: "user123" }
    };
    const res = mockResponse();
    
    getPersonalizedSuggestions.mockRejectedValue(new Error("Service error"));
    
    await personalizedSuggestions(req, res);
    
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Service error"
    });
  });
});