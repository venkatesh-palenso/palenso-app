import useSWR, { SWRConfiguration, mutate } from "swr";
import { Company } from "@/interfaces/company";
import { MarketingData } from "@/interfaces/marketing";
import { NavItem } from "@/interfaces/nav-item";

// SWR Configuration
export const swrConfig: SWRConfiguration = {
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
  dedupingInterval: 60000, // 1 minute
  errorRetryCount: 3,
  errorRetryInterval: 5000,
};

// Custom fetcher function
export const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

// Company hooks
export const useCompanies = () => {
  return useSWR<Company[]>("/api/companies", fetcher, swrConfig);
};

export const useCompany = (id: string) => {
  return useSWR<Company>(
    id ? `/api/companies/${id}` : null,
    fetcher,
    swrConfig,
  );
};

// Marketing hooks
export const useMarketingData = () => {
  return useSWR<MarketingData>("/api/marketing/data", fetcher, swrConfig);
};

export const useStats = () => {
  return useSWR<MarketingData["stats"]>(
    "/api/marketing/stats",
    fetcher,
    swrConfig,
  );
};

export const useFeatures = () => {
  return useSWR<MarketingData["features"]>(
    "/api/marketing/features",
    fetcher,
    swrConfig,
  );
};

// Navigation hooks
export const useHeaderNavigation = () => {
  return useSWR<NavItem[]>("/api/navigation/header", fetcher, swrConfig);
};

export const useStudentNavigation = () => {
  return useSWR<NavItem[]>("/api/navigation/student", fetcher, swrConfig);
};

export const useEmployerNavigation = () => {
  return useSWR<NavItem[]>("/api/navigation/employer", fetcher, swrConfig);
};

export const useNavigationByRole = (role: "student" | "employer") => {
  return useSWR<NavItem[]>(
    role ? `/api/navigation/${role}` : null,
    fetcher,
    swrConfig,
  );
};

// Mutate functions
export const mutateCompanies = () => {
  return mutate("/api/companies");
};

export const mutateCompany = (id: string) => {
  return mutate(`/api/companies/${id}`);
};

export const mutateMarketingData = () => {
  return mutate("/api/marketing/data");
};

export const mutateNavigation = () => {
  return mutate("/api/navigation");
};
