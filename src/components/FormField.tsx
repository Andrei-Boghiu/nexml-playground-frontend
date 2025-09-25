import type { FieldErrors, Path, UseFormRegister } from "react-hook-form";
import { ZodObject } from "zod";
import { getEnumValues } from "../utils/getEnumValues.util";
import { humanizeEnum } from "../utils/humanizeEnum.util";
import { humanizeFieldName } from "../utils/humanizeFieldName.util";

export type InputType = "text" | "textarea" | "select" | "datetime-local";
export type FormFieldPropsValue = object | string | null;

interface FormFieldProps<T extends Record<string, FormFieldPropsValue>> {
  name: Path<T>;
  type: InputType;
  schema: ZodObject;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  disabled?: boolean;
}

export function FormField<T extends Record<string, FormFieldPropsValue>>({
  name,
  type,
  schema,
  register,
  errors,
  disabled = false,
}: FormFieldProps<T>) {
  const errorMessage = errors[name]?.message as string | undefined;

  if (type === "select") {
    const options = getEnumValues(schema, name as string);

    return (
      <div>
        <label htmlFor={name as string}>{humanizeFieldName(name as string)}</label>
        <select
          id={name as string}
          {...register(name)}
          disabled={disabled}
          aria-invalid={!!errorMessage}
          aria-describedby={errorMessage ? `${String(name)}-error` : undefined}
        >
          <option value="">Select {humanizeFieldName(name as string)} (optional)</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {humanizeEnum(opt)}
            </option>
          ))}
        </select>
        {errorMessage && (
          <p role="alert" id={`${String(name)}-error`}>
            {errorMessage}
          </p>
        )}
      </div>
    );
  }

  if (type === "textarea") {
    return (
      <div>
        <label htmlFor={name as string}>{humanizeFieldName(name as string)}</label>
        <textarea
          id={name as string}
          {...register(name)}
          disabled={disabled}
          aria-invalid={!!errorMessage}
          aria-describedby={errorMessage ? `${String(name)}-error` : undefined}
        />
        {errorMessage && (
          <p role="alert" id={`${String(name)}-error`}>
            {errorMessage}
          </p>
        )}
      </div>
    );
  }

  return (
    <div>
      <label htmlFor={name as string}>{humanizeFieldName(name as string)}</label>
      <input
        id={name as string}
        type={type}
        {...register(name)}
        disabled={disabled}
        aria-invalid={!!errorMessage}
        aria-describedby={errorMessage ? `${String(name)}-error` : undefined}
      />
      {errorMessage && (
        <p role="alert" id={`${String(name)}-error`}>
          {errorMessage}
        </p>
      )}
    </div>
  );
}
