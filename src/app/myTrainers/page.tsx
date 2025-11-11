
"use client";

import Link from 'next/link';
import Image from 'next/image';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft, PlayCircle, Trash2, CalendarPlus, CalendarX2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from '@/hooks/use-toast';

interface Equipment {
  id: string;
  name: string;
  type: string;
  imageUrl: string;
  imageHint: string;
}

const initialEquipment: Equipment[] = [
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

export default function MyEquipmentPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [equipmentList, setEquipmentList] = useState<Equipment[]>(initialEquipment);
  const [equipmentToDelete, setEquipmentToDelete] = useState<Equipment | null>(null);

  const handleWatchTutorialClick = (event: React.MouseEvent, equipmentId: string) => {
    event.stopPropagation();
    router.push(`/dashboard?equipmentId=${equipmentId}`);
  };

  const openDeleteDialog = (event: React.MouseEvent, equipment: Equipment) => {
    event.stopPropagation();
    setEquipmentToDelete(equipment);
  };

  const handleDeleteConfirm = () => {
    if (equipmentToDelete) {
      setEquipmentList(prevList => prevList.filter(item => item.id !== equipmentToDelete.id));
      toast({
        title: "Equipment Deleted",
        description: `${equipmentToDelete.name} has been removed from your equipment.`,
      });
      setEquipmentToDelete(null);
    }
  };

  const handleGenerateAIPlanClick = (event: React.MouseEvent, equipmentId: string, equipmentName: string) => {
    event.stopPropagation();
    router.push(`/training-schedule?generatePlanForEquipmentId=${equipmentId}`);
    toast({
      title: "AI Workout Planner",
      description: `AI is generating a workout plan focusing on ${equipmentName}...`,
    });
  };

  const handleRemoveFromScheduleClick = (event: React.MouseEvent, equipmentId: string, equipmentName: string) => {
    event.stopPropagation();
    // This logic might need to be adjusted if AI plans overwrite manual additions.
    // For now, it removes manually added specific equipment for a selected day.
    router.push(`/training-schedule?removeEquipmentId=${equipmentId}`);
     toast({
      title: "Updating Schedule",
      description: `Navigating to remove ${equipmentName} from your schedule.`,
    });
  };

  return (
    <AlertDialog open={!!equipmentToDelete} onOpenChange={(isOpen) => { if (!isOpen) setEquipmentToDelete(null); }}>
      <div className="flex flex-col min-h-screen bg-background text-foreground">
        <header className="p-4 border-b border-border flex justify-between items-center sticky top-0 bg-background/80 backdrop-blur-md z-10">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="outline" size="icon" className="h-9 w-9">
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Back to Dashboard</span>
              </Button>
            </Link>
            <h1 className="text-xl font-semibold">My Equipment</h1>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6">
          <div className="max-w-5xl mx-auto">
            {equipmentList.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-lg text-muted-foreground">You haven't saved any equipment yet.</p>
                <p className="text-sm text-muted-foreground">Upload equipment pictures through the dashboard!</p>
                <Link href="/dashboard" className="mt-4 inline-block">
                  <Button>Go to Dashboard</Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {equipmentList.map((item) => (
                  <Card
                    key={item.id}
                    className="overflow-hidden shadow-lg hover:shadow-primary/20 transition-shadow duration-300 group relative flex flex-col"
                  >
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 z-20 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => openDeleteDialog(e, item)}
                        aria-label={`Delete ${item.name}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <div className="relative w-full aspect-square">
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        className="object-cover"
                        data-ai-hint={item.imageHint}
                      />
                    </div>
                    <CardHeader className="p-4">
                      <CardTitle className="text-lg leading-tight">{item.name}</CardTitle>
                      <CardDescription className="text-xs mt-1">{item.type}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 flex-grow flex flex-col justify-between space-y-3">
                      <Button
                        variant="secondary"
                        size="sm"
                        className="w-full"
                        onClick={(e) => handleWatchTutorialClick(e, item.id)}
                      >
                        <PlayCircle className="mr-2 h-4 w-4" />
                        Watch Tutorial
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={(e) => handleGenerateAIPlanClick(e, item.id, item.name)}
                      >
                        <CalendarPlus className="mr-2 h-4 w-4" />
                        Add to Schedule (AI)
                      </Button>
                       <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={(e) => handleRemoveFromScheduleClick(e, item.id, item.name)}
                      >
                        <CalendarX2 className="mr-2 h-4 w-4" />
                        Remove from Schedule
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>

      {equipmentToDelete && (
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{equipmentToDelete.name}" from your gym? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setEquipmentToDelete(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      )}
    </AlertDialog>
  );
}
