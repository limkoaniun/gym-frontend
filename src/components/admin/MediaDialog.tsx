'use client';

import { Check, SquarePlus } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, Modal, ModalBody, ModalFooter, ModalHeader } from 'flowbite-react';
import { getAllMedias } from '@/lib/api/media';
import { Media } from '@/lib/interfaces';
import Image from 'next/image';


const API = process.env.NEXT_PUBLIC_API_BASE_URL;

type MediaDialogProps = {
  attachMediaHandler: React.Dispatch<React.SetStateAction<Media[]>>;
};

export default function MediaDialog({ attachMediaHandler }: MediaDialogProps) {
  const [openModal, setOpenModal] = useState(false);
  const [medias, setMedias] = useState<Media[]>([]);
  const [selectedMedia, setSelectedMedia] = useState<Media[]>([]);

  const fetchAllMedias = () => {
    getAllMedias().then(data => setMedias(data));
  };

  useEffect(fetchAllMedias, []);

  return (
    <>
      <Button onClick={() => setOpenModal(true)} variant="ghost" size="sm">
        <SquarePlus className=" h-5 w-5"/>
      </Button>
      <Modal size="7xl" show={openModal} onClose={() => setOpenModal(false)}>
        <ModalHeader>Select Medias</ModalHeader>
        <ModalBody>
          <div className="flex flex-wrap">
            {medias.map(media => (
              // eslint-disable-next-line react/jsx-key
              <div className="relative m-2 max-w-xs">
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
                  onClick={() => {
                    if (selectedMedia.includes(media)) {
                      setSelectedMedia(selectedMedia.filter(m => m !== media));
                    } else {
                      setSelectedMedia([...selectedMedia, media]);
                    }
                  }}
                >
                  {selectedMedia.includes(media) && (
                    <Check className="absolute top-2 right-2 cursor-pointer border-1 border-green-500 bg-green-500" />
                  )}
                  {!selectedMedia.includes(media) && (
                    <Check className="absolute top-2 right-2 cursor-pointer border-1 border-gray-500 bg-gray-500/50" />
                  )}
                  <p className="font-normal text-gray-700 dark:text-gray-400 flex ">{media.name}</p>
                </Card>
              </div>
            ))}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="alternative" onClick={() => setOpenModal(false)}>
            Close
          </Button>
          <Button
            color="alternative"
            onClick={() => {
              setOpenModal(false);
              attachMediaHandler(selectedMedia);
            }}
          >
            Attach
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
