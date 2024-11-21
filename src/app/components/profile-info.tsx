"use client";
import { RootState } from "@/redux/store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { Dispatch, SetStateAction, useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { logout } from "@/redux/slices/auth.slice";
import Icon from "@/app/components/utility-icon";

const ProfileInfo = () => {
  const [image, setImage] = useState<string | undefined>();
  const [imgError, setImgError] = useState(false);
  const { userData } = useSelector((state: RootState) => state.auth);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const dispatch: any = useDispatch();
  const [loading, setLoading] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleError = () => {
    setImgError(true); // Set error flag when image fails to load
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      await dispatch(logout(userData?.id));
      router.push("/Login");
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      setLoading(false);
    }
  };

  // Close menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={menuRef} className="md:block hidden relative">
      <motion.div
        onClick={() => setOpen((prev) => !prev)}
        animate={open ? "open" : "closed"}
        className="flex items-center gap-2 z-50 cursor-pointer"
      >
        {userData?.profile_image ? (
          <div className="w-10 h-10 ring-1 ring-white flex items-center justify-center rounded-full overflow-hidden">
            <Image
              alt="User profile image"
              src={`/api/images?filename=${userData.profile_image}&folder=profileImage`}
              layout="responsive"
              width={5000}
              height={5000}
              className="rounded-full object-cover"
            />
          </div>
        ) : (
          <div className="w-10 h-10 ring-1 ring-white flex items-center justify-center bg-gradient-to-b from-[#BAA716] to-[#B50D34] rounded-full">
            <span className="text-white text-sm font-bold">
              {userData?.first_name?.charAt(0).toUpperCase() +
                userData?.last_name?.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        <motion.span variants={iconVariants}>
          <Icon icon="heroicons-outline:chevron-down" />
        </motion.span>
      </motion.div>

      {open && (
        <motion.ul
          initial="closed"
          animate="open"
          exit="closed"
          variants={wrapperVariants}
          style={{ originY: "top", translateX: "-50%" }}
          className="flex flex-col gap-1 p-3 z-50 rounded-lg bg-white shadow-xl absolute overflow-hidden"
        >
          <Option
            setOpen={setOpen}
            icon="heroicons:user"
            text="Profile Setting"
            href="/Portal/Settings?view=profilesettings"
          />
          <hr className="border-t border-gray-300 " />
          <Option
            setOpen={setOpen}
            icon="heroicons:credit-card"
            text="Billing Method"
            href="/Portal/Settings?view=billingmethod"
          />
          <hr className="border-t border-gray-300 " />
          <Option
            setOpen={setOpen}
            icon="heroicons:shopping-bag"
            text="Purchase History"
            href="/Portal/Settings/PurchaseHistory"
          />
          <hr className="border-t border-gray-300 " />
          <Option
            setOpen={setOpen}
            icon="heroicons:arrow-right-on-rectangle"
            text="Log Out"
            action={handleLogout}
            loading={loading}
          />
        </motion.ul>
      )}
    </div>
  );
};

const Option = ({
  text,
  icon,
  href,
  setOpen,
  action,
  loading,
}: {
  text: string;
  icon: string;
  href?: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
  action?: () => void;
  loading?: boolean;
}) => {
  const router = useRouter();

  const handleClick = () => {
    if (action) {
      action();
    } else if (href) {
      router.push(href);
    }
    setOpen(false);
  };

  return (
    <motion.li
      variants={itemVariants}
      onClick={handleClick}
      className="flex items-center gap-2 w-full p-3 text-xs font-medium whitespace-nowrap rounded-md hover:bg-orange-100 text-slate-700 hover:text-red-600 transition-colors cursor-pointer"
    >
      <motion.span variants={actionIconVariants}>
        <Icon icon={icon} className="text-red-500 w-4 h-4" />
      </motion.span>
      <span>{loading && text === "Log Out" ? "Logging out..." : text}</span>
    </motion.li>
  );
};

export default ProfileInfo;

const wrapperVariants = {
  open: {
    scaleY: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  closed: {
    scaleY: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.1,
    },
  },
};

const iconVariants = {
  open: { rotate: 180 },
  closed: { rotate: 0 },
};

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren",
    },
  },
  closed: {
    opacity: 0,
    y: -15,
    transition: {
      when: "afterChildren",
    },
  },
};

const actionIconVariants = {
  open: { scale: 1, y: 0 },
  closed: { scale: 0, y: -7 },
};
