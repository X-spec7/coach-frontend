import { useState, useEffect, useCallback } from "react";
import { MealPlan, MealPlanFormData, MealTimeData, UserData } from "../types";
import mealPlanService from "../services/mealPlanService";

export const useMealPlan = () => {
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);

  const fetchMealPlans = useCallback(async () => {
    try {
      setLoading(true);
      const userId = userData?.id; // Ensure userData is fetched before calling this
      if (!userId) throw new Error("User ID is required to fetch meal plans");
      const data = await mealPlanService.getUserMealPlans(String(userId));
      setMealPlans(data);
    } catch (err) {
      setError("Failed to fetch meal plans");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [userData]);

  useEffect(() => {
    fetchMealPlans();
    fetchUserData();
  }, [fetchMealPlans]);

  const fetchUserData = async () => {
    try {
      const data = await mealPlanService.getUserData();
      setUserData(data);
    } catch (err) {
      console.error("Failed to fetch user data:", err);
    }
  };

  const createMealPlan = async (data: MealPlanFormData) => {
    try {
      const newMealPlan = await mealPlanService.create(data);
      setMealPlans((prev) => [...prev, newMealPlan]);
      return newMealPlan;
    } catch (err) {
      setError("Failed to create meal plan");
      console.error(err);
      throw err;
    }
  };

  const updateMealPlan = async (id: string, data: Partial<MealPlan>) => {
    try {
      const transformedData = {
        ...data,
        image: typeof data.image === "string" ? undefined : data.image,
      };
      const updatedMealPlan = await mealPlanService.update(id, transformedData);
      setMealPlans((prev) =>
        prev.map((plan) => (plan.id === id ? updatedMealPlan : plan)),
      );
      return updatedMealPlan;
    } catch (err) {
      setError("Failed to update meal plan");
      console.error(err);
      throw err;
    }
  };

  const deleteMealPlan = async (id: string) => {
    try {
      await mealPlanService.delete(id);
      setMealPlans((prev) => prev.filter((plan) => plan.id !== id));
    } catch (err) {
      setError("Failed to delete meal plan");
      console.error(err);
      throw err;
    }
  };

  const addMealTime = async (planId: string, data: MealTimeData) => {
    try {
      const newMealTime = await mealPlanService.addMealTime(planId, data);
      setMealPlans((prev) =>
        prev.map((plan) =>
          plan.id === planId
            ? { ...plan, mealTimes: [...plan.mealTimes, newMealTime] }
            : plan,
        ),
      );
      return newMealTime;
    } catch (err) {
      setError("Failed to add meal time");
      console.error(err);
      throw err;
    }
  };

  const updateUserData = async (data: Partial<UserData>) => {
    try {
      const updatedData = await mealPlanService.updateUserData(data);
      setUserData(updatedData);
      return updatedData;
    } catch (err) {
      console.error("Failed to update user data:", err);
      throw err;
    }
  };

  const calculateCalories = async (data: Partial<UserData>) => {
    try {
      return await mealPlanService.calculateCalories(data);
    } catch (err) {
      console.error("Failed to calculate calories:", err);
      throw err;
    }
  };

  return {
    mealPlans,
    loading,
    error,
    userData,
    createMealPlan,
    updateMealPlan,
    deleteMealPlan,
    addMealTime,
    updateUserData,
    calculateCalories,
  };
};
