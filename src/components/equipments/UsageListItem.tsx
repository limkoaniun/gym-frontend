import { ChevronRight } from 'lucide-react';
import { Usage } from '@/lib/interfaces';

const API = process.env.NEXT_PUBLIC_API_BASE_URL;

type Props = {
  usage: Usage;
  onClick: () => void;
};

const UsageListItem = ({usage, onClick} : Props) => {
  return (
    <div onClick={onClick}>
      <div key={usage.id} className="w-full max-w-md sm:max-w-xl lg:max-w-3xl mx-auto my-2">
        <div
          className="flex w-full items-center bg-inherit rounded shadow-sm overflow-hidden cursor-pointer hover:bg-white/5 transition-colors">
          <img
            src={`${API}/medias/${usage.medias[0]?.id}`}
            alt={usage.name}
            className="h-20 w-20 m-4 flex-none object-cover rounded-2xl"
          />

          <div className="flex grow items-center justify-between px-4 py-2">
            <div>
              <h2 className="text-lg sm:text-xl lg:text-xl font-bold text-inherit">{usage.name}</h2>
              <div className="mt-2">
                {usage.muscles.map(muscle => <span key={`u${usage.id}muscle${muscle.id}`} className="inline-flex items-center rounded-md bg-pink-400/10 px-2 py-1 text-xs font-medium text-pink-400 inset-ring inset-ring-pink-400/20">{muscle.name}</span>)}
              </div>
            </div>
            <ChevronRight />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UsageListItem;