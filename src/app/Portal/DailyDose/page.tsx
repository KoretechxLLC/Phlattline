"use client";
import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { Card } from "@/app/components/Card";
import Image from "next/image";
import EventModal from "@/app/components/event-modal";
import { useSearchParams } from "next/navigation";

// Interface for events, including author info directly
interface CalendarEvent {
  id: string;
  tabmessage: string;
  start: string;
  allDay?: boolean;
  calendar: string;
  authorName: string;
  authorImage: string;
}

const coursesData = [
  {
    id: 1,
    tabmessage: "New Blog Post",
    start: "2024-10-20",
    allDay: true,
    calendar: "new blog",
    thumbnail: "/assets/framepic2.png",
    title: "AI and Virtual",
    type: "Basic",
    subscribers: 1014,
    rating: 3.4,
    instructorname: "Jack Edwards",
    instructorimage: "/assets/UserProfile.png",
    Lessons: 14,
    Hours: 12,
    Price: 40,
  },
  {
    id: 2,
    tabmessage: "New Video Release",
    start: "2024-10-25",
    allDay: true,
    calendar: "new video",
    thumbnail: "/assets/framepic2.png",
    title: "Data Science Fundamentals",
    type: "Premium",
    subscribers: 850,
    rating: 4.2,
    instructorname: "Sarah Johnson",
    instructorimage: "/assets/userProfile.png",
    Lessons: 20,
    Hours: 25,
    Price: 60,
  },
  {
    id: 3,
    tabmessage: "New Video Release",
    start: "2024-10-26",
    allDay: true,
    calendar: "new video",
    thumbnail: "/assets/framepic2.png",
    title: "Data Science Fundamentals",
    type: "Premium",
    subscribers: 850,
    rating: 4.2,
    instructorname: "Sarah Johnson",
    instructorimage: "/assets/userProfile.png",
    Lessons: 20,
    Hours: 25,
    Price: 60,
  },
  {
    id: 4,
    tabmessage: "New Blog Post",
    start: "2024-10-21",
    allDay: true,
    calendar: "new blog",
    thumbnail: "/assets/framepic2.png",
    title: "AI and Virtual",
    type: "Basic",
    subscribers: 1014,
    rating: 3.4,
    instructorname: "Jack Edwards",
    instructorimage: "/assets/UserProfile.png",
    Lessons: 14,
    Hours: 12,
    Price: 40,
  },
  // ... other courses
];

const DailyDose = () => {
  const [selectedEventDate, setSelectedEventDate] = useState<Date | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
  const [sheetOpen, setSheetOpen] = useState<boolean>(false);
  const [data, setData] = useState<any>();

  const handleEventClick = (arg: any) => {
    setSelectedEventDate(null);
    const eventFound =
      coursesData.find((event) => event.id === Number(arg.event.id)) || null;
    setSelectedEvent(eventFound);
    setSheetOpen(true);
  };

  const handleDateClick = (arg: any) => {
    setSelectedEventDate(arg.date);
    setSelectedEvent(null);
  };

  const handleCloseModal = () => {
    setSheetOpen(false);
  };

  const searchParams = useSearchParams();
  const courseId = searchParams.get("courseId");

  useEffect(() => {
    if (courseId) {
      const filteredEventData = coursesData.find((e: any) => {
        return Number(e.id) === Number(courseId);
      });
      setData(filteredEventData);
    }
  }, [courseId]);
  const renderEventContent = ({ event }: any) => {
    const { calendar, instructorname, instructorimage } = event.extendedProps;
    const borderColor =
      calendar === "new blog" ? "border-yellow-500" : "border-red-600";
    const backgroundColor = calendar === "new blog" ? "#282410" : "#240008"; // Use darker background color
    const textColor =
      calendar === "new blog" ? "text-yellow-500" : "text-red-600"; // Conditional text color

    return (
      <div
        className={`flex flex-col justify-between cursor-pointer gap-y-7 w-full h-full px-2 py-7 lg:mx-6 5xl:mx-2 rounded-lg text-white border-l-4 ${borderColor}`}
        style={{ backgroundColor }}
      >
        {/* Content positioned at the top */}
        <div className="flex-grow">
          {/* Placeholder for additional content if needed */}
        </div>

        {/* Event title and instructor details positioned at the bottom */}
        <div className="flex flex-col w-full">
          {/* Event title */}
          <span
            className={`font-bold ${textColor} break-words whitespace-normal text-sm `}
          >
            {calendar === "new blog" ? "New Blog" : "New Video"}
          </span>

          {/* Instructor image and name */}
          <div className="hidden md:flex  items-center ">
            <Image
              src={instructorimage}
              alt={`${instructorname}'s profile`}
              height={1000}
              width={1000}
              className="w-7 h-7 rounded-full"
            />
            <span className="font-normal text-lg mx-4">{instructorname}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="flex flex-col w-full h-full overflow-hidden">
        <Card className="flex-grow py-2 border rounded-3xl border-gray-500 lg:my-20 5xl:my-0  w-full">
          <div className="p-2 dashcode-app-calendar w-full h-full">
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin, listPlugin]}
              headerToolbar={{
                right: "prev,next",
                left: "title",
              }}
              events={coursesData.map((course) => ({
                id: course.id.toString(),
                title: course.tabmessage,
                start: course.start,
                allDay: course.allDay,
                extendedProps: {
                  calendar: course.calendar,
                  instructorname: course.instructorname,
                  instructorimage: course.instructorimage,
                },
              }))}
              height="auto"
              editable={false}
              rerenderDelay={10}
              eventDurationEditable={false}
              selectable={false}
              selectMirror={false}
              droppable={false}
              dayMaxEvents={1}
              weekends={true}
              eventClassNames={() => [
                "fc-daygrid-event", // Ensure the custom full-width/full-height class is applied
                "!bg-transparent",
                "!border-none",
                "!shadow-none",
              ]}
              eventContent={renderEventContent}
              dateClick={handleDateClick}
              eventClick={handleEventClick}
              initialView="dayGridMonth"
              dayHeaderClassNames="bg-gradient-to-b w-full cursor-pointer from-[#2D2C2C80] to-[#000] text-white text-3xl font-bold py-8"
              dayCellClassNames={({ date }) => {
                const today = new Date();
                const isToday =
                  date.getDate() === today.getDate() &&
                  date.getMonth() === today.getMonth() &&
                  date.getFullYear() === today.getFullYear();
                return isToday ? "!bg-transparent !border-none text-white" : "";
              }}
            />
          </div>
        </Card>
      </div>
      <EventModal
        open={sheetOpen}
        onClose={handleCloseModal}
        event={selectedEvent}
      />
    </>
  );
};

export default DailyDose;
