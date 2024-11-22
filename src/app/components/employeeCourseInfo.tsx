import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/app/components/Card";
import { Avatar, AvatarImage } from "@/app/components/avatar";
import { Button } from "./button-sidebar";
import Spinner from "@/app/components/Spinner"; // Assuming you have a Spinner component

// Define the type for an employee object
type Employee = {
  image: string;
  name: string;
  course: string;
  accuracy: string;
};

const EmployeeCourseInfo: React.FC = () => {
  // Explicitly define the type of employeeData as Employee[]
  const [loading, setLoading] = useState(true);
  const [employeeData, setEmployeeData] = useState<Employee[]>([]);

  useEffect(() => {
    // Simulate loading delay
    setTimeout(() => {
      setEmployeeData([
        {
          image: "/assets/UserProfile.png",
          name: "John Doe",
          course: "React Basics",
          accuracy: "85%",
        },
        {
          image: "/assets/UserProfile.png",
          name: "Jane Smith",
          course: "Advanced CSS",
          accuracy: "92%",
        },
        {
          image: "/assets/UserProfile.png",
          name: "Alice Johnson",
          course: "UI/UX Design",
          accuracy: "78%",
        },
      ]);
      setLoading(false); // Set loading state to false after data is fetched
    }, 1500); // Adjust loading time as necessary
  }, []);

  return (
    <div className="flex flex-col items-center">
      <Card className="border border-gray-500 rounded-xl w-full max-w-3xl">
        <CardHeader>
          <h2 className="text-2xl items-center font-semibold mb-3">
            Employee Performance
          </h2>
          <div className="flex justify-between px-8 py-3 text-white bg-gradient-to-b whitespace-nowrap from-[#62626280] to-[#2D2C2C80] text-sm font-medium">
            <span>Employees</span>
            <span>Courses</span>
            <span>Accuracy</span>
            <span>Action</span>
          </div>
        </CardHeader>

        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center py-6">
              <Spinner height="30px" width="30px" />
            </div>
          ) : employeeData.length === 0 ? (
            <div className="text-center py-6 text-gray-500">
              No Employees Found
            </div>
          ) : (
            <ul>
              {employeeData.map((employee, index) => (
                <li
                  key={index}
                  className={`${
                    index < employeeData.length - 1
                      ? "border-b border-gray-300"
                      : ""
                  }`}
                >
                  <CardContent className="flex items-center justify-between px-8 py-8 space-x-2">
                    <div className="flex items-center space-x-4">
                      <Avatar className="w-10 h-10">
                        <AvatarImage
                          src={employee.image}
                          alt={`${employee.name}-avatar`}
                          className="w-10 h-10"
                        />
                      </Avatar>
                      <span className="font-semibold text-sm">
                        {employee.name}
                      </span>
                    </div>

                    <div className="text-center text-sm text-yellow-400">
                      {employee.course}
                    </div>

                    <div className="text-center text-sm text-green-500">
                      {employee.accuracy}
                    </div>

                    <div>
                      <Button
                        color="primary"
                        className="rounded-3xl"
                        onClick={() => alert(`Details for ${employee.name}`)}
                      >
                        View
                      </Button>
                    </div>
                  </CardContent>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeeCourseInfo;
