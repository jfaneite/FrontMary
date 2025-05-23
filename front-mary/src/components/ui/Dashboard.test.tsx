import { render, screen, fireEvent } from "@testing-library/react";
import Dashboard from "./Dashboard";
import React from "react";

const mockItems = [
  {
    id: "1",
    relevance: 3,
    source: "News",
    date: "2024-01-01",
    title: "First Highlight",
  },
  {
    id: "2",
    relevance: 5,
    source: "Blog",
    date: "2024-05-01",
    title: "Second Highlight",
  },
];

const mockSummary = {
  title: "Dashboard Summary",
  value: 42,
};

jest.mock("./Summary", () => ({
  Summary: ({ title }: { title: string }) => <div>{title}</div>,
}));

jest.mock("./SummarySkeleton", () => ({
  SummarySkeleton: () => <div>Loading Summary...</div>,
}));

jest.mock("./HightlighCard", () => ({
  HighlightCard: ({ highlights }: { highlights: typeof mockItems }) => (
    <div>
      {highlights.map((item) => (
        <div key={item.id}>{item.title}</div>
      ))}
    </div>
  ),
}));

jest.mock("./HighlightCardSkeleton", () => () => (
  <div>Loading Highlights...</div>
));

describe("Dashboard", () => {
  it("renders summary and highlights", () => {
    render(<Dashboard items={mockItems} summary={mockSummary} />);

    expect(screen.getByText("Dashboard Summary")).toBeInTheDocument();
    expect(screen.getByText("First Highlight")).toBeInTheDocument();
    expect(screen.getByText("Second Highlight")).toBeInTheDocument();
  });

  it("changes sort order", () => {
    render(<Dashboard items={mockItems} summary={mockSummary} />);

    fireEvent.click(screen.getByRole("button", { name: "Date ↑" }));
    expect(screen.getAllByText(/Highlight/)[0]).toHaveTextContent("Highlights");

    fireEvent.click(screen.getByRole("button", { name: "Date ↓" }));
    expect(screen.getAllByText(/Highlight/)[0]).toHaveTextContent("Highlights");
  });
});
