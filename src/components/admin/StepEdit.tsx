'use client';

import React, { useEffect, useState } from 'react';
import MediaDialog from '@/components/admin/MediaDialog';
import { Media, Step } from '@/lib/interfaces';
import { Card, Label, TextInput} from 'flowbite-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';

const API = process.env.NEXT_PUBLIC_API_BASE_URL;

type StepEditProps = {
  step: Step;
  updateStepHandler: (step: Step) => void;
};

export default function StepEdit({ step, updateStepHandler }: StepEditProps) {
  const [editingStep, setEditingStep] = useState<Step>({
    instruction: '',
    medias: [],
    setUp: false,
    title: '',
  });

  useEffect(() => {
    setEditingStep(step);
  }, [step]);

  const setSelectedMedia = (medias: Media[]) => {
    setEditingStep({ ...editingStep, medias: medias });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
  ) => {
    console.log(e);
    if (e.target.type == 'checkbox') {
      setEditingStep({ ...editingStep, [e.target.id]: e.target.checked });
    } else {
      setEditingStep({ ...editingStep, [e.target.id]: e.target.value });
    }
  };

  return (
    <>
      <div className="mt-3">
        <div key={step.id} className="bg-gray-600 border border-gray-300 rounded-md p-3 mb-3">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="title">Title</Label>
            </div>
            <TextInput
              id="title"
              type="text"
              sizing="lg"
              onChange={handleChange}
              value={editingStep.title}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="instruction">Instruction</Label>
            </div>
            <TextInput
              id="instruction"
              type="text"
              sizing="lg"
              onChange={handleChange}
              value={editingStep.instruction}
            />
          </div>
          <div>
            <div className="flex mt-3">
              <TextInput
                type="checkbox"
                id="setUp"
                className="mt-1 me-3 scale-150"
                checked={editingStep.setUp}
                onChange={handleChange}
              />
              <Label htmlFor="setUp">Is Set Up</Label>
            </div>
          </div>
          <div>
            <div className="flex">
              <div className="mb-2 block h-10 py-2">
                <Label htmlFor="media">Select Media</Label>
              </div>
              <MediaDialog attachMediaHandler={setSelectedMedia} />
            </div>
            <div className="flex flex-wrap">
              {editingStep.medias.map(media => (
                // eslint-disable-next-line react/jsx-key
                <div className="relative m-2 w-xs">
                  <Card
                    className="max-w-xs overflow-hidden"
                    renderImage={() => (
                      <Image
                        width={120}
                        height={120}
                        className="w-full h-36 object-cover"
                        src={`${API}/medias/${media.id}`}
                        alt={media.originalFileName}
                      />
                    )}
                  >
                    {media.name}
                  </Card>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end ">
            <Button onClick={() => updateStepHandler(editingStep)} className="me-3"> <Check /> </Button>
            <Button variant="secondary" > <X /> </Button>
          </div>
        </div>
      </div>
    </>
  );
}
