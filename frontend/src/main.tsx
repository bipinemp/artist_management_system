import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { AuthContextProvider } from "./context/authContext.tsx";
import { Toaster } from "react-hot-toast";
import QueryProvider from "./components/QueryProvider.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthRedirect from "./components/AuthRedirect.tsx";
import PublicRoute from "./components/PublicRoute.tsx";
import Login from "./pages/auth/Login.tsx";
import Register from "./pages/auth/Register.tsx";
import DashboardLayout from "./components/DashboardLayout.tsx";
import User from "./pages/dashboard/User.tsx";
import Artist from "./pages/dashboard/Artist.tsx";
import Music from "./pages/dashboard/Music.tsx";
import NotFound from "./components/NotFound.tsx";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./components/ErrorFallback.tsx";

const router = createBrowserRouter([
  { path: "/", element: <AuthRedirect /> },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Login />
        </ErrorBoundary>
      </PublicRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <PublicRoute>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Register />
        </ErrorBoundary>
      </PublicRoute>
    ),
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <User />,
      },
      {
        path: "/dashboard/artist",
        element: <Artist />,
      },
      {
        path: "/dashboard/:name/:id/musics",
        element: <Music />,
      },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthContextProvider>
      <QueryProvider>
        <Toaster position="top-center" reverseOrder={true} />
        <RouterProvider router={router} />
      </QueryProvider>
    </AuthContextProvider>
  </StrictMode>
);
