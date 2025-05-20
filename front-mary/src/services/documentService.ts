type StreamedData = {
  doc_id: number;
  response: string;
};

type DoneSignal = { done: true };

type Message = StreamedData | DoneSignal;

export function openDocumentStream(
  onData: (data: StreamedData) => void,
  onDone: () => void,
  onError?: (err: Event) => void,
): void {
  const ws = new WebSocket("wss://backmary.onrender.com");

  ws.onopen = async () => {
    console.log("✅ WebSocket connected");

    try {
      const res = await fetch("https://backmary.onrender.com/documents", {
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
      onDone();
    } else {
      onData(message);
    }
  };

  ws.onerror = (err) => {
    console.error("❌ WebSocket error", err);
    onError?.(err);
  };
}
