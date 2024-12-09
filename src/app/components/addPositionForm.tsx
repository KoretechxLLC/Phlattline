import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddPositionForm = ({ handleAddGoal, success }: any) => {
  const [goalName, setGoalName] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [completionDate, setCompletionDate] = useState<Date | null>(null);
  const [goalType, setGoalType] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const goalData = {
      goal_name: goalName,
      start_date: startDate?.toISOString(),
      completion_date: completionDate?.toISOString(),
      goal_type: goalType,
      description: description,
    };

    handleAddGoal(goalData);
  };

  useEffect(() => {
    if (success) {
      setGoalName("");
      setStartDate(null);
      setCompletionDate(null);
      setGoalType("");
      setDescription("");
    }
  }, [success]);

  return (
    <div className="bg-gradient-to-b from-[#62626250] to-[#2D2C2C50] text-white 4xl:p-3 p-14 rounded-xl shadow-lg w-full">
      <h2 className="text-xl font-semibold mb-4 text-center">Add Position</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <div>
            <select
              value={goalType}
              onChange={(e) => setGoalType(e.target.value)}
              className="w-full p-2 rounded-xl h-14 bg-[#2d2c2c] text-white focus:outline-none focus:ring-1 focus:ring-[#626262]"
            >
              <option value="" disabled>
                Select Department
              </option>
              <option value="Personal">Personal</option>
              <option value="Professional">Professional</option>
              <option value="Fitness">Fitness</option>
              <option value="Financial">Financial</option>
            </select>
          </div>
          <div>
            <input
              type="text"
              placeholder="Add Position Name"
              value={goalName}
              onChange={(e) => setGoalName(e.target.value)}
              className="w-full p-2 mt-2 rounded-xl h-14 bg-[#2d2c2c] text-white focus:outline-none focus:ring-1 focus:ring-[#626262]"
            />
          </div>
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
            type="reset"
            className="px-4 py-2 w-full sm:w-40 bg-gray-600 rounded-md hover:bg-gray-500 focus:outline-none"
            onClick={() => {
              setGoalName("");
              setStartDate(null);
              setCompletionDate(null);
              setGoalType("");
              setDescription("");
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

export default AddPositionForm;
