"use client";
import Script from "next/script";
import "./globals.css";

import { createTheme } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
import StyledComponentsRegistry from "./lib/registry";
import { ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#002776",
    },
    secondary: {
      main: "#f44336",
    },
  },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <StyledComponentsRegistry>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
