import { ReactNode } from "react";
import { useAuth } from "../context/authContext";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }: { children: ReactNode }) => {
  const { auth } = useAuth();

  if (auth?.id) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="py-10 bg-gray-200 min-h-screen h-full">{children}</div>
  );
};

export default PublicRoute;
