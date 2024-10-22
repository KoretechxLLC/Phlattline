// import { input } from "./input";

const SmartGoalForm = () => {
  return (
    <div className="bg-gradient-to-b from-[#62626250] to-[#2D2C2C50] text-white p-6 rounded-xl shadow-lg w-full">
      <h2 className="text-xl font-semibold mb-4 text-center">
        SMART Goals Creation
      </h2>

      <form className="space-y-4">
        {/* Goal Name */}
        <div>
          <label htmlFor="goal-name" className="sr-only">
            Goal Name
          </label>
          <input
            type="text"
            id="goal-name"
            name="goal-name"
            placeholder="Goal Name"
            className="w-full p-2 rounded-xl h-14 bg-[#2d2c2c] text-white focus:outline-none focus:ring-1 focus:ring-[#626262] border-none shadow-none"
          />
        </div>

        {/* Start Date */}
        <div>
          <label htmlFor="start-date" className="sr-only">
            Start Date
          </label>
          <input
            type="date"
            id="start-date"
            name="start-date"
            placeholder="Start Date"
            className="w-full p-2 rounded-xl h-14 bg-[#2d2c2c] text-white focus:outline-none focus:ring-1 focus:ring-[#626262] shadow-none"
          />
        </div>

        {/* Completion Date */}
        <div>
          <label htmlFor="completion-date" className="sr-only">
            Completion Date
          </label>
          <input
            type="date"
            id="completion-date"
            name="completion-date"
            placeholder="Completion Date"
            className="w-full p-2 rounded-xl h-14 bg-[#2d2c2c] text-white focus:outline-none focus:ring-1 focus:ring-[#626262] shadow-none"
          />
        </div>

        {/* Goal Type */}

        <label htmlFor="goal-type" className="sr-only">
          Goal Type
        </label>
        <div className="relative">
          <select
            id="goal-type"
            name="goal-type"
            className="w-full p-2 rounded-xl h-14 bg-[#2d2c2c] text-white focus:outline-none focus:ring-1 focus:ring-[#626262]"
          >
            <option value="" disabled selected>
              Select Goal Type
            </option>
            <option value="personal">Personal</option>
            <option value="professional">Professional</option>
            <option value="fitness">Fitness</option>
            <option value="financial">Financial</option>
          </select>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="sr-only">
            Description
          </label>
          <input
            id="description"
            name="description"
            placeholder="Description"
            className="w-full p-2 h-24 rounded-xl bg-[#2d2c2c] text-white focus:outline-none focus:ring-1 focus:ring-[#626262] shadow-none"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between gap-3">
          <button
            type="reset"
            className="px-4 py-2 w-full sm:w-40  bg-gray-600 rounded-md hover:bg-gray-500 focus:outline-none"
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
