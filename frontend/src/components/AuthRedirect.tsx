import { useEffect } from "react";
import { useAuth } from "../context/authContext";
import { useLocation, useNavigate } from "react-router-dom";

const AuthRedirect = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (auth?.id && !location.pathname.includes("/dashboard")) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, [auth, navigate]);

  return null;
};

export default AuthRedirect;
