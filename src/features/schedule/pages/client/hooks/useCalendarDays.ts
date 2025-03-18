"use client";

import type React from "react";

import { useCallback } from "react";
import {
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  addDays,
  addWeeks,
  addMonths,
  subWeeks,
  subMonths,
} from "date-fns";
import type { CalendarView } from "../../../types/class.dto";

export const useCalendarDays = (
  currentDate: Date,
  view: CalendarView,
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>,
) => {
  // Navigation functions
  const navigatePrevious = useCallback(() => {
    if (view === "day") {
      setCurrentDate((prev) => addDays(prev, -1));
    } else if (view === "week") {
      setCurrentDate((prev) => subWeeks(prev, 1));
    } else if (view === "month") {
      setCurrentDate((prev) => subMonths(prev, 1));
    }
  }, [view, setCurrentDate]);

  const navigateNext = useCallback(() => {
    if (view === "day") {
      setCurrentDate((prev) => addDays(prev, 1));
    } else if (view === "week") {
      setCurrentDate((prev) => addWeeks(prev, 1));
    } else if (view === "month") {
      setCurrentDate((prev) => addMonths(prev, 1));
    }
  }, [view, setCurrentDate]);

  // Get days based on current view
  const getDays = useCallback(() => {
    if (view === "day") {
      return [currentDate];
    } else if (view === "week") {
      const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 }); // Week starts on Monday
      return Array.from({ length: 7 }).map((_, i) => addDays(weekStart, i));
    } else {
      // For month view, we'll show a simplified version
      const monthStart = startOfMonth(currentDate);
      const monthEnd = endOfMonth(currentDate);
      const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
      const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

      const days = [];
      let day = startDate;
      while (day <= endDate) {
        days.push(day);
        day = addDays(day, 1);
      }
      return days;
    }
  }, [currentDate, view]);

  const days = getDays();

  return {
    days,
    navigatePrevious,
    navigateNext,
  };
};
