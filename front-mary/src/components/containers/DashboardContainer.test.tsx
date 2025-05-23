import React from "react";
import { render } from "@testing-library/react";
import DashboardContainer from "./DashboardContainer";
import * as documentService from "../../services/documentService";

jest.mock("../ui/Dashboard", () => (props: any) => {
  return <div data-testid="dashboard">{JSON.stringify(props)}</div>;
});

describe("DashboardContainer", () => {
  const mockOpenDocumentStream = jest.spyOn(
    documentService,
    "openDocumentStream",
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("handles JSON parse errors gracefully", () => {
    mockOpenDocumentStream.mockImplementation((onMessage) => {
      onMessage({ type: "highlights", content: "invalid json" });
    });

    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    render(<DashboardContainer />);

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Failed to parse response:",
      expect.any(SyntaxError),
    );

    consoleErrorSpy.mockRestore();
  });

  it("handles WebSocket errors", () => {
    let errorCallback: ((err: unknown) => void) | null = null;

    mockOpenDocumentStream.mockImplementation((_, onError) => {
      errorCallback = onError;
    });

    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    render(<DashboardContainer />);

    errorCallback?.("Test WebSocket error");

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "WebSocket error:",
      "Test WebSocket error",
    );

    consoleErrorSpy.mockRestore();
  });
});
