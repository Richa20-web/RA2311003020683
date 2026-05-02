"use client";

import { useState } from "react";
import NotificationItem from "../components/NotificationItem";

interface NotificationData {
  ID: string;
  Type: "Placement" | "Result" | "Event";
  Message: string;
  Timestamp: string;
}

export default function Home() {
  const [notifications, setNotifications] = useState<NotificationData[]>([
    {
      ID: "1",
      Type: "Placement",
      Message: "TCS drive tomorrow",
      Timestamp: new Date().toISOString(),
    },
    {
      ID: "2",
      Type: "Result",
      Message: "Semester result declared",
      Timestamp: new Date().toISOString(),
    },
    {
      ID: "3",
      Type: "Event",
      Message: "Hackathon this weekend",
      Timestamp: new Date().toISOString(),
    },
  ]);

  const [filter, setFilter] = useState("All");
  const [readIds, setReadIds] = useState<string[]>([]);

  const handleMarkRead = (id: string) => {
    setReadIds((prev) => [...prev, id]);
  };

  const filtered = notifications.filter((n) =>
    filter === "All" ? true : n.Type === filter
  );

  const priorityOrder: Record<string, number> = {
    Placement: 1,
    Result: 2,
    Event: 3,
  };

  const priorityList = notifications
    .filter((n) => !readIds.includes(n.ID))
    .sort((a, b) => priorityOrder[a.Type] - priorityOrder[b.Type])
    .slice(0, 10);

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h1>📢 Campus Notification System</h1>

      {/* FILTER */}
      <div style={{ margin: "10px 0" }}>
        {["All", "Placement", "Result", "Event"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            style={{
              marginRight: "10px",
              padding: "6px 12px",
              background: filter === type ? "#1976d2" : "#eee",
              color: filter === type ? "#fff" : "#000",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {type}
          </button>
        ))}
      </div>

      {/* ALL NOTIFICATIONS */}
      <h2>All Notifications</h2>
      {filtered.length === 0 ? (
        <p>No notifications found</p>
      ) : (
        filtered.map((n) => (
          <NotificationItem
            key={n.ID}
            notification={n}
            isRead={readIds.includes(n.ID)}
            onMarkRead={handleMarkRead}
          />
        ))
      )}

      {/* PRIORITY INBOX */}
      <h2 style={{ marginTop: "30px" }}>Priority Inbox</h2>
      {priorityList.length === 0 ? (
        <p>No priority notifications</p>
      ) : (
        priorityList.map((n) => (
          <NotificationItem
            key={n.ID}
            notification={n}
            isRead={false}
            onMarkRead={handleMarkRead}
          />
        ))
      )}
    </div>
  );
}