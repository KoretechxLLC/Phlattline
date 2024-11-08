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
import Spinner from "@/app/components/Spinner"; // Assuming your Spinner component path

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
  const [loading, setLoading] = useState<boolean>(false); // Initialize loading state

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
        className={`flex flex-col justify-between cursor-pointer 4xl:gap-y-6   gap-y-7 w-full h-full 4xl:px-2 4xl:py-4 px-2 py-7 lg:mx-6 4xl:mx-0 5xl:mx-2 rounded-lg text-white border-l-4 ${borderColor}`}
        style={{ backgroundColor }}
      >
        <div className="flex-grow">
          {/* Placeholder for additional content if needed */}
        </div>

        <div className="flex flex-col w-full">
          <span
            className={`font-bold ${textColor} break-words whitespace-normal 4xl:text-xs text-sm `}
          >
            {calendar === "new blog" ? "New Blog" : "New Video"}
          </span>

          <div className="hidden md:flex  items-center ">
            {instructorimage ? (
              <div className="4xl:w-7 4xl:h-7 w-10 h-10 ring-1 ring-[#fff] md:mt-0 mt-3 flex items-center justify-center rounded-full overflow-hidden">
                <Image
                  src={instructorimage}
                  alt={`${instructorname}'s profile`}
                  height={1000}
                  width={1000}
                  className="w-7 h-7 rounded-full"
                />
              </div>
            ) : (
              <div className="w-10 h-10 ring-1 ring-white md:mt-0 mt-3 flex items-center justify-center bg-gradient-to-b from-[#BAA716] to-[#B50D34]  rounded-full">
                <span className="text-white text-sm md:text-sm font-bold py-3">
                  {instructorname?.charAt(0).toUpperCase()}
                </span>
              </div>
            )}

            <span className="font-normal 4xl:text-sm text-lg 4xl:mx-1 mx-4">
              {instructorname}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {loading ? (
        <div className="text-center text-gray-300">
          <Spinner height="20vh" />
        </div>
      ) : (
        <div className="flex flex-col w-full h-full overflow-hidden">
          <Card className="flex-grow py-2 border rounded-3xl border-gray-500 4xl:my-0 lg:my-20 5xl:my-0  w-full">
            <div className=" p-2 dashcode-app-calendar w-full h-full ">
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
                  "fc-daygrid-event",
                  "!bg-transparent",
                  "!border-none",
                  "!shadow-none",
                ]}
                eventContent={renderEventContent}
                dateClick={handleDateClick}
                eventClick={handleEventClick}
                initialView="dayGridMonth"
                dayHeaderClassNames="bg-gradient-to-b w-full cursor-pointer from-[#2D2C2C80] to-[#000] text-white 4xl:text-2xl text-3xl font-bold 4xl:py-4 py-8"
                dayCellClassNames={({ date }) => {
                  const today = new Date();
                  const isToday =
                    date.getDate() === today.getDate() &&
                    date.getMonth() === today.getMonth() &&
                    date.getFullYear() === today.getFullYear();
                  return isToday
                    ? "!bg-transparent !border-none text-white"
                    : "";
                }}
              />
            </div>
          </Card>
        </div>
      )}
      <EventModal
        open={sheetOpen}
        onClose={handleCloseModal}
        event={selectedEvent}
      />
    </>
  );
};

export default DailyDose;
