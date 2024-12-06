import { sidebarLinks } from "../constants/sidebarLinks";
import { NavLink } from "react-router-dom";
import { Button } from "./ui/button";
import { LogOut, Mic2, UsersRound } from "lucide-react";
import { useAuth } from "../context/authContext";

const Sidebar = () => {
  const { auth, logout } = useAuth();

  return (
    <aside className="w-[200px] hidden fixed left-0 top-0 h-screen bg-primary text-secondary md:flex flex-col justify-between">
      <div className="flex flex-col gap-y-10">
        <div className="flex flex-col py-3 mx-2 rounded-md mt-2 px-5 bg-secondary/20 border border-secondary/40">
          <h3>
            {auth?.first_name} {auth?.last_name}
          </h3>
          <p className="text-sm opacity-80">{auth?.email}</p>
        </div>

        <div className="flex flex-col gap-y-1">
          {sidebarLinks.map((link, idx) => (
            <NavLink
              to={link.url}
              key={link.title}
              end={link.url === "/dashboard"}
              className={({ isActive }) =>
                `${
                  isActive ? "bg-secondary/20" : ""
                } flex items-center gap-x-2 font-semibold text-lg tracking-wide py-3 px-5 transition hover:bg-secondary/20`
              }
            >
              {idx === 0 ? (
                <UsersRound className="size-6" />
              ) : (
                <Mic2 className="size-6" />
              )}{" "}
              {link.title}
            </NavLink>
          ))}
        </div>
      </div>

      <Button
        onClick={logout}
        variant={"outline"}
        className="py-3 px-5 bg-secondary/20 mx-2 mb-5 hover:border-primary"
      >
        <LogOut /> Logout
      </Button>
    </aside>
  );
};

export default Sidebar;
