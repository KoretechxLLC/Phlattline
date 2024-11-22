"use client";

import * as React from "react";
import { Button } from "@/app/components/button-sidebar";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Spinner from "@/app/components/Spinner"; // Import Spinner component

// Sample job data (can be replaced by actual data from an API)
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
  const [loading, setLoading] = useState(true); // Loader state
  const [jobsAvailable, setJobsAvailable] = useState(true); // Check if jobs are available
  const router = useRouter();
  const organizationId = searchParams.get("organizationId");

  useEffect(() => {
    // Simulate loading delay
    setTimeout(() => {
      if (organizationId) {
        const filteredOrganizationData = jobData.filter(
          (e: any) => Number(e.id) === Number(organizationId)
        );
        if (filteredOrganizationData.length > 0) {
          setData(filteredOrganizationData); // Set filtered job data
        } else {
          setJobsAvailable(false); // No jobs found
        }
      }
      setLoading(false); // Set loading to false after the simulated fetch
    }, 1000); // Simulate delay for data fetching
  }, [organizationId]);

  return (
    <div className="overflow-auto w-full">
      {loading ? (
        // Show Spinner while loading
        <div className="flex justify-center items-center py-4">
          <Spinner height="30px" width="30px" />
        </div>
      ) : !jobsAvailable ? (
        // Show message if no jobs available
        <div className="text-center py-4 text-gray-600">
          <p>No jobs available for this organization.</p>
        </div>
      ) : (
        // Show the table when jobs are available
        <table className="table-auto w-full text-center text-lg border border-gray-500">
          <thead>
            <tr className="bg-gradient-to-b from-[#62626280] to-[#2D2C2C80] text-white">
              <th className="px-4 py-2">S.No</th>
              <th className="px-4 py-2">Names</th>
              <th className="px-4 py-2">Department</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {jobData?.map((job, index) => (
              <tr key={job.id}>
                <td className="px-4 py-2 border border-gray-500">
                  {index + 1}
                </td>
                <td className="px-4 py-2 border border-gray-500">{job.name}</td>
                <td className="px-4 py-2 border border-gray-500">
                  {job.department}
                </td>
                <td className="px-4 py-2 border border-gray-500">{job.type}</td>
                <td className="px-4 py-2 border border-gray-500">{job.date}</td>
                <td className="px-4 py-2 border border-gray-500">
                  <Button
                    color="primary"
                    className="bg-red-600 text-white px-4 py-1 rounded-lg hover:bg-red-700 transition"
                    onClick={() =>
                      router.push(
                        `/Portal/ExploreJobs/OrganizationJobs/JobSummary?jobId=${job.id}`
                      )
                    }
                  >
                    Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrganizationJobs;
