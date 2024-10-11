// Importing React and other necessary components
"use client";
import { AnimatePresence, motion } from "framer-motion";
import { FiAlertCircle, FiX } from "react-icons/fi";
import { useEffect, useState } from "react";

export type NotificationType = {
  id: number;
  text: string;
  type: "error" | "success";
};

// Component to handle notifications
const StackedNotifications = ({ notification, setNotification }: any) => {
  const removeNotif = () => {
    setNotification(null);
  };

  return (
    <div className="">
      <AnimatePresence>
        {notification && (
          <Notification
            removeNotif={removeNotif}
            key={notification.id}
            {...notification}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// TTL for the notification
const NOTIFICATION_TTL = 5000;

const Notification = ({
  text,
  id,
  type,
  removeNotif,
}: NotificationType & { removeNotif: () => void }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeNotif();
    }, NOTIFICATION_TTL);
    return () => clearTimeout(timeout);
  }, [removeNotif]);

  return (
    <motion.div
      layout
      initial={{ y: 15, scale: 0.9, opacity: 0 }}
      animate={{ y: 0, scale: 1, opacity: 1 }}
      exit={{ y: -25, scale: 0.9, opacity: 0 }}
      transition={{ type: "spring" }}
      className={`p-4 w-80 flex items-start rounded-lg gap-2 text-[1em] font-medium shadow-lg text-white fixed z-50 bottom-4 right-4 ${
        type === "error" ? "bg-red-500" : "bg-[#1DD67D]"
      }`}
    >
      <span>{text}</span>
      <button onClick={removeNotif} className="ml-auto mt-0.5 text-black">
        <FiX />
      </button>
    </motion.div>
  );
};

export default StackedNotifications;
