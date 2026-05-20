import React from "react";
import { render } from "@testing-library/react";
import ArticleCard from "../ArticleCard";

const mockArticle = {
  _id: "123",
  title: "Test Article",
  summary: "Test summary",
  category: "Tech"
};

test("renders ArticleCard safely", () => {
  render(<ArticleCard article={mockArticle} />);
});

test("renders article title", () => {
  const { getByText } = render(<ArticleCard article={mockArticle} />);
  expect(getByText("Test Article")).toBeInTheDocument();
});

test("renders without bookmark button when showBookmark is false", () => {
  const { queryByText } = render(<ArticleCard article={mockArticle} showBookmark={false} />);
  expect(queryByText(/Save/i)).not.toBeInTheDocument();
});