"use client";

import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { NotificationsActive as NotificationsActiveIcon } from "@mui/icons-material";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AppNavbar() {
  const pathname = usePathname();

  return (
    <AppBar position="sticky" elevation={1}>
      <Toolbar>
        <NotificationsActiveIcon sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: "bold" }}>
          Campus Notifications
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            color="inherit"
            component={Link}
            href="/"
            sx={{
              borderBottom: pathname === "/" ? "2px solid white" : "none",
              borderRadius: 0,
            }}
          >
            All Notifications
          </Button>
          <Button
            color="inherit"
            component={Link}
            href="/priority"
            sx={{
              borderBottom: pathname === "/priority" ? "2px solid white" : "none",
              borderRadius: 0,
            }}
          >
            Priority Inbox
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
