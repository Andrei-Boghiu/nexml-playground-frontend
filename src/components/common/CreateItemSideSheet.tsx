import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm, type FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";

import type { ZodType, z } from "zod";
import type { FormEvent, Dispatch, SetStateAction } from "react";

import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { humanizeFieldName } from "@/utils/humanizeFieldName.util";

export type NewItemField = {
  type: "input" | "textarea";
  required?: boolean; // default: true
  placeholder?: string;
};

export type NewItemFields<T extends string = string> = Partial<Record<T, NewItemField>>;

export type CreateItemSideSheetProps<T extends string, Schema extends z.ZodSchema<any>, ReturnType = any> = {
  queryKeyToInvalidate: string;
  title: string;
  description: string;
  isLoading?: boolean;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  fields: NewItemFields<T>;
  onSubmit: (values: z.infer<Schema>) => Promise<ReturnType>;
  schema: Schema;
};

export default function CreateItemSideSheet<T extends string, Schema extends ZodType<any, any>>({
  queryKeyToInvalidate,
  title,
  description,
  isLoading,
  setIsLoading,
  isOpen,
  setIsOpen,
  onSubmit,
  fields,
  schema,
}: CreateItemSideSheetProps<T, Schema>) {
  const queryClient = useQueryClient();
  type FormData = z.infer<Schema> & FieldValues;

  const form = useForm<FormData>({
    // @ts-ignore ¯\_(ツ)_/¯
    resolver: zodResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: (values: FormData) => onSubmit(values),
    onSuccess: () => {
      toast.success("Item created successfully");
      queryClient.invalidateQueries({ queryKey: [queryKeyToInvalidate] });
      setIsOpen(false);
    },
    onError: (err: any) => {
      toast.error("Error creating item", { description: err.message });
    },
    onMutate: () => setIsLoading(true),
    onSettled: () => setIsLoading(false),
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const values = Object.fromEntries(data.entries()) as unknown as FormData;

    mutation.mutate(values);
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form onSubmit={handleSubmit} id="create-item-form">
            <div className="grid flex-1 auto-rows-min gap-6 px-4">
              {(Object.entries(fields) as [T, NewItemField][]).map(([name, config]) => {
                return (
                  <FormField
                    key={name}
                    name={name as any}
                    render={() => (
                      <FormItem>
                        <FormLabel htmlFor={`sheet-${name}`}>{humanizeFieldName(name)}</FormLabel>
                        <FormControl>
                          {config.type === "input" ? (
                            <Input
                              name={name}
                              id={`sheet-${name}`}
                              required={config.required !== false}
                              placeholder={config.placeholder}
                              disabled={isLoading}
                            />
                          ) : (
                            <Textarea
                              name={name}
                              id={`sheet-${name}`}
                              required={config.required !== false}
                              placeholder={config.placeholder}
                              disabled={isLoading}
                            />
                          )}
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                );
              })}
            </div>
          </form>
        </Form>

        <SheetFooter>
          <Button type="submit" form="create-item-form" disabled={mutation.isPending}>
            {mutation.isPending && <Spinner className="mr-1 inline-block" />}
            {mutation.isPending ? "Saving..." : "Save"}
          </Button>
          <SheetClose asChild>
            <Button variant="outline" disabled={mutation.isPending}>
              Close
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
