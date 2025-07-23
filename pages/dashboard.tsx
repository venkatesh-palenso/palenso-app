// layout
import { Layouts } from "@/layouts";

// swr
import useSWR from "swr";

// context
import { useUser } from "@/context/user";

// components
import {
  StudentDashboard,
  EmployerDashboard,
  AdminDashboard,
} from "@/components/dashboard";
import Spinner from "@/components/spinner";

// services
import { dashboardService } from "@/services";
import {
  AdminAnalytics,
  AdminDashboardInfo,
  EmployerAnalytics,
  EmployerDashboardInfo,
  StudentAnalytics,
  StudentDashboardInfo,
} from "@/interfaces";

const Dashboard = () => {
  const { user } = useUser();

  // Use parallel API calls for better performance
  const {
    data: dashboardData,
    isLoading,
    error,
  } = useSWR(
    user ? "FETCH_DASHBOARD_DATA" : null,
    () => dashboardService.getDashboardData(),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 30000, // Cache for 30 seconds
      errorRetryCount: 2,
      errorRetryInterval: 1000,
    },
  );

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Spinner className="w-8 h-8 mx-auto mb-4" />
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <svg
              className="w-12 h-12 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">
            Failed to load dashboard
          </h3>
          <p className="text-muted-foreground mb-4">
            Please try refreshing the page
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  // Show appropriate dashboard based on user role
  if (user?.role === "student") {
    return (
      <StudentDashboard
        analytics={dashboardData?.analytics as StudentAnalytics}
        dashboardInfo={dashboardData?.dashboardInfo as StudentDashboardInfo}
      />
    );
  } else if (user?.role === "employer") {
    return (
      <EmployerDashboard
        analytics={dashboardData?.analytics as EmployerAnalytics}
        dashboardInfo={dashboardData?.dashboardInfo as EmployerDashboardInfo}
      />
    );
  } else if (user?.role === "admin") {
    return (
      <AdminDashboard
        analytics={dashboardData?.analytics as AdminAnalytics}
        dashboardInfo={dashboardData?.dashboardInfo as AdminDashboardInfo}
      />
    );
  } else {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Invalid user role</p>
        </div>
      </div>
    );
  }
};

Dashboard.getLayout = Layouts.Protected;

export default Dashboard;
