"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/Card";
import Image from "next/image";
import { Button } from "./button-sidebar";
import { Avatar, AvatarImage } from "@/app/components/avatar";
import Icon from "./utility-icon";

const TaskMonitoring: React.FC = () => {
  // Updated array of tasks with multiple assignees
  const tasks = [
    {
      image: "/assets/TaskImg.png",
      date: "16 August",
      assignees: [
        {
          name: "Theresa Webb",
          completion: "10%",
          avatar: "/assets/UserProfile.png",
        },
        {
          name: "James Green",
          completion: "20%",
          avatar: "/assets/UserProfile.png",
        },
        {
          name: "Emma Watson",
          completion: "40%",
          avatar: "/assets/UserProfile.png",
        },
      ],
    },
    {
      image: "/assets/TaskImg.png",
      date: "20 August",
      assignees: [
        {
          name: "Jacob Jones",
          completion: "50%",
          avatar: "/assets/UserProfile.png",
        },
        {
          name: "Sarah Johnson",
          completion: "30%",
          avatar: "/assets/UserProfile.png",
        },
        {
          name: "Michael Brown",
          completion: "70%",
          avatar: "/assets/UserProfile.png",
        },
      ],
    },
  ];

  return (
    <div className="flex space-x-4">
      {tasks.map((task, index) => (
        <Card
          key={index}
          className="border border-gray-400 w-full flex-shrink-0"
        >
          <CardHeader>
            <CardTitle>Task Monitoring</CardTitle>
          </CardHeader>
          <CardContent className="p-3 space-y-4">
            {/* Flex container with two columns */}
            <div className="flex space-x-4">
              {/* Left Column: Image, Edit Button, Date */}
              <div className="flex flex-col items-center space-y-2">
                <Image
                  src={task.image}
                  alt="Task Image"
                  width={100}
                  height={100}
                  className="w-28 h-28"
                />
                <Button color="primary">Edit</Button>
                <div className="flex items-center space-x-2">
                  <Icon icon="mdi:close" className="w-6 h-6" />
                  <p>{task.date}</p>
                </div>
              </div>

              {/* Right Column: Assignees and Completion */}
              <div className="flex flex-col flex-grow p-3">
                <Card className="border border-gray-300">
                  <CardHeader className="flex justify-between">
                    <CardTitle>Assignees</CardTitle>
                    <CardTitle>Completion</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="mt-4 space-y-2">
                      {task.assignees.map((assignee, assigneeIndex) => (
                        <li
                          key={assigneeIndex}
                          className="flex justify-between border-b border-gray-300 pb-2 last:border-0"
                        >
                          <Avatar className="w-6 h-6">
                            <AvatarImage
                              src={assignee.avatar}
                              alt={`${assignee.name}-avatar`}
                              className="w-7 h-7"
                            />
                          </Avatar>
                          <span>{assignee.name}</span>
                          <span>{assignee.completion}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TaskMonitoring;
