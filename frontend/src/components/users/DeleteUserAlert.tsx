import { UseMutateFunction } from "@tanstack/react-query";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../components/ui/alert-dialog";
import { Loader2, Trash } from "lucide-react";

type Props = {
  id: number;
  isDeleting: boolean;
  deleteUserRecord: UseMutateFunction<any, Error, number, unknown>;
};

const DeleteUserAlert = ({ id, isDeleting, deleteUserRecord }: Props) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="border p-2 rounded-md border-destructive/70">
        <Trash className="size-5 text-destructive" strokeWidth={3} />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the user.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => deleteUserRecord(id)}>
            {isDeleting ? (
              <span>
                <Loader2 className="animate-spin size-5" /> Deleting...
              </span>
            ) : (
              "Delete"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteUserAlert;
