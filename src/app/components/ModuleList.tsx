"use client";
import React from "react";
import { Badge } from "@/app/components/badge";

const ModuleList: React.FC = () => {
  const modules = [
    { id: "1", title: "Introduction to Branding" },
    { id: "2", title: "Logo Design Basics" },
    { id: "3", title: "Branding Colors" },
    { id: "4", title: "Typography in Branding" },
    { id: "5", title: "Practical Branding Exercise" },
  ];

  return (
    <>
      {modules.map((module) => (
        <div key={module.id} className="flex items-center rounded-lg p-4 mb-2">
          {/* Module number using Badge component */}
          <Badge className="font-bold rounded-full text-sm bg-red-800 text-white w-8 h-8 flex items-center justify-center mr-4">
            {module.id}
          </Badge>
          <span className="text-xl font-bold">{module.title}</span>
        </div>
      ))}
    </>
  );
};

export default ModuleList;
