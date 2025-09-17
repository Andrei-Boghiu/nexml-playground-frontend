import type { AxiosError } from "axios";
import { registerSchema, type RegisterFormData } from "../schemas/register.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { humanizeFieldName } from "../utils/humanizeFieldName.util";
import { registerUser } from "../services/auth.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../auth/useAuth";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export default function AuthRegister() {
  const { setUser } = useAuth();
  const queryClient = useQueryClient();

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
      alert(msg || "Registration failed");
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    mutate(data);
  };

  const fields = Object.keys(registerSchema.shape) as Array<keyof RegisterFormData>;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((name) => (
        <div key={name}>
          <label htmlFor={name}>{humanizeFieldName(name)}: </label>
          <input
            id={name}
            type={name === "password" ? "password" : name === "email" ? "email" : "text"}
            {...register(name)}
          />
          <p>{errors[name]?.message}</p>
        </div>
      ))}

      <button type="submit" disabled={isPending}>
        {isPending ? "Registering..." : "Register"}
      </button>

      <hr style={{ margin: 5 }} />
      <Link to="/login">Already have an account?</Link>
    </form>
  );
}
