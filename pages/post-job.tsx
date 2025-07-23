// next
import Head from "next/head";

// swr
import useSWR from "swr";

// framer-motion
import { motion } from "framer-motion";

// components
import PostJobForm from "@/components/job/post";
import Spinner from "@/components/spinner";

// context
import { useUser } from "@/context";

// layout
import { Layouts } from "@/layouts";

// services
import { userService } from "@/services";

const PostJobPage = () => {
  const { user } = useUser();
  const { data: profile, isLoading } = useSWR(
    user?.id ? "FETCH_COMPANY_PROFILE" : null,
    user?.id ? () => userService.getProfile(user.id) : null,
    { revalidateOnFocus: false },
  );

  if (isLoading) return <Spinner />;
  return (
    <>
      {" "}
      <Head>
        <title>Post a Job - Palenso</title>
        <meta
          name="description"
          content="Discover career events, workshops, and networking opportunities on Palenso"
        />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold mb-4">Post a New Job</h1>
            <p className="text-lg">
              Create an engaging job posting to attract top talent
            </p>
          </motion.div>

          <PostJobForm profile={profile}/>
        </div>
      </div>
    </>
  );
};

PostJobPage.getLayout = Layouts.Employer;
export default PostJobPage;
