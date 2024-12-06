import { Button } from "@/components/ui/button";
import { ChevronLeft, PlusCircle } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "../../components/ui/dialog";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import MusicsTable from "@/components/musics/MusicsTable";
import CreateMusicForm from "@/components/musics/CreateMusicForm";

const Music = () => {
  const { name, id } = useParams<{ name: string; id: string }>();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  return (
    <>
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="h-fit max-h-screen overflow-y-auto">
          <DialogTitle title="Create Music" className="mb-3">
            Create Music
          </DialogTitle>
          <CreateMusicForm
            artist_id={Number(id)}
            setIsCreateDialogOpen={setIsCreateDialogOpen}
          />
        </DialogContent>
      </Dialog>

      <section className="relative w-full max-w-[750px] flex flex-col gap-y-5 justify-start mb-20">
        <div className="flex vsm:flex-row flex-col gap-y-2 justify-between items-center">
          <div className="flex items-center gap-x-3">
            <Link to="/dashboard/artist">
              <div className="p-2 rounded-full bg-zinc-50 border border-primary/50">
                <ChevronLeft className="size-4 md:size-5" />
              </div>
            </Link>

            <h1 className="text-[1rem] sm:text-[1.6rem] md:text-[1.9rem] font-bold opacity-70">
              {name}&apos;s Musics
            </h1>
          </div>

          <Button onClick={() => setIsCreateDialogOpen(true)} className="w-fit">
            <PlusCircle className="size-5" />
            Add Music
          </Button>
        </div>

        <MusicsTable artist_id={Number(id)} />
      </section>
    </>
  );
};

export default Music;
