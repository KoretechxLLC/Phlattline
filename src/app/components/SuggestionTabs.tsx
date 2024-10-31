"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/app/components/Card";
import { Button } from "@/app/components/button-sidebar";
import Spinner from "@/app/components/Spinner"; // Import Spinner component

interface SuggestionTabsProps {
  Suggestion: string;
}

const SuggestionTabs: React.FC<SuggestionTabsProps> = ({ Suggestion }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Simulate loading delay

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Spinner height="20vh" />
      </div>
    );
  }

  if (!Suggestion) {
    return (
      <div className="text-center text-gray-300">
        Please define personal goals first.
      </div>
    );
  }

  return (
    <Card className="w-full h-full 4xl:p-3 p-10 bg-gradient-to-b whitespace-nowrap from-[#62626280] to-[#2D2C2C80]">
      <CardContent className="4xl:space-x-4 5xl:space-x-10 space-x-36">
        <span className="5xl:text-md 4xl:text-md lg:text-xl">{Suggestion}</span>
        <Button color="primary" className="rounded-3xl">
          Assign
        </Button>
      </CardContent>
    </Card>
  );
};

export default SuggestionTabs;
