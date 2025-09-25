import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { createArchiveSchema, type CreateArchiveFormData } from "../schemas/archive.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { createArchive } from "../services/archive.service";
import { sanitizeOptionalFields } from "../utils/sanitizeOptionalFields.utils";
import { FormField, type InputType } from "./FormField";

const fieldInputTypes: Record<keyof CreateArchiveFormData, InputType> = {
  name: "text",
  description: "textarea",
};

export default function CreateArchiveModal() {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateArchiveFormData>({
    resolver: zodResolver(createArchiveSchema),
  });

  const { mutate } = useMutation({
    mutationFn: (data: CreateArchiveFormData) => createArchive(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["milestones"] });
      //   navigate(`/milestone/${data.id}`); /// ! here close modal instead of navigate
      reset();
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const onSubmit = (data: CreateArchiveFormData) => {
    const sanitizedData = sanitizeOptionalFields(data);
    mutate(sanitizedData);
  };

  const fields = Object.keys(createArchiveSchema.shape) as Array<keyof CreateArchiveFormData>;

  return (
    <div>
      <section aria-labelledby="create-milestone-title">
        <h2 id="create-milestone-title">Create Archive</h2>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {fields.map((name) => (
            <FormField
              key={name}
              name={name}
              type={fieldInputTypes[name]}
              schema={createArchiveSchema}
              register={register}
              errors={errors}
              disabled={isSubmitting}
            />
          ))}

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create"}
          </button>
        </form>
        <button type="reset">Back</button>
        <button type="reset" onClick={() => reset()}>
          Reset
        </button>
      </section>
    </div>
  );
}
