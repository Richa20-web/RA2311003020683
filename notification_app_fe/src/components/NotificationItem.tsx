"use client";

interface NotificationData {
  ID: string;
  Type: string;
  Message: string;
  Timestamp: string;
}

interface Props {
  notification: NotificationData;
  isRead: boolean;
  onMarkRead: (id: string) => void;
}

const getTypeDetails = (type: string) => {
  switch (type) {
    case "Placement":
      return { icon: "💼", color: "#1976d2" };
    case "Result":
      return { icon: "📊", color: "#9c27b0" };
    case "Event":
      return { icon: "📅", color: "#0288d1" };
    default:
      return { icon: "🔔", color: "#555" };
  }
};

export default function NotificationItem({
  notification,
  isRead,
  onMarkRead,
}: Props) {
  const { icon, color } = getTypeDetails(notification.Type);

  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "12px",
        marginBottom: "10px",
        borderRadius: "6px",
        borderLeft: `5px solid ${isRead ? "#ccc" : color}`,
        opacity: isRead ? 0.6 : 1,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <div style={{ fontSize: "18px", marginBottom: "4px" }}>
          {icon} <strong>{notification.Type}</strong>
        </div>
        <div>{notification.Message}</div>
        <small style={{ color: "#777" }}>
          {new Date(notification.Timestamp).toLocaleString()}
        </small>
      </div>

      {!isRead && (
        <button
          onClick={() => onMarkRead(notification.ID)}
          style={{
            padding: "6px 10px",
            background: "green",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Mark Read
        </button>
      )}
    </div>
  );
}