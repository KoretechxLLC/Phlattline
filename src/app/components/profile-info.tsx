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
import Image from "next/image";
import { useRouter } from "next/navigation";

const ProfileInfo = () => {
  const router = useRouter();

  return (
    <div className="md:block hidden">
      <DropdownMenu>
        <DropdownMenuTrigger asChild className=" cursor-pointer">
          <div className=" flex items-center gap-3  text-default-800 ">
            <Image
              src={"/assets/userProfile.png"}
              alt={"User  "}
              width={36}
              height={36}
              className="rounded-full"
            />
            <span className="text-base  me-2.5 lg:inline-block hidden">
              <Icon icon="heroicons-outline:chevron-down"></Icon>
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
                  <div className="h-1 w-40 ml-6 bg-gray-300 my-1 "></div>
                )}
              </div>
            ))}
          </DropdownMenuGroup>
          <DropdownMenuItem
            className="flex items-center ml-6 gap-2 text-sm font-medium text-default-600 capitalize my-1 px-3 cursor-pointer"
            onClick={() => router.push("/login")} // Update the href to the login page
          >
            <div>
              <form className="">
                <button
                  type="submit"
                  className=" w-full   flex  items-center gap-2"
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
