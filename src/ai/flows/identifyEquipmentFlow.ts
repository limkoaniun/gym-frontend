'use server';
/**
 * @fileOverview An AI agent for identifying gym equipment from images.
 *
 * - identifyEquipment - A function that handles the equipment identification process.
 * - IdentifyEquipmentInput - The input type for the identifyEquipment function.
 * - IdentifyEquipmentOutput - The return type for the identifyEquipment function.
 */

import {ai}from '@/ai/genkit';
import {z} from 'zod';

const IdentifyEquipmentInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of gym equipment, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type IdentifyEquipmentInput = z.infer<typeof IdentifyEquipmentInputSchema>;

const IdentifyEquipmentOutputSchema = z.object({
  equipmentName: z.string().describe('The common name of the identified gym equipment. Be concise, e.g., "Treadmill", "Dumbbell Set", "Leg Press Machine". If multiple items are present, identify the most prominent one. If no gym equipment is clearly identifiable, return an empty string or a short phrase like "Unknown equipment".'),
});
export type IdentifyEquipmentOutput = z.infer<typeof IdentifyEquipmentOutputSchema>;

export async function identifyEquipment(input: IdentifyEquipmentInput): Promise<IdentifyEquipmentOutput> {
  return identifyEquipmentFlow(input);
}

const identifyEquipmentPrompt = ai.definePrompt({
  name: 'identifyEquipmentPrompt',
  input: {schema: IdentifyEquipmentInputSchema},
  output: {schema: IdentifyEquipmentOutputSchema},
  prompt: `You are an expert at identifying gym equipment from images.
Analyze the provided image and identify the primary piece of gym equipment visible.
Return its common name. For example: "Treadmill", "Dumbbell Set", "Elliptical Trainer", "Leg Press Machine".
If multiple items are present, identify the most prominent one or the one most in focus.
If no gym equipment is clearly identifiable in the image, return a short phrase like "Unknown equipment" or an empty string.
Only return the name of the equipment or the 'unknown' status as a string.

Image: {{media url=photoDataUri}}`,
});

const identifyEquipmentFlow = ai.defineFlow(
  {
    name: 'identifyEquipmentFlow',
    inputSchema: IdentifyEquipmentInputSchema,
    outputSchema: IdentifyEquipmentOutputSchema,
  },
  async (input) => {
    const {output} = await identifyEquipmentPrompt(input);
    if (!output) {
      return { equipmentName: "Unknown equipment (AI error)" };
    }
    return output;
  }
);
