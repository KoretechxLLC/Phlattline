"use client";
import React, { useEffect, useState } from "react";
import { Badge } from "@/app/components/badge";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchvideoprogress } from "@/redux/slices/courses.slice";
import ButtonWrapper from "./Button";
import { ShimmerText, ShimmerTable , ShimmerTitle } from "shimmer-effects-react";
import Spinner from "./Spinner";
import CustomShimmer from "./Customeshimmer";

const ModuleList: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch: any = useDispatch();
  const courseId = searchParams.get("courseId");
  const { courses, videoProgress, videoProgressSuccess } = useSelector(
    (state: RootState) => state.courses
  );
  const { userData } = useSelector((state: RootState) => state.auth);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [assessmentCompleted, setAssessmentCompleted] = useState(false);
  const [showModules, setShowModules] = React.useState<any>([]);
  const [loading, setLoading] = useState(true);
  const userId = userData?.id;

  useEffect(() => {
    if (courseId) {
      dispatch(fetchvideoprogress({ courseId: Number(courseId), userId }));
    }
  }, [userId, courseId, dispatch]);

  const currentCourse = courses.find(
    (course: any) => course.id === Number(courseId)
  );

  useEffect(() => {
    if (videoProgress && videoProgress?.length > 0) {
      const modules = currentCourse?.videos.map((video: any, index: number) => {
        const progress = videoProgress.find((progress: any) => progress.video_id == video.id);
        return {
          id: video.id,
          sequence: index + 1,
          title: video.title,
          completed: progress?.completed,
          clickable: index === 0 || videoProgress[index - 1]?.completed,
        };
      }) || [];

      setShowModules(modules);
      const allCompleted = modules.every((module: any) => module.completed);
      setIsButtonEnabled(allCompleted);

      const assessmentStatus = videoProgress.every((progress: any) => progress.user_video_progress?.assessment === true);
      setAssessmentCompleted(assessmentStatus);

    }
  }, [videoProgress, videoProgress?.length, currentCourse, videoProgressSuccess?.length]);

  useEffect(() => {
    const modules = currentCourse?.videos.map((video: any, index: number) => ({
      id: video.id,
      sequence: index + 1,
      title: video.title,
      completed: false,
      clickable: index === 0 || videoProgress[index - 1]?.completed,
    })) || [];

    setShowModules(modules);
  }, [currentCourse]);



  const handleModuleClick = (videoId: number, clickable: boolean) => {
    if (clickable) {
      router.push(`/Portal/Courses/CourseModule?courseId=${courseId}&videoId=${videoId}`);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 6000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) { 
    return <CustomShimmer/>
    ;
  }

  const handleButtonClick = () => {
    if (isButtonEnabled) {
      router.push(`/Coursesassessment?courseId=${courseId}`);
    }
  };

  return (
    <>
    
      {showModules && showModules.length > 0 && showModules.map((module: any) => (
        <div
          key={module.id}
          className="flex items-center rounded-lg pt-6 mb-2 cursor-pointer"
          onClick={() => handleModuleClick(module.id, module.clickable)}
        >
          <Badge
            className={`font-bold rounded-full text-sm text-white w-8 h-8 flex items-center justify-center mr-4 ${module.completed ? 'bg-green-500' : 'bg-red-800'}`}
          >
            {module.sequence}
          </Badge>
          <span className="text-xl font-bold">
            {module.title}
          </span>
        </div>
      ))}
      <ButtonWrapper
        text={assessmentCompleted ? "Assessment Completed" : "Start Assessment"}
        className="text-3xl w-full text-center flex justify-center"
        disabled={!isButtonEnabled || assessmentCompleted}
        onClick={handleButtonClick}
      />
  </>

  );
};

export default ModuleList;
