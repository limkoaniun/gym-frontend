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

export interface Muscle {
  id: number;
  name: string;
}

export interface Step {
  id: number;
  name: string;
  description?: string;
}

export interface Usage {
  id: number;
  name: string;
  description: string;
  muscles: Muscle[];
  steps: Step[];
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
