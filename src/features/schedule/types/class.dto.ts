import type { ReactNode } from "react";

export type ClassCategory = {
  id: string;
  name: string;
  icon: ReactNode;
  bgColor: string;
};

export type ClassData = {
  id: number;
  name: string;
  time: string;
  day: string;
  trainer: string;
  categoryId: string;
  duration?: string;
  level?: string;
  participants?: number;
  image?: string;
  description?: string;
};

export type CalendarView = "day" | "week" | "month";
