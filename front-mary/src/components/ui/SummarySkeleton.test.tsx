import React from "react";
import { render, screen } from "@testing-library/react";
import { SummarySkeleton } from "./SummarySkeleton";

describe("SummarySkeleton", () => {
  it("renders all section titles", () => {
    render(<SummarySkeleton />);

    expect(screen.getByText("Summary")).toBeInTheDocument();
    expect(screen.getByText("Facts")).toBeInTheDocument();
    expect(screen.getByText("People")).toBeInTheDocument();
    expect(screen.getByText("Places")).toBeInTheDocument();
    expect(screen.getByText("Next Events")).toBeInTheDocument();
  });

  it("renders correct number of skeleton list items for each section", () => {
    render(<SummarySkeleton />);

    const listItems = screen.getAllByRole("listitem");
    expect(listItems).toHaveLength(12);
  });

  it("renders skeletons for summary section", () => {
    render(<SummarySkeleton />);

    const skeletons = screen.getAllByText((content, element) => {
      return element?.tagName.toLowerCase() === "span" &&
        element.className.includes("MuiSkeleton-root");
    });
    expect(skeletons.length).toBeGreaterThanOrEqual(3); 
  });
});

