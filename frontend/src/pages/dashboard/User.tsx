import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import UsersTable from "@/components/users/UsersTable";

const User = () => {
  return (
    <section className="relative max-w-[1000px] flex flex-col gap-y-5 justify-start mb-20">
      <div className="flex justify-between items-center">
        <h1 className="text-[1.6rem] vsm:text-[2rem] font-bold opacity-70">
          Users
        </h1>

        <Button className="w-fit">
          <PlusCircle className="size-5" />
          Add User
        </Button>
      </div>

      <UsersTable />
    </section>
  );
};

export default User;
