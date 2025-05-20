import type { Metadata } from "next";
import "./globals.css";
import MuiThemeProvider from "@/components/MuiThemeProvider"; // Adjust path as needed

export const metadata: Metadata = {
  title: "FrontMary",
  description: "Test for Mary",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <MuiThemeProvider>
          {children}
        </MuiThemeProvider>
      </body>
    </html>
  );
}

