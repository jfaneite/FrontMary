import React from "react";
import { render, screen } from "@testing-library/react";
import { Summary } from "./Summary";

describe("Summary", () => {
  const defaultProps = {
    summary: "This is a sample summary.",
    facts: ["Fact 1", "Fact 2"],
    people: ["Person A", "Person B"],
    places: ["Place X", "Place Y"],
    nextEvents: ["Event 1", "Event 2"],
  };

  it("renders the summary and all sections when props are provided", () => {
    render(<Summary {...defaultProps} />);

    expect(screen.getByText("Summary")).toBeInTheDocument();
    expect(screen.getByText("Facts")).toBeInTheDocument();
    expect(screen.getByText("People")).toBeInTheDocument();
    expect(screen.getByText("Places")).toBeInTheDocument();
    expect(screen.getByText("Next Events")).toBeInTheDocument();

    expect(screen.getByText(defaultProps.summary!)).toBeInTheDocument();

    defaultProps.facts!.forEach((fact) => {
      expect(screen.getByText(fact)).toBeInTheDocument();
    });

    defaultProps.people!.forEach((person) => {
      expect(screen.getByText(person)).toBeInTheDocument();
    });

    defaultProps.places!.forEach((place) => {
      expect(screen.getByText(place)).toBeInTheDocument();
    });

    defaultProps.nextEvents!.forEach((event) => {
      expect(screen.getByText(event)).toBeInTheDocument();
    });
  });

  it("renders only summary when other props are not provided", () => {
    render(<Summary summary="Only summary provided" />);

    expect(screen.getByText("Summary")).toBeInTheDocument();
    expect(screen.getByText("Only summary provided")).toBeInTheDocument();

    expect(screen.queryByText("Facts")).not.toBeInTheDocument();
    expect(screen.queryByText("People")).not.toBeInTheDocument();
    expect(screen.queryByText("Places")).not.toBeInTheDocument();
    expect(screen.queryByText("Next Events")).not.toBeInTheDocument();
  });
});

