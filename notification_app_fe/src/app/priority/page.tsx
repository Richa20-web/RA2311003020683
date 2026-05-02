"use client";

import React from "react";
import { Box, Typography, CircularProgress, Alert, Paper } from "@mui/material";
import { useNotifications } from "../../context/NotificationContext";
import NotificationItem from "../../components/NotificationItem";

const getWeight = (type: string) => {
  switch (type) {
    case "Placement": return 3;
    case "Result": return 2;
    case "Event": return 1;
    default: return 0;
  }
};

export default function PriorityInbox() {
  const { notifications, readIds, markAsRead, isLoading, error } = useNotifications();

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 4 }}>
        {error}
      </Alert>
    );
  }

  // Implementation of Stage 1 logic:
  // 1. Filter out already read notifications
  // 2. Sort by weight (Placement > Result > Event)
  // 3. Sort by recency if weights are equal
  // 4. Take top 10

  const unreadNotifications = notifications.filter(n => !readIds.includes(n.ID));

  const sortedPriority = [...unreadNotifications].sort((a, b) => {
    const weightA = getWeight(a.Type);
    const weightB = getWeight(b.Type);

    if (weightA !== weightB) {
      return weightB - weightA; // Descending weight
    }
    
    // Fallback to recency
    const timeA = new Date(a.Timestamp).getTime();
    const timeB = new Date(b.Timestamp).getTime();
    return timeB - timeA; // Descending time
  });

  const top10Priority = sortedPriority.slice(0, 10);

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
        Priority Inbox
      </Typography>
      
      <Paper elevation={0} sx={{ p: 2, mb: 3, backgroundColor: '#e3f2fd' }}>
        <Typography variant="body1">
          Showing the top 10 most important <strong>unread</strong> notifications based on type (Placement &gt; Result &gt; Event) and recency.
        </Typography>
      </Paper>

      {top10Priority.length === 0 ? (
        <Alert severity="success">You're all caught up! No high-priority unread notifications.</Alert>
      ) : (
        <Box>
          {top10Priority.map((notif) => (
            <NotificationItem
              key={notif.ID}
              notification={notif}
              isRead={false} // By definition, these are unread
              onMarkRead={markAsRead}
            />
          ))}
        </Box>
      )}
    </Box>
  );
}
