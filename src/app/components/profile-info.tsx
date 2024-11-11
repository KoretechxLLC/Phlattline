"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/dropdown-menu";
import Icon from "@/app/components/utility-icon";
import { RootState } from "@/redux/store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { Dispatch, SetStateAction, useState } from "react";
import { logout } from "@/redux/slices/auth.slice";

const ProfileInfo = () => {
  const { userData } = useSelector((state: RootState) => state.auth);
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const dispatch: any = useDispatch();
  const [loading, setLoading] = useState(false);

  const userId: any = userData?.id; // Access the user ID from userData

  const handleLogout = async () => {
    try {
      setLoading(true); // Start loading

      // Assuming `userId` is fetched correctly from `userData`
      const userId = userData?.id;

      if (!userId) {
        console.error("User ID not found.");
        return;
      }

      await dispatch(logout(userId));

      router.push("/Login");
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

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
              <div className="w-10 h-10 ring-1 ring-white md:mt-0 mt-3 flex items-center justify-center bg-gradient-to-b from-[#BAA716] to-[#B50D34]  rounded-full">
                <span className="text-white text-sm md:text-sm font-bold py-3">
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
          className="w-56 py-8 bg-white text-black rounded-2xl"
          align="end"
        >
          <DropdownMenuGroup>
            {[
              {
                name: "Profile Setting",
                icon: "heroicons:user",
                href: "/Portal/Settings?view=profilesettings",
              },
              {
                name: "Billing Method",
                icon: "heroicons:credit-card",
                href: "/Portal/Settings?view=billingmethod",
              },
              {
                name: "Purchase History",
                icon: "heroicons:shopping-bag",
                href: "/Portal/Settings/PurchaseHistory",
              },
            ].map((item, index) => (
              <div key={`info-menu-${index}`}>
                <DropdownMenuItem
                  className="flex ml-6 items-center gap-4 text-sm font-normal text-default-600 capitalize px-1 py-3 cursor-pointer"
                  onClick={() => router.push(item.href)}
                >
                  <Icon icon={item.icon} className="w-5 h-5 text-red-600" />
                  {item.name}
                </DropdownMenuItem>
                {index < 3 && (
                  <div className="h-px w-40 bg-gray-200 my-1 mx-6"></div>
                )}
              </div>
            ))}
          </DropdownMenuGroup>
          <DropdownMenuItem className="flex items-center ml-6 gap-4 text-sm font-medium text-default-600 capitalize my-1 px-1 cursor-pointer">
            <button
              type="button"
              onClick={handleLogout} // Attach the handleLogout function here
              className="w-full flex items-center gap-4"
              disabled={loading} // Disable the button when loading
            >
              <Icon
                icon="heroicons:arrow-right-on-rectangle"
                className="w-5 h-5 text-red-600"
              />
              {loading ? "Logging out..." : "Log out"}
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ProfileInfo;
