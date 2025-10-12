import { TrendingUp, TrendingDown, Archive, Clock, UserCheck } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardAction,
  CardFooter,
} from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Badge } from "@/components/ui/badge";
const topStats = [
  {
    title: "Resumes Analyzed",
    value: (
      <div className="flex items-center gap-2">
        <TrendingUp className="text-blue-500" />
        <span>986</span>
      </div>
    ),
    trend: "+12%",
    up: true,
    footer: (
      <>
        <div className="line-clamp-1 flex gap-2 font-medium">
          Trending up this month <TrendingUp className="size-4" />
        </div>
        <div className="text-muted-foreground">Resume analysis rate increasing</div>
      </>
    ),
  },
  {
    title: "Total Archives",
    value: (
      <div className="flex items-center gap-2">
        <Archive className="text-amber-500 " />
        <span>14</span>
      </div>
    ),
    trend: "+8%",
    up: true,
    footer: (
      <>
        <div className="line-clamp-1 flex gap-2 font-medium">
          Growth in archives stored <TrendingUp className="size-4" />
        </div>
        <div className="text-muted-foreground">Data management efficiency is up</div>
      </>
    ),
  },
  {
    title: "Estimated Time Savings",
    value: (
      <div className="flex items-center gap-2">
        <Clock className="text-purple-500 " />
        <span>72 hrs</span>
      </div>
    ),
    trend: "-5%",
    up: false,
    footer: (
      <>
        <div className="line-clamp-1 flex gap-2 font-medium">
          Slight drop in productivity <TrendingDown className="size-4" />
        </div>
        <div className="text-muted-foreground">Investigate possible bottlenecks</div>
      </>
    ),
  },
  {
    title: "Candidates Hired",
    value: (
      <div className="flex items-center gap-2">
        <UserCheck className="text-green-500 " />
        <span>37</span>
      </div>
    ),
    trend: "+4%",
    up: true,
    footer: (
      <>
        <div className="line-clamp-1 flex gap-2 font-medium">
          Hiring success up <TrendingUp className="size-4" />
        </div>
        <div className="text-muted-foreground">Better recruitment process overall</div>
      </>
    ),
  },
];

const resumeTrends = [
  { week: 28, startDate: "Jul 7 – Jul 13", resumesAnalyzed: 112 },
  { week: 29, startDate: "Jul 14 – Jul 20", resumesAnalyzed: 164 },
  { week: 30, startDate: "Jul 21 – Jul 27", resumesAnalyzed: 97 },
  { week: 31, startDate: "Jul 28 – Aug 3", resumesAnalyzed: 138 },
  { week: 32, startDate: "Aug 4 – Aug 10", resumesAnalyzed: 123 },
  { week: 33, startDate: "Aug 11 – Aug 17", resumesAnalyzed: 152 },
  { week: 34, startDate: "Aug 18 – Aug 24", resumesAnalyzed: 176 },
  { week: 35, startDate: "Aug 25 – Aug 31", resumesAnalyzed: 105 },
  { week: 36, startDate: "Sep 1 – Sep 7", resumesAnalyzed: 91 },
  { week: 37, startDate: "Sep 8 – Sep 14", resumesAnalyzed: 157 },
  { week: 38, startDate: "Sep 15 – Sep 21", resumesAnalyzed: 134 },
  { week: 39, startDate: "Sep 22 – Sep 28", resumesAnalyzed: 118 },
  { week: 40, startDate: "Sep 29 – Oct 5", resumesAnalyzed: 142 },
];

export default function MainDashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Top Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {topStats.map(({ title, value, trend, up, footer }, i) => (
          <Card key={`${i}-${title}`} className="@container/card">
            <CardHeader>
              <CardDescription>{title}</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl mt-3">{value}</CardTitle>
              <CardAction>
                <Badge variant="outline">
                  {up ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                  {trend}
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">{footer}</CardFooter>
          </Card>
        ))}
      </div>

      {/* Area Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Resume Analysis Report</CardTitle>
          <CardDescription>The number of resumes analyzed per week over the past 3 months</CardDescription>
        </CardHeader>
        <CardContent className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={resumeTrends}>
              <defs>
                <linearGradient id="colorResumes" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="week" className="text-xs" />
              <YAxis />
              <Tooltip labelStyle={{ fontWeight: 600 }} contentStyle={{ borderRadius: 8, borderColor: "#ccc" }} />
              <Area
                type="monotone"
                dataKey="resumesAnalyzed"
                stroke="#8884d8"
                fill="url(#colorResumes)"
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
