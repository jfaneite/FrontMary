import { useState, useMemo } from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  ToggleButton,
  ToggleButtonGroup,
  CircularProgress,
  Paper,
  FormControl,
  InputLabel,
} from "@mui/material";
import type { HighlightItem } from "../containers/DashboardContainer";
import { Summary } from "./Summary";
import { SummarySkeleton } from "./SummarySkeleton";
import { HighlightCard } from "./HightlighCard";
import HighlightsSkeleton from "./HighlightCardSkeleton";

type Props = {
  items: HighlightItem[];
  loading?: boolean;
  summary: any; // Replace with proper type if available
};

const relevanceLabels: Record<string, string> = {
  "1": "Very Low",
  "2": "Low",
  "3": "Medium",
  "4": "High",
  "5": "Very High",
};

export default function Dashboard({ items, loading, summary }: Props) {
  const [relevance, setRelevance] = useState<string>("");
  const [source, setSource] = useState<string>("");
  const [sortDate, setSortDate] = useState<"asc" | "desc" | "">("");

  const filteredItems = useMemo(() => {
    let result = [...items];

    if (relevance !== "") {
      result = result.filter((item) => item.relevance.toString() === relevance);
    }

    if (source !== "") {
      result = result.filter((item) => item.source === source);
    }

    if (sortDate) {
      result.sort((a, b) =>
        sortDate === "asc"
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime(),
      );
    }

    return result;
  }, [items, relevance, source, sortDate]);

  const sources = [...new Set(items.map((i) => i.source))];

  return (
    <Box
      display="flex"
      height="100vh"
      overflow="hidden"
      sx={{
        p: 2,
        mb: 2,
        borderRadius: 2,
        backgroundColor: "#fafafa",
        border: "1px solid rgba(0, 0, 0, 0.12)",
        margin: "20px",
      }}
    >
      <Box width="50%" p={4} overflow="auto" borderRight="1px solid #e0e0e0">
        {summary ? <Summary {...summary} /> : <SummarySkeleton />}
      </Box>

      <Box width="50%" p={4} overflow="auto">
        <Box display="flex" gap={2} mb={3} flexWrap="wrap">
          <FormControl size="small" sx={{ minWidth: 160 }}>
            <InputLabel>Relevance</InputLabel>
            <Select
              label="Relevance"
              value={relevance}
              onChange={(e) => setRelevance(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              {Object.entries(relevanceLabels).map(([val, label]) => (
                <MenuItem key={val} value={val}>
                  {label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 160 }}>
            <InputLabel>Source</InputLabel>
            <Select
              label="Source"
              value={source}
              onChange={(e) => setSource(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              {sources.map((s) => (
                <MenuItem key={s} value={s}>
                  {s}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <ToggleButtonGroup
            size="small"
            exclusive
            value={sortDate}
            onChange={(_, val) => setSortDate(val)}
            sx={{ ml: "auto" }}
          >
            <ToggleButton value="">No Sort</ToggleButton>
            <ToggleButton value="asc">Date ↑</ToggleButton>
            <ToggleButton value="desc">Date ↓</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        {loading ? (
          <HighlightsSkeleton />
        ) : (
          <HighlightCard highlights={filteredItems} />
        )}
      </Box>
    </Box>
  );
}
