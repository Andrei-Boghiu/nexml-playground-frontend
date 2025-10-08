import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function AuthLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold tracking-tight">NEXML::Authenticating</CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col items-center gap-3 py-3">
          <Loader2 className="h-12 w-12 animate-spin text-primary transition-all duration-300" />
          <p className="text-sm text-muted-foreground">Verifying your credentials...</p>
        </CardContent>
      </Card>
    </div>
  );
}
