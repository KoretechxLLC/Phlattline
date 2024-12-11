import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaTrash } from "react-icons/fa";

const SmartGoalForm = ({ handleAddGoal, success }: any) => {
  const [goalName, setGoalName] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [completionDate, setCompletionDate] = useState<Date | null>(null);
  const [goalType, setGoalType] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState<string[]>([""]); // Initial task field

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const goalData = {
      goal_name: goalName,
      start_date: startDate?.toISOString(),
      completion_date: completionDate?.toISOString(),
      goal_type: goalType,
      description: description,
      goal_tasks: tasks.filter((task) => task.trim() !== ""), // Filter empty tasks
    };

    handleAddGoal(goalData);
  };

  const handleAddTask = () => {
    setTasks([...tasks, ""]); // Add a new empty task field
  };

  const handleTaskChange = (index: number, value: string) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = value;
    setTasks(updatedTasks);
  };

  const handleRemoveTask = (index: number) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  useEffect(() => {
    if (success) {
      setGoalName("");
      setStartDate(null);
      setCompletionDate(null);
      setGoalType("");
      setDescription("");
      setTasks([""]); // Reset tasks
    }
  }, [success]);

  return (
    <div className="bg-gradient-to-b from-[#62626250] to-[#2D2C2C50] text-white 4xl:p-3 p-14 rounded-xl shadow-lg w-full">
      <h2 className="text-xl font-semibold mb-4 text-center">
        SMART Goals Creation
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Goal Name"
            value={goalName}
            onChange={(e) => setGoalName(e.target.value)}
            className="w-full p-2 rounded-xl h-14 bg-[#2d2c2c] text-white focus:outline-none focus:ring-1 focus:ring-[#626262]"
          />
        </div>

        {/* Start Date */}
        <div className="w-full rounded-xl h-14 bg-[#2d2c2c] focus-within:ring-2 focus-within:ring-[#626262] text-white focus:outline-none">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            placeholderText="Start Date"
            minDate={new Date()}
            className="w-full p-2 rounded-xl h-14 bg-[#2d2c2c] text-white focus:outline-none"
          />
        </div>

        {/* Completion Date */}
        <div className="w-full rounded-xl h-14 bg-[#2d2c2c] focus-within:ring-2 focus-within:ring-[#626262] text-white focus:outline-none">
          <DatePicker
            selected={completionDate}
            onChange={(date) => setCompletionDate(date)}
            placeholderText="Completion Date"
            minDate={startDate || new Date()}
            className="w-full p-2 rounded-xl h-14 bg-[#2d2c2c] text-white focus:outline-none"
          />
        </div>

        {/* Goal Type */}
        <div>
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
            {/* <option value="Fitness">Fitness</option>
            <option value="Financial">Financial</option> */}
          </select>
        </div>

        <div>
          {tasks.map((task, index) => (
            <div key={index} className="relative flex items-center mb-2 gap-2">
              {/* Task Input Field */}
              <input
                type="text"
                value={task}
                onChange={(e) => handleTaskChange(index, e.target.value)}
                placeholder="Add Task"
                className="w-full p-2 rounded-xl h-14 bg-[#2d2c2c] text-white focus:outline-none focus:ring-1 focus:ring-[#626262] pr-10" // Adjusted padding for button space
              />

              {/* Delete Button (only show when the task is not empty) */}
              {task && (
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

          {/* Add Task Button */}
          <button
            type="button"
            onClick={handleAddTask}
            className="text-white text-[12px]"
          >
            <span className="text-white text-[20px]"> + </span>
            Add Task
          </button>
        </div>

        {/* Description */}
        <div>
          <input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 h-24 rounded-xl bg-[#2d2c2c] text-white focus:outline-none focus:ring-1 focus:ring-[#626262]"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between gap-3">
          <button
            type="button"
            className="px-4 py-2 w-full sm:w-40 bg-gray-600 rounded-md hover:bg-gray-500 focus:outline-none"
            onClick={() => {
              setGoalName("");
              setStartDate(null);
              setCompletionDate(null);
              setGoalType("");
              setDescription("");
              setTasks([""]);
            }}
          >
            Clear
          </button>
          <button
            className="w-full sm:w-40 rounded-lg bg-gradient-to-b from-[#BAA716] to-[#B50D34] px-4 py-2 text-center font-medium text-white text-lg transition-transform hover:scale-[1.02] active:scale-[0.98]"
            type="submit"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default SmartGoalForm;
