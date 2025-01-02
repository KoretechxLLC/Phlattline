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
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Assignee {
  first_name: string;
  last_name: string;
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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

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
                first_name: "Theresa",
                last_name: "Webb",
                completion: "10%",
                avatar: "/assets/DummyImg.png",
              },
              {
                first_name: "James",
                last_name: "assignee",
                completion: "20%",
                avatar: "/assets/DummyImg.png",
              },
              {
                first_name: "James",
                last_name: "assignee",
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
                first_name: "James",
                last_name: "assignee",
                completion: "50%",
                avatar: "/assets/DummyImg.png",
              },
              {
                first_name: "James",
                last_name: "assignee",
                completion: "30%",
                avatar: "/assets/DummyImg.png",
              },
              {
                first_name: "James",
                last_name: "assignee",
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

  const handleNextPage = () => {
    if (currentPage < totalPage) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="w-full">
      <CardHeader>
        <CardTitle>Task Monitoring</CardTitle>
      </CardHeader>

      {loading ? (
        <div className="flex justify-center items-center w-full h-[200px]">
          <Spinner height="30px" width="30px" />
        </div>
      ) : tasks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-1">
          {tasks.map((task, index) => (
            <Card key={index} className="w-full">
              <CardContent className="4xl:p-0 p-1 space-y-3">
                <div className="grid grid-cols-2 gap-0">
                  <div className="flex flex-col items-center space-y-2">
                    <Image
                      src={task.image}
                      alt="Task Image"
                      width={5000}
                      height={5000}
                      className="4xl:w-[240px] 4xl:h-60 w-[300px] h-60"
                    />
                    <div className="flex items-center space-x-2 pt-4">
                      <Icon icon="solar:calendar-bold" className="w-6 h-6" />
                      <p>{task.date}</p>
                    </div>
                    <Button
                      color="primary"
                      size="md"
                      className="rounded-3xl py-4"
                    >
                      Assign
                    </Button>
                  </div>

                  <div className="border border-[#62626280] rounded-xl 4xl:p-3 p-2">
                    <CardHeader className="w-full bg-gradient-to-br from-[#62626280] via-[#62626280] to-[#2D2C2C80] rounded-xl mb-5">
                      <div className="flex items-center justify-between">
                        <span className="4xl:text-sm text-[22px] font-bold">
                          Assignee
                        </span>
                        <span className="4xl:text-sm text-xl font-bold">
                          Completion
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="relative overflow-y-auto">
                      <ul className="space-y-3 pb-10">
                        {task.assignees.map((assignee, assigneeIndex) => (
                          <li
                            key={assigneeIndex}
                            className="flex items-center justify-between border-b border-[#62626280] pb-2 last:border-0 gap-2"
                          >
                            <div className="flex items-center justify-between">
                              {!assignee?.avatar ? (
                                <Avatar className="w-10 h-10">
                                  <AvatarImage
                                    src={`/api/images?filename=${assignee?.avatar}&folder=profileimage`}
                                    alt={`${
                                      assignee?.first_name +
                                      " " +
                                      assignee?.last_name
                                    }-avatar`}
                                    className="w-10 h-10"
                                  />
                                </Avatar>
                              ) : (
                                <div className="w-10 h-10 ring-1 ring-white flex items-center justify-center bg-gradient-to-b from-[#BAA716] to-[#B50D34] rounded-full">
                                  <span className="text-white text-sm font-bold">
                                    {assignee?.first_name
                                      ?.charAt(0)
                                      .toUpperCase() +
                                      assignee?.last_name
                                        ?.charAt(0)
                                        .toUpperCase()}
                                  </span>
                                </div>
                              )}
                              <span className="ml-3 text-md text-white">
                                {assignee?.first_name +
                                  "  " +
                                  assignee?.last_name}
                              </span>
                            </div>
                            <span className="ml-3 text-md text-white">40%</span>
                          </li>
                        ))}
                      </ul>
                      <div className="w-full py-1 flex items-center justify-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="w-8 h-8 border-transparent hover:bg-transparent"
                          onClick={handlePreviousPage}
                          disabled={currentPage === 1}
                        >
                          <ChevronLeft className="w-5 h-5 text-default-900" />
                        </Button>
                        <span className="text-sm font-medium text-default-900">
                          Page {currentPage} of {totalPage}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="w-8 h-8 border-transparent hover:bg-transparent"
                          onClick={handleNextPage}
                          disabled={currentPage >= totalPage}
                        >
                          <ChevronRight className="w-5 h-5 text-default-900" />
                        </Button>
                      </div>
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
