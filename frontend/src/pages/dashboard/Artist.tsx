import ArtistsTable from "@/components/artists/ArtistsTable";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "../../components/ui/dialog";
import { useState } from "react";
import CreateArtistForm from "@/components/artists/CreateArtistForm";

const Artist = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  return (
    <>
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="h-fit max-h-screen overflow-y-auto">
          <DialogTitle className="mb-3">Create Artist</DialogTitle>
          <CreateArtistForm setIsCreateDialogOpen={setIsCreateDialogOpen} />
        </DialogContent>
      </Dialog>

      <section className="relative max-w-[1000px] flex flex-col gap-y-5 justify-start mb-20">
        <div className="flex justify-between items-center">
          <h1 className="text-[1.6rem] vsm:text-[2rem] font-bold opacity-70">
            Artists
          </h1>

          <Button onClick={() => setIsCreateDialogOpen(true)} className="w-fit">
            <PlusCircle className="size-5" />
            Add Artist
          </Button>
        </div>

        <ArtistsTable />
      </section>
    </>
  );
};

export default Artist;
