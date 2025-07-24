// lucide icons
import { Briefcase, Building, Code, GraduationCap, User } from "lucide-react";

// components
import {
  CompanyProfile,
  EducationForm,
  ExperienceForm,
  ProjectForm,
  ResumeForm,
  SkillForm,
  UserProfile,
} from "@/components/profile";

export const PROFILE_SECTIONS = [
  {
    label: "Personal Information",
    value: "user-profile",
    LabelIcon: User,
    Component: UserProfile,
  },
];

export const STUDENT_PROFILE_SECTIONS = [
  ...PROFILE_SECTIONS,
  {
    label: "Experience",
    value: "experience",
    LabelIcon: Briefcase,
    Component: ExperienceForm,
  },
  {
    label: "Education",
    value: "education",
    LabelIcon: GraduationCap,
    Component: EducationForm,
  },
  { label: "Skills", value: "skills", LabelIcon: Code, Component: SkillForm },
  {
    label: "Projects",
    value: "projects",
    LabelIcon: Code,
    Component: ProjectForm,
  },
  { label: "Resume", value: "resume", LabelIcon: Code, Component: ResumeForm },
];

export const EMPLOYER_PROFILE_SECTIONS = [
  ...PROFILE_SECTIONS,
  {
    label: "Company Profile",
    value: "company-profile",
    LabelIcon: Building,
    Component: CompanyProfile,
  },
];

export const getProfileSections = (role: "student" | "employer" | "admin") => {
  if (role === "student") {
    return STUDENT_PROFILE_SECTIONS;
  }
  if (role === "employer") {
    return EMPLOYER_PROFILE_SECTIONS;
  }
  return PROFILE_SECTIONS;
};
