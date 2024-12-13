"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/app/components/Card";
import { Button } from "@/app/components/button-sidebar";
import { useRouter, useSearchParams } from "next/navigation";
import UploadCVPopup from "@/app/components/uploadCV";
import Spinner from "@/app/components/Spinner"; // Import the Spinner component
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Icon from "@/app/components/utility-icon";

interface JobDetails {
  id: string;
  title: string;
  summary: string;
  qualifications: string[];
  responsibilities: string[];
}

const summaryData: JobDetails[] = [
  {
    id: "1",
    title: "Software Engineer",
    summary: `
      As an Administrative Assistant, you will play a vital role in supporting
      the daily operations of our organization. You will work closely with
      department heads, provide essential support to team members, and ensure
      that all administrative tasks are managed efficiently. This position
      requires strong organizational skills, attention to detail, and the
      ability to handle multiple tasks simultaneously.
    `,
    qualifications: [
      "Education: High school diploma or equivalent; Associate’s or Bachelor’s degree preferred.",
      "Experience: Minimum of 1–2 years in an administrative role or similar.",
      "Technical Skills: Proficiency in Microsoft Office Suite (Word, Excel, PowerPoint, Outlook) and familiarity with scheduling software.",
      "Communication Skills: Excellent verbal and written communication skills.",
      "Organizational Skills: Strong ability to multitask, prioritize tasks, and manage time effectively.",
      "Attention to Detail: Accuracy and consistency in managing data, documentation, and correspondence.",
    ],
    responsibilities: [
      "Administrative Support: Provide general support to the management and other team members, including handling phone calls, emails, and scheduling appointments.",
      "Documentation: Prepare and edit documents, reports, and presentations, ensuring accuracy and adherence to company standards.",
      "Data Entry: Maintain databases and spreadsheets with up-to-date and accurate information.",
      "Scheduling: Manage calendars, coordinate meetings, and arrange travel itineraries for staff.",
      "Office Management: Oversee office supplies and equipment, ensuring a well-organized, functional work environment.",
      "Communication: Act as a point of contact for both internal and external parties, relaying messages and providing necessary information.",
      "Project Assistance: Assist in planning and executing various projects as required.",
      "File Management: Organize and maintain files and records, ensuring easy retrieval and security of sensitive information.",
    ],
  },
  // Additional job data can be added here
];

interface JobSummaryProps {
  params: {
    id: string;
  };
}

const JobSummary: React.FC<JobSummaryProps> = ({ params: { id } }) => {
  const searchParams = useSearchParams();
  const [data, setData] = useState<JobDetails | undefined>();
  const [loading, setLoading] = useState(true); // Loading state to show the loader initially
  const { userData } = useSelector((state: RootState) => state.auth);
  const usertype = userData?.user_type_id;
  const jobId = searchParams.get("jobId");
  const router = useRouter();

  // Simulate loading of job data with a timeout (replace with actual data fetching logic)
  useEffect(() => {
    if (jobId) {
      setLoading(true); // Set loading to true when the data is being fetched
      const filteredJobData = summaryData.find((e) => e.id === jobId);
      setTimeout(() => {
        setData(filteredJobData); // Set the data after a delay (simulating data fetch)
        setLoading(false); // Set loading to false after the data is loaded
      }, 2000); // Simulate loading for 2 seconds
    }
  }, [jobId]);

  const [showCVPopup, setShowCVPopup] = useState(false);

  if (!data && loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner height="30px" width="30px" />
      </div>
    );
  }

  return (
    <Card className="border border-[#62626280] py-8">
      <CardHeader className="rounded-xl shadow-lg p-8 mx-auto w-full bg-black">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2
            className={`text-3xl font-bold text-white ${
              usertype === 1 || usertype === 3 ? "" : "flex-grow text-center"
            }`}
          >
            {data?.title}
          </h2>
          {(usertype === 1 || usertype === 3) && (
            <Button
              onClick={() => setShowCVPopup(true)}
              color="primary"
              className="rounded-3xl"
            >
              Apply Now
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent>
        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div>
            <div className="mb-6">
              <h3 className="text-xl font-bold text-red-600 mb-3">
                Job Summary:
              </h3>
              <p className="text-white leading-7">{data?.summary}</p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-red-600 mb-3">
                Qualifications:
              </h3>
              <ul className="list-disc pl-6 text-white leading-7">
                {data?.qualifications.map((qualification, index) => (
                  <li key={index}>{qualification}</li>
                ))}
              </ul>
            </div>
          </div>
          {/* Right Column */}
          <div>
            <h3 className="text-xl font-bold text-red-600 mb-3">
              Key Responsibilities:
            </h3>
            <ul className="list-disc pl-6 text-white leading-7">
              {data?.responsibilities.map((responsibility, index) => (
                <li key={index}>{responsibility}</li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
      <UploadCVPopup show={showCVPopup} onClose={() => setShowCVPopup(false)} />
    </Card>
  );
};

export default JobSummary;
