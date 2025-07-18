import { LucideIcon } from "lucide-react";

export interface Stat {
  label: string;
  value: string;
}

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface MarketingData {
  stats: Stat[];
  features: Feature[];
} 