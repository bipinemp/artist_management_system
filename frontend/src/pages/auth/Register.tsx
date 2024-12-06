import { createUserSchema, TCreateUser } from "@/schemas/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createUser } from "@/apis/user";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const Register = () => {
  const navigate = useNavigate();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TCreateUser>({
    resolver: zodResolver(createUserSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createUser,
    onSettled(data: any) {
      console.log("data : ", data);
      if (data.status === 201) {
        toast.success("Registered Successfully.");
        navigate("/login");
      } else {
        toast.error("Something went wrong, Try again later.");
      }
    },
  });

  const onSubmit = (data: TCreateUser) => {
    mutate(data);
  };

  return (
    <Card className="mx-auto max-w-md bg-zinc-100 border-primary/30 my-10">
      <CardHeader>
        <CardTitle className="text-2xl">Register</CardTitle>
        <CardDescription>
          Enter your details to register your account
        </CardDescription>
      </CardHeader>
      <CardContent>
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

          <div className="grid gap-2">
            <Label htmlFor="password">*Password</Label>
            <Input
              id="password"
              type="password"
              {...register("password")}
              className={cn("py-5", {
                "border-destructive": errors?.password?.message,
              })}
            />
            {errors?.password?.message && (
              <span className="text-destructive text-xs font-semibold">
                * {errors?.password?.message}
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
                <Loader2 className="animate-spin size-5" /> Registering...
              </span>
            ) : (
              "Register"
            )}
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="underline">
            Login
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default Register;
