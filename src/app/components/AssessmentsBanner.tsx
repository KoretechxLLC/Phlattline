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

const MostSales = () => {
  const router = useRouter();
  const { userData } = useSelector((state: RootState) => state.auth);

  return (
    <Card className="w-full rounded-3xl  bg-gradient-to-b whitespace-nowrap from-[#62626280] to-[#2D2C2C80] p-5 md:h-full">
      <CardHeader className="flex flex-col md:flex-row">
        <CardTitle className="flex-1 text-2xl md:text-3xl">
          Assessments
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex-none md:w-1/2">
            <h4 className="text-default-600 text-base md:text-xl font-normal mx-1.5">
              Identify Your Strengths and Weaknesses
            </h4>
            <div className="text-xs md:text-lg font-medium mx-1.5 text-default-900">
              Preach almost the soup tap close child scratch ago <br /> invite
              tower best everywhere calculator.
            </div>

            {/* Button */}
            <div className="mt-5 md:mt-20">
              <button
                disabled={userData?.assessment_status}
                onClick={() => {
                  router.push("/Individualassessment");
                }}
                className="text-white px-5 text-sm md:text-base lg:text-base flex w-72 h-11 justify-center items-center rounded-3xl bg-gradient-to-b from-[#B50D34] to-[#BAA716]"
              >
                Take the Assessment
              </button>
            </div>
          </div>

          {/* Image Container */}
          <div className="flex justify-center items-center md:mx-0 md:w-full">
            <Image
              src={"/assets/AssessmentBanner.svg"}
              width={400}
              height={400}
              alt={"Assessment Banner"}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MostSales;
