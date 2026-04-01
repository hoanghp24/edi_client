import { QueryClient } from "@tanstack/react-query";

/**
 * Global QueryClient configuration for TanStack Query.
 * Optimized for Enterprise logistics applications:
 * - 5 min stale time to reduce unnecessary API pressure.
 * - Automatic background refetching on window focus.
 * - Simple error retry policy.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (garbage collection)
      retry: 1,
      refetchOnWindowFocus: true,
      refetchOnMount: true,
      refetchOnReconnect: true,
    },
    mutations: {
        retry: 0, // Don't retry mutations (POST/PUT/DELETE) by default for safety
    }
  },
});
