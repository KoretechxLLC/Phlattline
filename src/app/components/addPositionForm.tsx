import { fetchAllDepartment } from "@/redux/slices/organization.slice";
import {
  createTalent,
  updateTalent,
  fetchTalents,
  resetCreateTalentSuccess,
} from "@/redux/slices/talentmanagement.slice";
import { RootState } from "@/redux/store";
import React, { useEffect, useState } from "react";
import StackedNotifications, { NotificationType } from "./Stackednotification";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchDepartmentsWithCounts } from "@/redux/slices/employeee.slice";

const AddPositionForm = ({ job, clearSelectedJob }: any) => {
  const dispatch = useDispatch<any>();
  const [positionName, setPositionName] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [qualifications, setQualifications] = useState<string[]>([""]);
  const [responsibilities, setResponsibilities] = useState<string[]>([""]);
  const [description, setDescription] = useState("");

  const { departments } = useSelector((state: RootState) => state.organization);
  const { userData } = useSelector((state: RootState) => state.auth);
  const {
    createTalentSuccess,
    createTalentError,
    createTalentLoader,
  } = useSelector((state: RootState) => state.talent);

  const [notification, setNotification] = useState<NotificationType | null>(
    null
  );

  // Populate form when editing
  useEffect(() => {
    if (job) {
      setPositionName(job.position_name || "");
      setDepartmentId(job.department_id || "");
      setDescription(job.description || "");
      setQualifications(job.qualification || [""]);
      setResponsibilities(job.key_responsibilities || [""]);
    }
  }, [job]);

  useEffect(() => {
    dispatch(fetchAllDepartment({ organizationId: userData?.organization_id }));
  }, [dispatch, userData?.organization_id]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (
      !departmentId ||
      !positionName ||
      !description ||
      qualifications.some((q) => !q.trim()) ||
      responsibilities.some((r) => !r.trim())
    ) {
      setNotification({
        id: Date.now(),
        text: "All fields are required.",
        type: "error",
      });
      return;
    }

    const payload = {
      position_name: positionName,
      departmentId: Number(departmentId),
      description,
      organizationId: userData.organization_id,
      qualification: qualifications.filter((q) => q.trim() !== ""),
      key_responsibilities: responsibilities.filter((r) => r.trim() !== ""),
    };

    try {
      if (job) {
        // Update logic
        const response = await dispatch(
          updateTalent({ id: job.id, updatedData: payload })
        ).unwrap();

        if (response) {
          setNotification({
            id: Date.now(),
            text: "Position updated successfully!",
            type: "success",
          });
          dispatch(fetchTalents({ organizationId: userData.organization_id })); // Fetch updated list
          clearForm();
        }
      } else {
        // Create logic
        const response = await dispatch(createTalent(payload)).unwrap();

        if (response) {
          setNotification({
            id: Date.now(),
            text: "Position created successfully!",
            type: "success",
          });
          clearForm();
        }
      }
    } catch (error) {
      setNotification({
        id: Date.now(),
        text: `Failed to ${job ? "update" : "create"} position.`,
        type: "error",
      });
    }
  };

  const clearForm = () => {
    setPositionName("");
    setDepartmentId("");
    setDescription("");
    setQualifications([""]);
    setResponsibilities([""]);
    clearSelectedJob();
  };

  const handleAddField = (
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    fields: string[]
  ) => {
    if (fields.length < 6) {
      setter([...fields, ""]);
    }
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

  const handleRemoveField = (
    index: number,
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    fields: string[]
  ) => {
    const updatedFields = fields.filter((_, i) => i !== index);
    setter(updatedFields);
  };

  return (
    <div>
      <StackedNotifications
        notification={notification}
        setNotification={setNotification}
      />
      <div className="bg-gradient-to-b from-[#62626250] to-[#2D2C2C50] text-white 4xl:p-3 p-14 rounded-xl shadow-lg w-full">
        <h2 className="text-xl font-semibold mb-4 text-center">
          {job ? "Edit Position" : "Add Position"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <select
              value={departmentId}
              onChange={(e) => setDepartmentId(e.target.value)}
              className="w-full p-2 rounded-xl h-14 bg-[#2d2c2c] text-white focus:outline-none focus:ring-1 focus:ring-[#626262]"
            >
              <option value="" disabled>
                Select Department
              </option>
              {departments.map((dept: any) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
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
                onClick={() =>
                  handleAddField(setQualifications, qualifications)
                }
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
              onClick={clearForm}
            >
              Clear
            </button>
            <button
              className="w-full sm:w-40 rounded-lg bg-gradient-to-b from-[#BAA716] to-[#B50D34] px-4 py-2 text-center font-medium text-white text-lg transition-transform hover:scale-[1.02] active:scale-[0.98]"
              type="submit"
            >
              {job
                ? createTalentLoader
                  ? "Updating..."
                  : "Update"
                : createTalentLoader
                ? "Saving..."
                : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPositionForm;
