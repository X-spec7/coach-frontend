import type {
  Client,
  ClientFilter,
  ClientsResponse,
  PaginationOptions,
} from "../types/client.dto";
import { clientsDummyData } from "../dummy-data";

export const ClientService = {
  getClients: async (
    filters: ClientFilter = {},
    pagination: Partial<PaginationOptions> = { page: 1, limit: 10 },
  ): Promise<ClientsResponse> => {
    // In a real app, this would be an API call
    // For now, we'll filter the dummy data

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    let filteredClients = [...clientsDummyData];

    // Apply filters
    if (filters.status) {
      filteredClients = filteredClients.filter(
        (client) => client.status === filters.status,
      );
    }

    if (filters.coach) {
      filteredClients = filteredClients.filter(
        (client) => client.coach === filters.coach,
      );
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredClients = filteredClients.filter(
        (client) =>
          client.name.toLowerCase().includes(searchLower) ||
          client.email.toLowerCase().includes(searchLower),
      );
    }

    // Calculate pagination
    const total = filteredClients.length;
    const page = pagination.page || 1;
    const limit = pagination.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedClients = filteredClients.slice(startIndex, endIndex);

    return {
      clients: paginatedClients,
      pagination: {
        page,
        limit,
        total,
      },
    };
  },

  getClientById: async (id: string): Promise<Client | null> => {
    // In a real app, this would be an API call
    // For now, we'll find the client in the dummy data

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    const client = clientsDummyData.find((client) => client.id === id);
    return client || null;
  },

  addClient: async (client: Omit<Client, "id">): Promise<Client> => {
    // In a real app, this would be an API call
    // For now, we'll just return a mock response

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const newClient: Client = {
      id: Math.random().toString(36).substring(2, 9),
      ...client,
    };

    return newClient;
  },

  updateClient: async (
    id: string,
    updates: Partial<Client>,
  ): Promise<Client> => {
    // In a real app, this would be an API call
    // For now, we'll just return a mock response

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const client = clientsDummyData.find((client) => client.id === id);

    if (!client) {
      throw new Error("Client not found");
    }

    const updatedClient: Client = {
      ...client,
      ...updates,
    };

    return updatedClient;
  },

  deleteClient: async (id: string): Promise<boolean> => {
    // In a real app, this would be an API call
    // For now, we'll just return a mock response

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    return true;
  },
};
