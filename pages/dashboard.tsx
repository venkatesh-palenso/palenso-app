// layout
import { Layouts } from "@/layouts";

// context
import { useUser } from "@/context/user";

// components
import {
  StudentDashboard,
  EmployerDashboard,
  AdminDashboard,
} from "@/components/dashboard";

const Dashboard = () => {
  const { user } = useUser();

  if (user?.role === "student") {
    return <StudentDashboard />;
  } else if (user?.role === "employer") {
    return <EmployerDashboard />;
  } else if (user?.role === "admin") {
    return <AdminDashboard />;
  } else {
    return null;
  }
};

Dashboard.getLayout = Layouts.Protected;

export default Dashboard;
