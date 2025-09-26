import { loginSchema, type LoginFormData } from "../schemas/login.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUser } from "../services/auth.service";
import { useForm } from "react-hook-form";
import { useAuth } from "../auth/useAuth";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";

export default function AuthLogin() {
  const { setUser } = useAuth();
  const queryClient = useQueryClient();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: loginUser,
    onSuccess: (userData) => {
      setUser(userData);
      window.localStorage.setItem("AUTH_USER", JSON.stringify(userData));
      queryClient.invalidateQueries();
    },
  });

  // @ts-ignore ¯\_(ツ)_/¯
  const errorMessage = error?.response?.data?.error;

  const onSubmit = (data: LoginFormData) => mutate(data);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">NEXML::Login</CardTitle>
        </CardHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {isError && <p className="text-sm text-destructive text-center">{errorMessage || "Login failed"}</p>}
            </CardContent>

            <CardFooter className="flex flex-col gap-3">
              <Button type="submit" disabled={isPending} className="w-full mt-4">
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isPending ? "Logging in..." : "Login"}
              </Button>

              <Separator className="my-2" />

              <p className="text-sm text-muted-foreground text-center">
                Don’t have an account?{" "}
                <Link to="/register" className="text-primary hover:underline hover:text-primary/80">
                  Register
                </Link>
              </p>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
