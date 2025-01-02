"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/app/components/button-sidebar";
import Image from "next/image";
import Icon from "@/app/components/utility-icon";
import Spinner from "@/app/components/Spinner";
import { enrollUserInWorkshop, clearMessages } from "@/redux/slices/workshops.slice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import StackedNotifications, { NotificationType } from "./Stackednotification";
import { Card } from "@/app/components/Card";

const WorkshopModal = ({
  open,
  onClose,
  workshop,
}: {
  open: boolean;
  onClose: () => void;
  workshop: any;
}) => {
  const dispatch = useDispatch<any>();
  const { userData } = useSelector((state: RootState) => state.auth);
  const [notification, setNotification] = useState<NotificationType | null>(null);
  const [enrollClicked, setEnrollClicked] = useState(false);
  const { enrollmentLoading, enrollmentSuccess, enrollmentError } = useSelector(
    (state: RootState) => state.workshop
  );

  useEffect(() => {
    if (enrollClicked) {
      if (enrollmentSuccess) {
        setNotification({
          id: Date.now(),
          text: "Workshop enrolled successfully!",
          type: "success",
        });
        dispatch(clearMessages());
        setEnrollClicked(false);
      }
      if (enrollmentError) {
        setNotification({
          id: Date.now(),
          text: enrollmentError,
          type: "error",
        });
        dispatch(clearMessages());
        setEnrollClicked(false);
      }
    }
  }, [enrollmentSuccess, enrollmentError, enrollClicked, dispatch]);

  if (!open || !workshop) return null;

  const calculateDuration = (start_time: string, end_time: string): string => {
    if (!start_time || !end_time) {
      console.error("Missing start_time or end_time:", { start_time, end_time });
      return "Invalid Time";
    }

    try {
      const convertTo24Hour = (time: string) => {
        const [hourMinute, modifier] = time.split(" ");
        let [hours, minutes] = hourMinute.split(":").map(Number);

        if (modifier === "PM" && hours !== 12) {
          hours += 12;
        } else if (modifier === "AM" && hours === 12) {
          hours = 0;
        }

        return { hours, minutes };
      };

      const start = convertTo24Hour(start_time);
      const end = convertTo24Hour(end_time);

      const startDate = new Date(0, 0, 0, start.hours, start.minutes);
      const endDate = new Date(0, 0, 0, end.hours, end.minutes);

      const diff = Math.abs(endDate.getTime() - startDate.getTime());
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      return `${hours}h ${minutes}m`;
    } catch (error) {
      console.error("Error calculating duration:", error);
      return "Invalid Time";
    }
  };

  const handleEnroll = () => {
    setEnrollClicked(true);
    dispatch(enrollUserInWorkshop({ userId: userData.id, workshopId: workshop.id }));

  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <StackedNotifications
        notification={notification}
        setNotification={setNotification}
      />
      <div
        style={{ maxHeight: "90%", overflow: "auto" }}
        className="relative p-5 bg-white rounded-3xl w-4/5 md:w-1/2 flex flex-col md:flex-row"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-700 hover:text-red-500"
        >
          <Icon icon="ic:outline-close" className="text-3xl" />
        </button>

        <div className="flex-grow flex flex-col">
          <div className="flex items-center justify-between px-5 py-2">
            <h1 className="text-3xl font-bold text-black">{workshop.title}</h1>
          </div>
          <div className="relative w-full mx-2 mb-2">
            <Image
              src={`/api/images?filename=${workshop.image}&folder=workShops`}
              alt="Workshop Image"
              className="w-[60em] h-[30em] rounded-lg object-cover"
              width={1000}
              height={1000}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-white rounded-lg mb-4">
            <div className="flex items-center">
              <div className="rounded-full overflow-hidden w-12 h-12">
                <div className="w-12 h-12 bg-gradient-to-b from-[#BAA716] to-[#B50D34] flex items-center justify-center rounded-full">
                  <span className="text-white text-xl font-bold">PL</span>
                </div>
              </div>
              <div className="ml-3">
                <h3 className="text-xl text-red-500 font-bold">PHLATINE</h3>
                <p className="text-lg text-gray-500">{workshop.designation}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg text-red-500 font-bold">
                {calculateDuration(workshop.start_time, workshop.end_time)}
              </p>
              <p className="text-lg text-gray-500">
                {workshop.start_time} - {workshop.end_time}
              </p>
            </div>
          </div>

          <p className="text-black text-sm lg:text-base font-normal capitalize ml-[1em] -mt-[1em]">
            {workshop.description}
          </p>

          <div className="flex justify-between items-center mt-4 ml-[1em]">
            <p className="text-lg text-red-500 font-bold gap-3">
              Date: {workshop.Date}
            </p>
            {enrollmentLoading ? (
              <Spinner height="30px" width="30px" />
            ) : (
              <Button
                color="primary"
                className="text-white px-4 py-2 rounded-3xl"
                onClick={handleEnroll}
              >
                Enroll Now
              </Button>
            )}
          </div>
        </div>

        {/* Right Side: Learning Outcomes */}
        <div className="flex-shrink-0 md:w-1/3 my-4 md:ml-5">
          <div className="my-5">
            <Card className="p-5">
              <h2 className="text-xl text-red-500 font-bold">Learning Outcomes</h2>
              <ul className="mt-3 space-y-2 text-lg lg:text-lg text-black list-disc pl-5 capitalize">
                {workshop.Objective?.map(
                  (responsibility: string, index: number) => (
                    <li key={index}>{responsibility}</li>
                  )
                )}
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkshopModal;
