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
  [key: string]: any;
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
          section.value === "profile" ? userProfile : userProfile.company || {};
        return (
          <TabsContent key={section.value} value={section.value}>
            <Component data={profile} />
          </TabsContent>
        );
      })}
    </Tabs>
  );
};

export default EmployerProfile;
