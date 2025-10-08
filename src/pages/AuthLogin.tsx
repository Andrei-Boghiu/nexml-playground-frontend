import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { loginSchema, type LoginFormData } from "@/schemas/login.schema";
import { loginUser } from "@/services/auth.service";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { humanizeFieldName } from "@/utils/humanizeFieldName.util";
import { useAuth } from "@/auth/useAuth";

import type { ApiError } from "@/types/types";

const getFieldType = (name: keyof LoginFormData) =>
  name === "password" ? "password" : name === "email" ? "email" : "text";

const fields = Object.keys(loginSchema.shape) as Array<keyof LoginFormData>;

export default function AuthLogin() {
  const { setUser } = useAuth();
  const queryClient = useQueryClient();
  const [formError, setFormError] = useState<string | null>(null);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: loginUser,
    onSuccess: (userData) => {
      setUser(userData);
      window.localStorage.setItem("AUTH_USER", JSON.stringify(userData));
      queryClient.invalidateQueries();
    },
    onError: (error: ApiError) => {
      const msg = error?.response?.data?.error;
      setFormError(msg || "Login failed");
    },
  });

  const onSubmit = (data: LoginFormData) => mutate(data);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold tracking-tight">NEXML::Login</CardTitle>
        </CardHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="flex flex-col gap-3 py-3">
              {fields.map((name) => (
                <FormField
                  key={name}
                  control={form.control}
                  name={name}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{humanizeFieldName(name)}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value ?? ""}
                          type={getFieldType(field.name)}
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}

              <FormMessage>{formError}</FormMessage>
            </CardContent>

            <CardFooter className="flex flex-col gap-3">
              <Button type="submit" disabled={isPending} aria-busy={isPending} className="w-full mt-4">
                {isPending && <Spinner />}
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
