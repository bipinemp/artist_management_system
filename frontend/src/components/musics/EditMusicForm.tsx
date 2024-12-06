import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { musicGenres } from "@/constants/musicGenres";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { musicSchema, TMusic } from "@/schemas/musicSchema";
import { updateMusic } from "@/apis/music";

type Props = {
  setEditDialog: React.Dispatch<boolean>;
  editedMusicData: {
    id: number;
    artist_id: number;
    title: string;
    album_name: string;
    genre: "rnb" | "country" | "classic" | "rock" | "jazz";
  };
};

const EditMusicForm = ({ setEditDialog, editedMusicData }: Props) => {
  const queryClient = useQueryClient();

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TMusic>({
    resolver: zodResolver(musicSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: updateMusic,
    onSettled(data: any) {
      if (data.status === 200) {
        toast.success("Music updated successfully.");
        queryClient.invalidateQueries({ queryKey: ["musics"] });
        setEditDialog(false);
      } else {
        toast.error("Something went wrong, Try again later.");
      }
    },
  });

  const onSubmit = (data: TMusic) => {
    const updateData = {
      id: editedMusicData.id,
      musicData: { ...data, artist_id: editedMusicData.artist_id },
    };

    mutate(updateData);
  };

  useEffect(() => {
    if (editedMusicData.album_name !== "") {
      setValue("title", editedMusicData.title);
      setValue("album_name", editedMusicData.album_name);
      setValue("genre", editedMusicData.genre);
    }
  }, [editedMusicData]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      <div className="w-full grid gap-2">
        <Label htmlFor="title">*Music title</Label>
        <Input
          {...register("title")}
          id="title"
          type="text"
          placeholder="Enter music title..."
          className={cn("py-5", {
            "border-destructive": errors?.title?.message,
          })}
        />
        {errors?.title?.message && (
          <span className="text-destructive text-xs font-semibold">
            * {errors?.title?.message}
          </span>
        )}
      </div>

      <div className="w-full grid gap-2">
        <Label htmlFor="album_name">*Album name</Label>
        <Input
          {...register("album_name")}
          id="album_name"
          type="text"
          placeholder="Enter album name..."
          className={cn("py-5", {
            "border-destructive": errors?.title?.message,
          })}
        />
        {errors?.album_name?.message && (
          <span className="text-destructive text-xs font-semibold">
            * {errors?.album_name?.message}
          </span>
        )}
      </div>

      <div className="w-full grid gap-2">
        <Label htmlFor="genre">*Music genre</Label>
        <Controller
          control={control}
          name="genre"
          render={({ field }) => {
            return (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger id="genre" className="w-full">
                  <SelectValue placeholder="Select Genre" />
                </SelectTrigger>
                <SelectContent>
                  {musicGenres.map((genre, idx) => (
                    <SelectItem key={idx} value={genre}>
                      {genre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            );
          }}
        />

        {errors?.genre?.message && (
          <span className="text-destructive text-xs font-semibold">
            * {errors?.genre?.message}
          </span>
        )}
      </div>

      <Button disabled={isPending} type="submit" className="w-full">
        {isPending ? (
          <span className="flex items-center gap-x-2">
            <Loader2 className="animate-spin size-5" /> Updating music...
          </span>
        ) : (
          "Update music"
        )}
      </Button>
    </form>
  );
};

export default EditMusicForm;
