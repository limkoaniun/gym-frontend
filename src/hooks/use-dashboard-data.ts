import { useState, useEffect, useCallback } from 'react';
import {
  DashboardResponse,
  UserStatsDto,
  EquipmentPopularityDto,
  SystemHealthDto,
  DashboardLayoutResponse,
  DashboardLayout,
} from '@/lib/interfaces';
import {
  getDashboardData,
  getUserAnalytics,
  getEquipmentPopularity,
  getSystemHealth,
  getCurrentUserDashboardLayout,
  saveCurrentUserDashboardLayout,
  resetCurrentUserDashboardLayout,
} from '@/lib/api/admin-dashboard';

export interface UseDashboardDataReturn {
  dashboardData: DashboardResponse | null;
  userStats: UserStatsDto | null;
  equipmentPopularity: EquipmentPopularityDto[] | null;
  systemHealth: SystemHealthDto | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useDashboardData = (autoRefreshInterval?: number): UseDashboardDataReturn => {
  const [dashboardData, setDashboardData] = useState<DashboardResponse | null>(null);
  const [userStats, setUserStats] = useState<UserStatsDto | null>(null);
  const [equipmentPopularity, setEquipmentPopularity] = useState<EquipmentPopularityDto[] | null>(
    null
  );
  const [systemHealth, setSystemHealth] = useState<SystemHealthDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAllData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const [dashboardRes, userStatsRes, equipmentRes, healthRes] = await Promise.all([
        getDashboardData(),
        getUserAnalytics(),
        getEquipmentPopularity(),
        getSystemHealth(),
      ]);

      setDashboardData(dashboardRes);
      setUserStats(userStatsRes);
      setEquipmentPopularity(equipmentRes);
      setSystemHealth(healthRes);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load dashboard data');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  useEffect(() => {
    if (autoRefreshInterval && autoRefreshInterval > 0) {
      const interval = setInterval(fetchAllData, autoRefreshInterval);
      return () => clearInterval(interval);
    }
  }, [autoRefreshInterval, fetchAllData]);

  return {
    dashboardData,
    userStats,
    equipmentPopularity,
    systemHealth,
    isLoading,
    error,
    refetch: fetchAllData,
  };
};

export interface UseDashboardLayoutReturn {
  layout: DashboardLayout | null;
  isLoading: boolean;
  error: string | null;
  saveLayout: (layout: DashboardLayout) => Promise<boolean>;
  resetLayout: () => Promise<boolean>;
  refetchLayout: () => Promise<void>;
}

export const useDashboardLayout = (): UseDashboardLayoutReturn => {
  const [layout, setLayout] = useState<DashboardLayout | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLayout = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await getCurrentUserDashboardLayout();
      setLayout(response?.layoutConfig || null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load dashboard layout');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveLayout = useCallback(async (newLayout: DashboardLayout): Promise<boolean> => {
    try {
      const response = await saveCurrentUserDashboardLayout(newLayout);
      if (response) {
        setLayout(response.layoutConfig);
        return true;
      }
      return false;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save dashboard layout');
      return false;
    }
  }, []);

  const resetLayout = useCallback(async (): Promise<boolean> => {
    try {
      const success = await resetCurrentUserDashboardLayout();
      if (success) {
        setLayout(null);
        return true;
      }
      return false;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reset dashboard layout');
      return false;
    }
  }, []);

  useEffect(() => {
    fetchLayout();
  }, [fetchLayout]);

  return {
    layout,
    isLoading,
    error,
    saveLayout,
    resetLayout,
    refetchLayout: fetchLayout,
  };
};
