import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import UsersTable from "@/components/users/UsersTable";
import { useState } from "react";
import { Dialog, DialogContent } from "../../components/ui/dialog";
import Register from "../auth/Register";

const User = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  return (
    <>
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="p-0 m-0 max-w-md">
          <Register
            fromDashboard={true}
            setIsCreateDialogOpen={setIsCreateDialogOpen}
          />
        </DialogContent>
      </Dialog>

      <section className="relative max-w-[1000px] flex flex-col gap-y-5 justify-start mb-20">
        <div className="flex justify-between items-center">
          <h1 className="text-[1.6rem] vsm:text-[2rem] font-bold opacity-70">
            Users
          </h1>

          <Button onClick={() => setIsCreateDialogOpen(true)} className="w-fit">
            <PlusCircle className="size-5" />
            Add User
          </Button>
        </div>

        <UsersTable />
      </section>
    </>
  );
};

export default User;
