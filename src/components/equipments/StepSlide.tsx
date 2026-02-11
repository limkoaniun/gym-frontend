import { Step } from '@/lib/interfaces';
import { Carousel } from 'flowbite-react';
import Image from 'next/image';
import { useState } from 'react';

const API = process.env.NEXT_PUBLIC_API_BASE_URL;

type Props = {
  steps: Step[];
};

const StepSlide = ({ steps }: Props) => {
  const [instruction, setInstruction] = useState<string>('');

  const handleSlideChange = (index: number) => {
    setInstruction(steps[index]?.instruction);
  };

  return (
    <div className="max-w-4xl mx-auto mt-4">
      <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
        <Carousel slide={false} onSlideChange={handleSlideChange}>
          {steps.map(step => (
            <div key={`execute-img-${step.medias[0]?.id}`} className="relative w-full h-full">
              <Image
                src={`${API}/medias/${step.medias[0]?.id}`}
                alt={step.title}
                fill
                className="object-cover"
                sizes="(max-width: 896px) 100vw, 896px"
              />
            </div>
          ))}
        </Carousel>
      </div>
      <div className="mt-4 border-2 p-5 rounded-md ">{instruction}</div>
    </div>
  );
};

export default StepSlide;
