import { jest } from "@jest/globals";

// 1️⃣ Mock Article model BEFORE loading the service
jest.unstable_mockModule("../../models/articleModel.js", () => ({
  default: {
    find: jest.fn()
  }
}));

// 2️⃣ Import service AFTER the mock
const { getPersonalizedSuggestions } = await import("../../services/suggestionService.js");
const Article = (await import("../../models/articleModel.js")).default;

describe("Suggestion Service - missing branch fix", () => {

  test("handles missing user.interests (undefined)", async () => {
    // Mock chainable find().limit()
    Article.find.mockReturnValue({
      limit: jest.fn().mockResolvedValue([])
    });

    const user = {}; // no interests → missing branch

    const result = await getPersonalizedSuggestions(user);

    expect(Article.find).toHaveBeenCalled();
    expect(result).toEqual([]);
  }, 10000); // Increase timeout (optional)
});
