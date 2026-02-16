import api from '../axios';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

import {
  DashboardResponse,
  UserStatsDto,
  EquipmentPopularityDto,
  SystemHealthDto,
  DashboardLayoutResponse,
  DashboardLayoutRequest,
  DashboardLayout,
} from '@/lib/interfaces';

export const getDashboardData = async (): Promise<DashboardResponse | null> => {
  try {
    const res = await api.get('/admin/dashboard');
    return res.data;
  } catch (error: unknown) {
    console.error('Error fetching dashboard data:', error);
    if (error instanceof AxiosError) {
      toast.error(error.response?.data?.message || 'Failed to load dashboard data', {
        position: 'top-center',
        toastId: 'dashboard-error',
      });
    }
    return null;
  }
};

export const getUserAnalytics = async (): Promise<UserStatsDto | null> => {
  try {
    const res = await api.get('/admin/users/analytics');
    return res.data;
  } catch (error: unknown) {
    console.error('Error fetching user analytics:', error);
    if (error instanceof AxiosError) {
      toast.error(error.response?.data?.message || 'Failed to load user analytics', {
        position: 'top-center',
        toastId: 'user-analytics-error',
      });
    }
    return null;
  }
};

export const getEquipmentPopularity = async (): Promise<EquipmentPopularityDto[] | null> => {
  try {
    const res = await api.get('/admin/equipment/popularity');
    return res.data;
  } catch (error: unknown) {
    console.error('Error fetching equipment popularity:', error);
    if (error instanceof AxiosError) {
      toast.error(error.response?.data?.message || 'Failed to load equipment data', {
        position: 'top-center',
        toastId: 'equipment-error',
      });
    }
    return null;
  }
};

export const getSystemHealth = async (): Promise<SystemHealthDto | null> => {
  try {
    const res = await api.get('/admin/system/health');
    return res.data;
  } catch (error: unknown) {
    console.error('Error fetching system health:', error);
    if (error instanceof AxiosError) {
      toast.error(error.response?.data?.message || 'Failed to load system health', {
        position: 'top-center',
        toastId: 'system-health-error',
      });
    }
    return null;
  }
};

export const getUserDashboardLayout = async (
  userId: number
): Promise<DashboardLayoutResponse | null> => {
  try {
    const res = await api.get(`/admin/users/${userId}/dashboard/layout`);
    return res.data;
  } catch (error: unknown) {
    console.error('Error fetching user dashboard layout:', error);
    if (error instanceof AxiosError) {
      toast.error(error.response?.data?.message || 'Failed to load dashboard layout', {
        position: 'top-center',
        toastId: 'layout-error',
      });
    }
    return null;
  }
};

export const saveUserDashboardLayout = async (
  userId: number,
  layoutConfig: DashboardLayout
): Promise<DashboardLayoutResponse | null> => {
  try {
    const payload: DashboardLayoutRequest = { layoutConfig };
    const res = await api.put(`/admin/users/${userId}/dashboard/layout`, payload);
    toast.success('Dashboard layout saved successfully', {
      position: 'top-center',
      toastId: 'layout-saved',
    });
    return res.data;
  } catch (error: unknown) {
    console.error('Error saving dashboard layout:', error);
    if (error instanceof AxiosError) {
      toast.error(error.response?.data?.message || 'Failed to save dashboard layout', {
        position: 'top-center',
        toastId: 'layout-save-error',
      });
    }
    return null;
  }
};

export const resetUserDashboardLayout = async (userId: number): Promise<boolean> => {
  try {
    await api.delete(`/admin/users/${userId}/dashboard/layout`);
    toast.success('Dashboard layout reset successfully', {
      position: 'top-center',
      toastId: 'layout-reset',
    });
    return true;
  } catch (error: unknown) {
    console.error('Error resetting dashboard layout:', error);
    if (error instanceof AxiosError) {
      toast.error(error.response?.data?.message || 'Failed to reset dashboard layout', {
        position: 'top-center',
        toastId: 'layout-reset-error',
      });
    }
    return false;
  }
};

export const getCurrentUserDashboardLayout = async (): Promise<DashboardLayoutResponse | null> => {
  try {
    const res = await api.get('/admin/dashboard/layout');
    return res.data;
  } catch (error: unknown) {
    console.error('Error fetching current user dashboard layout:', error);
    if (error instanceof AxiosError) {
      toast.error(error.response?.data?.message || 'Failed to load dashboard layout', {
        position: 'top-center',
        toastId: 'current-layout-error',
      });
    }
    return null;
  }
};

export const saveCurrentUserDashboardLayout = async (
  layoutConfig: DashboardLayout
): Promise<DashboardLayoutResponse | null> => {
  try {
    const payload: DashboardLayoutRequest = { layoutConfig };
    const res = await api.put('/admin/dashboard/layout', payload);
    toast.success('Dashboard layout saved successfully', {
      position: 'top-center',
      toastId: 'current-layout-saved',
    });
    return res.data;
  } catch (error: unknown) {
    console.error('Error saving current user dashboard layout:', error);
    if (error instanceof AxiosError) {
      toast.error(error.response?.data?.message || 'Failed to save dashboard layout', {
        position: 'top-center',
        toastId: 'current-layout-save-error',
      });
    }
    return null;
  }
};

export const resetCurrentUserDashboardLayout = async (): Promise<boolean> => {
  try {
    await api.delete('/admin/dashboard/layout');
    toast.success('Dashboard layout reset successfully', {
      position: 'top-center',
      toastId: 'current-layout-reset',
    });
    return true;
  } catch (error: unknown) {
    console.error('Error resetting current user dashboard layout:', error);
    if (error instanceof AxiosError) {
      toast.error(error.response?.data?.message || 'Failed to reset dashboard layout', {
        position: 'top-center',
        toastId: 'current-layout-reset-error',
      });
    }
    return false;
  }
};
