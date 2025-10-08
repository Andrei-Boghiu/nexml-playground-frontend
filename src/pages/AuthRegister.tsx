import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { registerSchema, type RegisterFormData } from "@/schemas/register.schema";
import { registerUser } from "@/services/auth.service";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { humanizeFieldName } from "@/utils/humanizeFieldName.util";
import { useAuth } from "@/auth/useAuth";

import type { ApiError } from "@/types/types";

const getFieldType = (name: keyof RegisterFormData) =>
  name === "password" ? "password" : name === "email" ? "email" : "text";

const fields = Object.keys(registerSchema.shape) as Array<keyof RegisterFormData>;

const registerPlaceholders: Record<keyof RegisterFormData, string> = {
  email: "john@example.com",
  password: "very.strong.password!12@",
  firstName: "John",
  middleName: "Arthur",
  lastName: "Morgan",
  companyName: "NASA",
  companyType: "Enterprise",
  accessReason: "...",
};

export default function AuthRegister() {
  const { setUser } = useAuth();
  const queryClient = useQueryClient();
  const [formError, setFormError] = useState<string | null>(null);

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: registerUser,
    onSuccess: (userData) => {
      setUser(userData);
      window.localStorage.setItem("AUTH_USER", JSON.stringify(userData));

      queryClient.invalidateQueries();
    },
    onError: (error: ApiError) => {
      const msg = error?.response?.data?.error;
      setFormError(msg || "Registration failed");
    },
  });

  const onSubmit = (data: RegisterFormData) => mutate(data);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold tracking-tight">NEXML::Register</CardTitle>
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
                          placeholder={registerPlaceholders[field.name]}
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
                {isPending ? "Registering..." : "Register"}
              </Button>

              <Separator className="my-2" />

              <p className="text-sm text-muted-foreground text-center">
                Already have an account?{" "}
                <Link to="/login" className="text-primary hover:underline hover:text-primary/80">
                  Login
                </Link>
              </p>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
