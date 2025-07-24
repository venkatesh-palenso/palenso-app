// swr
import useSWR from "swr";

// next
import Head from "next/head";

// framer-motion
import { motion } from "framer-motion";

// lucide icons
import { Sparkles, User } from "lucide-react";

// components
import Spinner from "@/components/spinner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// constants
import { getProfileSections } from "@/constants/profile";

// context
import { useUser } from "@/context";

// layouts
import { Layouts } from "@/layouts";

// services
import { userService } from "@/services";

const UserProfilePage = () => {
  const { user } = useUser();
  const {
    data: profile,
    isLoading,
    mutate,
  } = useSWR(
    user?.role && user?.id ? `FETCH_${user.role}_PROFILE` : null,
    () => userService.getProfile(user?.id as string),
    {
      revalidateOnFocus: false,
    },
  );

  if (isLoading) {
    return <Spinner />;
  }

  let title = "Profile";
  let titleDescription = "Manage your profile";
  let sectionDescription = "";
  const sectionHeading = `Hello! ${user?.first_name} ${user?.last_name}`;

  if (user?.role === "student") {
    title = "Student Profile";
    titleDescription = "Manage your profile and job preferences";
    sectionDescription =
      "Manage your profile, showcase your skills, and build your professional presence";
  }

  if (user?.role === "employer") {
    title = "Employer Profile";
    titleDescription = "Manage your profile and company profile";
    sectionDescription =
      "Manage your company profile and showcase your organization to potential candidates";
  }

  const profileSections = getProfileSections(
    user?.role as "student" | "employer" | "admin",
  );

  return (
    <>
      <Head>
        <title>{title} - Palenso</title>
        <meta name="description" content={titleDescription} />
      </Head>
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
                  <h1 className="heading-handshake-large text-4xl mb-4 capitalize">
                    {sectionHeading}
                  </h1>
                  <p className="heading-handshake-subtitle text-xl max-w-2xl mx-auto">
                    {sectionDescription}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
        <section className="py-12 px-4 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20">
          <div className="container mx-auto">
            <div className="feature-card-handshake p-6">
              <Tabs defaultValue="user-profile" className="w-full">
                <TabsList className="w-full mb-6">
                  {profileSections.map((section) => (
                    <TabsTrigger key={section.value} value={section.value}>
                      <section.LabelIcon className="w-4 h-4 mr-2" />
                      {section.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {profileSections.map((section) => {
                  const Component = section.Component;
                  return (
                    <TabsContent key={section.value} value={section.value}>
                      {profile && (
                        <Component
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          data={profile as any}
                          mutate={mutate}
                        />
                      )}
                    </TabsContent>
                  );
                })}
              </Tabs>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

UserProfilePage.getLayout = Layouts.Protected;

export default UserProfilePage;
