// next
import Head from "next/head";
import dynamic from "next/dynamic";

// swr
import useSWR from "swr";

// context
import { useUser } from "@/context";

// layout
import { Layouts } from "@/layouts";

// components
import Spinner from "@/components/spinner";

// services
import { userService } from "@/services";

// interfaces
import type { StudentProfile, EmployerProfile } from "@/interfaces";

// Dynamically import profile components to avoid SSR issues
const EmployerProfile = dynamic(
  () =>
    import("@/components/profile").then((mod) => ({
      default: mod.EmployerProfile,
    })),
  {
    ssr: false,
    loading: () => <Spinner />,
  },
);

const StudentProfile = dynamic(
  () => import("@/components/profile/student"),
  {
    ssr: false,
    loading: () => <Spinner />,
  },
);

const Profile = () => {
  const { user } = useUser();

  const { data: profile, isLoading } = useSWR(
    user?.role && user?.id ? `FETCH_${user.role}_PROFILE` : null,
    () => userService.getProfile(user?.id as string),
    {
      revalidateOnFocus: false,
    },
  );

  let title = "";
  let titleDescription = "";
  let Component = null;

  if (user?.role === "student") {
    title = "Student Profile";
    titleDescription = "Manage your profile and preferences";

    Component = StudentProfile;
  } else if (user?.role === "employer") {
    title = "Company Profile";
    titleDescription = "Manage your company profile and jobs";

    Component = EmployerProfile;
  }

  if (isLoading || !user) {
    Component = Spinner;
  }

  return (
    <>
      <Head>
        <title>{title} - Palenso</title>
        <meta name="description" content={titleDescription} />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="p-5">
          {Component && profile && <Component userProfile={profile as StudentProfile & { [key: string]: unknown }} />}
        </div>
      </div>
    </>
  );
};

Profile.getLayout = Layouts.Protected;

export default Profile;
