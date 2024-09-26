"use client";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/**
   * You may want to hide the scrollbar on the body element
   * of your page while using this navigation.
   * 
   * You can accomplish this using the following css:
      .no-scrollbar::-webkit-scrollbar {
          display: none;
      }
    
      .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none; 
      }
    */
const Example = () => {
  return (
    <div className="grid h-screen place-content-center">
      <SideStaggerNavigation />
    </div>
  );
};

// Total number of lines on the side of the page
const NUM_LINES = 30;
// Position key will place the title on the Nth
// line of the sidebar
const navItems = [
  { position: 1, title: "Home", Link: "/" },
  { position: 4, title: "About", Link: "/About" },
  { position: 7, title: "Contact", Link: "/Contact" },
  { position: 10, title: "William James", Link: "/WilliamJames" },
  { position: 13, title: "Jordan Lee", Link: "/JordanLee" },
  { position: 16, title: "Sophia Rodriguez", Link: "/SophiaRodriguez" },
  { position: 19, title: "Elijah Martinez", Link: "/ElijahMartinez" },
  { position: 22, title: "Mrs. Nancy", Link: "/Nancy" },
  { position: 25, title: "Mr. Richard", Link: "/Richard" },
];

const SideStaggerNavigation = () => {
  const [isHovered, setIsHovered] = useState(false);
  const mouseY = useMotionValue(Infinity);

  return (
    <motion.nav
      onMouseMove={(e) => {
        mouseY.set(e.clientY);
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        mouseY.set(Infinity);
        setIsHovered(false);
      }}
      className="fixed right-0 top-0 flex h-screen flex-col items-end justify-between py-4 pl-8"
    >
      {Array.from(Array(NUM_LINES).keys()).map((i) => {
        const linkContent: any = navItems.find(
          (item) => item.position === i + 1
        );

        return (
          <LinkLine
            title={linkContent?.title}
            isHovered={isHovered}
            mouseY={mouseY}
            key={i}
            link={linkContent?.Link}
          />
        );
      })}
    </motion.nav>
  );
};

const SPRING_OPTIONS = {
  mass: 1,
  stiffness: 200,
  damping: 15,
};

const LinkLine = ({
  mouseY,
  isHovered,
  title,
  link,
}: {
  mouseY: MotionValue;
  title: string | undefined;
  isHovered: boolean;
  link: string | undefined;
}) => {
  const path = usePathname();

  const ref = useRef<HTMLDivElement>(null);
  const distance = useTransform(mouseY, (val) => {
    const bounds = ref.current?.getBoundingClientRect();

    return val - (bounds?.y || 0) - (bounds?.height || 0) / 2;
  });

  // Styles for non-link lines
  const lineWidthRaw = useTransform(distance, [-80, 0, 80], [15, 100, 15]);
  const lineWidth = useSpring(lineWidthRaw, SPRING_OPTIONS);

  // Styles for link lines
  const linkWidth = useSpring(25, SPRING_OPTIONS);

  useEffect(() => {
    if (isHovered) {
      linkWidth.set(150);
    } else {
      linkWidth.set(25);
    }
  }, [isHovered]);
 const router = useRouter()
  if (title) {
    return (
      
        <motion.div
          ref={ref}
          className={`group relative cursor-pointer transition-colors hover:bg-red-500 ${
            path === "/Richard" || path === "/About" || path === "/"
              ? "bg-white"
              : "bg-slate-900"
          }`}
          style={{ width: linkWidth, height: 2 }}
          onClick={() => {router.push(link ?? "")}}
        >
          <AnimatePresence>
            {isHovered && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`absolute left-0 top-0 z-10 w-full pt-2 font-bold uppercase  hover:text-red-500 transition-colors group-hover:text-red-500 ${
                  path == "/Richard" || path === "/About" || path === "/"
                    ? "text-white"
                    : "text-slate-900"
                }`}
              >
                {title}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
    
    );
  } else {
    return (
      <motion.div
        ref={ref}
        className={`relative  ${
          path == "/Richard" || path === "/About" || path === "/"
            ? "bg-white"
            : "bg-slate-900"
        }`}
        style={{ width: lineWidth, height: 2 }}
      />
    );
  }
};

export default Example;
