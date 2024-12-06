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
          <DialogTitle className="mb-3" title="Create Artist">
            Create Artist
          </DialogTitle>
          <CreateArtistForm setIsCreateDialogOpen={setIsCreateDialogOpen} />
        </DialogContent>
      </Dialog>

      <section className="relative w-full max-w-[1000px] flex flex-col gap-y-5 justify-start mb-20">
        <div className="flex vsm:flex-row flex-col gap-y-2 justify-between items-center">
          <h1 className="text-[1.1rem] sm:text-[1.6rem] md:text-[2rem] font-bold opacity-70">
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
