import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { cn } from "@/app/lib/utils";
import { buttonVariants } from "@/app/components/button-sidebar";
import { addDays, startOfWeek, endOfWeek } from "date-fns";

const today = new Date();
const startOfWeekDate = startOfWeek(today);

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      modifiers={{
        highlighted: [startOfWeekDate],
      }}
      showOutsideDays={showOutsideDays}
      className={cn(
        "p-0 border-default-200 rounded-3xl dark:border-default-300 md:p-3",
        className
      )}
      classNames={{
        months:
          "w-full border-default-200 px-5 space-y-2 sm:gap-x-2 sm:space-y-0",
        month: "w-full -mx-3 p-2  mt-2 h-[100px] overflow-hidden",
        caption: "flex justify-center  py-1 relative items-center",
        caption_label: "text-base border-b  border-gray-400 font-medium",
        table: "w-full border-collapse",
        head_row: "flex",
        nav: "hidden",
        head_cell:
          "flex-1 text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full gap-1 mt-2 ",
        cell: "flex-1 text-center text-sm p-0 relative [&:has([aria-selected])]:bg-default [&:has([aria-selected])]:rounded-md focus-within:relative focus-within:z-20",
        day: "w-64 h-9 rounded  p-0 font-normal aria-selected:opacity-100 bg-transparent text-current hover:text-default",
        day_selected:
          "bg-default text-default-foreground hover:bg-default hover:text-default-foreground focus:bg-default focus:text-default-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside: "text-muted-foreground opacity-50",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
