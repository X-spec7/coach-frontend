"use client";

import { useCallback } from "react";
import { format } from "date-fns";
import type { ClassData } from "../../../types/class.dto";

export const useCalendarClasses = (filteredClasses: ClassData[]) => {
  const getClassesForTimeAndDay = useCallback(
    (time: string, day: Date) => {
      const dayName = format(day, "EEEE");
      return filteredClasses.filter(
        (c) =>
          c.time === time &&
          c.day === dayName &&
          c.time.split(":")[0] === time.split(":")[0],
      );
    },
    [filteredClasses],
  );

  return {
    getClassesForTimeAndDay,
  };
};
