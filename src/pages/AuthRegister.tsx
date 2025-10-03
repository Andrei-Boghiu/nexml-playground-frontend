import type { AxiosError } from "axios";
import { registerSchema, type RegisterFormData } from "../schemas/register.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { humanizeFieldName } from "../utils/humanizeFieldName.util";
import { registerUser } from "../services/auth.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../auth/useAuth";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function AuthRegister() {
  const { setUser } = useAuth();
  const queryClient = useQueryClient();
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: registerUser,
    onSuccess: (userData) => {
      setUser(userData);
      window.localStorage.setItem("AUTH_USER", JSON.stringify(userData));

      queryClient.invalidateQueries();
    },

    onError: (error: AxiosError) => {
      console.error(error);

      // @ts-ignore ¯\_(ツ)_/¯
      const msg = error?.response?.data?.error;
      setFormError(msg || "Registration failed");
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    mutate(data);
  };

  const fields = Object.keys(registerSchema.shape) as Array<keyof RegisterFormData>;

  return (
    <Card className="mx-auto mt-10 max-w-md shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">NEXML::Register</CardTitle>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          {fields.map((name) => (
            <div key={name} className="space-y-1">
              <Label htmlFor={name}>{humanizeFieldName(name)}</Label>
              <Input
                id={name}
                type={name === "password" ? "password" : name === "email" ? "email" : "text"}
                {...register(name)}
                className={cn(errors[name] && "border-destructive")}
              />
              {errors[name] && <p className="text-sm text-destructive">{errors[name]?.message}</p>}
            </div>
          ))}

          {formError && <p className="text-sm text-destructive text-center">{formError}</p>}
        </CardContent>

        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" className="w-full mt-4" disabled={isPending}>
            {isPending ? "Registering..." : "Register"}
          </Button>

          <Separator />

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-primary hover:underline">
              Login
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
