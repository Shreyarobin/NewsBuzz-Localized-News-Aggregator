import { jest } from "@jest/globals";
import * as feedFetcher from "../../services/feedFetcher.js";

jest.unstable_mockModule("../../services/feedFetcher.js", () => ({
  fetchFeeds: jest.fn(() => [{ title: "Mock Feed" }])
}));

describe("FeedFetcher Service", () => {
  test("fetches mock feed", async () => {
    const { fetchFeeds } = await import("../../services/feedFetcher.js");
    const data = await fetchFeeds();
    expect(data[0].title).toBe("Mock Feed");
  });
});
