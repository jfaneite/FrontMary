import { render, screen } from "@testing-library/react";
import HighlightsSkeleton from "./HighlightCardSkeleton";
import React from "react";

describe("HighlightsSkeleton", () => {
  it("renders default 5 skeleton cards", () => {
    render(<HighlightsSkeleton />);
    const cards = screen.getAllByTestId("highlight-skeleton");
    expect(cards).toHaveLength(5);
  });

  it("renders the specified number of skeleton cards", () => {
    render(<HighlightsSkeleton count={3} />);
    const cards = screen.getAllByTestId("highlight-skeleton");
    expect(cards).toHaveLength(3);
  });
});
