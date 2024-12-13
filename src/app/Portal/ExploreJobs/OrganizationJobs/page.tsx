"use client";

import * as React from "react";
import { Button } from "@/app/components/button-sidebar";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Spinner from "@/app/components/Spinner";
import { ChevronLeft, ChevronRight } from "lucide-react";

const jobData = [
  {
    id: 1,
    name: "Front end Developer",
    department: "Development",
    type: "IT",
    date: "2024-11-10",
  },
  {
    id: 2,
    name: "UI/UX",
    department: "Design",
    type: "Design",
    date: "2024-11-15",
  },
  {
    id: 3,
    name: "Architect",
    department: "Construction",
    type: "Construction",
    date: "2024-11-20",
  },
  {
    id: 4,
    name: "Biomedical Engineer",
    department: "Healthcare",
    type: "Healthcare",
    date: "2024-11-22",
  },
];

interface OrganizationJobsProps {
  params: {
    id: string;
  };
}

const OrganizationJobs: React.FC<OrganizationJobsProps> = ({
  params: { id },
}) => {
  const searchParams = useSearchParams();
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [jobsAvailable, setJobsAvailable] = useState(true);
  const router = useRouter();
  const organizationId = searchParams.get("organizationId");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    setTimeout(() => {
      if (organizationId) {
        const filteredOrganizationData = jobData.filter(
          (e: any) => Number(e.id) === Number(organizationId)
        );
        if (filteredOrganizationData.length > 0) {
          setData(filteredOrganizationData);
        } else {
          setJobsAvailable(false);
        }
      }
      setLoading(false);
    }, 1000);
  }, [organizationId]);

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
      {loading ? (
        <div className="flex justify-center items-center py-4">
          <Spinner height="30px" width="30px" />
        </div>
      ) : !jobsAvailable ? (
        <div className="text-center py-4 text-gray-600">
          <p>No jobs available for this organization.</p>
        </div>
      ) : (
        <div className="w-full text-center justify-center text-sm">
          {/* Header */}
          <div className="text-lg bg-gradient-to-b from-[#62626280] to-[#2D2C2C80] text-white flex">
            <div className="flex-1 px-4 py-3 whitespace-nowrap">S.No</div>
            <div className="flex-1 px-4 py-3 whitespace-nowrap">Name</div>
            <div className="flex-1 px-4 py-3 whitespace-nowrap">Department</div>
            <div className="flex-1 px-4 py-3 whitespace-nowrap">Type</div>
            <div className="flex-1 px-4 py-3 whitespace-nowrap">Date</div>
            <div className="flex-1 px-4 py-3 whitespace-nowrap">Action</div>
          </div>
          {/* Jobs Data */}
          <div className="flex flex-col divide-y divide-gray-300">
            {data?.map((job: any, index: number) => (
              <React.Fragment key={job.id}>
                <div className="flex items-center text-center px-4 py-3 ">
                  <div className="flex-1">{index + 1}</div>
                  <div className="flex-1">{job.name}</div>
                  <div className="flex-1">{job.department}</div>
                  <div className="flex-1">{job.type}</div>
                  <div className="flex-1">{job.date}</div>
                  <div className="flex-1">
                    <Button
                      color="primary"
                      className="bg-red-600 text-white px-4 py-1 rounded-lg hover:bg-red-700 transition"
                      onClick={() =>
                        router.push(`/Portal/JobSummary?jobId=${job.id}`)
                      }
                    >
                      Details
                    </Button>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
          <div className="flex items-center justify-center gap-2 py-4">
            <Button
              variant="outline"
              size="icon"
              className="w-8 h-8 border-transparent hover:bg-transparent"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-5 h-5 text-default-900" />
            </Button>
            <span className="text-sm font-medium text-default-900">
              Page {currentPage} of {totalPage}
            </span>
            <Button
              variant="outline"
              size="icon"
              className="w-8 h-8 border-transparent hover:bg-transparent"
              onClick={handleNextPage}
              disabled={currentPage >= totalPage}
            >
              <ChevronRight className="w-5 h-5 text-default-900" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrganizationJobs;
