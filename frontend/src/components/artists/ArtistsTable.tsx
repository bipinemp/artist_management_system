import { Button } from "@/components/ui/button";
import { Edit, Loader, Music4 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FullArtist, PaginatedArtistData } from "@/types/types";
import moment from "moment";
import { displayGender } from "@/utils/displayGender";
import { useState } from "react";
import toast from "react-hot-toast";
import TableFooter from "../TableFooter";
import { deleteArtist, getAllArtists } from "@/apis/artist";
import EditArtistForm from "./EditArtistForm";
import DeleteArtistAlert from "./DeleteArtistAlert";
import { Link } from "react-router-dom";

const ArtistsTable = () => {
  const INITIAL_DATA: FullArtist = {
    id: 0,
    name: "",
    dob: "",
    gender: "m",
    address: "",
    first_release_year: 0,
    no_of_albums_released: 0,
  };

  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [editDialog, setEditDialog] = useState(false);
  const [editedArtistData, setEditedArtistData] = useState<{
    id: number;
    name: string;
    dob: string;
    gender: "m" | "f" | "o";
    address: string;
    first_release_year: number;
    no_of_albums_released: number;
  }>(INITIAL_DATA);

  const { data, isPending } = useQuery<PaginatedArtistData>({
    queryKey: ["artists", page],
    queryFn: () => getAllArtists(page, 10),
  });

  const {
    mutate: deleteArtistRecord,
    isPending: isDeleting,
    isError,
  } = useMutation({
    mutationFn: deleteArtist,
    onSettled(data: any) {
      if (data.status === 200) {
        toast.success("Artist Deleted Successfully.");
        queryClient.invalidateQueries({ queryKey: ["artists"] });
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
            setEditedArtistData(INITIAL_DATA);
          }}
          className="sm:max-w-[425px]"
        >
          <DialogHeader>
            <DialogTitle>Update User</DialogTitle>
          </DialogHeader>

          <EditArtistForm
            editedArtistData={editedArtistData}
            setEditDialog={setEditDialog}
          />
        </DialogContent>
      </Dialog>

      <div className="bg-white relative overflow-hidden rounded-md shadow border border-input">
        <div className="overflow-x-auto">
          <table className="relative text-left">
            <thead className="border-b border-t bg-gray-50 uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
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
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  First Release Year
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  No of albums
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="w-full opacity-80">
              {data?.artistsData?.artists?.map(
                ({
                  id,
                  name,
                  dob,
                  gender,
                  address,
                  first_release_year,
                  no_of_albums_released,
                }) => (
                  <tr
                    key={id}
                    className="text-sm border-b odd:bg-white even:bg-gray-50"
                  >
                    <td
                      scope="row"
                      className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                    >
                      {name}
                    </td>

                    <td scope="row" className="whitespace-nowrap px-6 py-4">
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
                      {address || "N/A"}
                    </td>

                    <td
                      scope="row"
                      className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                    >
                      {first_release_year}
                    </td>

                    <td
                      scope="row"
                      className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                    >
                      {no_of_albums_released}
                    </td>

                    <td
                      scope="row"
                      className="flex items-center justify-center gap-x-3 whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                    >
                      <Button
                        onClick={() => {
                          setEditDialog(true);
                          setEditedArtistData({
                            id,
                            name,
                            dob: moment(dob).format("YYYY-MM-DD"),
                            gender,
                            address,
                            first_release_year,
                            no_of_albums_released,
                          });
                        }}
                        size={"icon"}
                      >
                        <Edit className="size-5" />
                      </Button>

                      <Link to={`/dashboard/${name}/${id}/musics`}>
                        <Button
                          variant={"secondary"}
                          className="border border-gray-500"
                        >
                          <Music4 className="size-5" /> Musics
                        </Button>
                      </Link>

                      <DeleteArtistAlert
                        id={id}
                        isDeleting={isDeleting}
                        deleteArtistRecord={deleteArtistRecord}
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
          data={data?.artistsData?.artists}
          tableName="artists"
          page={page}
          prevPage={prevPage}
          nextPage={nextPage}
          totalPages={data?.artistsData?.pagination?.totalPages}
        />
      </div>
    </>
  );
};

export default ArtistsTable;
