import { Button } from "@/components/ui/button";
import { Edit, Loader } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PaginatedMusicsData } from "@/types/types";
import { useState } from "react";
import toast from "react-hot-toast";
import TableFooter from "../TableFooter";
import { deleteMusic, getAllArtistMusics } from "@/apis/music";
import DeleteMusicAlert from "./DeleteMusicAlert";
import EditMusicForm from "./EditMusicForm";

const MusicsTable = ({ artist_id }: { artist_id: number }) => {
  const INITIAL_DATA: any = {
    id: 0,
    artist_id: 0,
    title: "",
    genre: "rnb",
    album_name: "",
  };

  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [editDialog, setEditDialog] = useState(false);
  const [editedMusicData, setEditedMusicData] = useState<{
    id: number;
    artist_id: number;
    title: string;
    album_name: string;
    genre: "rnb" | "country" | "classic" | "rock" | "jazz";
  }>(INITIAL_DATA);

  const { data, isPending } = useQuery<PaginatedMusicsData>({
    queryKey: ["musics", page],
    queryFn: () => getAllArtistMusics(page, 10, artist_id),
  });

  const { mutate: deleteMusicRecord, isPending: isDeleting } = useMutation({
    mutationFn: deleteMusic,
    onSettled(data: any) {
      if (data.status === 200) {
        toast.success("Music Deleted Successfully.");
        queryClient.invalidateQueries({ queryKey: ["musics"] });
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
            setEditedMusicData(INITIAL_DATA);
          }}
          className="sm:max-w-[425px]"
        >
          <DialogHeader>
            <DialogTitle>Update User</DialogTitle>
          </DialogHeader>

          <EditMusicForm
            editedMusicData={editedMusicData}
            setEditDialog={setEditDialog}
          />
        </DialogContent>
      </Dialog>

      <div className="bg-white relative overflow-hidden rounded-md shadow border border-input">
        <div className="overflow-x-auto">
          <table className="relative w-full text-left">
            <thead className="border-b border-t bg-gray-50 uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-10 py-3">
                  Title
                </th>
                <th scope="col" className="px-10 py-3">
                  Album name
                </th>
                <th scope="col" className="px-10 py-3">
                  Genre
                </th>
                <th scope="col" className="px-10 text-right py-3">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="w-full opacity-80">
              {data?.artistMusicData?.musics?.map(
                ({ id, title, album_name, genre }) => (
                  <tr
                    key={id}
                    className="text-sm border-b odd:bg-white even:bg-gray-50"
                  >
                    <td
                      scope="row"
                      className="whitespace-nowrap px-10 py-4 font-medium text-gray-900 dark:text-white"
                    >
                      {title}
                    </td>

                    <td scope="row" className="whitespace-nowrap px-10 py-4">
                      {album_name}
                    </td>

                    <td
                      scope="row"
                      className="whitespace-nowrap px-10 py-4 font-medium text-gray-900 dark:text-white"
                    >
                      {genre}
                    </td>

                    <td
                      scope="row"
                      className="flex items-center justify-end gap-x-3 whitespace-nowrap px-10 py-4 font-medium text-gray-900 dark:text-white"
                    >
                      <Button
                        onClick={() => {
                          setEditDialog(true);
                          setEditedMusicData({
                            id,
                            artist_id,
                            title,
                            album_name,
                            genre,
                          });
                        }}
                        size={"icon"}
                      >
                        <Edit className="size-5" />
                      </Button>

                      <DeleteMusicAlert
                        id={id}
                        isDeleting={isDeleting}
                        deleteMusicRecord={deleteMusicRecord}
                      />

                      {/* <DeleteArtistAlert
                        id={id}
                        isDeleting={isDeleting}
                        deleteArtistRecord={deleteArtistRecord}
                      /> */}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>

        <TableFooter
          isPending={isPending}
          data={data?.artistMusicData?.musics}
          tableName="musics"
          page={page}
          prevPage={prevPage}
          nextPage={nextPage}
          totalPages={data?.artistMusicData?.pagination?.totalPages}
        />
      </div>
    </>
  );
};

export default MusicsTable;
