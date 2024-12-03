"use client";
import React, { useState, Dispatch, SetStateAction, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/app/components/Card";
import Icon from "@/app/components/utility-icon";
import TabButton from "@/app/components/TabButton";
import { Button } from "@/app/components/button-sidebar";
import { Badge } from "@/app/components/badge";
import PaymentPopup from "@/app/components/PaymentPopup";
import { useRouter, useSearchParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import {  fetchusercourses } from "@/redux/slices/courses.slice";
import Spinner from "@/app/components/Spinner";
import EmployeeModal from "@/app/components/employeeModal";

interface CourseDetailsProps {
  params: {
    id: string;
  };
}

const CourseDetail: React.FC<CourseDetailsProps> = ({ params: { id } }) => {
  const router = useRouter();
  const [isBought, setIsBought] = useState<boolean>(false);
  const [showComments, setShowComments] = useState<Boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<any>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [imgError, setImgError] = useState(false);

  const searchParams = useSearchParams();
  const courseId = searchParams.get("courseId");
  const { usercourses, loading } = useSelector((state: RootState) => state.courses);
  const dispatch: any = useDispatch();

  const { userData } = useSelector((state: RootState) => state.auth);
  const userId: any = userData?.id;
  const userType = userData?.user_type_id;

  const handleError = () => {
    setImgError(true); // Set error flag when image fails to load
  };

  useEffect(() => {
    if (!usercourses || usercourses.length == 0) {
      dispatch(fetchusercourses(userId));
    }
  }, [usercourses, dispatch]);

  useEffect(() => {
    if (courseId) {
      const filteredCourseData = usercourses.find(
        (e: any) => Number(e.course_id) === Number(courseId)
      );
      setData(filteredCourseData?.courses);
    }
  }, [usercourses, courseId, usercourses?.length]);

  const handleBuyClick = () => {
    setIsOpen(true);
  };

  const handleGetStartedClick = () => {
    setShowComments(true);
  };

  const videoWithSequenceOne = data?.videos.find(
    (video: any) => video.sequence === 1
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to handle opening the modal
  const handleViewAllClick = () => {
    setIsModalOpen(true);
  };

  // Function to handle closing the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (userData.user_courses && userData.user_courses.length > 0) {
      let courseData = userData.user_courses.find((e: any) => {
        return e.course_id == courseId;
      });
      if (courseData) {
        setIsBought(true);
      }
    }
  }, [courseId, userData]);

  return (
    <>
      {loading ? (
        <Spinner height="30px" width="30px" />
      ) : (
        <div
          className="p-5 grid grid-cols-1 md:grid-cols-[70%_30%] gap-5 bg-default-50 w-full h-full rounded-lg"
          style={{ fontFamily: "Sansation" }}
        >
          <div>
            <div className="flex items-center px-5 py-1 space-x-4">
              <h1 className="text-3xl font-bold">
                {data && data?.course_name}
              </h1>
              <Badge className="font-bold rounded-2xl text-md bg-gradient-to-b whitespace-nowrap from-[#B50D34] to-[#BAA716] text-white">
                <span className="px-5" style={{ fontFamily: "Sansation" }}>
                  Basic
                </span>
              </Badge>
            </div>

            <div className="relative w-full mx-2">
              <>
                <Image
                  src={
                    imgError
                      ? "/assets/DummyImg.png"
                      : `/api/images?filename=${videoWithSequenceOne?.thumbnail_url}&folder=coursesthumbnails`
                  }
                  alt="Course Thumbnail"
                  className="w-full 4xl:h-64 h-96 rounded-lg object-cover container border-[1px] border-slate-600 my-2"
                  width={1000}
                  height={1000}
                  onError={handleError} // If image fails to load, trigger the error handler
                />
                <div className="absolute left-0 bottom-0 m-4">
                  <div className="backdrop-blur-md bg-opacity-50 p-3 rounded-full">
                    <Icon
                      icon="tdesign:play-circle"
                      className="text-white w-32 h-32 text-3xl"
                    />
                  </div>
                </div>
              </>
            </div>

            <div className="space-y-5 w-full my-2 mx-2">
              <div className="rounded-2xl">
                <Card className="bg-gradient-to-b from-[#62626280] to-[#2D2C2C80] p-4">
                  <CardContent>
                    <div className="flex items-center justify-between text-default-900 text-sm lg:text-base font-normal">
                      <h1 className="text-4xl font-bold">
                        {data?.course_name}
                      </h1>
                      <div className="flex items-center gap-1.5">
                        <p className="text-gray-500 mx-5">|</p>
                        <Icon
                          icon="heroicons-solid:users"
                          className="text-yellow-600"
                        />
                        <span className="text-default-500">
                          {data?.subscribers}
                        </span>
                      </div>
                    </div>
                    <div className="text-default-600 text-sm lg:text-base font-normal my-4 text-gray-500">
                      <p>{data?.description}</p>
                    </div>
                  </CardContent>
                </Card>

                <div className="my-5 md:my-10 space-x-4">
                  {!isBought ? (
                    <Button
                      className="text-white px-5 text-sm md:text-base lg:text-base flex w-full justify-center items-center rounded-3xl"
                      size="default"
                      color="primary"
                      style={{ fontFamily: "Sansation" }}
                      onClick={handleBuyClick}
                    >
                      Buy now for ${data?.price}
                    </Button>
                  ) : (
                    <>
                      <div className="flex space-x-4">
                        <Button
                          className="text-white px-5 text-sm md:text-base lg:text-base flex w-full justify-center items-center rounded-3xl"
                          size="default"
                          color="primary"
                          style={{ fontFamily: "Sansation" }}
                          onClick={() =>
                            router.push(
                              `/Portal/Courses/CourseModule?courseId=${data?.id}`
                            )
                          }
                        >
                          Get Started
                        </Button>
                        {userType === 2 && (
                          <Button
                            className="text-white px-5 text-sm md:text-base lg:text-base flex w-full justify-center items-center rounded-3xl"
                            size="default"
                            color="secondary"
                            style={{ fontFamily: "Sansation" }}
                            onClick={handleViewAllClick} // Open modal on button click
                          >
                            Assign
                          </Button>
                        )}
                      </div>
                    </>
                  )}
                </div>

                <div
                  className="my-0"
                  style={{
                    display: userData?.user_type_id === 3 ? "none" : "block",
                  }}
                >
                  <TabButton
                    backgroundColor="#FF0000"
                    text="Training-On Demand"
                    imageSrc="/assets/LiveIcon.png"
                    textColor="#FFFFFF"
                    arrowImageSrc="/assets/ArrowRightUp.png"
                    showModalOnClick={true}
                    isClickable={true}
                    modalType="spring"
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="grid my-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
              {data?.videos.map((video: any) => (
                <div
                  key={video.id}
                  className="relative border border-[#62626280] rounded-lg"
                >
                  <Image
                    src={
                      imgError
                        ? "/assets/DummyImg.png"
                        : `/api/images?filename=${video.thumbnail_url}&folder=coursesthumbnails`
                    }
                    alt={`Video Thumbnail ${video.id}`}
                    className="w-full h-56 rounded-lg object-cover container"
                    width={1000}
                    height={1000}
                    onError={handleError}
                  />
                  <div className="absolute inset-0 flex justify-center items-center">
                    <div className="backdrop-blur-md bg-opacity-50 p-3 rounded-full">
                      <Icon icon="ph:play" className="text-white text-3xl" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 mb-3 -ml-[10px]">
                    <div className="bg-black bg-opacity-60 p-2 pl-4 pr-4 rounded-br-2xl">
                      <span className="text-lg font-bold text-white">
                        {video.title}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <PaymentPopup
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            setIsBought={setIsBought}
            courseId={courseId}
          />
          <EmployeeModal open={isModalOpen} onClose={handleCloseModal} />
        </div>
      )}
    </>
  );
};

export default CourseDetail;
