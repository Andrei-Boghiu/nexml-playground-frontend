import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
  CartesianGrid,
  Legend,
} from "recharts";

const stats = {
  statistics: {
    resumes: {
      total: 1240,
      analyzed: 986,
      inProgress: 45,
      failed: 12,
      rejected: 9,
      notAnalyzed: 188,
      averageScore: 78,
      averageQualification: {
        UNDER_QUALIFIED: 320,
        QUALIFIED: 610,
        OVERQUALIFIED: 50,
      },
    },
    archives: {
      total: 14,
      averageResumesPerArchive: 88.5,
      mostActiveArchive: {
        id: "uuid",
        name: "Frontend Developer Applicants - Q4",
        resumeCount: 230,
      },
      monthlyArchiveGrowth: [
        { month: "May", archives: 5 },
        { month: "Jun", archives: 7 },
        { month: "Jul", archives: 9 },
        { month: "Aug", archives: 11 },
        { month: "Sep", archives: 13 },
        { month: "Oct", archives: 14 },
      ],
    },
    jobListings: {
      total: 7,
      mostAnalyzedJob: "Senior Frontend Developer",
      averageResumesPerJob: 177,
      activityTrend: [
        { week: "W1", jobs: 2, resumesAnalyzed: 150 },
        { week: "W2", jobs: 3, resumesAnalyzed: 260 },
        { week: "W3", jobs: 4, resumesAnalyzed: 410 },
        { week: "W4", jobs: 5, resumesAnalyzed: 510 },
      ],
    },
  },
};

const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

export default function MainDashboard() {
  const { resumes, archives, jobListings } = stats.statistics;

  const resumeStateData = [
    { name: "Analyzed", value: resumes.analyzed },
    { name: "In Progress", value: resumes.inProgress },
    { name: "Not Analyzed", value: resumes.notAnalyzed },
    { name: "Failed", value: resumes.failed },
    { name: "Rejected", value: resumes.rejected },
  ];

  const qualificationData = [
    { name: "Under Qualified", value: resumes.averageQualification.UNDER_QUALIFIED },
    { name: "Qualified", value: resumes.averageQualification.QUALIFIED },
    { name: "Overqualified", value: resumes.averageQualification.OVERQUALIFIED },
  ];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 md:grid-cols-2 gap-4 p-6">
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Resume Analysis Overview</CardTitle>
        </CardHeader>
        <CardContent className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={resumeStateData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Candidate Qualification Distribution</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={qualificationData} dataKey="value" nameKey="name" outerRadius={100} label>
                {qualificationData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Archive Growth Over Time</CardTitle>
        </CardHeader>
        <CardContent className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={archives.monthlyArchiveGrowth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="archives" stroke="#82ca9d" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Job Listing Activity</CardTitle>
        </CardHeader>
        <CardContent className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={jobListings.activityTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="jobs" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
              <Area type="monotone" dataKey="resumesAnalyzed" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
