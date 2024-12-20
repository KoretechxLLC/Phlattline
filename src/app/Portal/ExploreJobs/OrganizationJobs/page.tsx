"use client"
import React, { useEffect, useState } from "react";
import { Button } from "@/app/components/button-sidebar";
import { useRouter, useSearchParams } from "next/navigation";
import Spinner from "@/app/components/Spinner";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchjoborganization } from "@/redux/slices/jobapplication.slice";
import { RootState } from "@/redux/store";

interface OrganizationJobsProps {
  params: {
    id: string;
  };
}

const OrganizationJobs: React.FC<OrganizationJobsProps> = ({
  params: { id },
}) => {
  const searchParams = useSearchParams();
  const dispatch = useDispatch<any>();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { JobbyOrganization }: any = useSelector((state: RootState) => state.jobapplication);
  const organizationId = searchParams.get("organizationId"); // Get organizationId from URL
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);


  useEffect(() => {
    if (organizationId) {
      setLoading(true);
      dispatch(fetchjoborganization({ organizationId: Number(organizationId) })).then(() => {
        setLoading(false);
      });
    }
  }, [organizationId, dispatch]);

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

  // Filter jobs based on organizationId
  const jobs = JobbyOrganization?.data?.filter(
    (job: any) => job.organization_id === Number(organizationId)
  ) || [];

  return (
    <div className="overflow-auto w-full">
      {loading ? (
        <div className="flex justify-center items-center py-4">
          <Spinner height="30px" width="30px" />
        </div>
      ) : jobs.length === 0 ? (
        <div className="text-center py-4 text-gray-600">
          <p>No jobs available for this organization.</p>
        </div>
      ) : (
        <div className="w-full text-center justify-center text-sm">
          {/* Header */}
          <div className="text-lg bg-gradient-to-b from-gray-700 to-gray-800 text-white flex font-semibold shadow-md rounded-t-lg">
            <div className="flex-1 px-4 py-3 whitespace-nowrap">S.No</div>
            <div className="flex-1 px-4 py-3 whitespace-nowrap">Name</div>
            <div className="flex-1 px-4 py-3 whitespace-nowrap">Department</div>
            <div className="flex-1 px-4 py-3 whitespace-nowrap">Date</div>
            <div className="flex-1 px-4 py-3 whitespace-nowrap">Action</div>
          </div>
          {/* Jobs Data */}
          <div className="flex flex-col bg-black border-[1px] border-slate-800 shadow-md rounded-b-lg overflow-hidden">
            {jobs.map((job: any, index: number) => (
              <React.Fragment key={job.id}>
                <div className="flex items-center text-center px-4 py-3 transition border-[0.3px] border-slate-600">
                  <div className="flex-1">{index + 1}</div>
                  <div className="flex-1">{job.position_name}</div>
                  <div className="flex-1">{job.department.name}</div>
                  <div className="flex-1">{new Date(job.created_at).toLocaleDateString()}</div>
                  <div className="flex-1">
                    <Button
                      color="primary"
                      className="bg-red-600 text-white px-4 py-1 rounded-lg hover:bg-red-700 transition"
                      onClick={() =>
                        router.push(`/Portal/JobSummary?jobId=${job.id}&departmentId=${job.department_id}`)
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
