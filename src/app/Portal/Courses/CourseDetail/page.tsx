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
import { fetchcourses } from "@/redux/slices/courses.slice";
import Spinner from "@/app/components/Spinner";

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
  const searchParams = useSearchParams();
  const courseId = searchParams.get("courseId");
  const { courses, loading } = useSelector((state: RootState) => state.courses);
  const dispatch: any = useDispatch();

  const { userData } = useSelector((state: RootState) => state.auth);
  const userId: any = userData?.id;

  useEffect(() => {
    if (!courses || courses.length == 0) {
      dispatch(fetchcourses());
    }
  }, [courses, dispatch]);

  useEffect(() => {
    if (courseId) {
      const filteredCourseData = courses.find(
        (e: any) => Number(e.id) === Number(courseId)
      );
      setData(filteredCourseData);
    }
  }, [courses, courseId, courses?.length]);

  const handleBuyClick = () => {
    setIsOpen(true);
    setIsBought(true);
  };

  const handleGetStartedClick = () => {
    setShowComments(true);
  };

  const videoWithSequenceOne = data?.videos.find(
    (video: any) => video.sequence === 1
  );

  const handlePlayVideo = () => {
    setIsPlaying(true);
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div
          className="p-5 grid grid-cols-1 md:grid-cols-[70%_30%] gap-5 bg-default-50 w-full h-full space-y-6 rounded-lg"
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
                  src={`/courses/thumbnails/${
                    videoWithSequenceOne?.thumbnail_url ||
                    "default-thumbnail.jpg"
                  }`}
                  alt="Course Thumbnail"
                  className="w-full 4xl:h-64 h-80 rounded-lg object-contain container border-[1px] border-slate-600 my-2"
                  width={1000}
                  height={1000}
                />
                <div className="absolute left-0 bottom-0 m-4">
                  <div className="backdrop-blur-md bg-opacity-50 p-3 rounded-full">
                    <Icon
                      icon="tdesign:play-circle"
                      className="text-white w-32 h-32 text-3xl hover:text-red-500 cursor-pointer"
                      onClick={handlePlayVideo}
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
                        <Icon icon="ph:star-fill" className="text-red-600" />
                        <Icon icon="ph:star-fill" className="text-red-600" />
                        <Icon icon="ph:star-fill" className="text-red-600" />
                        <Icon icon="ph:star-fill" className="text-red-600" />
                        <Icon
                          icon="ph:star-fill"
                          className="text-default-300/80"
                        />
                        <span className="ltr:pl-2 rtl:pr-2 text-default-500">
                          {data?.rating}
                        </span>
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
                  )}
                </div>

                <div className="my-0">
                  <TabButton
                    backgroundColor="#FF0000"
                    text="Training-On Demand"
                    imageSrc="/assets/LiveIcon.png"
                    textColor="#FFFFFF"
                    arrowImageSrc="/assets/ArrowRightUp.png"
                    showModalOnClick={true}
                    isClickable={true}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="h-56">
            <div className="grid my-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
              {data?.videos.map((video: any) => (
                <div
                  key={video.id}
                  className="relative border border-gray-500 rounded-lg"
                >
                  <Image
                    src={`/courses/thumbnails/${video.thumbnail_url}`}
                    alt={`Video Thumbnail ${video.id}`}
                    className="w-full h-full rounded-lg container"
                    width={1000}
                    height={1000}
                  />
                  <div className="absolute inset-0 flex justify-center items-center">
                    <div className="backdrop-blur-md bg-opacity-50 p-3 rounded-full">
                      <Icon icon="ph:play" className="text-white text-3xl" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 p-2 text-white bg-opacity-60 rounded-br-lg rounded-tl-lg">
                    <span className="text-lg font-bold">{video.title}</span>
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
            userId={userId}
          />
        </div>
      )}
    </>
  );
};

export default CourseDetail;
