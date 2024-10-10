"use client";

import { useState } from "react";
import { Calendar } from "@/app/components/Calendar";

const NotesCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return <Calendar mode="single" selected={date} onSelect={setDate} />;
};

export default NotesCalendar;
