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
  // Static array of tasks
  const tasks = [
    {
      image: "/images/task1.jpg",
      date: "16 August",
      assignee: "Theresa Webb",
      completion: "10%",
      avatar: "/images/avatar1.jpg",
      subTasks: [
        { subAssignee: "James Green", subCompletion: "20%" },
        { subAssignee: "Emma Watson", subCompletion: "40%" },
      ],
    },
    {
      image: "/images/task2.jpg",
      date: "20 August",
      assignee: "Jacob Jones",
      completion: "50%",
      avatar: "/images/avatar2.jpg",
      subTasks: [
        { subAssignee: "Sarah Johnson", subCompletion: "30%" },
        { subAssignee: "Michael Brown", subCompletion: "70%" },
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
                  width={50}
                  height={50}
                />
                <Button color="primary">Edit</Button>
                <div className="flex items-center space-x-2">
                  <Icon icon="mdi:close" className="w-6 h-6" />
                  <p>{task.date}</p>
                </div>
              </div>

              {/* Right Column: Assignee, Completion, SubTasks */}
              <div className="flex flex-col flex-grow p-2">
                <Card className="border border-gray-300">
                  <CardHeader className="flex justify-between">
                    <CardTitle>Assignee</CardTitle>
                    <CardTitle>Completion</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {/* SubTasks */}
                    <ul className="mt-4 space-y-2">
                      {task.subTasks.map((subTask, subIndex) => (
                        <li
                          key={subIndex}
                          className="flex justify-between border-b border-gray-300 pb-2 last:border-0"
                        >
                          <Avatar className="w-6 h-6">
                            <AvatarImage
                              src={task.avatar}
                              alt={`${task.assignee}-avatar`}
                              className="w-5 h-5"
                            />
                          </Avatar>
                          <span>{subTask.subAssignee}</span>
                          <span>{subTask.subCompletion}</span>
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
