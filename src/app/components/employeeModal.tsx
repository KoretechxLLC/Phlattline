import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { assignCourses, fetchAllDepartment, resetError, resetSuccess } from "@/redux/slices/organization.slice";
import { RootState } from "@/redux/store";
import Icon from "@/app/components/utility-icon";
import Spinner from "@/app/components/Spinner";
import { CardContent } from "@/app/components/Card";
import { Avatar, AvatarImage } from "@/app/components/avatar";
import { Button } from "./button-sidebar";
import StackedNotifications, { NotificationType } from "./Stackednotification";

const EmployeeModal = ({
  open,
  coursesAssign,
  courseId,
  onClose,
  showSelectionControls = true,
}: {
  open: boolean;
  onClose: () => void;
  courseId: number;
  coursesAssign?: any; // Replace `any` with a specific type if possible
  showSelectionControls?: boolean;
}) => {
  const dispatch = useDispatch<any>();
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<number | null>(null);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allcoursesassign, setAllCoursesAssign] = useState<any>([]);
  const [notification, setNotification] = useState<NotificationType | null>(null);
  const [assigning, setAssigning] = useState(false);
  const { departments, assignCoursesSuccess, assignCoursesError }: any = useSelector((state: RootState) => state.organization);
  const { userData } = useSelector((state: RootState) => state.auth);
  const organization_id = userData?.organization_id;
  const userId = userData?.id;

  // Fetch departments
  useEffect(() => {
    if (!departments || departments.length === 0) {
      dispatch(fetchAllDepartment({ organizationId: organization_id }));
    }
  }, [dispatch, organization_id, departments]);

  // Update employees when a department is selected
  useEffect(() => {
    if (selectedDepartmentId !== null) {
      setLoading(true);
      const department = departments.find((dept: any) => dept.id === selectedDepartmentId);
      setFilteredEmployees(department?.employees || []);
      setLoading(false);
    }
  }, [selectedDepartmentId, departments]);

  // Set initial course assignments
  useEffect(() => {
    if (coursesAssign && coursesAssign?.length > 0) {

      let assigned = coursesAssign.filter((assign:any)=>assign?.course_id== courseId)


      setAllCoursesAssign(assigned);
    }
  }, [coursesAssign]);

  // Handle notifications for success and error
  useEffect(() => {
    if (assignCoursesSuccess) {
      setNotification({ id: Date.now(), text: assignCoursesSuccess, type: "success" });
      dispatch(resetSuccess());
    }
    if (assignCoursesError) {
      console.error("Course assignment error:", assignCoursesError);
      setNotification({ id: Date.now(), text: assignCoursesError, type: "error" });
      dispatch(resetError());
    }
  }, [assignCoursesSuccess, assignCoursesError, dispatch]);

  // Handle assign/unassign logic
  const handleAssign = () => {
    const initialAssignedIds = coursesAssign?.map((emp: any) => emp.employee_id) || [];
    const currentAssignedIds = allcoursesassign.map((emp: any) => emp.employee_id);


    const employeesToAssign = currentAssignedIds.filter((id: any) => id);
    const employeesToUnassign = initialAssignedIds.filter((id: any) => !currentAssignedIds.includes(id));


    if (currentAssignedIds.length > 0) {
      dispatch(
        assignCourses({
          data: {
            organization_id,
            course_id: Number(courseId),
            employee_ids: currentAssignedIds,
            user_id: userId,
            type: true,
          },
        })
      );
    }

    if (employeesToUnassign.length > 0) {
      dispatch(
        assignCourses({
          data: {
            organization_id,
            course_id: Number(courseId),
            employee_ids: employeesToUnassign,
            user_id: userId,
            type: false,
          },
        })
      );
    }
  };


  const handlechangeassign = (employee: any) => {
    setAllCoursesAssign((prevAssignments: any) => {
      const isAssigned = prevAssignments.some(
        (assignment: any) =>
          assignment.employee_id === employee.id && assignment.course_id === courseId
      );


      if (isAssigned) {
        return prevAssignments.filter(
          (assignment: any) =>
            !(assignment.employee_id === employee.id && assignment.course_id === courseId)
        );
      } else {
        return [
          ...prevAssignments,
          { employee_id: employee.id, course_id: courseId },
        ];
      }
    });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <StackedNotifications notification={notification} setNotification={setNotification} />
      <div className="relative p-5 bg-[#000000b2] rounded-3xl w-3/4 md:w-1/3 flex flex-col">
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-3 text-gray-700 hover:text-red-500">
          <Icon icon="ic:outline-close" className="text-3xl" />
        </button>

        {/* Department Dropdown */}
        <div className="px-5 py-4 text-center">
          <select
            className="w-full p-2 rounded-xl h-14 bg-[#00000073] border border-[#626262] text-white focus:outline-none focus:ring-1 focus:ring-[#626262]"
            value={selectedDepartmentId || ""}
            onChange={(e) => setSelectedDepartmentId(Number(e.target.value))}
          >
            <option value="">Select Department</option>
            {departments.map((department: any) => (
              <option key={department.id} value={department.id}>
                {department.name}
              </option>
            ))}
          </select>
        </div>

        {/* Employee List */}
        <div className="overflow-y-auto flex-grow">
          {loading ? (
            <div className="flex justify-center items-center">
              <Spinner height="30px" width="30px" />
            </div>
          ) : filteredEmployees.length === 0 ? (
            <div className="text-center text-white pt-10 pb-10">
              <p>No employees found for this department.</p>
            </div>
          ) : (
            <ul>
              {filteredEmployees.map((employee: any, index: number) => {
                const isChecked = allcoursesassign.some(
                  (assignment: any) =>
                    assignment.employee_id === employee.id && assignment.course_id === courseId
                );
                return (
                  <li key={index} className={`${index < filteredEmployees.length - 1 ? "border-b border-gray-200" : ""}`}>
                    <CardContent className="flex items-center space-x-2 px-1 py-5 justify-between ml-3 mr-6">
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-16 h-16">
                          <AvatarImage
                            src={employee.profile_image || "/assets/profile.jpg"}
                            alt={`${employee.first_name}-avatar`}
                            className="w-16 h-16 rounded-full border-2"
                          />
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="font-semibold text-white uppercase">
                            {employee.first_name} {employee.last_name}
                          </span>
                          <span className="text-red-600 text-sm">{employee.email}</span>
                        </div>
                      </div>
                      {showSelectionControls && (
                        <input
                          type="checkbox"
                          className="w-5 h-5 border-2 border-gray-400 rounded"
                          checked={isChecked}
                          onChange={() => handlechangeassign(employee)}
                        />
                      )}
                    </CardContent>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Done Button */}
        {showSelectionControls && (
          <div className="flex justify-center py-4">
            <Button
              onClick={handleAssign}
              disabled={assigning}
              className="p-2 bg-[#B86623] hover:bg-[#B86623] focus:ring-[#B86623] focus:ring-opacity-50 disabled:opacity-50 text-white text-lg rounded-full flex justify-center items-center"
            >
              {assigning ? (
                <Spinner height="25px" width="25px" />
              ) : (
                <>
                  <span className="mr-2">Done</span>
                  <Icon icon="material-symbols:done-outline" />
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeModal;
