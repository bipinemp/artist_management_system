import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { artistSchema, TArtist } from "@/schemas/artistSchema";
import { updateArtist } from "@/apis/artist";

type Props = {
  setEditDialog: React.Dispatch<boolean>;
  editedArtistData: {
    id: number;
    name: string;
    dob: string;
    gender: "m" | "f" | "o";
    address: string;
    first_release_year: number;
    no_of_albums_released: number;
  };
};

const EditArtistForm = ({ setEditDialog, editedArtistData }: Props) => {
  const queryClient = useQueryClient();

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TArtist>({
    resolver: zodResolver(artistSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: updateArtist,
    onSettled(data: any) {
      if (data.status === 200) {
        toast.success("Artist updated successfully.");
        queryClient.invalidateQueries({ queryKey: ["artists"] });
        setEditDialog(false);
      } else {
        toast.error("Something went wrong, Try again later.");
      }
    },
  });

  const onSubmit = (data: TArtist) => {
    const updateData = {
      id: editedArtistData.id,
      artistData: data,
    };

    mutate(updateData);
  };

  useEffect(() => {
    if (editedArtistData.id !== 0) {
      setValue("name", editedArtistData.name);
      setValue("dob", editedArtistData.dob);
      setValue("gender", editedArtistData.gender);
      setValue("address", editedArtistData.address);
      setValue(
        "first_release_year",
        editedArtistData.first_release_year?.toString()
      );
      setValue(
        "no_of_albums_released",
        editedArtistData.no_of_albums_released?.toString()
      );
    }
  }, [editedArtistData]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      <div className="w-full grid gap-2">
        <Label htmlFor="name">*Artist name</Label>
        <Input
          {...register("name")}
          id="name"
          type="text"
          placeholder="John"
          className={cn("py-5", {
            "border-destructive": errors?.name?.message,
          })}
        />
        {errors?.name?.message && (
          <span className="text-destructive text-xs font-semibold">
            * {errors?.name?.message}
          </span>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="dob">*DOB</Label>
        <Input
          {...register("dob")}
          id="dob"
          type="date"
          className={cn("py-5", {
            "border-destructive": errors?.dob?.message,
          })}
        />
        {errors?.dob?.message && (
          <span className="text-destructive text-xs font-semibold">
            * {errors?.dob?.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-y-3 mb-2">
        <Label htmlFor="gender">*Gender</Label>
        <Controller
          control={control}
          name="gender"
          render={({ field }) => {
            return (
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                id="gender"
                className="flex items-center gap-x-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="m" id="male" />
                  <Label htmlFor="male" className="opacity-80 text-xs">
                    Male
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="f" id="female" />
                  <Label htmlFor="female" className="opacity-80 text-xs">
                    Female
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="o" id="others" />
                  <Label htmlFor="others" className="opacity-80 text-xs">
                    Others
                  </Label>
                </div>
              </RadioGroup>
            );
          }}
        />
        {errors?.gender?.message && (
          <span className="text-destructive text-xs font-semibold">
            * {errors?.gender?.message}
          </span>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="first_release_year">*First release year</Label>
        <Input
          {...register("first_release_year")}
          id="first_release_year"
          type="text"
          placeholder="Kathmandu, Nepal"
          className={cn("py-5", {
            "border-destructive": errors?.first_release_year?.message,
          })}
        />
        {errors?.first_release_year?.message && (
          <span className="text-destructive text-xs font-semibold">
            * {errors?.first_release_year?.message}
          </span>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="no_of_albums_released">*No of albums released</Label>
        <Input
          {...register("no_of_albums_released")}
          id="no_of_albums_released"
          type="text"
          placeholder="Kathmandu, Nepal"
          className={cn("py-5", {
            "border-destructive": errors?.no_of_albums_released?.message,
          })}
        />
        {errors?.no_of_albums_released?.message && (
          <span className="text-destructive text-xs font-semibold">
            * {errors?.no_of_albums_released?.message}
          </span>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="address">Address</Label>
        <Input
          {...register("address")}
          id="address"
          type="text"
          placeholder="Kathmandu, Nepal"
          className={cn("py-5", {
            "border-destructive": errors?.address?.message,
          })}
        />
        {errors?.address?.message && (
          <span className="text-destructive text-xs font-semibold">
            * {errors?.address?.message}
          </span>
        )}
      </div>

      <Button disabled={isPending} type="submit" className="w-full">
        {isPending ? (
          <span className="flex items-center gap-x-2">
            <Loader2 className="animate-spin size-5" /> Updating artist...
          </span>
        ) : (
          "Update artist"
        )}
      </Button>
    </form>
  );
};

export default EditArtistForm;
