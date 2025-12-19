import { ChevronRight } from 'lucide-react';
import { Equipment } from '@/lib/interfaces';

const API = process.env.NEXT_PUBLIC_API_BASE_URL;

type Props = {
  equipment: Equipment;
  onClick: () => void;
};

const EquipmentListItem = ({ equipment, onClick }: Props) => {
  return (
    <div onClick={onClick} className="cursor-pointer">
      <div className="w-full max-w-md sm:max-w-xl lg:max-w-3xl mx-auto my-2">
        <div className="flex w-full items-center bg-inherit rounded shadow-sm overflow-hidden cursor-pointer hover:bg-white/5 transition-colors">
          <img
            src={`${API}/medias/${equipment.medias[0].id}`}
            alt={equipment.name}
            className="h-20 w-20 m-4 flex-none object-cover rounded-2xl"
          />

          <div className="flex grow items-center justify-between px-4 py-2">
            <h2 className="text-lg sm:text-xl lg:text-xl font-bold text-inherit">
              {equipment.name}
            </h2>

            <ChevronRight />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EquipmentListItem;
