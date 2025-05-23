"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";
import { useState, ReactNode } from "react";

export const ReactQueryProvider = ({ children }: { children: ReactNode }) => {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            <SnackbarProvider>
                {children}
            </SnackbarProvider>
        </QueryClientProvider>
    );
};
