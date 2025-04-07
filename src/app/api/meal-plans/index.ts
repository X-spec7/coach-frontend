import axios from "axios";
import { MealPlan, MealPlanFormData } from "@/features/meal-plan/types";
import { REST_API_BASE_URL } from "@/shared/constants";

// Create an Axios instance for server-side API calls
const apiClient = axios.create({
  baseURL: REST_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const mealPlanApi = {
  // Get all meal plans
  getAll: async (): Promise<MealPlan[]> => {
    const response = await apiClient.get("/meal-plans");
    return response.data;
  },

  // Get a single meal plan by ID
  getById: async (id: string): Promise<MealPlan> => {
    const response = await apiClient.get(`/meal-plans/${id}/`);
    return response.data;
  },

  // Create a new meal plan
  create: async (data: MealPlanFormData): Promise<MealPlan> => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === "image" && value instanceof File) {
        formData.append("image", value);
      } else if (key === "mealTimes") {
        formData.append(key, JSON.stringify(value));
      } else if (value !== undefined) {
        formData.append(key, value.toString());
      }
    });

    const response = await apiClient.post(`/meal-plans/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  // Update an existing meal plan
  update: async (
    id: string,
    data: Partial<MealPlanFormData>,
  ): Promise<MealPlan> => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === "image" && value instanceof File) {
        formData.append("image", value);
      } else if (key === "mealTimes") {
        formData.append(key, JSON.stringify(value));
      } else if (value !== undefined) {
        formData.append(key, value.toString());
      }
    });

    const response = await apiClient.put(`/meal-plans/${id}/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  // Delete a meal plan
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/meal-plans/${id}/`);
  },

  // Get user's meal plans
  getUserMealPlans: async (userId: string): Promise<MealPlan[]> => {
    const response = await apiClient.get(`/meal-plans/user/${userId}/`);
    return response.data;
  },

  // Get public meal plans
  getPublicMealPlans: async (): Promise<MealPlan[]> => {
    const response = await apiClient.get(`/meal-plans/public/`);
    return response.data;
  },
};
