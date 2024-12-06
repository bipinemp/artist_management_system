import { User } from "@/types/types";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const baseURL = import.meta.env.VITE_API_URL;

export const API = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

type AuthContextType = {
  auth: User | undefined;
  setAuth: React.Dispatch<React.SetStateAction<User | undefined>>;
  login: (
    email: string,
    password: string,
    onSuccess?: () => void
  ) => Promise<void>;
  logout: () => Promise<void>;
  isLogging: boolean;
  isLoggingOut: boolean;
};

const authContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [auth, setAuth] = useState<User | undefined>(undefined);
  const [isLogging, setIsLogging] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    const fetchAccessToken = async () => {
      if (!auth?.access_token) {
        try {
          const { data } = await axios.get(`${baseURL}/auth/refreshToken`, {
            withCredentials: true,
          });

          if (data) {
            setAuth({
              id: data.user_id,
              first_name: data.first_name,
              last_name: data.last_name,
              email: data.email,
              access_token: data.access_token,
            });
          }
        } catch (error) {
          console.log("Failed to refresh access token");
        }
      }
    };

    fetchAccessToken();
  }, []);

  useEffect(() => {
    const requestInterceptor = API.interceptors.request.use(
      (config) => {
        if (auth?.access_token) {
          config.headers.Authorization = `Bearer ${auth?.access_token}`;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => {
      API.interceptors.request.eject(requestInterceptor);
    };
  }, [auth]);

  useEffect(() => {
    const responseInterceptor = API.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (
          error.response?.status === 401 &&
          error.config.url !== `/auth/login` &&
          !(error.config.method === "post" && error.config.url === `/users`)
        ) {
          try {
            const { data } = await axios.get(`${baseURL}/auth/refreshToken`, {
              withCredentials: true,
            });

            setAuth((prev) => ({ ...prev, access_token: data.access_token }));

            error.config.headers.Authorization = `Bearer ${data.access_token}`;
            return API.request(error.config);
          } catch (error) {
            setAuth(undefined);

            return Promise.reject(error);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      API.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  const login = async (
    email: string,
    password: string,
    onSuccess?: () => void
  ) => {
    try {
      setIsLogging(true);
      const { data } = await API.post("/auth/login", { email, password });

      if (data) {
        setAuth({
          id: data.user_id,
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          access_token: data.access_token,
        });

        toast.success("LoggedIn Successfully.");
        onSuccess?.();
      }
    } catch (error: any) {
      setIsLogging(false);
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setIsLogging(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoggingOut(true);
      const response = await API.post("/auth/logout");

      if (response.status === 200) {
        setAuth(undefined);
        window.location.href = "/login";
      }
    } catch (error: any) {
      console.log(error);
      setIsLoggingOut(false);
      toast.error("Something went wrong, Try again later.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <authContext.Provider
      value={{ auth, setAuth, login, isLogging, logout, isLoggingOut }}
    >
      {children}
    </authContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(authContext);

  if (!context) {
    throw new Error("useAuth must be used within a AuthContextProvider.");
  }

  return context;
};
