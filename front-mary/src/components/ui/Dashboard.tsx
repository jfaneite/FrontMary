import {
  Card,
  CardContent,
  Typography,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Box,
  CircularProgress,
} from "@mui/material";
import { useState, useMemo } from "react";
import { DocumentItem } from "../containers/DashboardContainer";

type Props = {
  items: DocumentItem[];
  loading?: boolean;
};

export default function Dashboard({ items, loading = false }: Props) {
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
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Dashboard Test JC
      </Typography>

      {loading && <CircularProgress sx={{ mb: 2 }} />}

      {/* Filters */}
      <Box display="flex" gap={2} mb={4}>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Relevance</InputLabel>
          <Select
            value={relevance}
            label="Relevance"
            onChange={(e) =>
              setRelevance(e.target.value === "" ? "" : e.target.value)
            }
          >
            <MenuItem value="">All</MenuItem>
            {["5", "4", "3", "2", "1"].map((r) => (
              <MenuItem key={r} value={r}>
                {r}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 100 }}>
          <InputLabel>Source</InputLabel>
          <Select
            value={source}
            label="Source"
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

        <FormControl sx={{ minWidth: 140 }}>
          <InputLabel>Sort by Date</InputLabel>
          <Select
            value={sortDate}
            label="Sort by Date"
            onChange={(e) => setSortDate(e.target.value as "asc" | "desc" | "")}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="asc">Oldest</MenuItem>
            <MenuItem value="desc">Newest</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={2}>
        {filteredItems.map((item, idx) => (
          <Card
            key={idx}
            variant="outlined"
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h6">{item.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                {item.date}
              </Typography>
              <Typography variant="body1" sx={{ my: 1 }}>
                {item.description}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Source: {item.source}
              </Typography>
              <Typography variant="caption" display="block">
                Relevance: {item.relevance}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Grid>
    </Box>
  );
}
