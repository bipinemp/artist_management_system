import { LogOut, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useAuth } from "@/context/authContext";
import { Link, useLocation } from "react-router-dom";

const MblSidebar = () => {
  const { auth, logout } = useAuth();
  const { pathname } = useLocation();
  const [openSidebar, setOpenSidebar] = useState(false);
  return (
    <Sheet open={openSidebar} onOpenChange={setOpenSidebar}>
      <SheetTrigger>
        <div className="md:hidden p-2 size-[40px] cursor-pointer mb-2 flex items-center justify-center bg-zinc-100 border border-gray-400 rounded-full">
          <Menu className="size-6" />
        </div>
      </SheetTrigger>
      <SheetTitle title="Sidebar"></SheetTitle>
      <SheetContent side={"left"} className="p-0 max-w-[200px]">
        <div className="h-full flex flex-col justify-between">
          <div className="flex flex-col gap-y-1">
            <div className="flex flex-col py-3 mx-2 rounded-md mt-2 px-5 bg-secondary/20 border border-primary/50 mb-3">
              <h3>
                {auth?.first_name} {auth?.last_name}
              </h3>
              <p className="text-sm opacity-80">{auth?.email}</p>
            </div>

            <Link
              onClick={() => setOpenSidebar(false)}
              to="/dashboard"
              className={cn(
                "w-full bg-zinc-50 py-4 px-10 text-lg font-semibold transition hover:bg-zinc-200",
                { "bg-zinc-200": pathname === "/dashboard" }
              )}
            >
              Users
            </Link>
            <Link
              onClick={() => setOpenSidebar(false)}
              to="/dashboard/artist"
              className={cn(
                "w-full bg-zinc-50 py-4 px-10 text-lg font-semibold transition hover:bg-zinc-200",
                { "bg-zinc-200": pathname === "/dashboard/artist" }
              )}
            >
              Artists
            </Link>
          </div>
          <Button
            onClick={logout}
            variant={"outline"}
            className="py-3 px-5 bg-secondary/20 transition hover:bg-zinc-200 border-primary mx-2 mb-5 hover:border-primary"
          >
            <LogOut /> Logout
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MblSidebar;
