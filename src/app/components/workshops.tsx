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
import Spinner from "./Spinner";
import WorkshopModal from "./workshopModal";

const Workshops = () => {
  // State to manage workshop data
  const [workshops, setWorkshops] = useState<
    { id: number; image: string; title: string; description: string }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true); // State for loader
  const [selectedWorkshop, setSelectedWorkshop] = useState<any>(null); // State for selected workshop
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Modal visibility

  useEffect(() => {
    // Simulating an API call to fetch workshops
    const fetchWorkshops = async () => {
      setLoading(true);
      setTimeout(() => {
        // Simulate data
        const data = [
          {
            id: 1,
            image: "/assets/WorkshopImage.png",
            title: "AI and Virtual",
            description: "Explore AI-driven innovation and virtual solutions.",
          },
          {
            id: 2,
            image: "/assets/WorkshopImage.png",
            title: "Leadership Development",
            description: "Develop key leadership skills for success.",
          },
          {
            id: 3,
            image: "/assets/WorkshopImage.png",
            title: "Team Building",
            description: "Learn strategies for fostering team collaboration.",
          },
        ];

        setWorkshops(data);
        setLoading(false);
      }, 2000); // 2-second delay to simulate API call
    };

    fetchWorkshops();
  }, []);

  const handleViewClick = (workshop: any) => {
    setSelectedWorkshop(workshop);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedWorkshop(null);
  };

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
                  key={workshop.id}
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
                  <Button
                    color="primary"
                    onClick={() => handleViewClick(workshop)}
                  >
                    View
                  </Button>
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

      {/* Workshop Modal */}
      {isModalOpen && (
        <WorkshopModal open={isModalOpen} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default Workshops;
