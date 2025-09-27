import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { userProfile } from "../services/auth.service";
import { useQuery } from "@tanstack/react-query";

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";

export default function MainDashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const {
    data: profile,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["auth", "profile"],
    queryFn: userProfile,
    enabled: false,
  });

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Card className="mx-auto mt-10 max-w-lg shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Main Dashboard</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4 text-center">
        <div className="flex flex-col gap-2">
          <Button onClick={handleLogout} variant="destructive">
            Logout
          </Button>
          <Button onClick={() => refetch()} variant="outline">
            Profile Query
          </Button>
        </div>

        <Separator className="my-4" />

        <div className="flex justify-center items-center gap-2">
          <h5 className="font-medium">isLoading:</h5>
          {isLoading && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
        </div>

        <div>
          <h5 className="font-medium">isError:</h5>
          <span>{isError && <span className="text-destructive">Error</span>}</span>
        </div>

        {profile && (
          <pre className="text-left rounded-md bg-muted p-3 text-sm overflow-x-auto">
            {JSON.stringify(profile, null, 2)}
          </pre>
        )}
      </CardContent>

      <CardFooter className="justify-center text-sm text-muted-foreground">
        <p>Welcome back, {profile?.firstName || "User"} 👋</p>
      </CardFooter>
    </Card>
  );
}
