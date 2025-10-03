import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const supportSchema = z.object({
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(10, "Message is required"),
});

type SupportFormData = z.infer<typeof supportSchema>;

export default function Support() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SupportFormData>({
    resolver: zodResolver(supportSchema),
  });

  const onSubmit = (data: SupportFormData) => {
    console.log("Support request submitted:", data);
    alert("Support request submitted successfully!");
  };

  return (
    <Card className="mx-auto w-[90vw] mt-10 max-w-lg shadow-lg">
      <CardHeader>
        <CardTitle>Contact Support</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="subject">Subject</Label>
          <Input id="subject" {...register("subject")} />
          {errors.subject && <p className="text-destructive text-sm">{errors.subject.message}</p>}
        </div>

        <div>
          <Label htmlFor="message">Message</Label>
          <Textarea id="message" {...register("message")} />
          {errors.message && <p className="text-destructive text-sm">{errors.message.message}</p>}
        </div>
      </CardContent>

      <CardFooter className="justify-end">
        <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
      </CardFooter>
    </Card>
  );
}
