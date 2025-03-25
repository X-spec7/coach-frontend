import type {
  Challenge,
  ChallengeFilter,
  ChallengeResponse,
  PaginationOptions,
} from "../types";
import { challengesDummyData } from "../dummy-data/challenges";

export const ChallengeService = {
  getChallenges: async (
    filters: ChallengeFilter = {},
    pagination: Partial<PaginationOptions> = { page: 1, limit: 12 },
  ): Promise<ChallengeResponse> => {
    // In a real app, this would be an API call
    // For now, we'll filter the dummy data

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    let filteredChallenges = [...challengesDummyData];

    // Apply filters
    if (filters.status) {
      filteredChallenges = filteredChallenges.filter(
        (challenge) => challenge.status === filters.status,
      );
    }

    if (filters.type) {
      filteredChallenges = filteredChallenges.filter(
        (challenge) => challenge.type === filters.type,
      );
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredChallenges = filteredChallenges.filter(
        (challenge) =>
          challenge.title.toLowerCase().includes(searchLower) ||
          challenge.description.toLowerCase().includes(searchLower),
      );
    }

    // Calculate pagination
    const total = filteredChallenges.length;
    const page = pagination.page || 1;
    const limit = pagination.limit || 12;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedChallenges = filteredChallenges.slice(startIndex, endIndex);

    return {
      challenges: paginatedChallenges,
      pagination: {
        page,
        limit,
        total,
      },
    };
  },

  getChallengeById: async (id: string): Promise<Challenge | null> => {
    // In a real app, this would be an API call
    // For now, we'll find the challenge in the dummy data

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    const challenge = challengesDummyData.find(
      (challenge) => challenge.id === id,
    );
    return challenge || null;
  },
};
