"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/Card";
import { Button } from "@/app/components/button-sidebar";

interface SuggestionTabsProps {
  Suggestion: string;
}

const SuggestionTabs: React.FC<SuggestionTabsProps> = ({ Suggestion }) => {
  return (
    <Card className="w-full h-full p-10 bg-gradient-to-b whitespace-nowrap from-[#62626280] to-[#2D2C2C80]">
      <CardContent className="space-x-3">
        <span>{Suggestion}</span>
        <Button color="primary" className="rounded-3xl">
          Assign
        </Button>
      </CardContent>
    </Card>
  );
};

export default SuggestionTabs;
