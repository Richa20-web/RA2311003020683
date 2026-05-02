"use client";

import React from "react";
import { Box, ToggleButtonGroup, ToggleButton, Typography } from "@mui/material";

interface FilterPanelProps {
  filter: string;
  setFilter: (f: string) => void;
}

export default function FilterPanel({ filter, setFilter }: FilterPanelProps) {
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newFilter: string,
  ) => {
    if (newFilter !== null) {
      setFilter(newFilter);
    }
  };

  return (
    <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
      <Typography variant="body2" color="text.secondary">Filter by Type:</Typography>
      <ToggleButtonGroup
        color="primary"
        value={filter}
        exclusive
        onChange={handleChange}
        aria-label="Notification Type"
        size="small"
      >
        <ToggleButton value="All">All</ToggleButton>
        <ToggleButton value="Placement">Placement</ToggleButton>
        <ToggleButton value="Result">Result</ToggleButton>
        <ToggleButton value="Event">Event</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}
