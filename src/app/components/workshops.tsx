"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/Card";
import { Button } from "./button-sidebar";
import Image from "next/image";
import Spinner from "./Spinner"; // Assuming this is your spinner component

const Workshops = () => {
  // State to manage workshop data
  const [workshops, setWorkshops] = useState<
    { image: string; title: string }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true); // State for loader

  useEffect(() => {
    // Simulating an API call to fetch workshops
    const fetchWorkshops = async () => {
      setLoading(true);
      setTimeout(() => {
        // Simulate data (leave as an empty array to test "no workshops" state)
        const data = [
          {
            image: "/assets/WorkshopImage.png",
            title: "AI and Virtual",
          },
          {
            image: "/assets/WorkshopImage.png",
            title: "Leadership Development",
          },
          {
            image: "/assets/WorkshopImage.png",
            title: "Team Building",
          },
        ];

        setWorkshops(data); // Replace with `[]` to test the "no workshops" state.
        setLoading(false);
      }, 2000); // 2-second delay to simulate API call
    };

    fetchWorkshops();
  }, []);

  return (
    <div>
      <Card className="border border-gray-500 p-3 rounded-3xl bg-gradient-to-b whitespace-nowrap from-[#62626280] to-[#2D2C2C80]">
        <CardHeader>
          <CardTitle>Workshops</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            // Show loader when data is being fetched
            <div className="flex justify-center items-center h-48">
              <Spinner height="30px" width="30px" />
            </div>
          ) : workshops.length > 0 ? (
            // Render workshops if found
            <div className="flex space-x-12">
              {workshops.map((workshop, index) => (
                <div
                  className="border border-gray-500 rounded-3xl p-5"
                  key={index}
                >
                  <Image
                    src={workshop.image}
                    width={1000}
                    height={1000}
                    alt={workshop.title}
                    className="w-full h-24 object-cover"
                  />
                  <span className="block text-lg font-semibold mt-2">
                    {workshop.title}
                  </span>
                  <Button color="primary">View</Button>
                </div>
              ))}
            </div>
          ) : (
            // Render "No workshops found" message if no workshops are available
            <div className="text-center text-gray-500 py-8">
              No Workshops Found
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Workshops;
