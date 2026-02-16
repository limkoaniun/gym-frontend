export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  userId: number;
  username: string;
  email: string;
}

export interface SignupPayload {
  username: string;
  email: string;
  password?: string;
  firstName?: string;
  lastName?: string;
}

export interface SignupErrors {
  email: string | null;
  username: string | null;
}

export interface Muscle {
  id?: number;
  name: string;
}

export interface Step {
  id: number;
  title: string;
  instruction: string;
  setUp: boolean;
  medias: Media[];
}

export interface Usage {
  id: number;
  name: string;
  description: string;
  muscles: Muscle[];
  steps: Step[];
  medias: Media[];
}

export type MediaType = 'IMAGE' | 'VIDEO';

export interface Media {
  id: number;
  name: string;
  type: MediaType;
  originalFileName: string;
  url: string;
}

export interface Equipment {
  id: number;
  name: string;
  description: string;
  tags: string[];
  usages: Usage[];
  medias: Media[];
}

export interface User {
  id?: number;
  username: string;
  password?: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  favouredEquipments: Equipment[];
  fullName?: string;
}

export interface AppContextType {
  currentUser: User;
  setCurrentUser: (user?: User) => void;
  loadingMask: boolean;
  setLoadingMask: (value: boolean) => void;
  logout: () => void;
}

export interface DashboardResponse {
  totalRevenue: number;
  totalMembers: number;
  totalSessions: number;
  recentActivity: ActivityItem[];
}

export interface ActivityItem {
  id: number;
  type: string;
  description: string;
  timestamp: string;
  userId?: number;
  username?: string;
}

export interface UserStatsDto {
  totalUsers: number;
  activeUsers: number;
  newUsersThisMonth: number;
  userGrowthData: UserGrowthPoint[];
}

export interface UserGrowthPoint {
  date: string;
  count: number;
}

export interface EquipmentPopularityDto {
  equipmentId: number;
  equipmentName: string;
  usageCount: number;
  percentage: number;
}

export interface SystemHealthDto {
  status: 'HEALTHY' | 'WARNING' | 'ERROR';
  uptime: number;
  memoryUsage: number;
  cpuUsage: number;
  activeConnections: number;
  lastCheck: string;
}

export interface DashboardLayoutResponse {
  userId: number;
  layoutConfig: DashboardLayout;
}

export interface DashboardLayoutRequest {
  layoutConfig: DashboardLayout;
}

export interface DashboardLayout {
  [breakpoint: string]: LayoutItem[];
}

export interface LayoutItem {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  minW?: number;
  maxW?: number;
  minH?: number;
  maxH?: number;
}

export interface DashboardWidget {
  id: string;
  type: 'kpi' | 'chart' | 'table' | 'health' | 'activity';
  title: string;
  category: string;
  description?: string;
  defaultSize: {
    w: number;
    h: number;
  };
  minSize?: {
    w: number;
    h: number;
  };
}
