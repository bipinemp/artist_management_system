import { baseRegisterSchema, TEditUser } from "@/schemas/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { updateUser } from "@/apis/user";
import toast from "react-hot-toast";
import { useEffect } from "react";

type Props = {
  setEditDialog: React.Dispatch<boolean>;
  editedUserData: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    dob: string;
    gender: "m" | "f" | "o";
    address: string;
  };
};

const EditUserForm = ({ setEditDialog, editedUserData }: Props) => {
  const queryClient = useQueryClient();

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TEditUser>({
    resolver: zodResolver(baseRegisterSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: updateUser,
    onSettled(data: any) {
      if (data.status === 200) {
        toast.success("User updated successfully.");
        queryClient.invalidateQueries({ queryKey: ["users"] });
        setEditDialog(false);
      } else {
        toast.error("Something went wrong, Try again later.");
      }
    },
  });

  const onSubmit = (data: TEditUser) => {
    const updateData = {
      id: editedUserData.id,
      userData: data,
    };

    mutate(updateData);
  };

  useEffect(() => {
    if (editedUserData.id !== 0) {
      setValue("first_name", editedUserData.first_name);
      setValue("last_name", editedUserData.last_name);
      setValue("email", editedUserData.email);
      setValue("phone", editedUserData.phone);
      setValue("dob", editedUserData.dob);
      setValue("gender", editedUserData.gender);
      setValue("address", editedUserData.address);
    }
  }, [editedUserData]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      <div className="flex items-start gap-x-5 justify-between">
        <div className="grid gap-2">
          <Label htmlFor="first_name">*First name</Label>
          <Input
            {...register("first_name")}
            id="first_name"
            type="text"
            placeholder="John"
            className={cn("py-5", {
              "border-destructive": errors?.first_name?.message,
            })}
          />
          {errors?.first_name?.message && (
            <span className="text-destructive text-xs font-semibold">
              * {errors?.first_name?.message}
            </span>
          )}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="last_name">*Last name</Label>
          <Input
            {...register("last_name")}
            id="last_name"
            type="text"
            placeholder="Doe"
            className={cn("py-5", {
              "border-destructive": errors?.last_name?.message,
            })}
          />
          {errors?.last_name?.message && (
            <span className="text-destructive text-xs font-semibold">
              * {errors?.last_name?.message}
            </span>
          )}
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="email">*Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="johndoe@example.com"
          {...register("email")}
          className={cn("py-5", {
            "border-destructive": errors?.email?.message,
          })}
        />
        {errors?.email?.message && (
          <span className="text-destructive text-xs font-semibold">
            * {errors?.email?.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-y-3 mb-2">
        <Label htmlFor="gender">Gender</Label>
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
      </div>

      <div className="flex items-start gap-x-5 justify-between">
        <div className="grid gap-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            {...register("phone")}
            id="phone"
            type="text"
            placeholder="9845612818"
            className={cn("py-5", {
              "border-destructive": errors?.phone?.message,
            })}
          />
          {errors?.phone?.message && (
            <span className="text-destructive text-xs font-semibold">
              * {errors?.phone?.message}
            </span>
          )}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="dob">DOB</Label>
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
            <Loader2 className="animate-spin size-5" /> Updating...
          </span>
        ) : (
          "Update user"
        )}
      </Button>
    </form>
  );
};

export default EditUserForm;
