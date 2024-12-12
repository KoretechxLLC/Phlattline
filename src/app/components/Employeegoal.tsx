import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  assigngoalemployee,
  resetError,
  resetSuccess,
  updategoalemployee, // New function for updating goals
} from "@/redux/slices/employeee.slice";
import { fetchAllDepartment } from "@/redux/slices/organization.slice";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaTrash } from "react-icons/fa";
import StackedNotifications from "./Stackednotification";
import { fetchGoals } from "@/redux/slices/performanceManagement.slice";
import Spinner from "./Spinner";

export type NotificationType = {
  id: number;
  text: string;
  type: "error" | "success";
};

const Employeegoal = ({
  handleAddGoal,
  handleUpdateGoal,
  selectedGoal,
  success,
}: any) => {
  const dispatch = useDispatch<any>();
  const [notification, setNotification] = useState<NotificationType | null>(
    null
  );

  // Form States
  const [goalName, setGoalName] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [completionDate, setCompletionDate] = useState<Date | null>(null);
  const [goalType, setGoalType] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState<string[]>([""]);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<
    number | null
  >(null);
  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<number[]>([]); // Updated for multi-select
  const [filteredEmployees, setFilteredEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState(false); // Loading state

  // Redux State
  const { userData } = useSelector((state: RootState) => state.auth);
  const { error } = useSelector((state: RootState) => state.employee);
  const { departments }: any = useSelector(
    (state: RootState) => state.organization
  );
  const organization_id = userData?.organization_id;
  const user_id = userData?.id;

  useEffect(() => {
    if (selectedGoal) {
      setGoalName(selectedGoal.goal_name || "");
      setStartDate(
        selectedGoal.start_date ? new Date(selectedGoal.start_date) : null
      );
      setCompletionDate(
        selectedGoal.completion_date
          ? new Date(selectedGoal.completion_date)
          : null
      );
      setGoalType(selectedGoal.goal_type || "");
      setDescription(selectedGoal.description || "");
      setTasks(selectedGoal.goal_tasks?.map((task: any) => task.value) || [""]);
      setSelectedEmployeeIds(selectedGoal.assignee_id || []); // Pre-select assigned employees

      const associatedDepartment = departments?.find((dept: any) =>
        dept?.employees?.some((emp: any) =>
          selectedGoal.assignee_id?.includes(emp.id)
        )
      );

      if (associatedDepartment) {
        setSelectedDepartmentId(associatedDepartment.id);
        setFilteredEmployees(associatedDepartment.employees || []);
      }
    } else {
      handleClearForm(); // Clear form if no goal is selected
    }
  }, [selectedGoal, departments]);

  // Fetch Departments
  useEffect(() => {
    if (!departments || departments.length === 0) {
      dispatch(fetchAllDepartment({ organizationId: organization_id }));
    }
  }, [dispatch, organization_id, departments]);

  const handleAddTask = () => setTasks([...tasks, ""]);
  const handleTaskChange = (index: number, value: string) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = value;
    setTasks(updatedTasks);
  };
  const handleRemoveTask = (index: number) =>
    setTasks(tasks.filter((_, i) => i !== index));

  // Update employees when a department is selected
  useEffect(() => {
    if (selectedDepartmentId !== null) {
      const department = departments.find(
        (dept: any) => dept.id === selectedDepartmentId
      );
      setFilteredEmployees(department?.employees || []);
    }
  }, [selectedDepartmentId, departments]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Validate required fields
    if (
      !goalName ||
      !startDate ||
      !completionDate ||
      !goalType ||
      selectedEmployeeIds.length === 0
    ) {
      setNotification({
        id: Date.now(),
        text: "Please fill in all required fields.",
        type: "error",
      });
      return;
    }

    const formData = new FormData();
    formData.append("goal_name", goalName);
    formData.append("start_date", startDate.toISOString());
    formData.append("completion_date", completionDate.toISOString());
    formData.append("goal_type", goalType);
    formData.append("description", description);
    formData.append("organization_id", organization_id.toString());
    formData.append("user_id", user_id);

    // Append employee IDs
    selectedEmployeeIds.forEach((id) => {
      formData.append("asignee_Ids[]", id.toString());
    });

    // Append tasks
    tasks.forEach((task) => {
      if (task.trim() !== "") {
        formData.append(`goal_tasks[]`, task);
      }
    });

    try {
      setLoading(true); // Show loading spinner
      if (selectedGoal) {
        // Update existing goal
        formData.append("goal_id", selectedGoal.id);
        await dispatch(updategoalemployee(formData)).unwrap();
        setNotification({
          id: Date.now(),
          text: "Goal has been updated successfully.",
          type: "success",
        });
      } else {
        // Create a new goal
        await dispatch(assigngoalemployee(formData)).unwrap();
        setNotification({
          id: Date.now(),
          text: "Goal has been created successfully.",
          type: "success",
        });
      }

      // Fetch updated goals
      await dispatch(fetchGoals(userData?.id));
      handleClearForm(); // Reset form after successful submission
    } catch (error: any) {
      console.error("Error during goal submission:", error);

      setNotification({
        id: Date.now(),
        text: error.message || "An error occurred while processing the goal.",
        type: "error",
      });
    } finally {
      setLoading(false); // Hide loading spinner
    }
  };

  const handleUpdated = async (e: any) => {
    e.preventDefault();

    if (
      !goalName ||
      !startDate ||
      !completionDate ||
      !goalType ||
      selectedEmployeeIds.length === 0
    ) {
      setNotification({
        id: Date.now(),
        text: "Please fill in all required fields.",
        type: "error",
      });
      return;
    }

    const formData = new FormData();
    formData.append("goal_name", goalName);
    formData.append("start_date", startDate.toISOString());
    formData.append("completion_date", completionDate.toISOString());
    formData.append("goal_type", goalType);
    formData.append("description", description);
    formData.append("organization_id", organization_id.toString());
    formData.append("user_id", user_id);

    selectedEmployeeIds.forEach((id) => {
      formData.append("asignee_Ids[]", id.toString());
    });

    tasks.forEach((task) => {
      if (task.trim() !== "") {
        formData.append(`goal_tasks[]`, task);
      }
    });

    try {
      setLoading(true); // Start loading
      if (selectedGoal) {
        // If editing, log the payload and call the update function
        formData.append("goal_id", selectedGoal.id);
        await dispatch(updategoalemployee(formData)).unwrap(); // Dispatch the update action
        await dispatch(fetchGoals(userData?.id));
        setNotification({
          id: Date.now(),
          text: "Goal has been Updated",
          type: "success",
        });
      } else {
        // If creating a new goal
        await dispatch(assigngoalemployee(formData)).unwrap(); // Dispatch the create action
        await dispatch(fetchGoals(userData?.id));
      }
      handleClearForm(); // Clear the form upon successful submission
    } catch (error) {
      console.error("Failed to process goal:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    if (success !== null) {
      setNotification({
        id: Date.now(),
        text: success,
        type: "success",
      });
      dispatch(resetSuccess());
    }
    if (error !== null) {
      setNotification({
        id: Date.now(),
        text: error,
        type: "error",
      });
      dispatch(resetError());
    }
  }, [success, error, dispatch]);

  const handleClearForm = () => {
    setGoalName("");
    setStartDate(null);
    setCompletionDate(null);
    setGoalType("");
    setDescription("");
    setSelectedDepartmentId(null);
    setSelectedEmployeeIds([]);
    setTasks([""]);
  };

  const toggleEmployeeSelection = (id: number) => {
    setSelectedEmployeeIds((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((empId) => empId !== id)
        : [...prev, id];
      return updated;
    });
  };

  return (
    <div className="bg-gradient-to-b from-[#62626250] to-[#2D2C2C50] text-white p-14 rounded-xl shadow-lg w-full">
      {loading && (
        <div className="absolute inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center z-50">
          <Spinner height="50px" width="50px" />
          <p className="mt-3 text-white text-lg font-semibold">
            Please wait, processing your goal...
          </p>
        </div>
      )}
      <StackedNotifications
        notification={notification}
        setNotification={setNotification}
      />

      <h2 className="text-[26px] font-semibold mb-4 text-center">
        {selectedGoal ? "Edit Goal" : "Employee Goals Form"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Goal Name"
          value={goalName}
          onChange={(e) => setGoalName(e.target.value)}
          className="w-full p-2 rounded-xl h-14 bg-[#2d2c2c] text-white focus:outline-none focus:ring-1 focus:ring-[#626262]"
        />

        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          placeholderText="Start Date"
          minDate={new Date()}
          className="w-full p-2 rounded-xl h-14 bg-[#2d2c2c] text-white focus:outline-none"
        />

        <DatePicker
          selected={completionDate}
          onChange={(date) => setCompletionDate(date)}
          placeholderText="Completion Date"
          minDate={startDate || new Date()}
          className="w-full p-2 rounded-xl h-14 bg-[#2d2c2c] text-white focus:outline-none"
        />

        <div>
          {/* Department Selector */}
          <div className="mb-0">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Select Department
            </label>
            <select
              value={selectedDepartmentId || ""}
              onChange={(e) => setSelectedDepartmentId(Number(e.target.value))}
              className="w-full h-14 p-3 rounded-xl bg-[#2D2C2C] text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ba4a16]"
            >
              <option value="" disabled>
                Choose a department...
              </option>
              {departments.map((dept: any) => (
                <option key={dept.id} value={dept.id} className="text-white">
                  {dept.name}
                </option>
              ))}
            </select>
          </div>

          {/* Employees List */}
          {selectedDepartmentId && (
            <div className="mb-0">
              <h3 className="text-sm font-medium text-gray-300 mb-2">
                Assign Employees
              </h3>
              <div className="max-h-48 overflow-y-auto bg-[#2D2C2C] p-3 rounded-lg shadow-md">
                {filteredEmployees.length > 0 ? (
                  filteredEmployees.map((employee: any) => (
                    <label
                      key={employee.id}
                      className="flex items-center space-x-3 mb-0 p-2 rounded-lg hover:bg-[#1f1f1f] transition-colors cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedEmployeeIds.includes(employee.id)}
                        onChange={() => toggleEmployeeSelection(employee.id)}
                        className="w-4 h-4 accent-[#ba4a16]"
                      />
                      <span className="text-gray-300 text-sm">
                        {employee.first_name} {employee.last_name}
                      </span>
                    </label>
                  ))
                ) : (
                  <p className="text-sm text-gray-400">No employees found.</p>
                )}
              </div>
            </div>
          )}
        </div>

        <select
          value={goalType}
          onChange={(e) => setGoalType(e.target.value)}
          className="w-full p-2 rounded-xl h-14 bg-[#2d2c2c] text-white focus:outline-none focus:ring-1 focus:ring-[#626262]"
        >
          <option value="" disabled>
            Select Goal Type
          </option>
          <option value="Personal">Personal</option>
          <option value="Professional">Professional</option>
        </select>

        <div>
          {tasks.map((task, index) => (
            <div key={index} className="relative flex items-center mb-2 gap-2">
              <input
                type="text"
                value={task}
                onChange={(e) => handleTaskChange(index, e.target.value)}
                placeholder="Add Task"
                className="w-full p-2 rounded-xl h-14 bg-[#2d2c2c] text-white focus:outline-none focus:ring-1 focus:ring-[#626262] pr-10"
              />
              {index > 0 && task && (
                <button
                  type="button"
                  onClick={() => handleRemoveTask(index)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  <FaTrash />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddTask}
            className="text-white text-[12px]"
          >
            <span className="text-white text-[20px]"> + </span>
            Add Task
          </button>
        </div>

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 h-24 rounded-xl bg-[#2d2c2c] text-white focus:outline-none focus:ring-1 focus:ring-[#626262]"
        />

        <div className="flex justify-between gap-3">
          {selectedGoal ? (
            <button
              type="submit"
              onClick={handleUpdated}
              className="w-full sm:w-40 rounded-lg bg-gradient-to-b from-[#BAA716] to-[#B50D34] px-4 py-2 text-center font-medium text-white text-lg transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Update Goal
            </button>
          ) : (
            <button
              type="submit"
              className="w-full sm:w-40 rounded-lg bg-gradient-to-b from-[#BAA716] to-[#B50D34] px-4 py-2 text-center font-medium text-white text-lg transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Submit
            </button>
          )}

          <button
            type="button"
            onClick={handleClearForm}
            className="bg-[#2d2c2c] hover:bg-[#626262] text-white font-semibold py-2 px-4 rounded"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default Employeegoal;
