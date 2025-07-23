import { Briefcase, Code, GraduationCap, User } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  UserForm,
  ExperienceForm,
  EducationForm,
  SkillForm,
  ProjectForm,
  ResumeForm,
} from "@/components/profile";

const STUDENT_PROFILE_SECTIONS = [
  {
    label: "Personal Information",
    value: "profile",
    icon: <User />,
    component: UserForm,
  },
  {
    label: "Experience",
    value: "experience",
    icon: <Briefcase />,
    component: ExperienceForm,
  },
  {
    label: "Education",
    value: "education",
    icon: <GraduationCap />,
    component: EducationForm,
  },
  { label: "Skills", value: "skills", icon: <Code />, component: SkillForm },
  {
    label: "Projects",
    value: "projects",
    icon: <Code />,
    component: ProjectForm,
  },
  { label: "Resume", value: "resume", icon: <Code />, component: ResumeForm },
];

import type { StudentProfile } from "@/interfaces";

interface IStudentProfile extends StudentProfile {
  [key: string]: unknown;
}

const StudentProfile = ({ userProfile }: { userProfile: IStudentProfile }) => {
  return (
    <Tabs defaultValue="profile">
      <TabsList className="w-full">
        {STUDENT_PROFILE_SECTIONS.map((section) => (
          <TabsTrigger key={section.value} value={section.value}>
            {section.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {STUDENT_PROFILE_SECTIONS.map((section) => {
        const Component = section.component;
        let data: unknown = userProfile;
        if (section.value === "experience") {
          data = userProfile.work_experience as unknown;
        }
        if (section.value === "education") {
          data = userProfile.education as unknown;
        }
        if (section.value === "skills") {
          data = userProfile.skills as unknown;
        }
        if (section.value === "projects") {
          data = userProfile.projects as unknown;
        }
        if (section.value === "resume") {
          data = userProfile.resumes as unknown;
        }
        return (
          <TabsContent key={section.value} value={section.value}>
            {/* @ts-expect-error - Component data prop type mismatch due to dynamic profile sections */}
            <Component data={data} />
          </TabsContent>
        );
      })}
    </Tabs>
  );
};

export default StudentProfile;
