"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/Card";
import { Avatar, AvatarImage } from "@/app/components/avatar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { fetchAllDepartment } from "@/redux/slices/organization.slice";
import { fetchusercoursesresult } from "@/redux/slices/courses.slice";
import Spinner from "./Spinner";
import { fetchUsersByOrganizationId } from "@/redux/slices/employeee.slice";

type SuccessionPlanningTabProps = {
  maxEmployeesToShow?: number; // New prop to control the number of employees to show
};

const SuccessionPlanningTab: React.FC<SuccessionPlanningTabProps> = ({
  maxEmployeesToShow = 10, // Default to showing all employees if not specified
}) => {
  const dispatch = useDispatch<any>();
  const { userData } = useSelector((state: RootState) => state.auth);
  const { departments } = useSelector((state: RootState) => state.organization);
  const { usercoursesresult } = useSelector((state: RootState) => state.courses);
  const { responseLoading } = useSelector((state: RootState) => state.organization);
  const { usersbyorganization } = useSelector((state: RootState) => state.employee);
  // State to store extracted employees and courses
  const [employees, setEmployees] = useState<any[]>([]);
  const [employeesWithCourses, setEmployeesWithCourses] = useState<any[]>([]);

  // Fetch user courses result
  useEffect(() => {
    dispatch(fetchusercoursesresult({})); // Fetch all user courses
  }, [dispatch]);


  useEffect(() => {
    if (userData?.organization_id) {
      dispatch(fetchUsersByOrganizationId(userData.organization_id));
    }
  }, [dispatch, userData?.organization_id]);

  // Fetch departments
  useEffect(() => {
    if (userData?.organization_id) {
      dispatch(fetchAllDepartment({ organizationId: userData.organization_id }));
    }
  }, [dispatch, userData?.organization_id]);


  useEffect(() => {
    if (usersbyorganization) {
      const mappedEmployees = usersbyorganization.map((user: any) => ({
        id: user.id,
        name: `${user.first_name} ${user.last_name}`,
        designation: user.designation,
        image: user.profile_image,
      }));
      setEmployees(mappedEmployees);
    }
  }, [usersbyorganization]);


  // Match employees with usercoursesresult data
  useEffect(() => {
    if (employees.length > 0 && usercoursesresult.length > 0) {
      const mappedEmployees = employees.map((employee) => {
        const assignedCourses = usercoursesresult.filter(
          (course: any) => course.user_id === employee.id
        );

        // Calculate overall completion percentage for the employee
        const overallCompletion = assignedCourses.reduce(
          (total: number, course: any) => {
            switch (course.status) {
              case "notStarted":
                return total + 0;
              case "inprogress":
                return total + 33;
              case "completed":
                return total + 99;
              default:
                return total;
            }
          },
          0
        );

        const completionPercentage =
          assignedCourses.length > 0
            ? Math.round(overallCompletion / assignedCourses.length)
            : 0;

        return {
          ...employee,
          completion: completionPercentage,
        };
      });
      setEmployeesWithCourses(mappedEmployees);
    }
  }, [employees, usercoursesresult]);

  // Function to determine the color based on overall completion percentage
  const getCompletionColor = (completion: number) => {
    if (completion >= 0 && completion <= 20)
      return "text-red-500 border-red-500";
    if (completion > 20 && completion <= 40)
      return "text-orange-500 border-orange-500";
    if (completion > 40 && completion <= 60)
      return "text-yellow-400 border-yellow-400";
    if (completion > 60 && completion <= 80)
      return "text-green-400 border-green-400";
    if (completion > 80 && completion <= 100)
      return "text-green-600 border-green-600";

    return "";
  };

  return (
    <div>
    <Card className="border w-full border-[#62626280] rounded-3xl">
      <CardHeader className="mb-2 bg-gradient-to-b whitespace-nowrap from-[#62626280] to-[#2D2C2C80] rounded-3xl">
        <CardTitle>Succession Planning</CardTitle>
      </CardHeader>
      {responseLoading ? (
        <div className="text-center text-gray-300 py-20">
          <Spinner height="30px" width="30px" />
        </div>
      ) : employeesWithCourses.length > 0 ? (
        // Added a scrollable container with a fixed height
        <div className="overflow-y-auto max-h-96"> 
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 4xl:px-3 p-2">
            {employeesWithCourses.slice(0, maxEmployeesToShow).map((employee) => (
              <li
                key={employee.id}
                className="border border-[#62626280] rounded-lg 4xl:px-2 p-4"
              >
                <CardContent className="flex items-center space-x-4">
                  {employee.image ? (
                    <Avatar className="4xl:w-8 4xl:h-8 w-10 h-10 border-[1px]">
                      <AvatarImage
                        src={`/api/images?filename=${employee.image}&folder=profileImage`}
                        alt={`${employee.name}-avatar`}
                        className="4xl:w-8 4xl:h-8 w-10 h-10"
                      />
                    </Avatar>
                  ) : (
                    <div className="w-10 h-10 ring-1 ring-white flex items-center justify-center bg-gradient-to-b from-[#BAA716] to-[#B50D34] rounded-full">
                      <span className="text-white text-sm font-bold">
                        {employee.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
  
                  <div className="flex-grow">
                    <span className="font-semibold uppercase">
                      {employee.name}
                    </span>
                    <span className="text-gray-400 block">
                      {employee.designation}
                    </span>
                  </div>
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full border font-semibold ${getCompletionColor(
                      employee.completion
                    )}`}
                  >
                    {employee.completion}%
                  </div>
                </CardContent>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="text-center text-gray-300 py-20">
          There are no Employees Available
        </div>
      )}
    </Card>
  </div>
  
  );
};

export default SuccessionPlanningTab;
