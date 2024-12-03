"use client";
import React, { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { useRouter } from "next/navigation"; // Importing useRouter
import Logo from "./Logo";
import { logout } from "@/redux/slices/auth.slice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export const Hamburger = () => {
  return (
    <div className="h-10  bg-neutral-100">
      <Nav />
    </div>
  );
};

const Nav = () => {
  const [active, setActive] = useState(false);

  return (
    <>
      <HamburgerButton active={active} setActive={setActive} />
      <AnimatePresence>
        {active && <LinksOverlay setActive={setActive} />}
      </AnimatePresence>
    </>
  );
};

const LinksOverlay = ({
  setActive,
}: {
  setActive: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <nav className="fixed right-4 top-4 z-40 h-[calc(100vh_-_32px)] w-[calc(100%_-_32px)] overflow-hidden">
      <NavLogo />
      <LinksContainer setActive={setActive} />
      <FooterCTAs setActive={setActive} />
    </nav>
  );
};

const LinksContainer = ({
  setActive,
}: {
  setActive: Dispatch<SetStateAction<boolean>>;
}) => {
  const { userData } = useSelector((state: RootState) => state.auth);
  const LINKS = [
    {
      title: "Dashboard",
      href: "/Portal/Dashboard",
    },
    {
      title: "Courses",
      href: "/Portal/Courses",
    },
    {
      title: "Daily Dose",
      href: "/Portal/DailyDose",
    },
    {
      title: "Assessments",
      href: "/Portal/Assessments",
    },
  ];

  if (userData?.user_type_id === 2) {
    LINKS.push(
      {
        href: "/Portal/PerformanceManagementOrg",
        title: "Performance Management",
      },
      {
        href: "/Portal/ODaas",
        title: "ODaas",
      },
      {
        href: "/Portal/TalentManagement",
        title: "Talent Management",
      },
      { href: "/Portal/Reports", title: "Reports" },
      {
        title: "Settings",
        href: "/Portal/Settings",
      }
    );
  }

  if (userData?.user_type_id === 1) {
    LINKS.push(
      {
        href: "/Portal/PerformanceManagement",
        title: "Performance Management",
      },
      {
        href: "/Portal/ExploreJobs",
        title: "Explore Jobs",
      },
      { href: "/Portal/Reports", title: "Reports" }
    );
  }
  if (userData?.user_type_id === 3) {
    LINKS.push(
      {
        href: "/Portal/PerformanceManagement",
        title: "Performance Management",
      },

      { href: "/Portal/Reports", title: "Reports" }
    );
  }

  return (
    <motion.div className="space-y-4 p-12 z-50 pl-4 md:pl-20">
      {LINKS.map((l, idx) => {
        return (
          <NavLink key={l.title} href={l.href} idx={idx} setActive={setActive}>
            {l.title}
          </NavLink>
        );
      })}
    </motion.div>
  );
};

const NavLink = ({
  children,
  href,
  idx,
  setActive,
}: {
  children: ReactNode;
  href: string;
  idx: number;
  setActive: Dispatch<SetStateAction<boolean>>;
}) => {
  const router = useRouter(); // Getting access to the router

  const handleNavigation = (href: string) => {
    router.push(href); // Using router.push for navigation
    setActive(false); // Close the hamburger menu
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          delay: 0.75 + idx * 0.125,
          duration: 0.5,
          ease: "easeInOut",
        },
      }}
      exit={{ opacity: 0, y: -8 }}
      onClick={() => handleNavigation(href)} // On click, navigate to the href
      className="block text-3xl z-50 font-semibold text-white-400 transition-colors hover:text-red-600 md:text-5xl cursor-pointer"
    >
      {children}
    </motion.div>
  );
};

const NavLogo = () => {
  return (
    <motion.a
      initial={{ opacity: 0, y: -12 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: { delay: 0.5, duration: 0.5, ease: "easeInOut" },
      }}
      exit={{ opacity: 0, y: -12 }}
      href="#"
      className="grid h-24 w-24 place-content-evenly z-50 rounded-br-xl rounded-tl-xl bg-white transition-colors hover:bg-violet-50"
    >
      <div className="ml-5">
        <Logo />
      </div>
    </motion.a>
  );
};

const HamburgerButton = ({
  active,
  setActive,
}: {
  active: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <>
      <motion.div
        initial={false}
        animate={active ? "open" : "closed"}
        variants={UNDERLAY_VARIANTS}
        style={{ top: 16, right: 16 }}
        className="fixed z-40 rounded-xl bg-gradient-to-b from-[#B50D34] to-[#BAA716] shadow-lg shadow-violet-800/20"
      />

      <motion.button
        initial={false}
        animate={active ? "open" : "closed"}
        onClick={() => setActive((pv) => !pv)}
        className={`group fixed right-4 top-4 z-50 h-10 w-12 bg-white/0 transition-all hover:bg-white/20 ${
          active ? "rounded-bl-xl rounded-tr-xl" : "rounded-xl"
        }`}
      >
        <motion.span
          variants={HAMBURGER_VARIANTS.top}
          className="absolute block h-1 w-8 bg-white"
          style={{ y: "-50%", left: "50%", x: "-50%" }}
        />
        <motion.span
          variants={HAMBURGER_VARIANTS.middle}
          className="absolute block h-1 w-8 bg-white"
          style={{ left: "50%", x: "-50%", top: "50%", y: "-50%" }}
        />
        <motion.span
          variants={HAMBURGER_VARIANTS.bottom}
          className="absolute block h-1 w-8 bg-white"
          style={{ left: "50%", x: "-50%", top: "65%", y: "-50%" }}
        />
      </motion.button>
    </>
  );
};

const FooterCTAs = ({
  setActive,
}: {
  setActive: Dispatch<SetStateAction<boolean>>;
}) => {
  const { userData } = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch: any = useDispatch();

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

      setActive(false); // Close the hamburger menu after logout
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <motion.button
      initial={{ opacity: 0, y: 8 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          delay: 1.125,
          duration: 0.5,
          ease: "easeInOut",
        },
      }}
      exit={{ opacity: 0, y: 8 }}
      onClick={handleLogout}
      className="absolute bottom-2 right-2 z-50 flex items-center gap-2 rounded-full bg-gradient-to-b from-[#B50D34] to-[#BAA716] px-3 py-3 text-lg uppercase text-white-200 transition-colors hover:bg-white hover:text-red-600 md:bottom-4 md:right-4 md:px-6 md:text-4xl"
    >
      <span>Log out</span> <FiArrowRight />
    </motion.button>
  );
};

const UNDERLAY_VARIANTS = {
  open: {
    width: "calc(100% - 32px)",
    height: "calc(100vh - 32px)",
    transition: { type: "spring", mass: 3, stiffness: 400, damping: 50 },
  },
  closed: {
    width: "45px",
    height: "40px",
    transition: {
      delay: 0.75,
      type: "spring",
      mass: 3,
      stiffness: 400,
      damping: 50,
    },
  },
};

const HAMBURGER_VARIANTS = {
  top: {
    open: {
      rotate: 50,
      top: "50%",
    },
    closed: {
      rotate: 0,
      top: "35%",
    },
  },
  middle: {
    open: {
      rotate: 50,
    },
    closed: {
      rotate: 0,
    },
  },
  bottom: {
    open: {
      rotate: -50,
      top: "50%", // Aligning with the top bar during the open state
    },
    closed: {
      rotate: 0,
      top: "65%", // Keeping it similar to its initial closed position
    },
  },
};
