'use client';

import { Images, Plus, X, MoveUp, MoveDown, Check, Pencil } from 'lucide-react';
import { Card, Modal, ModalBody, ModalFooter, ModalHeader } from 'flowbite-react';
import { Dropdown, DropdownItem } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Media } from '@/lib/interfaces';
import { deleteMedia, getAllMedias, updateMediaName, uploadMediaFile } from '@/lib/api/media';
import { toast } from 'react-toastify';

const API = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function Medias() {
  const [medias, setMedias] = useState<Media[]>([]);
  const [order, setOrder] = useState<string>('asc');
  const [sortBy, setSortBy] = useState<keyof Media>('id');
  const [openModal, setOpenModal] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [mediaName, setMediaName] = useState('');
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState<number>(0);
  const [editingName, setEditingName] = useState<string>('');

  useEffect(() => {
    setMedias(sortByKey(medias, sortBy, order));
  }, [sortBy, order]);

  const fetchAllMedias = () => {
    getAllMedias().then(data => setMedias(data));
  };

  useEffect(fetchAllMedias, []);

  const handleClickDel = (id: number | string) => {
    if (confirm('Are you sure to delete the media?')) {
      deleteMedia(String(id)).then(data => {
        if (data) {
          fetchAllMedias();
          toast.success('The media has been deleted successfully');
        } else {
          toast.error('Error: cannot delete the media, because still in use.');
        }
      });
    }
  };

  const sortByKey = <K extends keyof Media>(
    arr: Media[],
    key: K,
    order: string = 'asc'
  ): Media[] => {
    return [...arr].sort((a, b) => {
      const aVal = a[key];
      const bVal = b[key];

      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return order === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return order === 'asc' ? aVal - bVal : bVal - aVal;
      }
      return 0;
    });
  };

  const handleClickBySort = (key: keyof Media) => {
    if (sortBy == key) {
      if (order == 'asc') {
        setOrder('desc');
      } else {
        setOrder('asc');
      }
    } else {
      setSortBy(key);
      setOrder('asc');
    }
  };

  const handleUploadMedia = async () => {
    if (!file) {
      toast.error('Please select a file');
      return;
    }

    try {
      setUploading(true);

      uploadMediaFile(file, mediaName).then(() => {
        toast.success('Media uploaded successfully');
        setOpenModal(false);
        setFile(null);
        setMediaName('');
        fetchAllMedias();
      });
    } catch (error) {
      console.error(error);
      toast.error('Failed to upload media');
    } finally {
      setUploading(false);
    }
  };

  const handleSaveEdit = () => {
    updateMediaName(editingId, editingName).then(data => {
      if (data) {
        fetchAllMedias();
        toast.success('The Media name has been updated successfully.');
        setEditingId(0);
      } else {
        toast.error('Failed to update media name.');
      }
    });
  };

  const editMediaIdAndName = (media: Media) => () => {
    setEditingId(media.id);
    setEditingName(media.name);
  };

  return (
    <>
      <AdminHeader title="Medias" icon={<Images />} subtitle="Manage Medias" />
      <div className="flex justify-end">
        <div className="my-6">
          <Dropdown
            label={
              <span>
                {`By ${sortBy.toUpperCase()}`}{' '}
                {order == 'asc' ? (
                  <MoveUp className="inline h-4" />
                ) : (
                  <MoveDown className="inline h-4" />
                )}
              </span>
            }
            color="light"
          >
            <DropdownItem onClick={() => handleClickBySort('name')}>By Name</DropdownItem>
            <DropdownItem onClick={() => handleClickBySort('type')}>By Type</DropdownItem>
            <DropdownItem onClick={() => handleClickBySort('id')}>By Id</DropdownItem>
          </Dropdown>
        </div>
        <Button onClick={() => setOpenModal(true)} variant="cta" size="sm" className="m-6">
          <Plus className="mr-2 h-5 w-5" />
          Add Media
        </Button>
        <Modal show={openModal} onClose={() => setOpenModal(false)}>
          <ModalHeader>Upload Media</ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium">Media Name</label>
                <input
                  type="text"
                  value={mediaName}
                  onChange={e => setMediaName(e.target.value)}
                  placeholder="Enter media name"
                  className="w-full rounded border px-3 py-2 text-black"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">Choose File</label>
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/svg+xml,image/webp,video/mp4"
                  onChange={e => {
                    if (e.target.files && e.target.files[0]) {
                      const selectedFile = e.target.files[0];
                      setFile(selectedFile);

                      if (!mediaName.trim()) {
                        const fileName = selectedFile.name;
                        const dotIndex = fileName.lastIndexOf('.');
                        setMediaName(dotIndex > 0 ? fileName.substring(0, dotIndex) : fileName);
                      }
                    }
                  }}
                  className="w-full"
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleUploadMedia} disabled={uploading}>
              {uploading ? 'Uploading...' : 'Upload'}
            </Button>
            <Button color="alternative" onClick={() => setOpenModal(false)}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </div>
      <div className="flex flex-row flex-wrap">
        {medias.map(media => (
          <div className="relative m-6 max-w-xs" key={media.id}>
            <Card
              className="max-w-xs overflow-hidden"
              renderImage={() => (
                <Image
                  width={300}
                  height={300}
                  className="w-full h-48 object-cover"
                  src={`${API}/medias/${media.id}`}
                  alt={media.originalFileName}
                />
              )}
            >
              <X
                className="absolute top-2 right-2 cursor-pointer"
                onClick={() => handleClickDel(media.id)}
              />
              {media.id !== editingId && (
                <p className="font-normal text-gray-700 dark:text-gray-400 flex">
                  {media.name}
                  <Button
                    variant="outline"
                    size="icon"
                    className="ms-6"
                    onClick={editMediaIdAndName(media)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                </p>
              )}
              {media.id == editingId && (
                <div>
                  <input
                    type="text"
                    className="text-black"
                    value={editingName}
                    onChange={e => setEditingName(e.target.value)}
                  />
                  <Button variant="outline" size="icon" className="ms-6" onClick={handleSaveEdit}>
                    <Check className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </Card>
          </div>
        ))}
      </div>
    </>
  );
}
