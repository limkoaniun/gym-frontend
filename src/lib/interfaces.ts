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
  id: number;
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
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  favouredEquipments: Equipment[];
}

export interface AppContextType {
  currentUser: User;
  setCurrentUser: (user?: User) => void;
  loadingMask: boolean;
  setLoadingMask: (value: boolean) => void;
  logout: () => void;
}
