"use client";
import { motion, useTransform, useScroll } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const ElijahMartinez = () => {
  return (
    <div className="bg-neutral-800">
      <HorizontalScrollCarousel />
    </div>
  );
};

const HorizontalScrollCarousel = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const [xTransform, setXTransform] = useState(["0%", "-44%"]); // default for larger screens

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        const screenWidth = window.innerWidth;

        if (screenWidth <= 1024) {
          setXTransform(["0%", "-37.5%"]); // For screens <= 1024px
        } else if (screenWidth <= 1280) {
          setXTransform(["0%", "-34.3%"]);
        } else if (screenWidth <= 1550) {
          setXTransform(["0%", "-41.6%"]);
        } else {
          setXTransform(["0%", "-44%"]); // For screens > 1280px
        }
      }

      handleResize(); // Call once on mount to set initial value
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize); // Cleanup
      };
    };
  }, []);

  const x = useTransform(scrollYProgress, [0, 1], xTransform);

  return (
    <section ref={targetRef} className="relative h-[300vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex">
          {cards.map((card) => (
            <Card card={card} key={card.id} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const Card = ({ card }: { card: CardType }) => {
  return (
    <div
      className={`group relative 3xl:w-[460rem] 4xl:w-[464rem] h-[100vh] w-[561rem] overflow-hidden ${
        card.id === 1 ? "flex items-center justify-center" : ""
      }`}
    >
      {/* Card 1 with ProUrl */}
      {card.ProUrl && card.id === 1 && (
        <div className="absolute flex justify-center items-center inset-0 z-10 w-[75rem] 3xl:w-[45rem] 4xl:w-[60rem] bg-cover bg-center">
          <div className="relative leading-none 3xl:left-[12rem] 4xl:left-[13.5rem] left-[17rem] top-[-3rem] w-[100%] inset-0 flex justify-center  items-center gap-16 3xl:gap-8 4xl:gap-8 ">
            <div className="">
              <img
                src="./assets/ElijahProfile.png"
                alt="Jordan Profile"
                className="w-[48vw] 3xl:w-[85vw] 4xl:w-[55vw]"
              />
            </div>
            <div className="flex flex-col gap-8">
              <div className="flex flex-col">
                <span
                  className="text-black uppercase text-[64px] 3xl:text-[40px] 4xl:text-[48px] font-bold"
                  style={{ fontFamily: "Sansation" }}
                >
                  Elijah
                </span>
                <span
                  className="uppercase text-[64px] 3xl:text-[40px] 4xl:text-[48px] font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#BAA716] to-[#B50D34]"
                  style={{ fontFamily: "Sansation" }}
                >
                  Martinez
                </span>
              </div>
              <div>
                <button
                  className="text-white uppercase px-[20px] py-[10px] text-[24px] 3xl:text-[16px] 4xl:text-[20px] flex w-full p-1 justify-center items-center rounded-3xl bg-gradient-to-b whitespace-nowrap from-[#BAA716] to-[#B50D34]"
                  style={{ fontFamily: "Sansation" }}
                >
                  Founder and CEO
                </button>
              </div>
            </div>
            <div className="">
              <p
                className="text-black text-[24px] 3xl:text-[14px] 4xl:text-[18px] font-regular leading-normal"
                style={{ fontFamily: "Sansation" }}
              >
                33 years old, based in Ogden, Utah. Founder and CEO of an
                eco-friendly construction startup.
              </p>
              <br />
              <p
                className="text-black text-[24px] 3xl:text-[14px] 4xl:text-[18px] font-regular leading-normal"
                style={{ fontFamily: "Sansation" }}
              >
                Degree in Environmental Science and Civil Engineering. Launched
                the startup 7 years ago, growing it from a small team to a
                notable player in sustainable construction in Utah.
              </p>
            </div>
          </div>

          <div className="absolute 3xl:left-[137rem] 4xl:left-[125rem]  flex justify-center items-center inset-0 z-20 left-[155rem] 3xl:gap-10 w-[80rem] gap-12  3xl:w-[21rem]">
            <div className="w-[35rem] 3xl:w-[25rem] 4xl:w-[27rem] relative">
              <div className="flex flex-col items-center leading-none gap-4  w-[60rem]  3xl:w-[38rem] 4xl:w-[44rem]">
                <div>
                  <p
                    className="text-black text-[64px] 3xl:w-[6%] 3xl:h-[6%] 3xl:text-[40px] 4xl:text-[48px] font-bold flex flex-row  gap-4 3xl:gap-2"
                    style={{ fontFamily: "Sansation" }}
                  >
                    <img src="./assets/goalIcon.png" alt="" />
                    <span
                      className="text-transparent bg-clip-text 4xl:text-[48px] bg-gradient-to-b from-[#BAA716] to-[#B50D34] text-[64px] 3xl:text-[40px] font-bold"
                      style={{ fontFamily: "Sansation" }}
                    >
                      GOAL
                    </span>
                  </p>
                  <p
                    className="text-black text-[22px] 3xl:text-[14px] 4xl:text-[18px] font-regular leading-normal ml-20 3xl:ml-12  3xl:mt-1"
                    style={{ fontFamily: "Sansation" }}
                  >
                    Seeks to lead his company to the forefront of sustainable
                    building practices, expanding the business while maintaining
                    a strong focus on sustainability and innovation. Aims to
                    build a resilient organizational culture that embraces
                    change and fosters employee growth.
                  </p>
                </div>
                <div>
                  <p
                    className="text-black text-[64px] 3xl:w-[6%] 3xl:h-[6%] fullHD:text-[64px] 3xl:text-[40px] 4xl:text-[48px] font-bold flex flex-row items-baseline gap-4 3xl:gap-2"
                    style={{ fontFamily: "Sansation" }}
                  >
                    <img src="./assets/ChallengesIcon.png" alt="" />
                    <span
                      className="text-transparent bg-clip-text 4xl:text-[48px] bg-gradient-to-b from-[#BAA716] to-[#B50D34] text-[64px] 3xl:text-[40px] font-bold"
                      style={{ fontFamily: "Sansation" }}
                    >
                      CHALLENGES
                    </span>
                  </p>
                  <p
                    className="text-black text-[22px] 3xl:text-[14px] 4xl:text-[18px] font-regular leading-normal ml-20 3xl:ml-12   3xl:mt-1"
                    style={{ fontFamily: "Sansation" }}
                  >
                    Struggles with balancing the operational demands of a
                    growing business with the strategic focus needed to stay
                    ahead in a competitive and rapidly evolving industry. Faces
                    challenges in attracting and retaining top talent with a
                    shared vision for sustainability.
                  </p>
                </div>
              </div>
            </div>
            <div className="">
              <img
                src="./assets/Window2.png"
                alt=""
                className="absolute top-0 left-[38rem] 3xl:left-[-12rem] 4xl:left-[22rem] w-[30vw] 3xl:w-[35vw] 3xl:h-[77.5vh] 4xl:h-[77.5vh] h-[77.5vh]"
              />
            </div>
            <div className="flex flex-col gap-24 ">
              <div className="flex relative left-[100rem] bottom-[13rem] 3xl:bottom-[10rem] 4xl:bottom-[10rem]  3xl:left-[55rem] 4xl:left-[70rem] gap-16 3xl:gap-8 4xl:gap-12 w-[100rem]">
                <img
                  src="./assets/valueBanner.png"
                  alt=""
                  className="3xl:w-[25rem] 3xl:h-[70vh] 4xl:w-[28rem] 4xl:h-[70vh]"
                />
                <img
                  src="./assets/behaviorBanner.png"
                  alt=""
                  className="3xl:w-[25rem] 3xl:h-[70vh] 4xl:w-[30rem] 4xl:h-[70vh]"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <div
        style={{
          backgroundImage: `url(${card.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="absolute inset-0 z-0"
      ></div>
    </div>
  );
};

export default ElijahMartinez;

type CardType = {
  url: string;
  ProUrl?: string; // Optional property
  id: number;
};

const cards: CardType[] = [
  {
    url: "./assets/Nancy.png",
    ProUrl: "./assets/ElijahProfile.png",
    id: 1,
  },
];
