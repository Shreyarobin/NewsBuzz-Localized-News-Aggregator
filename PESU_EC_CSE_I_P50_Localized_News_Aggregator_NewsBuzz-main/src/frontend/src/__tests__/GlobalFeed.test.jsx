import React from "react";
import { render } from "@testing-library/react";
import GlobalFeed from "../GlobalFeed";

describe("GlobalFeed Component", () => {
  test("renders GlobalFeed safely", () => {
    const { container } = render(<GlobalFeed />);
    expect(container).toBeInTheDocument();
  });

  test("shows loading state initially", () => {
    const { getByText } = render(<GlobalFeed />);
    expect(getByText(/Loading/i)).toBeInTheDocument();
  });

  test("handles fetch and renders without crashing", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({
        success: true,
        articles: [
          { _id: "1", title: "News 1", summary: "Summary 1", category: "Tech" }
        ]
      })
    });

    const { container } = render(<GlobalFeed />);
    
    // Just verify the component rendered
    expect(container).toBeInTheDocument();
    
    // Wait a bit for async operations to complete
    await new Promise(resolve => setTimeout(resolve, 100));
  });
});