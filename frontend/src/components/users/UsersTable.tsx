import { Button } from "@/components/ui/button";
import { Edit, Loader } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteUser, getAllUsers } from "@/apis/user";
import { PaginatedUsersData } from "@/types/types";
import moment from "moment";
import { displayGender } from "@/utils/displayGender";
import { useState } from "react";
import EditUserForm from "./EditUserForm";
import toast from "react-hot-toast";
import DeleteUserAlert from "./DeleteUserAlert";
import TableFooter from "../TableFooter";

const UsersTable = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [editDialog, setEditDialog] = useState(false);
  const [editedUserData, setEditedUserData] = useState<{
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    dob: string;
    gender: "m" | "f" | "o";
    address: string;
  }>({
    id: 0,
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "m",
    address: "",
  });

  const { data, isPending, isError } = useQuery<PaginatedUsersData>({
    queryKey: ["users", page],
    queryFn: () => getAllUsers(page, 10),
  });

  const { mutate: deleteUserRecord, isPending: isDeleting } = useMutation({
    mutationFn: deleteUser,
    onSettled(data: any) {
      if (data.status === 200) {
        toast.success("User Deleted Successfully.");
        queryClient.invalidateQueries({ queryKey: ["users"] });
      } else {
        toast.error("Something went wrong, Try again later.");
      }
    },
  });

  const prevPage = () => setPage(page! - 1);
  const nextPage = () => setPage(page! + 1);

  if (isPending) {
    return <Loader className="animate-spin size-10" />;
  }

  return (
    <>
      <Dialog open={editDialog} onOpenChange={setEditDialog}>
        <DialogContent
          onCloseAutoFocus={() => {
            setEditedUserData({
              id: 0,
              first_name: "",
              last_name: "",
              email: "",
              phone: "",
              dob: "",
              gender: "m",
              address: "",
            });
          }}
          className="sm:max-w-[425px]"
        >
          <DialogHeader>
            <DialogTitle>Update User</DialogTitle>
          </DialogHeader>

          <EditUserForm
            editedUserData={editedUserData}
            setEditDialog={setEditDialog}
          />
        </DialogContent>
      </Dialog>

      <div className="bg-white overflow-hidden relative rounded-md shadow border border-input">
        <div className="overflow-auto">
          <table className="w-full text-left">
            <thead className="border-b border-t bg-gray-50 uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Phone
                </th>
                <th scope="col" className="px-6 py-3">
                  DOB
                </th>
                <th scope="col" className="px-6 py-3">
                  Gender
                </th>
                <th scope="col" className="px-6 py-3">
                  Address
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="w-full opacity-80">
              {data?.usersData?.users?.map(
                ({
                  id,
                  first_name,
                  last_name,
                  email,
                  dob,
                  address,
                  phone,
                  gender,
                }) => (
                  <tr
                    key={id}
                    className="text-sm border-b odd:bg-white even:bg-gray-50"
                  >
                    <td
                      scope="row"
                      className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                    >
                      {first_name} {last_name}
                    </td>

                    <td scope="row" className="whitespace-nowrap px-6 py-4">
                      {email}
                    </td>

                    <td
                      scope="row"
                      className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                    >
                      {phone}
                    </td>

                    <td
                      scope="row"
                      className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                    >
                      {moment(dob).format("YYYY-MM-DD")}
                    </td>

                    <td
                      scope="row"
                      className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                    >
                      {displayGender(gender)}
                    </td>

                    <td
                      scope="row"
                      className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                    >
                      {address}
                    </td>

                    <td
                      scope="row"
                      className="flex items-center justify-center gap-x-3 whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                    >
                      <Button
                        onClick={() => {
                          setEditDialog(true);
                          setEditedUserData({
                            id,
                            first_name,
                            last_name,
                            email,
                            phone,
                            dob: moment(dob).format("YYYY-MM-DD"),
                            gender,
                            address,
                          });
                        }}
                        size={"icon"}
                      >
                        <Edit className="size-5" />
                      </Button>

                      <DeleteUserAlert
                        id={id}
                        isDeleting={isDeleting}
                        deleteUserRecord={deleteUserRecord}
                      />
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>

        {isError && (
          <div className="p-3 text-center">
            <h3 className="text-destructive">
              Something went wrong, Try again later.
            </h3>
          </div>
        )}

        <TableFooter
          isPending={isPending}
          data={data?.usersData?.users}
          tableName="users"
          page={page}
          prevPage={prevPage}
          nextPage={nextPage}
          totalPages={data?.usersData?.pagination?.totalPages}
        />
      </div>
    </>
  );
};

export default UsersTable;
