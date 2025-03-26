export type ClientStatus = "active" | "inactive" | "pending";

export interface Client {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  coach: string;
  memberSince: string;
  activatedOn: string;
  lastCheckIn?: string;
  lastOnline: string;
  status: ClientStatus;
  phone?: string;
  address?: string;
  goals?: string[];
  notes?: string;
  metrics?: {
    height?: number;
    weight?: number;
    bodyFat?: number;
    bmi?: number;
  };
  programs?: {
    id: string;
    name: string;
    startDate: string;
    endDate: string;
    progress: number;
  }[];
}

export interface ClientFilter {
  status?: ClientStatus;
  coach?: string;
  search?: string;
}

export interface PaginationOptions {
  page: number;
  limit: number;
  total: number;
}

export interface ClientsResponse {
  clients: Client[];
  pagination: PaginationOptions;
}
