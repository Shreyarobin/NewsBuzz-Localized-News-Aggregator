import React from "react";
import { render } from "@testing-library/react";
import Bookmarks from "../Bookmarks";

describe("Bookmarks Component", () => {
  test("renders Bookmarks safely without token", () => {
    const { container } = render(<Bookmarks />);
    expect(container).toBeInTheDocument();
  });

  test("shows 'No saved articles yet' when no token exists", async () => {
    // ensure no token
    global.localStorage.getItem = jest.fn(() => null);

    const { findByText } = render(<Bookmarks />);
    const noArticlesText = await findByText(/No saved articles yet/i);
    expect(noArticlesText).toBeInTheDocument();
  });

  test("renders correctly when token exists (mock API returns empty list)", async () => {
    // mock token
    global.localStorage.getItem = jest.fn(() => "fake-token");

    // mock fetch
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            success: true,
            articles: []
          })
      })
    );

    const { findByText } = render(<Bookmarks />);

    // should show the fallback empty message
    const noArticlesText = await findByText(/No saved articles yet/i);
    expect(noArticlesText).toBeInTheDocument();
  });
});
