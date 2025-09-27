import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";

import { queryClient } from "./lib/query.client";
import { AuthProvider } from "./auth/AuthProvider";
import { ThemeProvider } from "./components/theme-provider";

export type ProvidersProps = {
  children: React.ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="nexml-ui-theme">
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>{children}</AuthProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}
