import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/avatar";

const PersonalGoals = () => {
  const activity = [
    {
      id: 1,
      goal: "Implement the strategy",
    },
    {
      id: 2,
      goal: "Conduct a situational analysis.",
    },
  ];

  return (
    <div>
      <ul className="space-y-1 w-full justify-center">
        {activity.map((item) => (
          <li
            className="flex w-full items-center gap-2 border-b border-gray-500 border-default-100 dark:border-default-300 last:border-b-0 pb-2 last:pb-0"
            key={item.id}
          >
            <Avatar className="w-6 h-6">
              <AvatarImage
                src={"/assets/greentick.png"}
                alt="next-avatar"
                className="w-full h-full object-cover"
              />
            </Avatar>
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
