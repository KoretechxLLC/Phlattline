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
  const [workshops, setWorkshops] = useState<
    { id: number; image: string; title: string; description: string }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedWorkshop, setSelectedWorkshop] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchWorkshops = async () => {
      setLoading(true);
      setTimeout(() => {
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
      }, 2000);
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
    <div className="px-1 ">
      <Card className="border border-gray-500 rounded-3xl bg-gradient-to-b from-[#62626280] to-[#2D2C2C80] shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-white">
            Workshops
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Spinner height="40px" width="40px" />
            </div>
          ) : workshops.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {workshops.map((workshop) => (
                <div
                  key={workshop.id}
                  className="border border-gray-400 rounded-2xl p-5  shadow-md hover:shadow-lg transition-shadow"
                >
                  <Image
                    src={workshop.image}
                    width={1000}
                    height={1000}
                    alt={workshop.title}
                    className="w-full h-36 object-cover rounded-lg"
                  />
                  <div className="flex justify-between items-center mt-4">
                    <h3 className="text-md font-semibold text-white">
                      {workshop.title}
                    </h3>
                    <Button
                      color="primary"
                      size="sm"
                      onClick={() => handleViewClick(workshop)}
                      className="py-1 px-2 text-sm rounded-3xl"
                    >
                      View
                    </Button>
                  </div>
                  <p className="text-sm text-gray-300 mt-2">
                    {workshop.description}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center h-64 text-gray-500">
              <p className="text-lg font-medium">No Workshops Found</p>
            </div>
          )}
        </CardContent>
      </Card>

      {isModalOpen && (
        <WorkshopModal open={isModalOpen} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default Workshops;
