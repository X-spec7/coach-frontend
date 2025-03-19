"use client";

import { useCallback } from "react";
import { format } from "date-fns";
import { ClassData } from "../types/class.dto";

export const useCalendarClasses = (filteredClasses: ClassData[]) => {
  // Get classes for a specific time and day
  const getClassesForTimeAndDay = useCallback(
    (time: string, day: Date) => {
      const dayName = format(day, "EEEE");
      return filteredClasses.filter(
        (c) => c.time === time && c.day === dayName,
      );
    },
    [filteredClasses],
  );

  // Get all classes for a specific day
  const getAllClassesForDay = useCallback(
    (day: Date) => {
      const dayName = format(day, "EEEE");
      return filteredClasses.filter((c) => c.day === dayName);
    },
    [filteredClasses],
  );

  return {
    getClassesForTimeAndDay,
    getAllClassesForDay,
  };
};
