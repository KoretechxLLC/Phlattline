"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAssignedCoursesCount, fetchCoursesAssign } from "@/redux/slices/courses.slice";
import CoursesTab from "@/app/components/CoursesTab";
import Spinner from "@/app/components/Spinner";
import { Button } from "@/app/components/button-sidebar";
import { RootState } from "@/redux/store";

const EmployeeCourses = () => {
  const dispatch = useDispatch<any>();

  const [currentPage, setCurrentPage] = useState(1);
  const [showPagination, setShowPagination] = useState(false); // State to toggle pagination visibility
  const coursesPerPage = 6; // Number of courses per page
  const { coursesAssign, loading, Assignedcoursescount } = useSelector((state: RootState) => state.courses);
  const { userData } = useSelector((state: RootState) => state.auth);
  const employee_id = userData?.employee_id;

  // Fetch assigned courses for the employee
  useEffect(() => {
    if (employee_id) {
      dispatch(fetchCoursesAssign({ employee_id })); // Fetch courses assigned to the employee
    }
  }, [employee_id, dispatch]);

  useEffect(() => {
    dispatch(fetchAssignedCoursesCount({}));
  }, [dispatch]);


  // Calculate total pages based on the number of assigned courses
  const totalPages = coursesAssign ? Math.ceil(coursesAssign.length / coursesPerPage) : 1;

  // Calculate paginated courses based on the current page
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const displayedCourses = coursesAssign?.slice(indexOfFirstCourse, indexOfLastCourse);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleViewAllClick = () => {
    setShowPagination(true); // Show pagination when the button is clicked
  };

  return (
    <div>
      <div className="p-3 grid grid-cols-1 md:grid-cols-[70%_30%] gap-4 w-full h-full space-y-3 md:space-y-0">
        {/* Left side: Courses List */}
        <div className="space-y-4 md:space-y-2 ml-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4  mb-8">
            {loading ? (
              <div className="text-center text-gray-300 py-20">
                <Spinner height="30px" width="30px" />
              </div>
            ) : displayedCourses && displayedCourses.length > 0 ? (
              displayedCourses.map((courseAssign: any) => (
                <CoursesTab
                  id={courseAssign.course_id}
                  title={courseAssign.courses?.course_name}
                  description={courseAssign.courses?.description}
                  price={courseAssign.courses?.price}
                  videos={courseAssign.courses?.videos}
                  assessments={courseAssign.courses?.assessments}
                  key={courseAssign.course_id} // Use a unique key
                />
              ))
            ) : (
              <div className="flex items-center justify-center col-span-3">
                <div className="text-center text-gray-300 h-full w-full flex justify-center items-center py-60">
                  No Courses Assigned!
                </div>
              </div>
            )}
          </div>

          {/* View All Button */}
          {!showPagination && (
            <Button
              className="text-white rounded-3xl px-4 py-2 w-full"
              size="md"
              color="primary"
              onClick={handleViewAllClick}
            >
              View All
            </Button>
          )}

          {/* Pagination Controls */}
          {showPagination && (
            <div>
              <div className="flex justify-between items-center border-t-[1px] border-slate-800 pt-[1em]">
                <Button
                  className="text-white px-4 py-2 rounded-lg bg-gradient-to-b from-[#BAA716] to-[#B50D34]"
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <span className="text-gray-500">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  className="text-white px-4 py-2 rounded-lg bg-gradient-to-b from-[#BAA716] to-[#B50D34]"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeCourses;
