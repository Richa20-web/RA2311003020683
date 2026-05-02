"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { NotificationData, fetchNotifications } from "../utils/api";

interface NotificationContextProps {
  notifications: NotificationData[];
  readIds: string[];
  markAsRead: (id: string) => void;
  isLoading: boolean;
  error: string | null;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const [readIds, setReadIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load read notifications from localStorage
    const storedReadIds = localStorage.getItem("readNotificationIds");
    if (storedReadIds) {
      try {
        setReadIds(JSON.parse(storedReadIds));
      } catch (e) {
        console.error("Failed to parse stored read IDs", e);
      }
    }

    // Fetch notifications
    const loadData = async () => {
      try {
        const data = await fetchNotifications();
        setNotifications(data);
      } catch (err: any) {
        setError(err.message || "Failed to load notifications");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const markAsRead = (id: string) => {
    setReadIds((prev) => {
      if (prev.includes(id)) return prev;
      const updated = [...prev, id];
      localStorage.setItem("readNotificationIds", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <NotificationContext.Provider value={{ notifications, readIds, markAsRead, isLoading, error }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationProvider");
  }
  return context;
};
