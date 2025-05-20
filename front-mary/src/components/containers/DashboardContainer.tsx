"use client";

import { useEffect, useState } from "react";
import Dashboard from "../ui/Dashboard";
import { openDocumentStream } from "@/services/documentService";

export type DocumentItem = {
  title: string;
  date: string;
  description: string;
  source: string;
  relevance: number;
  loading: boolean;
};

export type DocumentResponse = {
  doc_id: number;
  response: string;
};

export type ParsedDocumentResponse = {
  doc_id: number;
  items: DocumentItem[];
};

export default function DashboardContainer() {
  const [items, setItems] = useState<DocumentItem[]>([]);
  const [loading, setLoading] = useState(true);

  const parseDocumentResponse = (
    data: DocumentResponse,
  ): ParsedDocumentResponse => {
    const jsonMatch = data.response?.match(/```json\n([\s\S]*?)\n```/);
    if (!jsonMatch || jsonMatch.length < 2) {
      throw new Error("Invalid JSON format in response");
    }

    const jsonString = jsonMatch[1];
    const items: DocumentItem[] = JSON.parse(jsonString);

    return {
      doc_id: data.doc_id,
      items,
    };
  };

  useEffect(() => {
    openDocumentStream(
      (data: DocumentResponse) => {
        try {
          const parsed = parseDocumentResponse(data);
          setItems((prev) => [...prev, ...parsed.items]);
        } catch (err) {
          console.error("Failed to parse response:", err);
        }
      },
      () => setLoading(false),
      (err) => console.error("WebSocket error:", err),
    );
  }, []);

  return <Dashboard items={items} loading={loading} />;
}
