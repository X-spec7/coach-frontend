export type ChallengeStatus = "active" | "completed" | "upcoming";

export interface Challenge {
  id: string;
  title: string;
  description: string;
  status: ChallengeStatus;
  type: string;
  goal: {
    type: string;
    amount: number;
    unit: string;
    frequency: string;
  };
  participants: number;
  endDate: string;
  image: string;
  organization: string;
  createdAt: string;
  updatedAt: string;
}

export interface ChallengeFilter {
  status?: ChallengeStatus;
  type?: string;
  search?: string;
}

export interface PaginationOptions {
  page: number;
  limit: number;
  total: number;
}

export interface ChallengeResponse {
  challenges: Challenge[];
  pagination: PaginationOptions;
}

export interface LeaderboardEntry {
  position: number;
  name: string;
  avatar: string;
  progress: number;
  amount: number;
  unit: string;
}

export interface RelatedChallengeProps {
    id: string
    title: string
    type: string
    frequency: string
    participants: number
    endDate: string
    image: string
  }