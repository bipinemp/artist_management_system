import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useAuth } from "../context/authContext";
import MblSidebar from "./MblSidebar";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./ErrorFallback";

const DashboardLayout = () => {
  const { auth } = useAuth();

  if (!auth?.id) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex gap-x-10 overflow-x-hidden">
      <Sidebar />
      <div className="w-full px-6 pb-10 pt-5 md:px-5 md:pl-60">
        <MblSidebar />
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Outlet />
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default DashboardLayout;
