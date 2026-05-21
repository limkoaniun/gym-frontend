'use client';

import { SquarePlus, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import MediaDialog from '@/components/admin/MediaDialog';
import { Media, Usage, Muscle } from '@/lib/interfaces';
import { Card, Label, TextInput, Dropdown, DropdownItem } from 'flowbite-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { getAllMuscles } from '@/lib/api/muscle';

const API = process.env.NEXT_PUBLIC_API_BASE_URL;

type UsageEditProps = {
  usage: Usage;
  updateUsageHandler: (usage: Usage) => void;
};

export default function UsageEdit({ usage, updateUsageHandler }: UsageEditProps) {
  const [muscles, setMuscles] = useState<Muscle[]>([]);
  const [selectedMuscle, setSelectedMuscle] = useState<Muscle | undefined>();

  const setSelectedMedia = (medias: Media[]) => {
    updateUsageHandler({ ...usage, medias: medias });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
  ) => {
    updateUsageHandler({ ...usage, [e.target.id]: e.target.value });
  };

  const fetchAllMuscles = () => {
    getAllMuscles().then(data => setMuscles(data));
  };

  useEffect(fetchAllMuscles, []);

  const handleSelectMuscle = (m: Muscle) => {
    setSelectedMuscle(m);
  };

  const handleAddMuscle = () => {
    if (selectedMuscle && !usage.muscles.includes(selectedMuscle!)) {
      updateUsageHandler({ ...usage, muscles: [...usage.muscles, selectedMuscle] });
    }
  };

  const handleRemoveMuscle = (m: Muscle) => {
    updateUsageHandler({ ...usage, muscles: usage.muscles.filter(muscle => muscle !== m) });
  };

  return (
    <>
      <div className="mt-3">
        <div key={usage.id} className="bg-gray-600 border border-gray-300 rounded-md p-3 mb-3">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="name">Name</Label>
            </div>
            <TextInput
              id="name"
              type="text"
              sizing="lg"
              onChange={handleChange}
              value={usage.name}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="description">Description</Label>
            </div>
            <TextInput
              id="description"
              type="text"
              sizing="lg"
              onChange={handleChange}
              value={usage.description}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="muscle">Muscles</Label>
            </div>
            <div className="flex flex-wrap">
              <Dropdown label={selectedMuscle ? selectedMuscle.name : 'Select Muscle'}>
                {muscles.map(m => (
                  <DropdownItem onClick={() => handleSelectMuscle(m)} key={m.id}>
                    {m.name}
                  </DropdownItem>
                ))}
              </Dropdown>
              <Button onClick={() => handleAddMuscle()} variant="ghost" size="sm">
                <SquarePlus className=" h-5 w-5" />
              </Button>
            </div>
            <div className="mt-3">
              {usage.muscles.map(m => (
                <span
                  key={m.id}
                  className="me-1 inline-flex items-center rounded-md bg-pink-400/10 px-2 py-1 text-xs font-medium text-pink-400 inset-ring inset-ring-pink-400/20"
                >
                  {m.name}
                  <X onClick={() => handleRemoveMuscle(m)} className="h-4 w-4 cursor-pointer" />
                </span>
              ))}
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
              {usage.medias.map(media => (
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
        </div>
      </div>
    </>
  );
}
