'use client';

import React, { ChangeEvent, FormEvent, RefObject } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Paperclip, Search, UploadCloud } from 'lucide-react';

interface EquipmentFormProps {
  equipmentName: string;
  onEquipmentNameChange: (value: string) => void;
  onFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  fileInputRef: RefObject<HTMLInputElement>;
  isLoading: boolean;
  isIdentifying: boolean;
  imageFile: File | null;
}

export const EquipmentForm: React.FC<EquipmentFormProps> = ({
  equipmentName,
  onEquipmentNameChange,
  onFileChange,
  onSubmit,
  fileInputRef,
  isLoading,
  isIdentifying,
  imageFile,
}) => {
  return (
    <form onSubmit={onSubmit} className="w-full max-w-2xl space-y-6">
      <div className="flex items-center w-full p-2 rounded-full shadow-xl bg-card border border-border focus-within:ring-2 focus-within:ring-primary transition-all">
        <Search className="h-5 w-5 text-muted-foreground ml-3 mr-2 flex-shrink-0" />
        <Input
          id="equipmentName"
          type="text"
          placeholder={
            isIdentifying
              ? 'AI is identifying, please wait...'
              : 'Enter equipment name (or let AI suggest)'
          }
          value={equipmentName}
          onChange={e => onEquipmentNameChange(e.target.value)}
          className="flex-grow bg-transparent border-0 focus:ring-0 text-base placeholder-muted-foreground px-0"
          disabled={isLoading || isIdentifying}
          required
        />
        <input
          type="file"
          ref={fileInputRef}
          onChange={onFileChange}
          accept="image/jpeg, image/png, image/webp"
          className="hidden"
          id="image-upload-main"
          disabled={isLoading || isIdentifying}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => fileInputRef.current?.click()}
          className="text-muted-foreground hover:text-primary mx-1 flex-shrink-0"
          disabled={isLoading || isIdentifying}
          aria-label="Choose image"
        >
          <Paperclip className="h-5 w-5" />
        </Button>
        <Button
          type="submit"
          size="icon"
          className="rounded-full bg-primary hover:bg-primary/90 flex-shrink-0 mr-1"
          disabled={isLoading || isIdentifying || !imageFile || !equipmentName.trim()}
          aria-label="Save equipment"
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground" />
          ) : (
            <UploadCloud className="h-5 w-5" />
          )}
        </Button>
      </div>
    </form>
  );
};
