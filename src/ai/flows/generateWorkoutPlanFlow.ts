
'use server';
/**
 * @fileOverview An AI agent for generating daily workout plans.
 *
 * - generateWorkoutPlan - A function that handles the workout plan generation.
 * - GenerateWorkoutPlanInput - The input type for the generateWorkoutPlan function.
 * - GenerateWorkoutPlanOutput - The return type for the generateWorkoutPlan function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const EquipmentDetailSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.string(),
  imageUrl: z.string(),
  imageHint: z.string(),
});

const GenerateWorkoutPlanInputSchema = z.object({
  focusedEquipmentId: z.string().describe('The ID of the primary equipment the user wants to use today.'),
  allAvailableEquipment: z.array(EquipmentDetailSchema).describe('A list of all gym equipment available to the user.'),
});
export type GenerateWorkoutPlanInput = z.infer<typeof GenerateWorkoutPlanInputSchema>;

const WorkoutSegmentSchema = z.object({
  equipmentId: z.string().describe('The ID of the equipment used for this segment.'),
  name: z.string().describe('The name of the equipment used.'),
  imageUrl: z.string().describe('The image URL for the equipment.'),
  imageHint: z.string().describe('The AI hint for the equipment image.'),
  exercises: z.array(z.string()).describe('A list of 2-4 specific exercises using this equipment (e.g., "Squats: 3 sets of 10-12 reps").'),
  focus: z.string().describe("A brief (1-2 sentences) description of this part of the workout and why this equipment is used, e.g., 'Focus on compound leg movements for strength.'"),
});

const GenerateWorkoutPlanOutputSchema = z.object({
  dailyPlan: z.array(WorkoutSegmentSchema).describe("Today's workout plan, consisting of several segments. Each segment uses a piece of equipment for specific exercises."),
});
export type GenerateWorkoutPlanOutput = z.infer<typeof GenerateWorkoutPlanOutputSchema>;


export async function generateWorkoutPlan(input: GenerateWorkoutPlanInput): Promise<GenerateWorkoutPlanOutput> {
  return generateWorkoutPlanFlow(input);
}

const generateWorkoutPlanPrompt = ai.definePrompt({
  name: 'generateWorkoutPlanPrompt',
  input: {schema: GenerateWorkoutPlanInputSchema},
  output: {schema: GenerateWorkoutPlanOutputSchema},
  prompt: `You are an expert fitness planner.
The user wants to work out today and has indicated a piece of equipment they'd like to focus on.
They also provided a list of all equipment available to them.

Your task is to create a balanced and effective workout plan for the day.
- The plan should be returned as an array of "workout segments".
- Each segment should utilize one piece of equipment from the 'allAvailableEquipment' list.
- For each segment, provide:
    - The 'equipmentId', 'name', 'imageUrl', and 'imageHint' of the equipment used (copy this from the input 'allAvailableEquipment' based on the chosen ID).
    - A list of 2-4 specific 'exercises' to perform with that equipment (e.g., "Bench Press: 3 sets of 8-10 reps", "Bicep Curls: 3 sets of 12-15 reps").
    - A short 'focus' text (1-2 sentences) explaining the purpose of this segment (e.g., "Targeting chest and triceps for upper body strength.", "Full body cardio to improve endurance.").

Prioritize using the 'focusedEquipmentId' for at least one significant segment.
You can (and should) include 1 to 3 other pieces of equipment from 'allAvailableEquipment' to create a well-rounded workout for the day. Aim for a total of 2-4 workout segments in the plan.
Ensure the exercises are appropriate for the equipment type.

Focused Equipment ID for today: {{focusedEquipmentId}}

All Available Equipment:
{{#each allAvailableEquipment}}
- ID: {{id}}
  Name: {{name}}
  Type: {{type}}
  ImageURL: {{imageUrl}}
  ImageHint: {{imageHint}}
{{/each}}

Generate the dailyPlan now.
`,
});

const generateWorkoutPlanFlow = ai.defineFlow(
  {
    name: 'generateWorkoutPlanFlow',
    inputSchema: GenerateWorkoutPlanInputSchema,
    outputSchema: GenerateWorkoutPlanOutputSchema,
  },
  async (input) => {
    // Find the focused equipment to ensure it's valid, though the AI will primarily use the ID.
    const focusedItem = input.allAvailableEquipment.find(e => e.id === input.focusedEquipmentId);
    if (!focusedItem) {
      // This case should ideally be handled before calling the flow,
      // but as a fallback, we can try to generate a generic plan or return an error/empty plan.
      // For now, let AI proceed, it might still generate something reasonable with other equipment.
      console.warn(`Focused equipment ID ${input.focusedEquipmentId} not found in allAvailableEquipment.`);
    }

    const {output} = await generateWorkoutPlanPrompt(input);
    if (!output || !output.dailyPlan) {
      // Handle cases where AI might return an unexpected or empty structure
      console.error("AI did not return a valid daily plan structure.");
      return { dailyPlan: [] };
    }
    return output;
  }
);
