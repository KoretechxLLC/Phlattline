"use client";
import * as React from "react";
import { Button } from "@/app/components/button-sidebar";
import { useRouter } from "next/navigation";
import Spinner from "@/app/components/Spinner";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { fetchAllOrganizations, fetchAllOrganizationsCount } from "@/redux/slices/organization.slice";

const ExploreJobs = () => {
  const dispatch = useDispatch<any>();
  const router = useRouter();

  // Redux state
  const { allOrganizations,organizationscount,allOrganizationsLoading,allOrganizationsError } =
    useSelector((state: RootState) => state.organization);

  // Local state to store organizations and pagination info
  const [organizations, setOrganizations] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [organizationsPerPage] = useState(9); // Items per page
  const [totalPage, setTotalPage] = useState(1);

  // Fetch organizations and total count on mount
  useEffect(() => {
    dispatch(fetchAllOrganizations());
    dispatch(fetchAllOrganizationsCount());
  }, [dispatch]);

  // Update organizations state when allOrganizations changes
  useEffect(() => {
    if (allOrganizations) {
      setOrganizations(allOrganizations);
    }
  }, [allOrganizations]);

  // Calculate total pages whenever organizationscount changes
  useEffect(() => {
    if (organizationscount) {
      const totalPages = Math.ceil(organizationscount / organizationsPerPage);
      setTotalPage(totalPages);
    }
  }, [organizationscount, organizationsPerPage]);

  // Slice data for the current page
  const paginatedOrganizations = organizations.slice(
    (currentPage - 1) * organizationsPerPage,
    currentPage * organizationsPerPage
  );

  // Handle pagination actions
  const handleNextPage = () => {
    if (currentPage < totalPage) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="overflow-auto w-full">
      {/* Loading Spinner */}
      {allOrganizationsLoading ? (
        <div className="flex justify-center items-center py-4">
          <Spinner height="40px" width="40px" />
        </div>
      ) : allOrganizationsError ? (
        <div className="text-center py-4 text-red-500">
          <p>{allOrganizationsError}</p>
        </div>
      ) : paginatedOrganizations?.length === 0 ? (
        <div className="text-center py-4 text-gray-600">
          <p>No organizations available.</p>
        </div>
      ) : (
        <React.Fragment>
          <div className="w-full text-center justify-center text-sm">
            {/* Header */}
            <div className="text-lg bg-gradient-to-b from-gray-700 to-gray-800 text-white flex font-semibold shadow-md rounded-t-lg">
              <div className="flex-1 px-4 py-3 whitespace-nowrap">S.NO</div>
              <div className="flex-1 px-4 py-3 whitespace-nowrap uppercase">Names</div>
              <div className="flex-1 px-4 py-3 whitespace-nowrap uppercase">Type</div>
              <div className="flex-1 px-4 py-3 whitespace-nowrap uppercase">Action</div>
            </div>
            {/* Organizations Data */}
            <div className="flex flex-col bg-black border-[1px] border-slate-800 shadow-md rounded-b-lg overflow-hidden">
              {paginatedOrganizations.map((organization, index) => (
                <React.Fragment key={organization.id}>
                  <div className="flex items-center text-center px-4 py-3 transition border-[0.3px] border-slate-600">
                    <div className="flex-1">{(currentPage - 1) * organizationsPerPage + index + 1}</div>
                    <div className="flex-1 font-medium">{organization.organization_name}</div>
                    <div className="flex-1 text-gray-300">{organization.assessment_category.name}</div>
                    <div className="flex-1">
                      <Button
                        color="primary"
                        className="bg-blue-600 text-white px-4 py-1 rounded-lg hover:bg-blue-700 transition shadow"
                        onClick={() =>
                          router.push(
                            `/Portal/ExploreJobs/OrganizationJobs?organizationId=${organization.id}`
                          )
                        }
                      >
                        Open Position
                      </Button>
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>
            <div className="flex items-center justify-center gap-4 py-4">
              <Button
                variant="outline"
                size="icon"
                className="w-10 h-10 border-gray-300 hover:bg-gray-600 rounded-full shadow"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-6 h-6 text-gray-300" />
              </Button>
              <span className="text-sm font-medium text-gray-300">
                Page {currentPage} of {totalPage}
              </span>
              <Button
                variant="outline"
                size="icon"
                className="w-10 h-10 border-gray-300 hover:bg-gray-600 rounded-full shadow"
                onClick={handleNextPage}
                disabled={currentPage >= totalPage}
              >
                <ChevronRight className="w-6 h-6 text-gray-300 hover:text-white" />
              </Button>
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default ExploreJobs;
