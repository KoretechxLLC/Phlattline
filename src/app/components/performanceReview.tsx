"use client";
import { Avatar, AvatarImage } from "@/app/components/avatar";
import { CardContent } from "@/app/components/Card";
import { Button } from "@/app/components/button-sidebar";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const PerformanceReview = ({
  onEmployeeSelect,
}: {
  onEmployeeSelect: (employeeId: number) => void;
}) => {
  const router = useRouter();
  const [selectedDept, setSelectedDept] = useState<string>("Operations");

  const departments = ["Operations", "Sales", "Finance", "IT"];

  const employees = [
    // Operations Department
    {
      id: 1,
      name: "John Doe",
      department: "Operations",
      image: "/assets/UserProfile.png",
    },
    {
      id: 2,
      name: "Michael White",
      department: "Operations",
      image: "/assets/UserProfile.png",
    },
    {
      id: 3,
      name: "Sophia Taylor",
      department: "Operations",
      image: "/assets/UserProfile.png",
    },
    {
      id: 4,
      name: "Lucas Martinez",
      department: "Operations",
      image: "/assets/UserProfile.png",
    },
    {
      id: 5,
      name: "Emma Johnson",
      department: "Operations",
      image: "/assets/UserProfile.png",
    },
    {
      id: 6,
      name: "Liam Smith",
      department: "Operations",
      image: "/assets/UserProfile.png",
    },

    // Sales Department
    {
      id: 7,
      name: "Jane Smith",
      department: "Sales",
      image: "/assets/UserProfile.png",
    },
    {
      id: 8,
      name: "Sarah Lee",
      department: "Sales",
      image: "/assets/UserProfile.png",
    },
    {
      id: 9,
      name: "Noah Brown",
      department: "Sales",
      image: "/assets/UserProfile.png",
    },
    {
      id: 10,
      name: "Ella Walker",
      department: "Sales",
      image: "/assets/UserProfile.png",
    },
    {
      id: 11,
      name: "Jack Wilson",
      department: "Sales",
      image: "/assets/UserProfile.png",
    },
    {
      id: 12,
      name: "Mia Davis",
      department: "Sales",
      image: "/assets/UserProfile.png",
    },

    // Finance Department
    {
      id: 13,
      name: "James Brown",
      department: "Finance",
      image: "/assets/UserProfile.png",
    },
    {
      id: 14,
      name: "Ethan Clark",
      department: "Finance",
      image: "/assets/UserProfile.png",
    },
    {
      id: 15,
      name: "Olivia Harris",
      department: "Finance",
      image: "/assets/UserProfile.png",
    },
    {
      id: 16,
      name: "Benjamin Moore",
      department: "Finance",
      image: "/assets/UserProfile.png",
    },
    {
      id: 17,
      name: "Ava Martinez",
      department: "Finance",
      image: "/assets/UserProfile.png",
    },
    {
      id: 18,
      name: "Charlotte Young",
      department: "Finance",
      image: "/assets/UserProfile.png",
    },

    // IT Department
    {
      id: 19,
      name: "Emily Clark",
      department: "IT",
      image: "/assets/UserProfile.png",
    },
    {
      id: 20,
      name: "Jacob Taylor",
      department: "IT",
      image: "/assets/UserProfile.png",
    },
    {
      id: 21,
      name: "William Evans",
      department: "IT",
      image: "/assets/UserProfile.png",
    },
    {
      id: 22,
      name: "Amelia Johnson",
      department: "IT",
      image: "/assets/UserProfile.png",
    },
    {
      id: 23,
      name: "Henry Thomas",
      department: "IT",
      image: "/assets/UserProfile.png",
    },
    {
      id: 24,
      name: "Isabella Lopez",
      department: "IT",
      image: "/assets/UserProfile.png",
    },
  ];

  const filteredEmployees = employees.filter(
    (emp) => emp.department === selectedDept
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-[30%_70%] gap-4 p-2">
      <div className="space-y-2">
        {departments.map((dept, index) => (
          <button
            key={index}
            onClick={() => setSelectedDept(dept)}
            className={`w-full mx-auto py-8 rounded-lg ${
              selectedDept === dept
                ? "bg-red-600 text-white"
                : "bg-transparent text-white"
            }`}
          >
            {dept}
          </button>
        ))}
      </div>

      <div className="bg-gradient-to-b whitespace-nowrap from-[#62626280] to-[#2D2C2C80] p-3 rounded-xl shadow-xl ">
        <ul className="divide-y divide-gray-500">
          {filteredEmployees.map((employee) => (
            <li key={employee.id} className="py-4 px-4">
              <CardContent className="flex items-center justify-between px-8 py-8 space-x-2">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-10 h-10">
                    <AvatarImage
                      src={employee.image}
                      alt={`${employee.name}-avatar`}
                      className="w-10 h-10"
                    />
                  </Avatar>
                  <span className="font-semibold text-sm">{employee.name}</span>
                </div>

                <Button
                  color="primary"
                  onClick={() => onEmployeeSelect(employee.id)}
                >
                  View
                </Button>
              </CardContent>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PerformanceReview;
