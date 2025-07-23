import { Briefcase, Code, GraduationCap, User, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

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
    <div className="bg-background overflow-hidden">
      {/* Hero Section */}
      <section className="hero-handshake relative pt-8 pb-16 px-4 overflow-hidden">
        {/* Enhanced Background Elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute top-20 right-0 w-96 h-96 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute top-40 left-0 w-96 h-96 bg-gradient-to-r from-pink-400/30 to-orange-400/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="absolute -bottom-8 right-20 w-96 h-96 bg-gradient-to-r from-green-400/30 to-blue-400/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"
        />

        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center mb-6">
              <div className="relative mr-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary via-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                  <Sparkles className="w-2.5 h-2.5 text-white" />
                </div>
              </div>
              <div>
                <h1 className="heading-handshake-large text-4xl mb-4">
                  Student Profile
                </h1>
                <p className="heading-handshake-subtitle text-xl max-w-2xl mx-auto">
                  Manage your profile, showcase your skills, and build your
                  professional presence
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Profile Content Section */}
      <section className="py-12 px-4 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20">
        <div className="container mx-auto">
          <div className="feature-card-handshake p-6">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="w-full mb-6">
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
          </div>
        </div>
      </section>
    </div>
  );
};

export default StudentProfile;
