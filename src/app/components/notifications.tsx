"use client";
import { useState } from "react";
import { Badge } from "@/app/components/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/dropdown-menu";
import { ScrollArea } from "@/app/components/scroll-area";
import Icon from "@/app/components/utility-icon";

interface Notification {
  title: string;
  unreadmessage: boolean;
}

const Notifications = () => {
  // Initialize state with notification data
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      title: "You have a new message from John Doe",
      unreadmessage: true,
    },
    {
      title: "Your order has been shipped",
      unreadmessage: false,
    },
    {
      title: "You have a new follower",
      unreadmessage: true,
    },
    {
      title: "Your payment has been processed",
      unreadmessage: false,
    },
  ]);

  // Handle notification click to mark it as read
  const handleNotificationClick = (index: number) => {
    // Update the specific notification's unread status
    const updatedNotifications = notifications.map((notification, i) =>
      i === index ? { ...notification, unreadmessage: false } : notification
    );
    setNotifications(updatedNotifications); // Update the state
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="relative hidden focus:ring-none focus:outline-none md:h-8 md:w-8 md:bg-secondary text-secondary-foreground rounded-full md:flex flex-col items-center justify-center"
        >
          <Icon
            icon="heroicons-outline:bell"
            className="animate-tada h-5 w-5"
          />
          {/* Show badge only if there's any unread message */}
          {notifications.some((notification) => notification.unreadmessage) && (
            <Badge
              className="w-4 h-4 p-0 text-[8px] rounded-full font-semibold items-center justify-center absolute left-[calc(100%-12px)] bottom-[calc(100%-10px)]"
              color="destructive"
            >
              o
            </Badge>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="z-[999] mx-4 lg:w-[320px] p-0"
      >
        <div className="bg-white h-full xl:h-full">
          <ScrollArea className="h-full">
            {notifications.map((item, index) => (
              <div key={`inbox-${index}`}>
                <DropdownMenuItem
                  className="flex gap-3 py-2 px-4 h-16 group cursor-pointer"
                  onClick={() => handleNotificationClick(index)} // Handle click
                >
                  <div className="flex items-start gap-2 flex-0">
                    <div className="text-xs text-black text-default-500 ml-5 dark:group-hover:text-default-800 truncate">
                      <span
                        className={`${
                          item.unreadmessage ? "font-bold" : "font-normal"
                        }`}
                      >
                        {item.title}
                      </span>
                      {item.unreadmessage && (
                        <Badge
                          className="badge rounded-full w-3 h-4 text-xs bg-red-500 ml-2"
                          color="destructive"
                        >
                          &nbsp;
                        </Badge>
                      )}
                    </div>
                  </div>
                </DropdownMenuItem>
                {index < notifications.length - 1 && (
                  <div className="h-1 w-60 ml-8 rounded-lg bg-gray-200 my-1"></div>
                )}
              </div>
            ))}
          </ScrollArea>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Notifications;
