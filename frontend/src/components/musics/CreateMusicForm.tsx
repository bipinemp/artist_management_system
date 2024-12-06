import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { musicSchema, TMusic } from "@/schemas/musicSchema";
import { createMusic } from "@/apis/music";
import { musicGenres } from "@/constants/musicGenres";

type Props = {
  setIsCreateDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  artist_id: number;
};

const CreateMusicForm = ({ setIsCreateDialogOpen, artist_id }: Props) => {
  const queryClient = useQueryClient();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TMusic>({
    resolver: zodResolver(musicSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createMusic,
    onSettled(data: any) {
      if (data.status === 201) {
        queryClient.invalidateQueries({ queryKey: ["musics"] });
        if (setIsCreateDialogOpen) {
          setIsCreateDialogOpen(false);
        }
        toast.success("Music created successfully.");
      } else {
        toast.error("Something went wrong, Try again later.");
      }
    },
  });

  const onSubmit = (data: TMusic) => {
    const modifiedMusic = {
      ...data,
      artist_id,
    };

    mutate(modifiedMusic);
  };

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
                <SelectTrigger id="genre">
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
            <Loader2 className="animate-spin size-5" /> Creating music...
          </span>
        ) : (
          "Create music"
        )}
      </Button>
    </form>
  );
};

export default CreateMusicForm;
