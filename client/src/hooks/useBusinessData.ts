import { useQuery } from "@tanstack/react-query";
import { BusinessData } from "@/types/business";

const GITHUB_RAW_URL = "https://raw.githubusercontent.com/atlasgrowth/Arkansasplumbers/main/data/processed/businesses";

export function useBusinessData(siteId: string | null) {
  return useQuery({
    queryKey: ['business', siteId],
    queryFn: async (): Promise<BusinessData | null> => {
      if (!siteId) return null;
      const response = await fetch(`${GITHUB_RAW_URL}/${siteId}.json`);
      if (!response.ok) {
        if (response.status === 404) return null;
        throw new Error('Failed to fetch business data');
      }
      return response.json();
    },
    enabled: !!siteId,
  });
}

export function useSiteId() {
  const params = new URLSearchParams(window.location.search);
  return params.get('site_id');
}
