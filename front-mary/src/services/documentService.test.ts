import { openDocumentStream } from "./documentService";

describe("openDocumentStream", () => {
  let originalWebSocket: unknown;
  let mockWebSocketInstance: unknown;
  let onopenCallback: (() => void) | null = null;
  let onmessageCallback: ((event: unknown) => void) | null = null;
  let onerrorCallback: ((err: unknown) => void) | null = null;

  beforeEach(() => {
    originalWebSocket = global.WebSocket;

    mockWebSocketInstance = {
      close: jest.fn(),
      send: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    };

    global.WebSocket = jest.fn(() => mockWebSocketInstance);

    Object.defineProperty(mockWebSocketInstance, "onopen", {
      set: (cb) => {
        onopenCallback = cb;
      },
    });
    Object.defineProperty(mockWebSocketInstance, "onmessage", {
      set: (cb) => {
        onmessageCallback = cb;
      },
    });
    Object.defineProperty(mockWebSocketInstance, "onerror", {
      set: (cb) => {
        onerrorCallback = cb;
      },
    });

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        statusText: "OK",
      }),
    ) as jest.Mock;
  });

  afterEach(() => {
    global.WebSocket = originalWebSocket;
    jest.resetAllMocks();
    onopenCallback = null;
    onmessageCallback = null;
    onerrorCallback = null;
  });

  it("connects WebSocket and fetches documents", async () => {
    const onData = jest.fn();
    const onError = jest.fn();

    openDocumentStream(onData, onError);

    await onopenCallback?.();

    expect(global.fetch).toHaveBeenCalledWith(
      "https://backmary.onrender.com/documents",
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      },
    );

    expect(mockWebSocketInstance.close).not.toHaveBeenCalled();
    expect(onError).not.toHaveBeenCalled();
  });

  it("calls onData on receiving valid message", () => {
    const onData = jest.fn();
    const onError = jest.fn();

    openDocumentStream(onData, onError);

    const message = { type: "highlights", content: "some content" };
    const event = { data: JSON.stringify(message) };

    onmessageCallback?.(event);

    expect(onData).toHaveBeenCalledWith(message);
  });

  it("closes WebSocket on receiving done signal", () => {
    const onData = jest.fn();
    const onError = jest.fn();

    openDocumentStream(onData, onError);

    const doneMessage = { done: true };
    const event = { data: JSON.stringify(doneMessage) };

    onmessageCallback?.(event);

    expect(mockWebSocketInstance.close).toHaveBeenCalled();
    expect(onData).not.toHaveBeenCalled();
  });

  it("calls onError and closes WebSocket if fetch fails", async () => {
    const onData = jest.fn();
    const onError = jest.fn();

    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({ ok: false, statusText: "Internal Server Error" }),
    );

    openDocumentStream(onData, onError);

    await onopenCallback?.();

    expect(onError).toHaveBeenCalled();
    expect(mockWebSocketInstance.close).toHaveBeenCalled();
  });

  it("calls onError on WebSocket error", () => {
    const onData = jest.fn();
    const onError = jest.fn();

    openDocumentStream(onData, onError);

    const errorEvent = new Event("error");

    onerrorCallback?.(errorEvent);

    expect(onError).toHaveBeenCalledWith(errorEvent);
  });
});
