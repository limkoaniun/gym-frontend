'use client';

import { createContext, useEffect, useState } from 'react';
import api from '@/lib/axios';
import type { Equipment } from '@/lib/interfaces';

interface EquipmentContextType {
  equipments: Equipment[];
  loading: boolean;
  error: string | null;
}

export const EquipmentContext = createContext<EquipmentContextType | undefined>(undefined);

export function EquipmentProvider({ children }: { children: React.ReactNode }) {
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEquipments = async () => {
      try {
        const res = await api.get('/equipments');
        const data = res.data;
        console.log(data);
        setEquipments(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failde to fetch equipments');
      } finally {
        setLoading(false);
      }
    };

    fetchEquipments();
  }, []);

  return (
    <EquipmentContext.Provider value={{ equipments, loading, error }}>
      {children}
    </EquipmentContext.Provider>
  );
}
