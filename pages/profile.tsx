// next
import Head from "next/head";

// swr
import useSWR from "swr";

// context
import { useUser } from "@/context";

// layout
import { Layouts } from "@/layouts";

// components
import { EmployerProfile, StudentProfile } from "@/components/profile";
import Spinner from "@/components/spinner";

// services
import { userService } from "@/services";

const Profile = () => {
  const { user } = useUser();

  const { data: profile, isLoading } = useSWR(
    `FETCH_${user?.role}_PROFILE`,
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

  if (isLoading) {
    Component = Spinner;
  }

  return (
    <>
      <Head>
        <title>{title} - Palenso</title>
        <meta name="description" content={titleDescription} />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="py-3">
          {Component && <Component userProfile={profile} />}
        </div>
      </div>
    </>
  );
};

Profile.getLayout = Layouts.Protected;

export default Profile;
