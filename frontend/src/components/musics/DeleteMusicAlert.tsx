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
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { Loader2, Trash } from "lucide-react";

type Props = {
  id: number;
  isDeleting: boolean;
  deleteMusicRecord: UseMutateFunction<any, Error, number, unknown>;
};

const DeleteMusicAlert = ({ id, isDeleting, deleteMusicRecord }: Props) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button
          variant={"outline"}
          size={"icon"}
          className="border-destructive/70"
        >
          <Trash className="size-5 text-destructive" strokeWidth={3} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            music.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => deleteMusicRecord(id)}>
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

export default DeleteMusicAlert;
