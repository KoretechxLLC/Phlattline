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
import { fetchWorkshopCount, fetchWorkshops } from "@/redux/slices/workshops.slice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const Workshops = () => {
  const [workshopList, setWorkshopList] = useState<
    { id: number; image: string; title: string; description: string }[]
  >([]); // New state to hold workshop data
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedWorkshop, setSelectedWorkshop] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const workshopsPerPage = 3; // Number of workshops per page

  const { workshops, totalCount } = useSelector((state: RootState) => state.workshop);
  const dispatch: any = useDispatch();

  const totalPages = Math.ceil((totalCount || 0) / workshopsPerPage); // Calculate total pages dynamically

  useEffect(() => {
    // Fetch workshops from API
    const fetchWorkshopsData = async () => {
      setLoading(true);
      await dispatch(fetchWorkshops({ page: currentPage, size: workshopsPerPage }));
      setLoading(false);
    };

    fetchWorkshopsData();
  }, [dispatch, currentPage]);

  useEffect(() => {
    // Fetch total workshop count for pagination
    dispatch(fetchWorkshopCount());
  }, [dispatch]);

  useEffect(() => {
    // Set workshops data to local state when fetched
    setWorkshopList(
      workshops.map((workshop: any) => ({
        id: workshop.id,
        image: workshop.image || "/defaultImage.png", // Fallback image
        title: workshop.name,
        description: workshop.description,
        Objective: workshop.Objective,
        end_time: workshop.end_time,
        start_time: workshop.start_time,
        Date: workshop.Date,
      }))
    );
  }, [workshops]);

  const handleViewClick = (workshop: any) => {
    setSelectedWorkshop(workshop);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedWorkshop(null);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };



  return (
    <div className="px-1 ">
      <Card className="border border-[#62626280] rounded-3xl bg-gradient-to-b from-[#62626280] to-[#2D2C2C80] shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-white">
            Workshops
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Spinner height="40px" width="40px" />
            </div>
          ) : workshopList.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 4xl:gap-3 gap-6">
              {workshopList.map((workshop) => (
                <div
                  key={workshop.id}
                  className="border border-gray-400 rounded-2xl 4xl:p-2 p-5 shadow-md hover:shadow-lg transition-shadow"
                >
                  <Image
                    src={`/api/images?filename=${workshop.image}&folder=workShops`}
                    width={1000}
                    height={1000}
                    alt={workshop.title}
                    className="w-full 4xl:h-20 h-36 object-cover rounded-lg"
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
          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-4">
            <Button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="py-2 px-4 text-sm bg-gradient-to-b from-[#BAA716] to-[#B50D34]"
            >
              Previous
            </Button>
            <p className="text-white text-sm">
              Page {currentPage} of {totalPages}
            </p>
            <Button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="py-2 px-4 text-sm bg-gradient-to-b from-[#BAA716] to-[#B50D34]"
            >
              Next
            </Button>
          </div>
        </CardContent>
      </Card>

      {isModalOpen && (
        <WorkshopModal open={isModalOpen} onClose={handleCloseModal} workshop={selectedWorkshop} />
      )}
    </div>
  );
};

export default Workshops;
