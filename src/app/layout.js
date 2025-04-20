import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";

export const metadata = {
  title: "Hoa Tran | Portfolio",
  description: "Software engineer portfolio showcasing projects and skills.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
