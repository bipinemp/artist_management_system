import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { loginSchema, TLogin } from "../../schemas/authSchema";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "../../lib/utils";
import { Loader2 } from "lucide-react";
import { useAuth } from "../../context/authContext";

const Login = () => {
  const navigate = useNavigate();
  const { login, isLogging } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLogin>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: TLogin) => {
    login(data.email, data.password, () => {
      navigate("/dashboard");
    });
  };

  return (
    <Card className="mx-auto max-w-sm bg-zinc-100 border-primary/30">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              {...register("email")}
              id="email"
              type="email"
              placeholder="m@example.com"
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
            <Label htmlFor="password">Password</Label>
            <Input
              {...register("password")}
              id="password"
              type="password"
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
          <Button disabled={isLogging} type="submit" className="w-full">
            {isLogging ? (
              <span className="flex items-center gap-x-2">
                <Loader2 className="animate-spin size-5" /> Logging In...
              </span>
            ) : (
              "Login"
            )}
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="underline">
            Register
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default Login;
