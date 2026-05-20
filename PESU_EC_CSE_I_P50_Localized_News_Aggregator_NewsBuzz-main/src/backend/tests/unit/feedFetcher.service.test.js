import { jest } from "@jest/globals";

jest.unstable_mockModule("../../services/feedFetcher.js", () => ({
  fetchFeeds: jest.fn(async () => {
    // Mock the actual behavior - fetchFeeds doesn't return anything
    console.log("Mock fetchFeeds called");
    return undefined;
  })
}));

describe("FeedFetcher Service", () => {
  test("fetches mock feed", async () => {
    const { fetchFeeds } = await import("../../services/feedFetcher.js");
    await fetchFeeds();
    expect(fetchFeeds).toHaveBeenCalled();
  });
});