import { Avatar, AvatarImage } from "@/app/components/avatar";

interface PersonalGoalsProps {
  goals: { id: number; goal: string }[];
  showAvatar: boolean;
}

const PersonalGoals: React.FC<PersonalGoalsProps> = ({ goals, showAvatar }) => {
  return (
    <div>
      <ul className="space-y-1 w-full justify-center">
        {goals.map((item) => (
          <li
            className="flex w-full items-center gap-2 border-b border-gray-500 border-default-100 dark:border-default-300 last:border-b-0 py-2 "
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
                {item.goal}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PersonalGoals;
