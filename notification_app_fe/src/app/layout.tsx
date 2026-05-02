import type { Metadata } from "next";
import "./globals.css";
import { NotificationProvider } from "../context/NotificationContext";
import ThemeRegistry from "../components/ThemeRegistry";
import AppNavbar from "../components/AppNavbar";

export const metadata: Metadata = {
  title: "Campus Notifications",
  description: "Campus Notification System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <NotificationProvider>
            <AppNavbar />
            <main style={{ padding: "24px", maxWidth: "1200px", margin: "0 auto" }}>
              {children}
            </main>
          </NotificationProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
