import axios from "axios";
import {
  CredlyApiResponse,
  CredlyBadge,
  CredlyBadgeDisplay,
} from "@/types/credly";

/**
 * Fetch Credly badges for a given username using Next.js API route proxy
 * This avoids CORS issues by making the request server-side
 * @param username - The Credly username
 * @param page - Page number for pagination (default: 1)
 * @param perPage - Number of badges per page (default: 48)
 * @returns Promise with badges data
 */
export async function fetchCredlyBadges(
  username: string,
  page: number = 1,
  perPage: number = 48,
): Promise<CredlyApiResponse> {
  try {
    // Use our Next.js API route as a proxy to avoid CORS issues
    const response = await axios.get<CredlyApiResponse>("/api/credly", {
      params: {
        username,
        page,
        per: perPage,
      },
      timeout: 10000,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching Credly badges:", error);
    throw error;
  }
}

/**
 * Transform Credly API badge data to display format
 * @param badge - Raw badge from Credly API
 * @returns Transformed badge for display
 */
export function transformCredlyBadge(badge: CredlyBadge): CredlyBadgeDisplay {
  // Extract issuer name from the issuer entities
  const issuerName =
    badge.issuer?.entities?.[0]?.entity?.name ||
    badge.badge_template?.issuer?.entities?.[0]?.entity?.name ||
    "Unknown Issuer";

  // Build the public URL using the earner path and badge ID
  const credlyUrl = `https://www.credly.com${badge.earner_path}/badges/${badge.id}`;

  return {
    id: badge.id,
    title: badge.badge_template.name,
    description: badge.badge_template.description,
    imageUrl: badge.badge_template.image_url || badge.image_url,
    issuer: issuerName,
    issuedDate: badge.issued_at,
    expiresDate: badge.expires_at || undefined,
    credlyUrl: credlyUrl,
    skills: badge.badge_template.skills?.map((skill) => skill.name) || [],
    issuedTo: badge.issued_to,
  };
}

/**
 * Fetch and transform Credly badges
 * @param username - The Credly username
 * @param limit - Maximum number of badges to fetch (default: all)
 * @returns Promise with transformed badges
 */
export async function getCredlyBadges(
  username: string,
  limit?: number,
): Promise<CredlyBadgeDisplay[]> {
  try {
    const response = await fetchCredlyBadges(username, 1, limit || 100);
    const badges = response.data.map(transformCredlyBadge);

    // Filter only earned badges
    return badges.filter((_, index) => !limit || index < limit);
  } catch (error) {
    console.error("Failed to fetch Credly badges:", error);
    return [];
  }
}

/**
 * Format date for display
 * @param dateString - ISO date string
 * @returns Formatted date string
 */
export function formatCredlyDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
