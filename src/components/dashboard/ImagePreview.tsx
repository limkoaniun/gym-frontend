'use client';
import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface ImagePreviewProps {
  imageUrl: string;
  onClear: () => void;
  disabled: boolean;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({ imageUrl, onClear, disabled }) => (
  <div className="relative p-1 border border-border rounded-lg w-full max-w-md mx-auto aspect-video bg-muted/20 shadow-md">
    <Image src={imageUrl} alt="Selected preview" fill className="object-contain rounded-md p-1" />
    <Button
      type="button"
      variant="link"
      size="icon"
      className="absolute -top-3 -right-3 h-7 w-7 rounded-full z-10 shadow-md"
      onClick={onClear}
      disabled={disabled}
      aria-label="Remove image"
    >
      <X className="h-4 w-4" />
    </Button>
  </div>
);
