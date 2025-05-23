"use client";

import { useEffect, useState } from "react";
import Dashboard from "../ui/Dashboard";
import { SummaryProps } from "../ui/Summary";
import React from "react";
import { HighlightsData, MessageResponse, openDocumentStream } from "../../services/documentService";

export type HighlightItem = {
  title: string;
  date: string;
  description: string;
  source: string;
  relevance: number;
};

export type HighlightResponse = {
  summarize: string;
  highlights: HighlightItem[];
};

export default function DashboardContainer() {
  const [items, setItems] = useState<HighlightItem[]>([]);
  const [summary, setSummary] = useState<SummaryProps | undefined>(undefined);

  useEffect(() => {
    openDocumentStream(
      (data: MessageResponse) => {
        try {
          if (data.type === "global_summary_done") {
            setSummary(JSON.parse(data.content));
          } else if (data.type === "highlights") {
            const messageContentResponse =
              data.content as unknown as HighlightsData;

            const highlightResponse = JSON.parse(
              messageContentResponse.response,
            ) as HighlightResponse;

            setItems((prev) => [...prev, ...highlightResponse.highlights]);
          }
        } catch (err) {
          console.error("Failed to parse response:", err);
        }
      },
      (err) => console.error("WebSocket error:", err),
    );
  }, []);

  return <Dashboard items={items} summary={summary} />;
}
