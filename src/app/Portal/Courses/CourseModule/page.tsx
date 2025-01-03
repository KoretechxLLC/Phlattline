"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/Card";
import Icon from "@/app/components/utility-icon";
import { Badge } from "@/app/components/badge";
import CommentSection from "@/app/components/CommentSection";
import ModuleList from "@/app/components/ModuleList";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import ReactPlayer from "react-player";
import {
  fetchusercourses,
  resetVideoProgressStatus,
  updateVideoProgress,
} from "@/redux/slices/courses.slice";
import ButtonWrapper from "@/app/components/Button";

interface CourseModuleProps {
  params: {
    id: string;
  };
}

const CourseModule: React.FC<CourseModuleProps> = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { usercourses, videoProgressSuccess } = useSelector(
    (state: RootState) => state.courses
  );
  const { userData } = useSelector((state: RootState) => state.auth);
  const [filteredData, setFilteredData] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoRun, setVideoRun] = useState(false);
  const [statusLoader, setStatusLoader] = useState(false);
  const [videoDuration, setVideoDuration] = useState<number>(0);
  const [totalDuration, setTotalDuration] = useState<number>(0);
  const [imgError, setImgError] = useState(false);
  const handleError = () => {
    setImgError(true); // Set error flag when image fails to load
  };

  const courseId = searchParams.get("courseId");
  const videoId = searchParams.get("videoId");
  const userId: any = userData?.id;
  const dispatch: any = useDispatch();
  useEffect(() => {
    if (!usercourses || usercourses.length == 0) {
      if (userId) {
        dispatch(fetchusercourses({ userId }));
      }
    }
  }, [usercourses, dispatch]);
  useEffect(() => {
    if (courseId && usercourses?.length > 0) {
      const getCourse = async () => {
        const filteredCourseData = usercourses.find(
          (e: any) => Number(e.course_id) === Number(courseId)
        );
        setFilteredData(filteredCourseData?.courses);
      };
      getCourse();
    }
  }, [courseId, usercourses]);

  const [videoData, setVideoData] = useState<any>({});

  useEffect(() => {
    if (filteredData && filteredData?.videos?.length > 0) {
      setVideoData(
        filteredData?.videos.find((video: any) => video?.sequence == 1)
      );
    }
  }, [filteredData, courseId]);
  useEffect(() => {
    if (!videoData || videoData.length == 0) {
      setVideoData(
        filteredData?.videos.find((video: any) => video?.sequence == 1)
      );
    }
  }, []);

  useEffect(() => {
    if (filteredData && filteredData?.videos?.length > 0 && videoId) {
      setVideoData(
        filteredData?.videos.find((video: any) => video?.id == videoId)
      );
    }
  }, [videoId, filteredData]);

  const handleProgress = (state: any) => {
    setVideoDuration(state.playedSeconds);
    let data = {
      user_id: userData.id,
      video_id: videoData?.id,

      progressDuration: state.playedSeconds,
      course_id: Number(courseId),
      totalDuration,
    };

    if (data?.totalDuration == state.playedSeconds) {
      setStatusLoader(true);
    }
    dispatch(updateVideoProgress(data));
  };

  useEffect(() => {
    if (videoProgressSuccess) {
      dispatch(resetVideoProgressStatus());
    }
  }, [videoProgressSuccess, dispatch]);

  const handleDuration = (duration: number) => {
    setTotalDuration(duration);
  };

  const handlePlayVideo = () => {
    setVideoRun(true);
    setIsPlaying(true);
  };

  const handlePause = () => setIsPlaying(false);
  const handlePlay = () => setIsPlaying(true);

  const author = {
    name: "John Doe",
    image: "/assets/DummyImg.png",
    rating: 4.9,
    designation: "Senior Designer",
  };

  return (
    filteredData && (
      <div
        className="p- grid grid-cols-1 md:grid-cols-3 gap-6 bg-default-50 w-full h-full rounded-lg"
        style={{ fontFamily: "Sansation" }}
      >
        <div className="md:col-span-2">
          <div>
            <div className="flex items-center space-x-4">
              <h1 className="text-3xl font-bold">
                {filteredData && filteredData.course_name}
              </h1>
              <Badge className="font-bold rounded-2xl text-md bg-gradient-to-b from-[#B50D34] to-[#BAA716] text-white">
                <span className="px-5" style={{ fontFamily: "Sansation" }}>
                  Basic
                </span>
              </Badge>
            </div>

            <div className="relative w-full mx-2 py-1">
              {!videoRun ? (
                <>
                  <Image
                    src={
                      imgError
                        ? "/assets/DummyImg.png"
                        : `/api/images?filename=${videoData?.thumbnail_url}&folder=coursesthumbnails`
                    }
                    alt="Course Thumbnail"
                    className="w-full 4xl:h-52 h-96 rounded-lg object-cover container border-[1px] border-slate-600 my-2"
                    width={1000}
                    height={1000}
                    onError={handleError}
                  />
                  <div className="absolute left-0 bottom-0 m-4">
                    <div className="backdrop-blur-md bg-opacity-50 p-3 rounded-full">
                      <Icon
                        icon="tdesign:play-circle"
                        className="text-white 4xl:w-20 4xl:h-20 w-32 h-32 text-3xl hover:text-red-500 cursor-pointer"
                        onClick={handlePlayVideo}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <div className="4xl:h-64 h-96">
                  <ReactPlayer
                    url={`/api/images?filename=${videoData?.video_url}&folder=coursesvideos`}
                    playing={isPlaying}
                    onPause={handlePause}
                    onPlay={handlePlay}
                    controls={true}
                    onProgress={handleProgress}
                    onDuration={handleDuration}
                    progressInterval={5000}
                    loop={false}
                    onEnded={() =>
                      setVideoData({ ...videoData, isEnded: true })
                    }
                    width={"100%"}
                    height={"100%"} // Adjust this value to set the height
                    style={{ border: "1px solid #2F2F2F" }}
                  />
                </div>
              )}
            </div>

            <div className="space-y-5 my-3">
              <Card className="bg-black p-2">
                <CardContent>
                  <div className="flex items-center justify-between text-default-900 text-sm lg:text-base font-normal">
                    <h1 className="text-3xl font-bold">About this course</h1>
                    <div className="flex items-center gap-1.5">
                      <p className="text-gray-500 mx-5">|</p>
                      <Icon
                        icon="heroicons-solid:users"
                        className="text-yellow-600"
                      />
                      <span className="text-default-500">
                        {filteredData && filteredData.subscribers}
                      </span>
                    </div>
                  </div>
                  <div className="text-default-600 text-sm lg:text-base font-normal my-4 text-gray-500">
                    <p>{filteredData && filteredData.description}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="my-5 p-4 bg-black rounded-lg">
              <h2 className="text-lg font-bold text-white">About the Author</h2>
              <div className="flex items-center mx-2 space-x-2">
                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-white">
                    {author.name}
                  </h3>
                  <div className="flex items-center space-x-1 my-1">
                    <Badge className="font-bold rounded-2xl text-md text-gray-400">
                      <Icon
                        icon="bitcoin-icons:verify-filled"
                        className="text-xl text-yellow-600"
                      />
                      Certified Instructor
                    </Badge>
                    <p className="text-gray-400">{author.designation}</p>
                    <div className="flex items-center space-x-1 text-yellow-400 mx-4">
                      <Icon
                        icon="ph:star-fill"
                        className="text-xl text-red-600"
                      />
                      <span className="text-lg text-white">
                        {author.rating}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="rounded-full overflow-hidden">
                  {author.image ? (
                    <div className="w-10 h-10 ring-1 ring-[#fff] md:mt-0 mt-3 flex items-center justify-center rounded-full overflow-hidden">
                      <Image
                        src={author.image}
                        alt={author.name}
                        className="w-full h-full object-cover"
                        width={100}
                        height={100}
                      />
                    </div>
                  ) : (
                    <div className="w-10 h-10 ring-1 ring-white md:mt-0 mt-3 flex items-center justify-center bg-[#BAA716]  rounded-full">
                      <span className="text-white text-sm md:text-sm font-bold py-3">
                        {author.name?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Comments Section */}
            {/* <CommentSection /> */}
          </div>
        </div>

        {/* Right Column: Course Modules and Information */}
        <div className="md:col-span-1 my-12">
          <Card className="border border-[#62626280] rounded-xl p-5">
            <CardHeader
              className="h-16 rounded-3xl bg-gradient-to-b whitespace-nowrap from-[#62626280] to-[#2D2C2C80]"
              style={{ fontFamily: "Sansation" }}
            >
              <div className="text-sm flex justify-center items-center">
                <CardTitle>Course Modules</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ModuleList
                totalDuration={totalDuration}
                videoDuration={videoDuration}
                videoData={videoData}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    )
  );
};

export default CourseModule;
