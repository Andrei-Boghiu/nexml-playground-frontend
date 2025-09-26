import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// Mock notification settings
const generalNotifications = [
  {
    id: "email-updates",
    label: "Email Updates",
    description: "Get notified about product updates and new features.",
    enabled: true,
  },
  {
    id: "marketing",
    label: "Marketing Offers",
    description: "Receive promotional content and special offers.",
    enabled: false,
  },
];

const securityNotifications = [
  {
    id: "login-alerts",
    label: "Login Alerts",
    description: "Be notified when a new device logs into your account.",
    enabled: true,
  },
  {
    id: "password-changes",
    label: "Password Changes",
    description: "Get alerts whenever your password is changed.",
    enabled: true,
  },
];

const systemNotifications = [
  {
    id: "maintenance",
    label: "System Maintenance",
    description: "Receive alerts about scheduled maintenance windows.",
    enabled: true,
  },
  {
    id: "downtime",
    label: "Downtime Alerts",
    description: "Be notified if the system experiences unexpected downtime.",
    enabled: true,
  },
];

export default function Notifications() {
  const sectionClass = "space-y-4";
  const labelClass = "text-sm font-medium leading-none";
  const descClass = "text-xs text-muted-foreground";

  return (
    <div className="mx-auto mt-10 w-[90vw] max-w-4xl space-y-6">
      {/* General Notifications */}
      <Card className="shadow-lg">
        <CardHeader className="flex items-center justify-between">
          <CardTitle>General Notifications</CardTitle>
        </CardHeader>
        <CardContent className={sectionClass}>
          {generalNotifications.map((n) => (
            <div key={n.id} className="flex items-start justify-between border-b pb-4 last:border-none">
              <div className="space-y-1">
                <Label className={labelClass}>{n.label}</Label>
                <p className={descClass}>{n.description}</p>
              </div>
              <Switch defaultChecked={n.enabled} />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Security Notifications */}
      <Card className="shadow-lg">
        <CardHeader className="flex items-center justify-between">
          <CardTitle>Security Notifications</CardTitle>
        </CardHeader>
        <CardContent className={sectionClass}>
          {securityNotifications.map((n) => (
            <div key={n.id} className="flex items-start justify-between border-b pb-4 last:border-none">
              <div className="space-y-1">
                <Label className={labelClass}>{n.label}</Label>
                <p className={descClass}>{n.description}</p>
              </div>
              <Switch defaultChecked={n.enabled} />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* System Notifications */}
      <Card className="shadow-lg">
        <CardHeader className="flex items-center justify-between">
          <CardTitle>System Notifications</CardTitle>
        </CardHeader>
        <CardContent className={sectionClass}>
          {systemNotifications.map((n) => (
            <div key={n.id} className="flex items-start justify-between border-b pb-4 last:border-none">
              <div className="space-y-1">
                <Label className={labelClass}>{n.label}</Label>
                <p className={descClass}>{n.description}</p>
              </div>
              <Switch defaultChecked={n.enabled} />
            </div>
          ))}
        </CardContent>
      </Card>

      <Separator />

      <div className="flex justify-end gap-2 mb-4">
        <Button size="sm" variant="outline">
          Reset to Defaults
        </Button>
      </div>
    </div>
  );
}
