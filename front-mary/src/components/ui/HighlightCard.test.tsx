import { render, screen } from "@testing-library/react";
import React from "react";
import { HighlightCard } from "./HightlighCard";

const mockHighlights = [
  {
    title: "Test Highlight 1",
    date: "2024-01-01",
    description: "Description 1",
    source: "Source A",
    relevance: 3,
  },
  {
    title: "Test Highlight 2",
    date: "2024-02-01",
    description: "Description 2",
    source: "Source B",
    relevance: 5,
  },
];

describe("HighlightCard", () => {
  it("renders a list of highlights", () => {
    render(<HighlightCard highlights={mockHighlights} />);

    expect(screen.getByText("Test Highlight 1")).toBeInTheDocument();
    expect(screen.getByText("Test Highlight 2")).toBeInTheDocument();

    expect(screen.getByText("Description 1")).toBeInTheDocument();
    expect(screen.getByText("Description 2")).toBeInTheDocument();

    expect(screen.getByText("Source: Source A")).toBeInTheDocument();
    expect(screen.getByText("Source: Source B")).toBeInTheDocument();
  });

  it("renders nothing when highlights is an empty array", () => {
    const { container } = render(<HighlightCard highlights={[]} />);
    expect(container.firstChild).toBeNull();
  });
});
