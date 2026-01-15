import { useQuery } from "@tanstack/react-query";
import { getCredlyBadges } from "./credlyApi";

/**
 * React Query hook for fetching Credly badges
 * @param username - Credly username
 * @param limit - Maximum number of badges to fetch
 * @returns Query result with badges data
 */
export function useCredlyBadges(username: string, limit?: number) {
  return useQuery({
    queryKey: ["credly-badges", username, limit],
    queryFn: () => getCredlyBadges(username, limit),
    staleTime: 1000 * 60 * 60, // 1 hour - badges don't change frequently
    gcTime: 1000 * 60 * 60 * 24, // 24 hours cache
    retry: 2,
    enabled: !!username, // Only run if username is provided
  });
}
