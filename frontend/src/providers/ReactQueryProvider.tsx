"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, ReactNode } from "react";
import { ToastContainer } from "react-toastify";

export const ReactQueryProvider = ({ children }: { children: ReactNode }) => {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            <ToastContainer position="top-center" />
            {children}
        </QueryClientProvider>
    );
};
