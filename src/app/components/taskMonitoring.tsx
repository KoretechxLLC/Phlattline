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
import Spinner from "./Spinner";

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
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      setTimeout(() => {
        const data: Task[] = [
          {
            image: "/assets/TaskImg.png",
            date: "16 August",
            assignees: [
              {
                name: "Theresa Webb",
                completion: "10%",
                avatar: "/assets/DummyImg.png",
              },
              {
                name: "James Green",
                completion: "20%",
                avatar: "/assets/DummyImg.png",
              },
              {
                name: "Emma Watson",
                completion: "40%",
                avatar: "/assets/DummyImg.png",
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
                avatar: "/assets/DummyImg.png",
              },
              {
                name: "Sarah Johnson",
                completion: "30%",
                avatar: "/assets/DummyImg.png",
              },
              {
                name: "Michael Brown",
                completion: "70%",
                avatar: "/assets/DummyImg.png",
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
                avatar: "/assets/DummyImg.png",
              },
              {
                name: "Sarah Johnson",
                completion: "30%",
                avatar: "/assets/DummyImg.png",
              },
              {
                name: "Michael Brown",
                completion: "70%",
                avatar: "/assets/DummyImg.png",
              },
            ],
          },
        ];

        setTasks(data);
        setLoading(false);
      }, 2000);
    };

    fetchTasks();
  }, []);

  return (
    <div>
      <CardHeader>
        <CardTitle>Task Monitoring</CardTitle>
      </CardHeader>

      {loading ? (
        <div className="flex justify-center items-center w-full h-[200px]">
          <Spinner height="30px" width="30px" />
        </div>
      ) : tasks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
          {tasks.map((task, index) => (
            <Card key={index} className="w-full">
              <CardContent className="4xl:p-0 p-1 space-y-3">
                <div className="grid grid-cols-2 gap-0">
                  {/* Left Column */}
                  <div className="flex flex-col items-center space-y-2">
                    <Image
                      src={task.image}
                      alt="Task Image"
                      width={100}
                      height={100}
                      className="4xl:w-20 4xl:h-20 w-28 h-28"
                    />
                    <div className="flex items-center space-x-2">
                      <Icon icon="solar:calendar-bold" className="w-6 h-6" />
                      <p>{task.date}</p>
                    </div>
                    <Button color="primary" size="md" className="rounded-3xl">
                      Edit
                    </Button>
                  </div>

                  {/* Right Column */}
                  <div className="border border-gray-600 rounded-md 4xl:p-3 p-2">
                    <CardHeader className="text-center">
                      <h2 className="4xl:text-sm text-xl font-bold">
                        Assignees Completion
                      </h2>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {task.assignees.map((assignee, assigneeIndex) => (
                          <li
                            key={assigneeIndex}
                            className="flex items-center border-b border-gray-600 pb-2 last:border-0"
                          >
                            <div className="flex items-center gap-3">
                              <Icon
                                icon="f7:person-badge-minus"
                                className=" w-5 h-5 text-red-600"
                              />
                              <Avatar className="4xl:w-7 4xl:h-7 w-8 h-8">
                                <AvatarImage
                                  src={assignee.avatar}
                                  alt={`${assignee.name}-avatar`}
                                />
                              </Avatar>
                            </div>
                            <span className="ml-3 text-md text-white">
                              {assignee.name}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center w-full h-[200px] text-gray-500">
          No Tasks Found
        </div>
      )}
    </div>
  );
};

export default TaskMonitoring;
