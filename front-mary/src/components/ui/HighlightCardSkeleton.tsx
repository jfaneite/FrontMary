import { Paper, Skeleton, Box } from "@mui/material";
import React from "react";

export default function HighlightsSkeleton({ count = 5 }: { count?: number }) {
  return (
    <Box>
      {Array.from({ length: count }).map((_, idx) => (
        <Paper
          key={idx}
          variant="outlined"
          sx={{ p: 2, mb: 2, borderRadius: 2, backgroundColor: "#fafafa" }}
          data-testid="highlight-skeleton"
        >
          <Skeleton variant="text" width="60%" height={28} />

          <Skeleton variant="text" width="40%" height={20} />

          <Skeleton variant="text" width="100%" height={20} sx={{ mt: 1 }} />
          <Skeleton variant="text" width="90%" height={20} />
          <Skeleton variant="text" width="85%" height={20} />

          <Skeleton variant="text" width="50%" height={20} sx={{ mt: 1 }} />
        </Paper>
      ))}
    </Box>
  );
}
