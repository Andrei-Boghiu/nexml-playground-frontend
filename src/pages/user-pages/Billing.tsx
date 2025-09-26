import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Mock data
const subscription = {
  plan: "Pro",
  price: "$29 / month",
  status: "Active",
  renewalDate: "2025-10-01",
};

const paymentMethod = {
  cardType: "Visa",
  last4: "4242",
  expiry: "12/26",
};

const invoices = [
  { id: "INV-001", date: "2025-08-25", amount: "$29.00", status: "Paid" },
  { id: "INV-002", date: "2025-07-25", amount: "$29.00", status: "Paid" },
];

export default function Billing() {
  const labelClass = "text-xs font-semibold text-muted-foreground tracking-wide";
  const valueClass = "mt-0.5 text-sm font-medium text-foreground truncate";

  return (
    <div className="mx-auto mt-10 w-[90vw] max-w-4xl space-y-6">
      {/* Subscription Info */}
      <Card className="shadow-lg">
        <CardHeader className="flex items-center justify-between">
          <CardTitle>Subscription</CardTitle>
          <Button size="sm">Manage Plan</Button>
        </CardHeader>

        <CardContent className="grid grid-cols-2 gap-4">
          <div>
            <Label className={labelClass}>Plan</Label>
            <p className={valueClass}>{subscription.plan}</p>
          </div>
          <div>
            <Label className={labelClass}>Price</Label>
            <p className={valueClass}>{subscription.price}</p>
          </div>
          <div>
            <Label className={labelClass}>Status</Label>
            <Badge variant="secondary" className="mt-0.5">
              {subscription.status}
            </Badge>
          </div>
          <div>
            <Label className={labelClass}>Next Renewal</Label>
            <p className={valueClass}>{subscription.renewalDate}</p>
          </div>
        </CardContent>
      </Card>

      {/* Payment Method */}
      <Card className="shadow-lg">
        <CardHeader className="flex items-center justify-between">
          <CardTitle>Payment Method</CardTitle>
          <Button size="sm">Update</Button>
        </CardHeader>

        <CardContent className="grid grid-cols-2 gap-4">
          <div>
            <Label className={labelClass}>Card Type</Label>
            <p className={valueClass}>{paymentMethod.cardType}</p>
          </div>
          <div>
            <Label className={labelClass}>Last 4 Digits</Label>
            <p className={valueClass}>**** {paymentMethod.last4}</p>
          </div>
          <div>
            <Label className={labelClass}>Expiry Date</Label>
            <p className={valueClass}>{paymentMethod.expiry}</p>
          </div>
        </CardContent>
      </Card>

      {/* Invoices */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Recent Invoices</CardTitle>
          <CardDescription>Download or review your past billing invoices</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {invoices.map((inv) => (
            <div key={inv.id} className="flex items-center justify-between text-sm">
              <div>
                <p className="font-medium">{inv.id}</p>
                <p className="text-xs text-muted-foreground">{inv.date}</p>
              </div>
              <div className="flex items-center gap-3">
                <p className="font-semibold">{inv.amount}</p>
                <Badge variant={inv.status === "Paid" ? "secondary" : "outline"}>{inv.status}</Badge>
                <Button size="sm" variant="outline">
                  View
                </Button>
              </div>
            </div>
          ))}
          <Separator />
          <div className="flex justify-end">
            <Button size="sm" variant="secondary">
              View All
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
