import { useEffect } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const AuthRedirect = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth?.id) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, [auth, navigate]);

  return null;
};

export default AuthRedirect;
