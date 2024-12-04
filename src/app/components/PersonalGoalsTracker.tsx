"use client";
import React, { useState, useEffect } from "react";
import { Avatar, AvatarImage } from "@/app/components/avatar";
import Spinner from "@/app/components/Spinner"; // Import the Spinner component
import { fetchGoals } from "@/redux/slices/performanceManagement.slice";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";

interface PersonalGoalsProps {
  showAvatar: boolean;
}

const PersonalGoals: React.FC<PersonalGoalsProps> = ({ showAvatar }) => {
  const [loading, setLoading] = useState(true);
  const { goals } = useSelector((state: RootState) => state.performance);
  const { userData } = useSelector((state: RootState) => state.auth);
  const dispatch: any = useDispatch();

  useEffect(() => {
    const fetchGoalsData = async () => {
      if (userData?.id) {
        setLoading(true); // Start loading
        const id = userData?.id;
        await dispatch(fetchGoals(id)); // Dispatch fetch goals action
        setLoading(false); // Stop loading
      }
    };
    fetchGoalsData();
  }, [dispatch, userData]);

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-full py-5">
          <Spinner height="30px" width="30px" />
        </div>
      ) : goals && goals.length > 0 ? (
        goals.filter((item: any) => item.status === true).length > 0 ? (
          <ul className="space-y-1 w-full justify-center">
            {goals
              .filter((item: any) => item.status === true)
              .map((item: any) => (
                <li
                  className="flex w-full items-center gap-2 border-default-100 dark:border-default-300 last:border-b-0 4xl:p-2 "
                  key={item.id}
                >
                  {showAvatar && (
                    <Avatar className="w-6 h-6">
                      <AvatarImage
                        src={"/assets/greentick.png"}
                        alt="next-avatar"
                        className="w-full h-full object-cover"
                      />
                    </Avatar>
                  )}
                  <div className="flex-1 text-start overflow-hidden text-ellipsis whitespace-nowrap">
                    <div className="text-base text-default-600 overflow-hidden text-ellipsis whitespace-nowrap">
                      <button
                        className={`inline-block w-[120px] items-center gap-1.5 whitespace-nowrap rounded px-1.5 py-1 text-md font-bold text-start cursor-auto relative group`}
                        title={`Description: ${
                          item.description
                        }\nStart Date: ${new Date(
                          item.start_date
                        ).toLocaleDateString("en-GB")}`}
                      >
                        {item.goal_name}
                      </button>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        ) : (
          <div className="text-center text-gray-500 py-8">No Goals Found</div>
        )
      ) : (
        <div className="text-center text-gray-500 py-8">No Goals Found</div>
      )}
    </div>
  );
};

export default PersonalGoals;
