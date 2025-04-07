import axios from "axios";
import {
  Meal,
  MealPlan,
  MealTimeData,
  UserData,
  MealReview,
  FoodItem,
  MealPlanFormData,
} from "../types";
import { mealPlanApi } from "@/app/api/meal-plans";
import { REST_API_BASE_URL } from "@/shared/constants";

// Create an Axios instance for server-side API calls
const apiClient = axios.create({
  baseURL: REST_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const mealPlanService = {
  // Meal Plans
  getAll: async (): Promise<MealPlan[]> => {
    return mealPlanApi.getAll();
  },

  getById: async (id: string): Promise<MealPlan> => {
    return mealPlanApi.getById(id);
  },

  create: async (data: MealPlanFormData): Promise<MealPlan> => {
    return mealPlanApi.create(data);
  },

  update: async (
    id: string,
    data: Partial<MealPlanFormData>,
  ): Promise<MealPlan> => {
    return mealPlanApi.update(id, data);
  },

  delete: async (id: string): Promise<void> => {
    return mealPlanApi.delete(id);
  },

  getUserMealPlans: async (userId: string): Promise<MealPlan[]> => {
    return mealPlanApi.getUserMealPlans(userId);
  },

  getPublicMealPlans: async (): Promise<MealPlan[]> => {
    return mealPlanApi.getPublicMealPlans();
  },

  // Meals
  async getMeals(): Promise<Meal[]> {
    const response = await apiClient.get(`/meals`);
    return response.data;
  },

  async getMeal(id: number): Promise<Meal> {
    const response = await apiClient.get(`/meals/${id}/`);
    return response.data;
  },

  // Meal Times
  async addMealTime(planId: string, data: MealTimeData): Promise<MealTimeData> {
    const response = await apiClient.post(
      `/meal-plans/${planId}/add_meal_time/`,
      data,
    );
    return response.data;
  },

  async getMealTimes(planId: string): Promise<MealTimeData[]> {
    const response = await apiClient.get(`/meal-plans/${planId}/meal_times/`);
    return response.data;
  },

  // Reviews
  async addReview(mealId: number, data: MealReview): Promise<MealReview> {
    const response = await apiClient.post(`/meals/${mealId}/add_review/`, data);
    return response.data;
  },

  // Food Items
  async getFoodItems(): Promise<FoodItem[]> {
    const response = await apiClient.get(`/food-items/`);
    return response.data;
  },

  // // User Data
  async getUserData(): Promise<UserData> {
    const response = await apiClient.get(`/user-data/my_data/`);
    return response.data;
  },

  async updateUserData(data: Partial<UserData>): Promise<UserData> {
    const response = await apiClient.patch(`/user-data/`, data);
    return response.data;
  },

  async calculateCalories(data: Partial<UserData>): Promise<{
    bmr: number;
    calorieNeed: number;
    calorieDeficit: number;
  }> {
    const response = await apiClient.post(
      `/user-data/calculate_calories/`,
      data,
    );
    return response.data;
  },
};

export default mealPlanService;
