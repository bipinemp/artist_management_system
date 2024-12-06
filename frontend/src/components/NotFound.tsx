import { useAuth } from "@/context/authContext";
import { Link } from "react-router-dom";

export default function NotFound() {
  const { auth } = useAuth();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="max-w-md w-full px-6 py-8 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <div className="text-center">
          <h1 className="text-9xl font-bold text-gray-300 dark:text-gray-700">
            404
          </h1>
          <div className="w-full flex justify-center my-4">
            <svg
              className="w-32 h-32 text-indigo-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
          <p className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Oops! Page not found
          </p>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link
            to={auth?.id ? "/dashboard" : "/login"}
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            {auth?.id ? "Go to dashboard" : "Login"}
          </Link>
        </div>
      </div>
    </div>
  );
}
