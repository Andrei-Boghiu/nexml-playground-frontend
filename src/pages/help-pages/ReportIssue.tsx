import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const reportSchema = z.object({
  subject: z.string().min(3, "Subject is required"),
  description: z.string().min(10, "Description is required"),
});

type ReportFormData = z.infer<typeof reportSchema>;

export default function ReportIssue() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReportFormData>({
    resolver: zodResolver(reportSchema),
  });

  const onSubmit = (data: ReportFormData) => {
    console.log("Report submitted:", data);
    alert("Report submitted successfully!");
  };

  return (
    <Card className="mx-auto w-[90vw] mt-10 max-w-lg shadow-lg">
      <CardHeader>
        <CardTitle>Report an Issue</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="subject">Subject</Label>
          <Input id="subject" {...register("subject")} />
          {errors.subject && <p className="text-destructive text-sm">{errors.subject.message}</p>}
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" {...register("description")} />
          {errors.description && <p className="text-destructive text-sm">{errors.description.message}</p>}
        </div>
      </CardContent>

      <CardFooter className="justify-end">
        <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
      </CardFooter>
    </Card>
  );
}
