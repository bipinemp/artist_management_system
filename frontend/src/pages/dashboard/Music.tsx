import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "../../components/ui/dialog";
import { useState } from "react";
import { useParams } from "react-router-dom";
import MusicsTable from "@/components/musics/MusicsTable";
import CreateMusicForm from "@/components/musics/CreateMusicForm";

const Music = () => {
  const { name, id } = useParams<{ name: string; id: string }>();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  return (
    <>
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="h-fit max-h-screen overflow-y-auto">
          <DialogTitle className="mb-3">Create Artist</DialogTitle>
          <CreateMusicForm
            artist_id={Number(id)}
            setIsCreateDialogOpen={setIsCreateDialogOpen}
          />
        </DialogContent>
      </Dialog>

      <section className="relative max-w-fit flex flex-col gap-y-5 justify-start mb-20">
        <div className="flex justify-between items-center">
          <h1 className="text-[1.6rem] vsm:text-[2rem] font-bold opacity-70">
            {name}&apos;s Musics
          </h1>

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
