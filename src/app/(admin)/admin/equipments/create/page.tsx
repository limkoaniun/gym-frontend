'use client';

import { Dumbbell, SquarePlus, X } from 'lucide-react';
import AdminHeader from '@/components/admin/AdminHeader';
import React, { useEffect, useState } from 'react';
import MediaDialog from '@/components/admin/MediaDialog';
import { Equipment, Media, Tag } from '@/lib/interfaces';
import { Card, Label, TextInput, Dropdown, DropdownItem } from 'flowbite-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { createEquipment } from '@/lib/api/equipment';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { getAllTags } from '@/lib/api/tag';

const API = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function EquipmentPage() {
  const [selectedMedia, setSelectedMedia] = useState<Media[]>([]);
  const [equipment, setEquipment] = useState<Equipment>({
    description: '',
    id: 0,
    medias: [],
    name: '',
    tags: [],
    usages: [],
  });
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTag, setSelectedTag] = useState<Tag | undefined>();

  const fetchAllTags = () => {
    getAllTags().then(data => setTags(data));
  };

  useEffect(fetchAllTags, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setEquipment({ ...equipment, [e.target.id]: e.target.value });
  };

  const onSave = () => {
    console.log({ ...equipment, medias: selectedMedia });
    createEquipment({ ...equipment, medias: selectedMedia })
      .then(data => {
        setEquipment(data);
        toast.success('The Equipment has been added.');
      })
      .catch(error => {
        toast.error(error.response.data.error);
      });
    router.push('/admin/equipments');
  };

  const router = useRouter();
  const onBack = () => {
    router.push(`/admin/equipments`);
  };

  const handleClick = (tag: Tag) => {
    setSelectedTag(tag);
  };

  const handleAddTag = () => {
    if (selectedTag && !equipment.tags.includes(selectedTag!)) {
      setEquipment({ ...equipment, tags: [...equipment.tags, selectedTag!] });
    }
  };

  const handleRemoveTag = (tag:Tag) => {
    setEquipment({...equipment, tags:[...equipment.tags].filter(t=> t !== tag)})
  };

  return (
    <>
      <AdminHeader title="Equipment" icon={<Dumbbell />} subtitle="Manage Equipment" />
      <div className="flex">
        <Card className="w-2/3 m-auto mt-16">
          <div className="flex flex-col gap-4">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="equipmentName">Equipment name</Label>
              </div>
              <TextInput id="name" type="text" sizing="sm" onChange={handleChange} />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="description">Description</Label>
              </div>
              <TextInput id="description" type="text" sizing="lg" onChange={handleChange} />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="tags">Tags</Label>
              </div>
              <div className="flex flex-wrap">
                <Dropdown label={selectedTag ? selectedTag.name : 'Select Tag'}>
                  {tags.map(tag => (
                    <DropdownItem onClick={() => handleClick(tag)} key={tag.id}>
                      {tag.name}
                    </DropdownItem>
                  ))}
                </Dropdown>
                <Button onClick={() => handleAddTag()} variant="ghost" size="sm">
                  <SquarePlus className=" h-5 w-5" />
                </Button>
              </div>
              <div className="mt-3">
                {equipment.tags.map(tag => (
                  <span
                    key={tag.id}
                    className="me-1 inline-flex items-center rounded-md bg-pink-400/10 px-2 py-1 text-xs font-medium text-orange-400 inset-ring inset-ring-pink-400/20"
                  >
                    {tag.name}
                    <X onClick={() => handleRemoveTag(tag)} className="h-4 w-4 cursor-pointer"/>
                  </span>
                ))}
              </div>
            </div>
            <div className="flex">
              <div className="mb-2 block h-10 py-2">
                <Label htmlFor="media">Select Media</Label>
              </div>
              <MediaDialog attachMediaHandler={setSelectedMedia} />
            </div>
            <div className="flex flex-wrap">
              {selectedMedia.map(media => (
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
            <div className="flex justify-evenly">
              <Button onClick={onSave}>Save </Button>
              <Button onClick={onBack}>Back </Button>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}
