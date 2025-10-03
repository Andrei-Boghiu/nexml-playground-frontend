import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/auth/useAuth";

export default function Account() {
  const { user } = useAuth();

  const userAvatar = "/avatar.png"; // mock user profile image
  const companyLogo = "/company-logo.png"; // mock company logo

  const userInfo = {
    "First Name": user?.firstName,
    "Middle Name": user?.middleName,
    "Last Name": user?.lastName,
    Email: user?.email,
  };

  const companyInfo = {
    "Company Name": user?.companyName,
    "Company Type": user?.companyType,
    "Access Reason": user?.accessReason,
  };

  return (
    <div className="mx-auto mt-10 w-[90vw] max-w-4xl space-y-6">
      {/* User Info */}
      <Card className="shadow-lg">
        <CardHeader className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={userAvatar} alt={`${user?.firstName} ${user?.lastName}`} />
              <AvatarFallback>
                {(user?.firstName?.charAt(0) || ".") + (user?.lastName?.charAt(0) || ".")}
              </AvatarFallback>
            </Avatar>
            <CardTitle>User Profile</CardTitle>
          </div>
          <Button size="sm">Edit</Button>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          {Object.entries(userInfo).map(([label, value]) => (
            <div key={label}>
              <Label className="text-xs font-semibold text-muted-foreground tracking-wide">{label}</Label>
              <p className="mt-0.5 text-sm font-medium text-foreground truncate">{value || "—"}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Company Info */}
      <Card className="shadow-lg">
        <CardHeader className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={companyLogo} alt={user?.companyName || "Company"} />
              <AvatarFallback>{user?.companyName?.charAt(0) || "."}</AvatarFallback>
            </Avatar>
            <CardTitle>Company Info</CardTitle>
          </div>
          <Button size="sm">Edit</Button>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          {Object.entries(companyInfo).map(([label, value]) => (
            <div key={label}>
              <Label className="text-xs font-semibold text-muted-foreground tracking-wide">{label}</Label>
              <p className="mt-0.5 text-sm font-medium text-foreground truncate">{value || "—"}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Account Actions */}
      <div className="flex justify-end gap-2">
        <Button size="sm">Change Password</Button>
        <Button size="sm" variant="destructive">
          Delete Account
        </Button>
      </div>
    </div>
  );
}
