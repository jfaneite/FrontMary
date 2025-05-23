import { Paper, Typography } from "@mui/material";
import { HighlightItem } from "../containers/DashboardContainer";
import React from "react";

export type HighlightProp = {
  highlights: HighlightItem[];
};
export function HighlightCard({ highlights }: HighlightProp) {
  return (
    <>
      {highlights
        ? highlights.map((item, idx) => (
            <Paper
              key={idx}
              variant="outlined"
              sx={{ p: 2, mb: 2, borderRadius: 2, backgroundColor: "#fafafa" }}
            >
              <Typography variant="subtitle1" fontWeight={600}>
                {item.title}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {item.date}
              </Typography>
              <Typography variant="body2" mt={1}>
                {item.description}
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
                mt={1}
              >
                Source: {item.source}
              </Typography>
            </Paper>
          ))
        : null}
    </>
  );
}
