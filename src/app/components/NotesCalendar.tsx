"use client";

import { useEffect, useState } from "react";
import { Calendar } from "@/app/components/Calendar";
import { fetchcourses } from "@/redux/slices/courses.slice";
import { useDispatch, useSelector } from "react-redux";
import { any } from "zod";

const NotesCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [allCourses, setAllCourses] = useState<any>([]);
  const dispatch = useDispatch<any>();

  // const borderColor =
  //   new Date(date) >= new Date() ? "border-yellow-500" : "border-red-600";
  // const backgroundColor = new Date(date) >= new Date() ? "#282410" : "#240008"; // Use darker background color
  // const textColor =
  //   new Date(date) >= new Date() ? "text-yellow-500" : "text-red-600"; // Conditional text color
  const { courses, success, loading } = useSelector(
    (state: any) => state.courses
  );

  useEffect(() => {
    dispatch(fetchcourses({}));
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      setAllCourses(courses);
    }
  }, [success]);

  return <Calendar mode="single" selected={date} onSelect={setDate} />;
};

export default NotesCalendar;
