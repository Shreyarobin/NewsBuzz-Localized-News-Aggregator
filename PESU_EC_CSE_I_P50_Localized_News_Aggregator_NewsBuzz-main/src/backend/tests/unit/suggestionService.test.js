import { jest } from "@jest/globals";

// Mock Article model BEFORE importing the service
jest.unstable_mockModule("../../models/articleModel.js", () => ({
  default: {
    find: jest.fn().mockReturnValue({
      limit: jest.fn().mockResolvedValue([
        { title: "Test Article 1", category: "Tech" },
        { title: "Test Article 2", category: "Sports" }
      ])
    })
  }
}));

// Import the service AFTER mocking
const { getPersonalizedSuggestions } = await import("../../services/suggestionService.js");

describe("Suggestion Service", () => {
  test("handles empty list safely", async () => {
    const result = await getPersonalizedSuggestions({ interests: [] });
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThanOrEqual(0);
  });

  test("returns articles when user has interests", async () => {
    const result = await getPersonalizedSuggestions({ 
      interests: ["Tech", "Sports"] 
    });
    expect(Array.isArray(result)).toBe(true);
  });
});