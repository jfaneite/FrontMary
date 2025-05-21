import { Box, Skeleton, Typography } from "@mui/material";

export function SummarySkeleton() {
  return (
    <Box>
      {/* Title */}
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Summary
      </Typography>
      <Skeleton variant="text" width="80%" height={28} />
      <Skeleton variant="text" width="90%" height={24} />
      <Skeleton variant="text" width="70%" height={24} />

      {/* Facts */}
      <Typography variant="subtitle1" fontWeight="bold" mt={3}>
        Facts
      </Typography>
      <Box component="ul" pl={2} m={0}>
        {[...Array(3)].map((_, i) => (
          <li key={`fact-${i}`}>
            <Skeleton variant="text" width={`${80 - i * 10}%`} height={20} />
          </li>
        ))}
      </Box>

      {/* People */}
      <Typography variant="subtitle1" fontWeight="bold" mt={3}>
        People
      </Typography>
      <Box component="ul" pl={2} m={0}>
        {[...Array(3)].map((_, i) => (
          <li key={`person-${i}`}>
            <Skeleton variant="text" width={`${70 - i * 10}%`} height={20} />
          </li>
        ))}
      </Box>

      {/* Places */}
      <Typography variant="subtitle1" fontWeight="bold" mt={3}>
        Places
      </Typography>
      <Box component="ul" pl={2} m={0}>
        {[...Array(3)].map((_, i) => (
          <li key={`place-${i}`}>
            <Skeleton variant="text" width={`${75 - i * 5}%`} height={20} />
          </li>
        ))}
      </Box>

      {/* Next Events */}
      <Typography variant="subtitle1" fontWeight="bold" mt={3}>
        Next Events
      </Typography>
      <Box component="ul" pl={2} m={0}>
        {[...Array(3)].map((_, i) => (
          <li key={`event-${i}`}>
            <Skeleton variant="text" width={`${85 - i * 15}%`} height={20} />
          </li>
        ))}
      </Box>
    </Box>
  );
}
