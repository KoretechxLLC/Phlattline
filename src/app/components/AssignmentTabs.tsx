"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/app/components/Card";
import { Button } from "@/app/components/button-sidebar";
import Spinner from "@/app/components/Spinner";
import Icon from "./utility-icon";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployeeAssessments } from "@/redux/slices/employeemyassessment.slice";
import { RootState } from "@/redux/store";
import Image from "next/image";
import { fetchedPurchaseAssessment } from "@/redux/slices/purchaseAssessment.slice";

const assignmentItems = [
  {
    title: "Goal Settings",
    description: "Define personal goals for the quarter.",
  },
  {
    title: "Team Collaboration",
    description: "Enhance collaboration across departments.",
  },
  {
    title: "Skill Development",
    description: "Focus on upskilling for career growth.",
  },
];

const AssignmentTabs: React.FC = () => {
  const dispatch = useDispatch<any>();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { userData } = useSelector((state: RootState) => state.auth);
  const organization_id = userData?.organization_id;
  const { getemployeeaseesments } = useSelector((state: RootState) => state.employeeMyAssessment);
  const { purchasedAssessmentData, purchasedAssessmentDataLoader } = useSelector((state: RootState) => state.purchaseAssessment);
  const [assessments, setAssessments] = useState<any[]>([]);




  useEffect(() => {
    if (userData?.id) {
      dispatch(fetchedPurchaseAssessment({ user_Id: userData.id })); // Ensure key matches expected payload
    }
  }, [userData?.id, dispatch]);


  useEffect(() => {
    if (purchasedAssessmentData) {
      setAssessments(purchasedAssessmentData);
    }
  }, [purchasedAssessmentData]);


  const handleButtonClick = (id: any) => {
    if (id) {
      router.push(`/paidAssessment?assessmentId=${id}`);
    }
  };


  const handleRetakeAssessmentsClick = () => {
    router.push("/Portal/ODaas?tab=Diagnostics");
  };

  return (
    <div className="flex space-x-4">
      {purchasedAssessmentDataLoader ? (
        <Card className="w-[100em] h-full 4xl:p-4 p-8 bg-gradient-to-b from-[#62626280] to-[#2D2C2C80]">
          <Spinner height="30px" width="30px" />
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-[80%_20%] gap-4 w-full">
            {/* Cards Section */}
            <div className="flex gap-3">
              {assessments
                .filter((item) => item?.completed === false) // Filter assessments with completed: false
                .slice(0, 4) // Limit to the first 4 assessments
                .map((item, index) => (
                  <Card
                    key={index}
                    className="4xl:min-w-[250px] min-w-[300px] w-full 4xl:py-3 4xl:px-6 py-3 px-10 bg-gradient-to-b from-[#62626280] to-[#2D2C2C80]"
                  >
                    <CardContent className="flex flex-col justify-center items-center h-full text-center">
                      <ul className="space-y-2">
                        <Image
                          src={`/api/images?filename=${item?.individual_assessments.image}&folder=assessmentsImage`}
                          width={1000}
                          height={1000}
                          className="4xl:h-20 4xl:w-32 h-24 w-36 mx-auto"
                          alt="Assessment Banner"
                        />
                        <li className="text-[16px] font-semibold">
                          {item.individual_assessments.title}
                        </li>
                      </ul>
                      <div className="my-2 flex justify-center">
                        <Button
                          className="text-md md:text-2 w-full sm:w-auto rounded-2xl px-3 py-2 sm:px-6 cursor-pointer"
                          color="primary"
                          onClick={() => {
                            handleButtonClick(item?.individual_assessment_id);
                          }}
                        >
                          Take Assessment
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>


            {/* Retake Assessments Section */}
            <div className="flex justify-center mr-10">
              <Card
                onClick={handleRetakeAssessmentsClick}
                className="min-w-[200px] w-full 4xl:py-3 4xl:px-6 py-6 px-12 bg-gradient-to-b from-[#B50D34] to-[#BAA716] cursor-pointer"
              >
                <CardContent className="flex flex-col justify-center items-center h-full">
                  <Icon
                    icon={"mingcute:arrow-right-up-circle-fill"}
                    className="w-24 h-24"
                  />
                  <span className="5xl:text-md 4xl:text-sm lg:text-xl font-semibold text-gray-200">
                    Retake Assessments
                  </span>
                </CardContent>
              </Card>
            </div>
          </div>


        </>
      )}
    </div>
  );
};

export default AssignmentTabs;
