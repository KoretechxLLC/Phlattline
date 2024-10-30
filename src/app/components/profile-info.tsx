"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/app/components/dropdown-menu";
import Icon from "@/app/components/utility-icon";
import { RootState } from "@/redux/store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const ProfileInfo = () => {
  const { userData } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  return (
    <div className="md:block hidden">
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="cursor-pointer">
          <div className="flex items-center gap-3 text-default-800">
            {userData?.profile_image ? (
              <div className="w-10 h-10 ring-1 ring-[#fff] md:mt-0 mt-3 flex items-center justify-center rounded-full overflow-hidden">
                <Image
                  alt="User profile image"
                  src={`/users/profileimage/${userData.profile_image}`}
                  layout="responsive" // Use responsive layout to control aspect ratio
                  width={5000} // Adjust width for better performance
                  height={5000} // Adjust height for better performance
                  className="rounded-full object-cover" // Use object-cover to fill the container
                />
              </div>
            ) : (
              <div className="w-10 h-10 ring-1 ring-white md:mt-0 mt-3 flex items-center justify-center bg-gradient-to-b from-[#BAA716] to-[#fff] rounded-full">
                <span className="text-white text-2xl md:text-8xl font-bold pt-3">
                  {userData?.first_name?.charAt(0).toUpperCase() +
                    userData?.last_name?.charAt(0).toUpperCase()}
                </span>
              </div>
            )}

            <span className="text-base me-2.5 lg:inline-block hidden">
              <Icon icon="heroicons-outline:chevron-down" />
            </span>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-56 p-0 bg-white text-black"
          align="end"
        >
          <DropdownMenuGroup>
            {[
              {
                name: "Profile Setting",
                icon: "heroicons:user",
                href: "/user-profile",
              },
              {
                name: "Billing Method",
                icon: "heroicons:credit-card",
                href: "/dashboard",
              },
              {
                name: "Purchase History",
                icon: "heroicons:shopping-bag",
                href: "/dashboard",
              },
            ].map((item, index) => (
              <div key={`info-menu-${index}`}>
                <DropdownMenuItem
                  className="flex ml-6 items-center gap-2 text-sm font-medium text-default-600 capitalize px-3 py-1.5 cursor-pointer"
                  onClick={() => router.push(item.href)}
                >
                  <Icon icon={item.icon} className="w-4 h-4 text-red-600" />
                  {item.name}
                </DropdownMenuItem>
                {index < 3 && (
                  <div className="h-px w-36 bg-gray-300 my-1 mx-8"></div>
                )}
              </div>
            ))}
          </DropdownMenuGroup>
          <DropdownMenuItem
            className="flex items-center ml-6 gap-2 text-sm font-medium text-default-600 capitalize my-1 px-3 cursor-pointer"
            onClick={() => router.push("/Login")}
          >
            <div>
              <form>
                <button
                  type="submit"
                  className="w-full flex items-center gap-2"
                >
                  <Icon
                    icon="heroicons:arrow-right-on-rectangle"
                    className="w-4 h-4 text-red-600"
                  />
                  Log out
                </button>
              </form>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ProfileInfo;
