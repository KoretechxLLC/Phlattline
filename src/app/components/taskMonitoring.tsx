"use client";
import React, { useState, useEffect } from "react";
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
import Spinner from "./Spinner"; // Assuming Spinner is your loader component

interface Assignee {
  name: string;
  completion: string;
  avatar: string;
}

interface Task {
  image: string;
  date: string;
  assignees: Assignee[];
}

const TaskMonitoring: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]); // Tasks state with type
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  useEffect(() => {
    // Simulate API call to fetch tasks
    const fetchTasks = async () => {
      setLoading(true);
      setTimeout(() => {
        // Mock data after delay
        const data: Task[] = [
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

        // Set fetched data here
        setTasks(data); // Replace `data` with `[]` to test "No Tasks Found" state
        setLoading(false); // Set loading to false when tasks are fetched
      }, 2000); // Simulate 2 seconds delay
    };

    fetchTasks();
  }, []);

  return (
    <div>
      {/* Single title for Task Monitoring */}
      <CardHeader>
        <CardTitle>Task Monitoring</CardTitle>
      </CardHeader>

      {loading ? (
        // Centered spinner while loading
        <div className="flex justify-center items-center w-full h-[200px]">
          <Spinner height="30px" width="30px" />
        </div>
      ) : tasks.length > 0 ? (
        // Render tasks once loading is complete and tasks are available
        <div className="flex space-x-4">
          {tasks.map((task, index) => (
            <Card key={index} className="w-full flex-shrink-0">
              <CardContent className="p-3 space-y-3">
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
                    <div className="flex items-center space-x-2">
                      <Icon icon="solar:calendar-bold" className="w-6 h-6" />
                      <p>{task.date}</p>
                    </div>
                    <Button color="primary" size="md">
                      Edit
                    </Button>
                  </div>

                  {/* Right Column: Assignees and Completion */}
                  <div className="flex flex-col flex-grow p-1">
                    <Card className="border border-gray-300">
                      <CardHeader className="flex justify-center">
                        <h2 className="text-xl font-bold ">
                          Assignees Completion
                        </h2>
                      </CardHeader>
                      <CardContent>
                        <ul className="mt-4 space-y-3">
                          {task.assignees.map((assignee, assigneeIndex) => (
                            <li
                              key={assigneeIndex}
                              className="flex justify-between border-b border-gray-300 pb-2 last:border-0"
                            >
                              {/* Icon and Avatar */}
                              <div className="flex gap-3">
                                <Icon
                                  icon="f7:person-badge-minus"
                                  className="w-5 h-5 text-red-600"
                                />
                                <Avatar className="w-8 h-8">
                                  <AvatarImage
                                    src={assignee.avatar}
                                    alt={`${assignee.name}-avatar`}
                                    className="w-8 h-8"
                                  />
                                </Avatar>
                                {/* Name */}
                                <span className="text-md text-white">
                                  {assignee.name}
                                </span>
                              </div>
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
      ) : (
        // Centered "No Tasks Found" message if no tasks are available
        <div className="flex justify-center items-center w-full h-[200px] text-gray-500">
          No Tasks Found
        </div>
      )}
    </div>
  );
};

export default TaskMonitoring;
