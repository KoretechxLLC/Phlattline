"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/app/components/Card";
import { Button } from "@/app/components/button-sidebar";
import Spinner from "@/app/components/Spinner"; // Import Spinner component

const SuggestionTabs: React.FC = () => {
  const [loading, setLoading] = useState(true);
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
        <Card className="w-full h-full p-8 bg-gradient-to-b from-[#62626280] to-[#2D2C2C80]">
          <Spinner height="30px" width="30px" />
        </Card>
      ) : suggestions.length > 0 ? (
        <Card className="w-full p-7">
          <CardContent>
            <ul className="flex space-x-6">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="flex items-center space-x-4 p-10 bg-gradient-to-b from-[#62626280] to-[#2D2C2C80] rounded-3xl"
                >
                  <span className="text-lg">{suggestion}</span>
                  <Button color="primary" className="rounded-3xl">
                    Assign
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ) : (
        <Card className="w-full h-full p-10 bg-gradient-to-b from-[#62626280] to-[#2D2C2C80]">
          No suggestions available.
        </Card>
      )}
    </div>
  );
};

export default SuggestionTabs;
