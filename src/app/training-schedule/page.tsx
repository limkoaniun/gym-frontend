
"use client";

import Link from 'next/link';
import React, { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { ArrowLeft, Dumbbell, Zap, Coffee, Activity, Repeat, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { Bar, BarChart, Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { format, parseISO, isSameDay, startOfWeek, addDays, formatISO } from 'date-fns';
import { useSearchParams, useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { type GenerateWorkoutPlanInput, type GenerateWorkoutPlanOutput } from '@/ai/flows/generate-workout-plan-flow';

// Remove the actual import if we are faking the call, or keep it if types are still needed and backend might be used later.
// For now, keeping it for type safety.
// import { generateWorkoutPlan } from '@/ai/flows/generate-workout-plan-flow';


interface Equipment {
  id: string;
  name: string;
  type: string;
  imageUrl: string;
  imageHint: string;
}

const allEquipment: Equipment[] = [
  {
    id: '1',
    name: 'Advanced Treadmill X100',
    type: 'Cardio Equipment',
    imageUrl: 'https://placehold.co/300x300.png',
    imageHint: 'treadmill gym',
  },
  {
    id: '2',
    name: 'ProLeg Press Machine',
    type: 'Strength Training - Legs',
    imageUrl: 'https://placehold.co/300x300.png',
    imageHint: 'leg press machine',
  },
  {
    id: '3',
    name: 'Adjustable Dumbbell Set',
    type: 'Free Weights - Versatile',
    imageUrl: 'https://placehold.co/300x300.png',
    imageHint: 'dumbbell set',
  },
  {
    id: '4',
    name: 'Rowing Machine Model R',
    type: 'Full Body Cardio',
    imageUrl: 'https://placehold.co/300x300.png',
    imageHint: 'rowing machine gym',
  },
];


interface ScheduleEntry {
  id: string;
  day: string;
  date: string; // YYYY-MM-DD
  title: string;
  description: string;
  icon?: React.ElementType;
  image?: string;
  imageHint?: string;
  details?: string[]; // For exercises or key activities
  equipmentId?: string;
}

const getCurrentWeekDate = (dayIndex: number): string => {
  const today = new Date();
  const startDate = startOfWeek(today, { weekStartsOn: 1 });
  return format(addDays(startDate, dayIndex), 'yyyy-MM-dd');
};

const initialSchedule: ScheduleEntry[] = [
   {
    id: 'mon-workout',
    day: 'Monday',
    date: getCurrentWeekDate(0),
    title: 'Full Body Strength',
    description: 'Focus on compound movements to build overall strength.',
    icon: Dumbbell,
    image: 'https://placehold.co/600x400.png',
    imageHint: 'gym weights',
    details: ['Squats: 3 sets of 8-12 reps', 'Bench Press: 3 sets of 8-12 reps', 'Deadlifts: 1 set of 5 reps', 'Overhead Press: 3 sets of 8-12 reps']
  },
  {
    id: 'tue-workout',
    day: 'Tuesday',
    date: getCurrentWeekDate(1),
    title: 'Cardio & Core',
    description: 'Improve cardiovascular health and strengthen your core.',
    icon: Zap,
    image: 'https://placehold.co/600x400.png',
    imageHint: 'running track',
    details: ['Running: 30 minutes', 'Plank: 3 sets, hold as long as possible', 'Crunches: 3 sets of 15-20 reps']
  },
  {
    id: 'wed-rest',
    day: 'Wednesday',
    date: getCurrentWeekDate(2),
    title: 'Rest & Recovery',
    description: 'Allow your body to recover and rebuild muscle.',
    icon: Coffee,
    image: 'https://placehold.co/600x400.png',
    imageHint: 'yoga meditation',
    details: ['Light stretching', 'Foam rolling', 'Ensure adequate sleep']
  },
  {
    id: 'fri-workout',
    day: 'Friday',
    date: getCurrentWeekDate(4),
    title: 'Lower Body & Agility',
    description: 'Strengthen legs and improve agility.',
    icon: Zap,
    image: 'https://placehold.co/600x400.png',
    imageHint: 'agility ladder',
    details: ['Lunges: 3 sets of 10-12 reps per leg', 'Box Jumps: 3 sets of 10 reps', 'Calf Raises: 3 sets of 15-20 reps']
  },
];

const weeklyActivityData = [
  { day: 'Mon', workouts: 1, goal: 1 },
  { day: 'Tue', workouts: 0, goal: 1 },
  { day: 'Wed', workouts: 1, goal: 1 },
  { day: 'Thu', workouts: 1, goal: 1 },
  { day: 'Fri', workouts: 0, goal: 0.5 },
  { day: 'Sat', workouts: 1, goal: 1 },
  { day: 'Sun', workouts: 0, goal: 0 },
];

const strengthProgressData: any[] = [ // Define type if it becomes complex
  // { date: 'Week 1', exercise: 'Bench Press', weight: 60, reps: 8 }, ...
];

const chartConfigWeekly = {
  workouts: { label: "Workouts Completed", color: "hsl(var(--primary))" },
  goal: { label: "Goal", color: "hsl(var(--muted-foreground))" },
};

const chartConfigStrength = {
  weight: { label: "Weight (kg)", color: "hsl(var(--chart-1))" },
  reps: { label: "Reps", color: "hsl(var(--chart-2))" },
};


export default function TrainingSchedulePage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [schedule, setSchedule] = useState<ScheduleEntry[]>(initialSchedule);
  const [activeEquipment, setActiveEquipment] = useState<Equipment | null>(null);
  const [isLoadingAIPlan, setIsLoadingAIPlan] = useState(false);
  const [currentlyScheduledEquipmentDetails, setCurrentlyScheduledEquipmentDetails] = useState<Equipment[]>([]);
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const addId = searchParams.get('addEquipmentId');
    const removeId = searchParams.get('removeEquipmentId');
    const generatePlanForId = searchParams.get('generatePlanForEquipmentId');
    let equipmentIdToShow = addId || removeId;

    const processAIPlan = async (focusedEquipmentId: string) => {
      setIsLoadingAIPlan(true);
      setActiveEquipment(null); 

      const today = new Date();
      setSelectedDate(today); // Ensure calendar shows today for AI plan
      const todayStr = format(today, 'yyyy-MM-dd');

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const focusedItem = allEquipment.find(e => e.id === focusedEquipmentId);
      const otherEquipment1 = allEquipment.find(e => e.id !== focusedEquipmentId && e.id === '3'); // Dumbbells
      const otherEquipment2 = allEquipment.find(e => e.id !== focusedEquipmentId && e.id === '1'); // Treadmill

      const fakeAiResult: GenerateWorkoutPlanOutput = {
        dailyPlan: [
          ...(focusedItem ? [{
            equipmentId: focusedItem.id,
            name: focusedItem.name,
            imageUrl: focusedItem.imageUrl,
            imageHint: focusedItem.imageHint,
            exercises: [
              `${focusedItem.name}-specific Exercise 1: 3 sets of 10 reps`,
              `${focusedItem.name}-specific Exercise 2: 3 sets of 12 reps`,
              `Cool down with ${focusedItem.name}: 5 minutes`
            ],
            focus: `Primary focus on ${focusedItem.name} for strength and endurance. This session targets key muscle groups associated with this equipment.`
          }] : []),
          ...(otherEquipment1 ? [{
            equipmentId: otherEquipment1.id,
            name: otherEquipment1.name,
            imageUrl: otherEquipment1.imageUrl,
            imageHint: otherEquipment1.imageHint,
            exercises: [
              "Dumbbell Bicep Curls: 3 sets of 12-15 reps",
              "Dumbbell Shoulder Press: 3 sets of 10-12 reps",
              "Dumbbell Rows: 3 sets of 10-12 reps per side"
            ],
            focus: `Complementary exercises with ${otherEquipment1.name} for upper body conditioning.`
          }] : []),
           ...(otherEquipment2 && focusedItem?.type !== 'Cardio Equipment' ? [{ // Add cardio if focused isn't cardio
            equipmentId: otherEquipment2.id,
            name: otherEquipment2.name,
            imageUrl: otherEquipment2.imageUrl,
            imageHint: otherEquipment2.imageHint,
            exercises: [
              "Warm-up: 5 minutes moderate pace",
              "Intervals: 1 minute fast, 2 minutes recovery - repeat 5 times",
              "Cool-down: 5 minutes easy pace"
            ],
            focus: `Cardio session with ${otherEquipment2.name} to improve endurance and burn calories.`
          }] : []),
        ].filter(Boolean) // Filter out undefined entries if equipment not found
      };


      try {
        // const planInput: GenerateWorkoutPlanInput = {
        //   focusedEquipmentId,
        //   allAvailableEquipment: allEquipment,
        // };
        // const aiResult = await generateWorkoutPlan(planInput); // Actual AI call commented out

        const aiResult = fakeAiResult; // Use fake result

        if (aiResult && aiResult.dailyPlan && aiResult.dailyPlan.length > 0) {
          const newAIScheduleEntries: ScheduleEntry[] = aiResult.dailyPlan.map((segment, index) => ({
            id: `ai-${segment.equipmentId}-${Date.now()}-${index}`,
            date: todayStr,
            day: format(today, 'EEEE'),
            title: segment.name,
            description: segment.focus,
            icon: Dumbbell,
            equipmentId: segment.equipmentId,
            image: segment.imageUrl,
            imageHint: segment.imageHint,
            details: segment.exercises,
          }));

          setSchedule(prev => {
            const otherDaysEntries = prev.filter(entry => !isSameDay(parseISO(entry.date), today));
            return [...otherDaysEntries, ...newAIScheduleEntries];
          });
          toast({
            title: "AI Workout Plan Generated!",
            description: `Your workout for ${format(today, 'MMMM d, yyyy')} has been planned by AI.`,
          });
        } else {
          toast({
            variant: "destructive",
            title: "AI Plan Generation Failed",
            description: "Could not generate a workout plan. Please try again.",
          });
        }
      } catch (error) {
        console.error("Error generating AI workout plan:", error);
        toast({
          variant: "destructive",
          title: "AI Error",
          description: "An error occurred while generating the workout plan.",
        });
      } finally {
        setIsLoadingAIPlan(false);
        router.replace('/training-schedule');
      }
    };


    if (generatePlanForId) {
      processAIPlan(generatePlanForId);
    } else if (equipmentIdToShow) {
      const equipment = allEquipment.find(e => e.id === equipmentIdToShow);
      if (equipment) {
        setActiveEquipment(equipment);

        if (addId && selectedDate) {
          const newEntry: ScheduleEntry = {
            id: `equip-${equipment.id}-${Date.now()}`,
            date: format(selectedDate, 'yyyy-MM-dd'),
            day: format(selectedDate, 'EEEE'),
            title: `${equipment.name} Session`,
            description: `Workout using ${equipment.name}. Added from My Equipment.`,
            icon: Dumbbell,
            equipmentId: equipment.id,
            image: equipment.imageUrl,
            imageHint: equipment.imageHint,
          };
          setSchedule(prev => {
            const existingEntry = prev.find(entry =>
              entry.equipmentId === addId && isSameDay(parseISO(entry.date), selectedDate)
            );
            if (!existingEntry) {
              return [...prev, newEntry];
            }
            return prev;
          });
          toast({
            title: "Equipment Scheduled",
            description: `${equipment.name} added to your schedule for ${format(selectedDate, 'MMMM d, yyyy')}.`
          });
        }

        if (removeId && selectedDate) {
          setSchedule(prev => prev.filter(entry =>
            !(entry.equipmentId === removeId && isSameDay(parseISO(entry.date), selectedDate))
          ));
          toast({
            title: "Equipment Removed from Schedule",
            description: `${equipment.name || 'Selected equipment'} removed for ${format(selectedDate, 'MMMM d, yyyy')}.`
          });
        }
      } else {
        setActiveEquipment(null);
      }
      if (!generatePlanForId) {
        router.replace('/training-schedule');
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, router]); // Removed toast from dependencies as it's stable

  const scheduledDays = useMemo(() => {
    return schedule.map(entry => parseISO(entry.date));
  }, [schedule]);

  const modifiers = { scheduled: scheduledDays };
  const modifiersClassNames = { scheduled: 'day-scheduled' };

  const selectedDayWorkouts = useMemo(() => {
    if (!selectedDate) return [];
    return schedule.filter(entry => isSameDay(parseISO(entry.date), selectedDate))
                   .sort((a, b) => a.title.localeCompare(b.title));
  }, [selectedDate, schedule]);

  useEffect(() => {
    if (selectedDayWorkouts.length > 0) {
      const uniqueEquipmentIds = [...new Set(selectedDayWorkouts.map(workout => workout.equipmentId).filter(Boolean))];
      const equipmentDetails = uniqueEquipmentIds.map(id => allEquipment.find(eq => eq.id === id)).filter(Boolean) as Equipment[];
      setCurrentlyScheduledEquipmentDetails(equipmentDetails);
    } else {
      setCurrentlyScheduledEquipmentDetails([]);
    }
  }, [selectedDayWorkouts]);

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
          <h1 className="text-xl font-semibold">My Training Schedule & Progress</h1>
        </div>
      </header>

      <main className="flex-1 p-4 md:p-6">
        <div className="max-w-5xl mx-auto">
          
          {isLoadingAIPlan && (
            <Card className="mb-6 shadow-md bg-card/50 border-primary/30 p-6 text-center">
              <div className="flex items-center justify-center gap-2 text-primary">
                <Loader2 className="h-6 w-6 animate-spin" />
                <CardTitle className="text-lg">AI is planning your workout...</CardTitle>
              </div>
              <CardDescription className="mt-2">Please wait a moment.</CardDescription>
            </Card>
          )}

          {!isLoadingAIPlan && activeEquipment && (
             <Card className="mb-6 shadow-md bg-card/50 border-primary/30">
              <CardHeader className="pb-2 pt-3 px-4">
                <CardTitle className="text-base">
                  {searchParams.get('addEquipmentId') ? 'Adding to Schedule:' : searchParams.get('removeEquipmentId') ? 'Removing from Schedule:' : 'Selected Equipment:'}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center sm:flex-row sm:items-start gap-4 p-4 pt-2">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0">
                  <Image
                    src={activeEquipment.imageUrl}
                    alt={activeEquipment.name}
                    fill
                    className="object-cover rounded-md"
                    data-ai-hint={activeEquipment.imageHint}
                  />
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-md font-semibold">{activeEquipment.name}</h3>
                  <p className="text-xs text-muted-foreground">{activeEquipment.type}</p>
                </div>
              </CardContent>
            </Card>
          )}

          {!isLoadingAIPlan && currentlyScheduledEquipmentDetails.length > 0 && selectedDate && (
            <div className="mb-6">
              <h2 className="text-md font-semibold mb-3 text-primary">
                Equipment for {format(selectedDate, 'MMMM d, yyyy')}:
              </h2>
              <div className="flex flex-wrap gap-4">
                {currentlyScheduledEquipmentDetails.map(equip => (
                  <Card key={equip.id} className="w-full sm:w-auto sm:max-w-[150px] flex-shrink-0 shadow-md">
                    <div className="relative w-full aspect-square sm:w-[150px] sm:h-[150px]">
                       <Image src={equip.imageUrl} alt={equip.name} fill className="object-cover rounded-t-md" data-ai-hint={equip.imageHint} />
                    </div>
                    <CardContent className="p-2 text-center">
                      <p className="text-xs font-medium truncate">{equip.name}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}


          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="md:col-span-1 flex justify-center md:justify-start">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                modifiers={modifiers}
                modifiersClassNames={modifiersClassNames}
                className="rounded-md border shadow-lg"
                disabled={(date) => date < startOfWeek(new Date(), { weekStartsOn: 1}) && !isSameDay(date, new Date()) && date > addDays(startOfWeek(new Date(), { weekStartsOn: 1}), 30*6) }
              />
            </div>
            <div className="md:col-span-2">
              <h2 className="text-lg font-semibold mb-3 text-center md:text-left">
                {selectedDate ? `Workout Plan for ${format(selectedDate, 'MMMM d, yyyy')}` : 'Select a date'}
              </h2>
              {!isLoadingAIPlan && selectedDayWorkouts.length > 0 ? (
                <div className={`space-y-4 max-h-[${activeEquipment && !searchParams.get('generatePlanForEquipmentId') ? '45vh' : '60vh'}] overflow-y-auto pr-2`}>
                  {selectedDayWorkouts.map((entry) => (
                    <Card key={entry.id} className="overflow-hidden shadow-lg hover:shadow-primary/20 transition-shadow duration-300">
                      {entry.image && (
                        <div className="relative w-full h-48">
                          <Image
                            src={entry.image}
                            alt={entry.title}
                            fill
                            className="object-cover"
                            data-ai-hint={entry.imageHint || 'workout fitness'}
                          />
                        </div>
                      )}
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{entry.title}</CardTitle>
                          {entry.icon && <entry.icon className="h-6 w-6 text-primary" />}
                        </div>
                        <p className="text-sm font-medium text-accent">{entry.day}</p>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="mb-3 text-sm">{entry.description}</CardDescription>
                        {entry.details && entry.details.length > 0 && (
                          <div>
                            <h4 className="font-semibold text-xs uppercase text-muted-foreground mb-1">Key Activities/Exercises:</h4>
                            <ul className="list-disc list-inside space-y-1 text-xs text-foreground/80">
                              {entry.details.map((detail, index) => (
                                <li key={index}>{detail}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                !isLoadingAIPlan && (
                  <div className="text-center py-10 text-muted-foreground">
                    <p>No workout scheduled for this day.</p>
                    {activeEquipment && !searchParams.get('generatePlanForEquipmentId') && <p className="text-xs mt-1">Select a date to manage its schedule.</p>}
                  </div>
                )
              )}
            </div>
          </div>

          {(schedule.length > 0 || weeklyActivityData.length > 0) && !isLoadingAIPlan && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
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

              {strengthProgressData.length > 0 && (
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
              )}
            </div>
          )}
           {(schedule.length === 0 && weeklyActivityData.length === 0 && selectedDayWorkouts.length === 0 && strengthProgressData.length === 0 && !isLoadingAIPlan) && (
            <div className="text-center py-10 mt-8">
              <p className="text-lg text-muted-foreground">Your training schedule and progress are currently empty.</p>
              <p className="text-sm text-muted-foreground">Upload equipment and schedule workouts to get started!</p>
              <Link href="/dashboard" className="mt-4 inline-block">
                <Button>Upload Equipment</Button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

