
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft, BarChart3, Activity, Repeat } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { Bar, BarChart, Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const weeklyActivityData = [
  { day: 'Mon', workouts: 1, goal: 1 },
  { day: 'Tue', workouts: 0, goal: 1 },
  { day: 'Wed', workouts: 1, goal: 1 },
  { day: 'Thu', workouts: 1, goal: 1 },
  { day: 'Fri', workouts: 0, goal: 0.5 },
  { day: 'Sat', workouts: 1, goal: 1 },
  { day: 'Sun', workouts: 0, goal: 0 },
];

const strengthProgressData = [
  { date: 'Week 1', exercise: 'Bench Press', weight: 60, reps: 8 },
  { date: 'Week 2', exercise: 'Bench Press', weight: 62.5, reps: 8 },
  { date: 'Week 3', exercise: 'Bench Press', weight: 65, reps: 7 },
  { date: 'Week 4', exercise: 'Bench Press', weight: 65, reps: 8 },
  { date: 'Week 1', exercise: 'Squat', weight: 80, reps: 10 },
  { date: 'Week 2', exercise: 'Squat', weight: 85, reps: 9 },
  { date: 'Week 3', exercise: 'Squat', weight: 87.5, reps: 8 },
  { date: 'Week 4', exercise: 'Squat', weight: 90, reps: 8 },
];

const chartConfigWeekly = {
  workouts: { label: "Workouts Completed", color: "hsl(var(--primary))" },
  goal: { label: "Goal", color: "hsl(var(--muted-foreground))" },
};

const chartConfigStrength = {
  weight: { label: "Weight (kg)", color: "hsl(var(--chart-1))" },
  reps: { label: "Reps", color: "hsl(var(--chart-2))" },
};


export default function ProgressOverviewPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="p-4 border-b border-border flex justify-between items-center sticky top-0 bg-background/80 backdrop-blur-md z-10">
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="outline" size="icon" className="h-9 w-9">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back to Dashboard</span>
            </Button>
          </Link>
          <h1 className="text-xl font-semibold">Progress Overview</h1>
        </div>
      </header>

      <main className="flex-1 p-4 md:p-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Activity className="h-6 w-6 text-primary" />
                <CardTitle className="text-lg">Weekly Activity</CardTitle>
              </div>
              <CardDescription>Your workout consistency for the current week.</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfigWeekly} className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyActivityData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border)/0.5)" />
                    <XAxis dataKey="day" tickLine={false} axisLine={false} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis tickLine={false} axisLine={false} stroke="hsl(var(--muted-foreground))" fontSize={12} allowDecimals={false} />
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent indicator="dot" />}
                    />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Bar dataKey="workouts" fill="var(--color-workouts)" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="goal" fill="var(--color-goal)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Repeat className="h-6 w-6 text-accent" />
                <CardTitle className="text-lg">Strength Progression (Bench Press)</CardTitle>
              </div>
              <CardDescription>Your weight and rep progression for Bench Press.</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfigStrength} className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart 
                    data={strengthProgressData.filter(d => d.exercise === 'Bench Press')}
                    margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border)/0.5)" />
                    <XAxis dataKey="date" tickLine={false} axisLine={false} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis yAxisId="left" orientation="left" stroke="var(--color-weight)" tickLine={false} axisLine={false} fontSize={12} />
                    <YAxis yAxisId="right" orientation="right" stroke="var(--color-reps)" tickLine={false} axisLine={false} fontSize={12} />
                     <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent indicator="line" />}
                    />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Line yAxisId="left" type="monotone" dataKey="weight" stroke="var(--color-weight)" strokeWidth={2} dot={{ r: 4, fill: "var(--color-weight)" }} activeDot={{ r: 6 }} />
                    <Line yAxisId="right" type="monotone" dataKey="reps" stroke="var(--color-reps)" strokeWidth={2} dot={{ r: 4, fill: "var(--color-reps)" }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {placeholderSchedule.length === 0 && ( // Example conditional rendering
            <div className="text-center py-10 mt-8">
              <p className="text-lg text-muted-foreground">No progress data available yet.</p>
              <p className="text-sm text-muted-foreground">Start tracking your workouts to see your progress!</p>
              <Link href="/dashboard" className="mt-4 inline-block">
                <Button>Go to Chat</Button>
              </Link>
            </div>
          )}
      </main>
    </div>
  );
}

// Added this dummy array to prevent build error, as it was referenced in the JSX
const placeholderSchedule: never[] = [];
