import { User, Building } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { UserForm } from "@/components/profile";
import CompanyProfileForm from "./company";

const EMPLOYER_PROFILE_SECTIONS = [
  {
    label: "Personal Information",
    value: "profile",
    icon: <User />,
    component: UserForm,
  },
  {
    label: "Company",
    value: "company",
    icon: <Building />,
    component: CompanyProfileForm,
  },
] as const;

type UserProfile = {
  [key: string]: unknown;
};

const EmployerProfile = ({ userProfile }: { userProfile: UserProfile }) => {
  return (
    <Tabs defaultValue="profile">
      <TabsList className="w-full">
        {EMPLOYER_PROFILE_SECTIONS.map((section) => (
          <TabsTrigger key={section.value} value={section.value}>
            {section.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {EMPLOYER_PROFILE_SECTIONS.map((section) => {
        const Component = section.component;
        const profile =
          section.value === "profile"
            ? userProfile
            : (userProfile.company as Record<string, unknown>) || {};
        return (
          <TabsContent key={section.value} value={section.value}>
            {/* @ts-expect-error - Component data prop type mismatch due to dynamic profile sections */}
            <Component data={profile} />
          </TabsContent>
        );
      })}
    </Tabs>
  );
};

export default EmployerProfile;
