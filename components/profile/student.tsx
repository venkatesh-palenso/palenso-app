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

interface IStudentProfile {
  [key: string]: any;
}

const StudentProfile = ({ userProfile }: IStudentProfile) => {
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
        let data = userProfile;
        if (section.value === "experience") {
          data = userProfile.work_experience;
        }
        if (section.value === "education") {
          data = userProfile.education;
        }
        if (section.value === "skills") {
          data = userProfile.skills;
        }
        if (section.value === "projects") {
          data = userProfile.projects;
        }
        if (section.value === "resume") {
          data = userProfile.resumes;
        }
        return (
          <TabsContent key={section.value} value={section.value}>
            <Component data={data} />
          </TabsContent>
        );
      })}
    </Tabs>
  );
};

export default StudentProfile;
