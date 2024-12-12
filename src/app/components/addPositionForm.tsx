import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaTrash } from "react-icons/fa";

const AddPositionForm = ({ handleAddGoal, success }: any) => {
  const [positionName, setPositionName] = useState("");
  const [department, setDepartment] = useState("");
  const [qualifications, setQualifications] = useState<string[]>([""]);
  const [responsibilities, setResponsibilities] = useState<string[]>([""]);
  const [description, setDescription] = useState("");

  const handleAddField = (
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    fields: string[]
  ) => {
    if (fields.length < 6) {
      setter([...fields, ""]);
    }
  };

  const handleRemoveField = (
    index: number,
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    fields: string[]
  ) => {
    const updatedFields = fields.filter((_, i) => i !== index);
    setter(updatedFields);
  };

  const handleFieldChange = (
    index: number,
    value: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    fields: string[]
  ) => {
    const updatedFields = [...fields];
    updatedFields[index] = value;
    setter(updatedFields);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const positionData = {
      position_name: positionName,
      department,
      description,
      qualifications: qualifications.filter((q) => q.trim() !== ""),
      responsibilities: responsibilities.filter((r) => r.trim() !== ""),
    };

    handleAddGoal(positionData);
  };

  useEffect(() => {
    if (success) {
      setPositionName("");
      setDepartment("");
      setDescription("");
      setQualifications([""]);
      setResponsibilities([""]);
    }
  }, [success]);

  return (
    <div className="bg-gradient-to-b from-[#62626250] to-[#2D2C2C50] text-white 4xl:p-3 p-14 rounded-xl shadow-lg w-full">
      <h2 className="text-xl font-semibold mb-4 text-center">Add Position</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
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
            value={positionName}
            onChange={(e) => setPositionName(e.target.value)}
            className="w-full p-2 mt-2 rounded-xl h-14 bg-[#2d2c2c] text-white focus:outline-none focus:ring-1 focus:ring-[#626262]"
          />
        </div>

        {/* Qualifications */}
        <div>
          {qualifications.map((qualification, index) => (
            <div key={index} className="relative">
              <input
                type="text"
                placeholder={`Qualification ${index + 1}`}
                value={qualification}
                onChange={(e) =>
                  handleFieldChange(
                    index,
                    e.target.value,
                    setQualifications,
                    qualifications
                  )
                }
                className="w-full p-2 mt-2 rounded-xl h-14 bg-[#2d2c2c] text-white focus:outline-none focus:ring-1 focus:ring-[#626262]"
              />
              {index > 0 && qualification.trim() && (
                <button
                  type="button"
                  onClick={() =>
                    handleRemoveField(index, setQualifications, qualifications)
                  }
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white"
                >
                  <FaTrash />
                </button>
              )}
            </div>
          ))}
          {qualifications.length < 6 && (
            <button
              type="button"
              onClick={() => handleAddField(setQualifications, qualifications)}
              className="text-white mt-2"
            >
              + Add Qualification
            </button>
          )}
        </div>

        {/* Responsibilities */}
        <div>
          {responsibilities.map((responsibility, index) => (
            <div key={index} className="relative">
              <input
                type="text"
                placeholder={`Key Responsibility ${index + 1}`}
                value={responsibility}
                onChange={(e) =>
                  handleFieldChange(
                    index,
                    e.target.value,
                    setResponsibilities,
                    responsibilities
                  )
                }
                className="w-full p-2 mt-2 rounded-xl h-14 bg-[#2d2c2c] text-white focus:outline-none focus:ring-1 focus:ring-[#626262]"
              />
              {index > 0 && responsibility.trim() && (
                <button
                  type="button"
                  onClick={() =>
                    handleRemoveField(
                      index,
                      setResponsibilities,
                      responsibilities
                    )
                  }
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white"
                >
                  <FaTrash />
                </button>
              )}
            </div>
          ))}
          {responsibilities.length < 6 && (
            <button
              type="button"
              onClick={() =>
                handleAddField(setResponsibilities, responsibilities)
              }
              className="text-white mt-2"
            >
              + Add Key Responsibility
            </button>
          )}
        </div>

        {/* Description */}
        <div>
          <textarea
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
              setPositionName("");
              setDepartment("");
              setDescription("");
              setQualifications([""]);
              setResponsibilities([""]);
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
