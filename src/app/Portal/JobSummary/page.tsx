"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/Card";
import Spinner from "@/app/components/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { fetchTalents } from "@/redux/slices/talentmanagement.slice";
import { RootState } from "@/redux/store";

const JobSummary = () => {
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");
  const departmentId = searchParams.get("departmentId");

  const [loading, setLoading] = useState(true);
  const [jobDetails, setJobDetails] = useState<any>(null);

  const dispatch = useDispatch<any>();
  const { fetchedTalents } = useSelector((state: RootState) => state.talent);

  useEffect(() => {
    if (jobId) {
      // Check if the job details are already in the fetched talents
      const existingJob = fetchedTalents?.find(
        (job: any) => job.id === Number(jobId)
      );
      if (existingJob) {
        setJobDetails(existingJob);
        setLoading(false);
      } else {
        // Fetch job details using departmentId if not already fetched
        dispatch(fetchTalents({ departmentId }))
          .unwrap()
          .then((data: any) => {
            const fetchedJob = data && data?.find(
              (job: any) => job.id === Number(jobId)
            );
            setJobDetails(fetchedJob);
            setLoading(false);
          })
          .catch(() => setLoading(false));
      }
    }
  }, [jobId, departmentId, dispatch, fetchedTalents]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner height="30px" width="30px" />
      </div>
    );
  }

  if (!jobDetails) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-white text-xl">Job details not found.</p>
      </div>
    );
  }

  return (
    <Card className="border border-[#62626280]  ">
      <CardHeader className="h-16 w-60 rounded-r-xl bg-gradient-to-b whitespace-nowrap from-[#62626280] to-[#2D2C2C80]">
        <CardTitle>{jobDetails?.position_name}</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-5">
          <div>
            <h3 className="text-xl font-bold text-[#C4421B] mb-3">
              Description:
            </h3>
            <p className="text-white leading-7">{jobDetails?.description}</p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#C4421B] mb-3">
              Key Responsibilities:
            </h3>
            <ul className="list-disc pl-6 text-white leading-7">
              {jobDetails?.key_responsibilities?.map(
                (responsibility: string, index: number) => (
                  <li key={index}>{responsibility}</li>
                )
              )}
            </ul>
          </div>
        </div>
        <div className="p-5">
          <h3 className="text-xl font-bold text-[#C4421B] mb-3 ">
            Qualifications:
          </h3>
          <ul className="list-disc pl-6 text-white leading-7">
            {jobDetails?.qualification?.map(
              (qualification: string, index: number) => (
                <li key={index}>{qualification}</li>
              )
            )}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobSummary;
