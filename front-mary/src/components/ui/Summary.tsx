import { Box, Typography } from "@mui/material";
import React from "react";

export type SummaryProps = {
  summary?: string;
  facts?: string[];
  people?: string[];
  places?: string[];
  nextEvents?: string[];
};

export function Summary({
  summary,
  facts,
  people,
  places,
  nextEvents,
}: SummaryProps) {
  return (
    <>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Summary
      </Typography>
      <Typography mb={2}>{summary}</Typography>

      {facts && (
        <>
          <Typography variant="subtitle1" fontWeight="bold" mt={3}>
            Facts
          </Typography>
          <Box component="ul" pl={2}>
            {facts.map((fact: string, idx: number) => (
              <li key={idx}>
                <Typography variant="body2">{fact}</Typography>
              </li>
            ))}
          </Box>
        </>
      )}

      {people && (
        <>
          <Typography variant="subtitle1" fontWeight="bold" mt={3}>
            People
          </Typography>
          <Box component="ul" pl={2}>
            {people.map((person: string, idx: number) => (
              <li key={idx}>
                <Typography variant="body2">{person}</Typography>
              </li>
            ))}
          </Box>
        </>
      )}

      {places && (
        <>
          <Typography variant="subtitle1" fontWeight="bold" mt={3}>
            Places
          </Typography>
          <Box component="ul" pl={2}>
            {places.map((place: string, idx: number) => (
              <li key={idx}>
                <Typography variant="body2">{place}</Typography>
              </li>
            ))}
          </Box>
        </>
      )}

      {nextEvents && (
        <>
          <Typography variant="subtitle1" fontWeight="bold" mt={3}>
            Next Events
          </Typography>
          <Box component="ul" pl={2}>
            {nextEvents.map((event: string, idx: number) => (
              <li key={idx}>
                <Typography variant="body2">{event}</Typography>
              </li>
            ))}
          </Box>
        </>
      )}
    </>
  );
}
