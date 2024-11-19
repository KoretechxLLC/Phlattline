"use client";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/Card";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useState } from "react";
import Icon from "./utility-icon";

const Banner = () => {
  const router = useRouter();
  const { userData } = useSelector((state: RootState) => state.auth);
  const [message, setMessage] = useState("");

  const handleButtonClick = () => {
    if (userData?.assessment_status === true ) {
      setMessage("You have already taken the assessment.");
      setTimeout(() => {
        setMessage(""); // Clear the message after 5 seconds
      }, 5000);
    } else if(userData?.assessment_status === false ) {
      router.push("/Individualassessment");
    }
  };

  return (
    <Card className="w-full rounded-3xl bg-gradient-to-b whitespace-nowrap from-[#62626280] to-[#2D2C2C80] p-7 4xl:p-3 md:h-full">
      <CardHeader className="flex flex-col md:flex-row">
        <CardTitle className="flex-1 text-2xl md:text-3xl mx-5">
          Assessments
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex-none md:w-1/2 my-1 relative">
            <h4 className="text-default-600 text-base md:text-xl lg:text-xl font-normal 4xl:mx-7 mx-1.5">
              Identify Your Strengths and Weaknesses
            </h4>
            <div className="text-xs 4xl:text-sm md:text-md lg:text-xl font-medium mx-1.5 4xl:mx-7 text-default-900">
              Preach almost the soup tap close child scratch ago <br /> invite
              tower best everywhere calculator.
            </div>

            {/* Button */}
            <div className="4xl:my-20 md:my-20">
              <button
                onClick={handleButtonClick}
                className="cursor-pointer text-white px-5 text-sm md:text-base lg:text-base flex w-72 h-11 justify-center items-center rounded-3xl bg-gradient-to-b from-[#B50D34] to-[#BAA716]"
              >
                Take the Assessment
              </button>

              {/* Message Display */}
              {message && (
                <span className="absolute left-0 bottom-0 flex items-center text-white my-2 text-sm font-semibold transition-all opacity-100">
                  <Icon
                    icon="cuida:alert-outline"
                    className="w-10 h-10 text-orange-500 mr-2"
                  />
                  {message}
                </span>
              )}
            </div>
          </div>

          {/* Image Container */}
          <div className="flex justify-center items-center md:mx-0 md:w-full">
            <Image
              src={"/assets/AssessmentBanner.svg"}
              width={300}
              height={300}
              alt={"Assessment Banner"}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Banner;
