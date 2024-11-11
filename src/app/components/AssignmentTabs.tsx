"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/app/components/Card";
import { Button } from "@/app/components/button-sidebar";
import Spinner from "@/app/components/Spinner"; // Import Spinner component

interface AssignmentTabsProps {
  title: string;
  description?: string; // Optional, in case the description may not always be provided
}

const AssignmentTabs: React.FC<AssignmentTabsProps> = ({
  title,
  description,
}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Simulate loading delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {loading ? (
        <Card className="w-full h-full 4xl:p-4 p-8 bg-gradient-to-b whitespace-nowrap from-[#62626280] to-[#2D2C2C80]">
          <Spinner height="5vh" />
        </Card>
      ) : description ? (
        <Card className="w-full h-full 4xl:py-3 4xl:px-6 p-4 bg-gradient-to-b whitespace-nowrap from-[#62626280] to-[#2D2C2C80]">
          <CardContent className="4xl:space-x-4 5xl:space-x-4 lg:space-x-4">
            <span className="5xl:text-md 4xl:text-sm lg:text-xl">{title}</span>
            <span className="5xl:text-md 4xl:text-sm lg:text-xl">
              {description}
            </span>
            <Button color="primary" className="rounded-3xl">
              Assign
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="w-full h-full 4xl:p-3 p-10 bg-gradient-to-b whitespace-nowrap from-[#62626280] to-[#2D2C2C80]">
          Please define personal goals first.
        </Card>
      )}
    </div>
  );
};

export default AssignmentTabs;