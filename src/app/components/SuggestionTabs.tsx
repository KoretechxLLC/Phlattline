"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/app/components/Card";
import { Button } from "@/app/components/button-sidebar";
import Spinner from "@/app/components/Spinner"; // Import Spinner component

const SuggestionTabs: React.FC = () => {
  const [loading, setLoading] = useState(true);

  // Define a static array of suggestions
  const suggestions = [
    "Improve time management",
    "Increase productivity",
    "Enhance team collaboration",
  ];

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
          <Spinner height="30px" width="30px" />
        </Card>
      ) : suggestions.length > 0 ? (
        <Card className="w-full  4xl:py-3 4xl:px-6 p-7">
          <CardContent className="flex">
            <ul className="flex space-x-12 rounded-lg 4xl:py-3 4xl:px-6 ">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="flex items-center space-x-4 p-7 bg-gradient-to-b whitespace-nowrap from-[#62626280] to-[#2D2C2C80] rounded-3xl lg:text-xl"
                >
                  <span className="5xl:text-md 4xl:text-sm">{suggestion}</span>
                  <Button color="primary" className="rounded-3xl">
                    Assign
                  </Button>
                </li>
              ))}
            </ul>
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

export default SuggestionTabs;
