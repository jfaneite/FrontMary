const wsBackendUrl = process.env.NEXT_PUBLIC_WS_BACKEND_URL;
const httpBackendUrl = process.env.NEXT_PUBLIC_HTTP_BACKEND_URL;

export type HighlightsData = {
  doc_id: number;
  response: string;
};

type DoneSignal = { done: true };

export type MessageResponse = {
  type: string;
  content: string;
};

export type Message = MessageResponse | DoneSignal;

export function openDocumentStream(
  onData: (data: MessageResponse) => void,
  onError?: (err: Event) => void,
): void {
  const ws = new WebSocket(`${wsBackendUrl}`);

  ws.onopen = async () => {
    console.log("✅ WebSocket connected");

    try {
      const res = await fetch(`${httpBackendUrl}/documents`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`❌ GET request failed: ${res.statusText}`);
      }

      console.log("📨 GET request sent to /documents");
    } catch (err) {
      console.error("❌ Failed to trigger backend stream", err);
      if (onError) {
        onError(err as Event);
      }

      ws.close();
    }
  };

  ws.onmessage = (event) => {
    const message: Message = JSON.parse(event.data);

    if ("done" in message) {
      console.log("✅ Done signal received, closing WebSocket");
      ws.close();
    } else {
      onData(message);
    }
  };

  ws.onerror = (err) => {
    console.error("❌ WebSocket error", err);
    onError?.(err);
  };
}
