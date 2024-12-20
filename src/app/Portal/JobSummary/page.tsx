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
import { fetchTalents, fetchTalentsforindividuals } from "@/redux/slices/talentmanagement.slice";
import { RootState } from "@/redux/store";
import { Button } from "@/app/components/button-sidebar";
import UploadCVPopup from "@/app/components/uploadCV";

const JobSummary = () => {
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");
  const departmentId = searchParams.get("departmentId");
  const { userData } = useSelector((state: RootState) => state.auth);
  const userType = userData?.user_type_id;
  const [loading, setLoading] = useState(true);
  const [jobDetails, setJobDetails] = useState<any>(null);
  const [showCVPopup, setShowCVPopup] = useState(false);
  const dispatch = useDispatch<any>();
  const userid = userData?.id;
  const { fetchedTalents } = useSelector((state: RootState) => state.talent);

  useEffect(() => {
    if (!jobId) return;
  
    if (userType === 2) {
      const existingJob = fetchedTalents?.find(
        (job: any) => job.id === Number(jobId)
      );
      if (existingJob) {
        setJobDetails(existingJob);
        setLoading(false);
      } else {
        dispatch(fetchTalents({ departmentId }))
          .unwrap()
          .then((data: any) => {
            const fetchedJob =
              data && data?.find((job: any) => job.id === Number(jobId));
            setJobDetails(fetchedJob);
            setLoading(false);
          })
          .catch(() => setLoading(false));
      }
    }
  
    if (userType === 1) {
      const existingJob = fetchedTalents?.find(
        (job: any) => job.id === Number(jobId)
      );
      if (existingJob) {
        setJobDetails(existingJob);
        setLoading(false);
      } else {
        dispatch(fetchTalentsforindividuals({ departmentId }))
          .unwrap()
          .then((data: any) => {
            const fetchedJob =
              data && data?.find((job: any) => job.id === Number(jobId));
            setJobDetails(fetchedJob);
            setLoading(false);
          })
          .catch(() => setLoading(false));
      }
    }
  }, [userType, jobId, departmentId, dispatch, fetchedTalents]);
  

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
    <Card className="border border-[#62626280]">
      <CardHeader className="h-16 w-fit rounded-r-xl pl-10 pr-10 bg-gradient-to-b whitespace-nowrap from-[#62626280] to-[#2D2C2C80]">
        <CardTitle>{jobDetails?.position_name}</CardTitle>
       
      </CardHeader>
      <div className="flex justify-end mr-10">
      {(userType === 1 || userType === 3) && (
          <Button
            onClick={() => setShowCVPopup(true)}
            color="primary"
            className="rounded-3xl"
          >
            Apply Now
          </Button>
        )}
      </div>

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
        <UploadCVPopup talentId={jobDetails.id} userId={userid} show={showCVPopup} onClose={() => setShowCVPopup(false)} />
    </Card>
  );
};

export default JobSummary;
