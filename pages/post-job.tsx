// next
import Head from "next/head";

// swr
import useSWR from "swr";

// framer-motion
import { motion } from "framer-motion";

// lucide icons
import { Briefcase, Sparkles } from "lucide-react";

// components
import PostJobForm from "@/components/job/post";
import Spinner from "@/components/spinner";
import AccessDenied from "@/components/ui/access-denied";

// context
import { useUser } from "@/context";

// layout
import { Layouts } from "@/layouts";

// services
import { userService } from "@/services";

// hooks
import { useEmployerAccess } from "@/hooks";

const PostJobPage = () => {
  const { user } = useUser();
  const { isAuthorized, isLoading: authLoading } = useEmployerAccess("/dashboard");
  const { data: profile, isLoading: profileLoading } = useSWR(
    user?.id ? "FETCH_COMPANY_PROFILE" : null,
    user?.id ? () => userService.getProfile(user.id) : null,
    { revalidateOnFocus: false },
  );

  // Show loading state
  if (authLoading || profileLoading) return <Spinner />;

  // Show unauthorized access message
  if (!isAuthorized) {
    return (
      <AccessDenied
        title="Access Denied"
        message="Only employers can post job listings. You don't have permission to access this page."
        primaryAction={{
          label: "Go to Dashboard",
          onClick: () => window.location.href = "/dashboard",
        }}
        secondaryAction={{
          label: "View Jobs",
          onClick: () => window.location.href = "/jobs",
        }}
      />
    );
  }

  return (
    <>
      <Head>
        <title>Post a Job - Palenso</title>
        <meta
          name="description"
          content="Create an engaging job posting to attract top talent on Palenso"
        />
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
                    <Briefcase className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                    <Sparkles className="w-2.5 h-2.5 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="heading-handshake-large text-4xl mb-4">
                    Post a New Job
                  </h1>
                  <p className="heading-handshake-subtitle text-xl max-w-2xl mx-auto">
                    Create an engaging job posting to attract top talent
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-12 px-4 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <PostJobForm profile={profile} />
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

PostJobPage.getLayout = Layouts.Employer;
export default PostJobPage;
