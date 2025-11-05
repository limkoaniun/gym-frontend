'use client';

import React, { useState, useRef, type ChangeEvent, type FormEvent } from 'react';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { EquipmentForm } from '@/components/dashboard/EquipmentForm';
import { ImagePreview } from '@/components/dashboard/ImagePreview';
import { useToast } from '@/hooks/use-toast'; // this hasn't been changed to toastify yet
import { identifyEquipment } from '@/ai/flows/identifyEquipmentFlow';
import Cookies from "js-cookie";


export default function Page() {
    const [equipmentName, setEquipmentName] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isIdentifying, setIsIdentifying] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { toast } = useToast();

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                toast({
                    variant: 'destructive',
                    title: 'File too large',
                    description: 'Please upload an image smaller than 5MB.',
                });
                if (fileInputRef.current) fileInputRef.current.value = '';
                setImageFile(null);
                setImagePreview(null);
                setEquipmentName('');
                return;
            }

            setImageFile(file);
            setEquipmentName('');

            const reader = new FileReader();
            reader.onloadend = async () => {
                const dataUri = reader.result as string;
                setImagePreview(dataUri);

                if (dataUri) {
                    setIsIdentifying(true);
                    try {
                        const result = await identifyEquipment({ photoDataUri: dataUri });
                        if (
                            result &&
                            result.equipmentName &&
                            result.equipmentName.trim() !== '' &&
                            result.equipmentName.toLowerCase() !== 'unknown equipment'
                        ) {
                            setEquipmentName(result.equipmentName);
                            toast({
                                title: 'Equipment Identified',
                                description: `AI suggests: "${result.equipmentName}". You can edit this name.`,
                            });
                        } else {
                            setEquipmentName('');
                            toast({
                                title: 'AI Identification',
                                description: 'AI could not identify the equipment. Please name it manually.',
                            });
                        }
                    } catch (error) {
                        console.error('Error identifying equipment:', error);
                        setEquipmentName('');
                        toast({
                            variant: 'destructive',
                            title: 'AI Error',
                            description: 'Failed to identify equipment. Please enter it manually.',
                        });
                    } finally {
                        setIsIdentifying(false);
                    }
                }
            };

            reader.readAsDataURL(file);
        }
    };

    const clearImage = () => {
        setImageFile(null);
        setImagePreview(null);
        setEquipmentName('');
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleSaveEquipment = async (e: FormEvent) => {
        e.preventDefault();

        if (!imageFile || !equipmentName.trim()) {
            toast({
                variant: 'destructive',
                title: 'Missing Information',
                description: 'Please select an image and enter a name.',
            });
            return;
        }

        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1500));

        toast({
            title: 'Equipment Saved',
            description: `${equipmentName} has been added to your list.`,
        });

        setEquipmentName('');
        clearImage();
        setIsLoading(false);
    };

    return (
        <div className="flex flex-col h-screen bg-background text-foreground">
            <DashboardHeader />
            <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-6 space-y-6">
                <EquipmentForm
                    equipmentName={equipmentName}
                    onEquipmentNameChange={setEquipmentName}
                    onFileChange={handleFileChange}
                    onSubmit={handleSaveEquipment}
                    fileInputRef={fileInputRef}
                    isLoading={isLoading}
                    isIdentifying={isIdentifying}
                    imageFile={imageFile}
                />
                {imagePreview ? (
                    <ImagePreview
                        imageUrl={imagePreview}
                        onClear={clearImage}
                        disabled={isLoading || isIdentifying}
                    />
                ) : (
                    <div className="text-muted-foreground mt-8 text-center">
                        <p className="text-lg">Upload your gym equipment</p>
                        <p className="text-sm">
                            Click the paperclip icon to select an image, name your equipment (or let AI suggest),
                            and hit upload!
                        </p>
                    </div>
                )}
            </main>
        </div>
    );
}