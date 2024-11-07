"use client";
import { motion, useTransform, useScroll } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import ButtonWrapper from "../components/Button";

const AlexJohnson = () => {
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

  const [xTransform, setXTransform] = useState(["0%", "-74%"]); // default for larger screens

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        const screenWidth = window.innerWidth;

        if (screenWidth <= 1280) {
          setXTransform(["0%", "-68.5%"]); // For screens <= 1024px
        } else if (screenWidth <= 1550) {
          setXTransform(["0%", "-75%"]);
        } else {
          setXTransform(["0%", "-74%"]); // For screens > 1280px
        }
      };

      handleResize(); // Call once on mount to set initial value
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize); // Cleanup
      };
    }
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
      className={`group relative 3xl:w-[335rem] 4xl:w-[327rem] h-[100vh] w-[475rem] overflow-hidden ${
        card.id === 1 ? "flex items-center justify-center" : ""
      }`}
    >
      {/* Card 1 with ProUrl */}
      {card.ProUrl && card.id === 1 && (
        <div className="absolute flex justify-center items-center inset-0 z-10 w-[71rem] 3xl:w-[45rem] 4xl:w-[57rem] bg-cover bg-center">
          <div className="relative leading-none 3xl:left-[12rem] 4xl:left-[11rem] left-[17rem] top-[-3rem] w-[100%] inset-0 flex justify-center  items-center gap-16 3xl:gap-8 4xl:gap-8 ">
            <div className="">
              <Image
                src="/assets/AlexProfile.png"
                alt="Alex Profile"
                className="w-[55vw] 3xl:w-[85vw] 4xl:w-[65vw]"
                width={1000}
                height={1000}
              />
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col">
                <span className="text-white uppercase text-[64px] 3xl:text-[38px] 4xl:text-[48px] font-bold">
                  Alex
                </span>
                <span
                  className="uppercase text-[64px] 3xl:text-[38px] 4xl:text-[48px] font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#BAA716] to-[#ffff]"
                  style={{ fontFamily: "Sansation" }}
                >
                  Johnson
                </span>
              </div>
              <div>
                <button
                  className="text-white py-[10px] font-bold text-[24px] 3xl:text-[16px] 4xl:text-[20px] flex w-[10rem] 3xl:w-[7rem] 4xl:w-[9rem] p-2 justify-center items-center rounded-3xl bg-gradient-to-b whitespace-nowrap from-[#BAA716] to-[#B50D34]"
                  style={{ fontFamily: "Sansation" }}
                >
                  Farming
                </button>
              </div>
            </div>
            <div className="">
              <p
                className="text-white text-[25px] 3xl:text-[14px] leading-[1.1] 4xl:text-[18px] font-regular "
                style={{ fontFamily: "Sansation" }}
              >
                45 years old, resides in Des Moines, Iowa.
              </p>
              <br />
              <br />
              <p
                className="text-white text-[25px] 3xl:text-[14px] leading-[1.1] 4xl:text-[18px] font-regular "
                style={{ fontFamily: "Sansation" }}
              >
                Owner of a mid-sized family farm with a degree in Agricultural
                Science. Over 20 years of experience in farming, with a focus on
                sustainable agriculture and modern farming techniques.
              </p>
            </div>
          </div>

          <div className="absolute 3xl:left-[85rem] 4xl:left-[38rem]  flex justify-center items-center inset-0 z-20 left-[95rem] 3xl:gap-10 w-[130rem]  3xl:w-[21rem]">
            <div className="w-[50rem] 3xl:w-[25rem] 4xl:w-[27rem] relative top-[0rem] 3xl:top-[-1rem] 4xl:top-[-1rem]">
              <div className="flex flex-col items-center leading-none gap-12  w-[44rem]  3xl:w-[30rem] 4xl:w-[40rem]">
                <div>
                  <p
                    className="text-black text-[64px] 3xl:w-[6%] 3xl:h-[6%] 3xl:text-[40px] 4xl:text-[48px] font-bold flex flex-row items-baseline gap-4 3xl:gap-2"
                    style={{ fontFamily: "Sansation" }}
                  >
                    <Image
                      src="/assets/AgriGoal.png"
                      alt="Challenges Icon"
                      width={35}
                      height={35}
                    />
                    <div className="flex">
                      <span
                        className="text-transparent uppercase bg-clip-text 4xl:text-[38px] bg-gradient-to-b from-[#BAA716] to-[#ffff] text-[42px] 3xl:text-[38px] font-bold"
                        style={{ fontFamily: "Sansation" }}
                      >
                        Goals
                      </span>
                      <span
                        className="text-transparent uppercase bg-clip-text 4xl:text-[38px] bg-gradient-to-b from-[#BAA716] to-[#ffff] text-[42px] 3xl:text-[38px] font-bold mx-2"
                        style={{ fontFamily: "Sansation" }}
                      >
                        and
                      </span>
                      <span
                        className="text-transparent uppercase bg-clip-text 4xl:text-[38px] bg-gradient-to-b from-[#BAA716] to-[#ffff] text-[42px] 3xl:text-[38px] font-bold"
                        style={{ fontFamily: "Sansation" }}
                      >
                        Objectives
                      </span>
                    </div>
                  </p>
                  <p
                    className="text-white text-[24px] leading-[1.1] 3xl:text-[14px] 4xl:text-[18px] font-regular mt-2  3xl:mt-1"
                    style={{ fontFamily: "Sansation" }}
                  >
                    Improve patient care and operational efficiency, foster a
                    culture of continuous improvement and professional
                    development among staff.
                  </p>
                </div>
                <div>
                  <p
                    className="text-black text-[64px] 3xl:w-[6%] 3xl:h-[6%] 3xl:text-[40px] 4xl:text-[48px] font-bold flex flex-row items-baseline gap-4 3xl:gap-2"
                    style={{ fontFamily: "Sansation" }}
                  >
                    <Image
                      src="/assets/AgriChallenges.png"
                      alt="Challenges Icon"
                      width={35}
                      height={35}
                    />
                    <span
                      className="text-transparent uppercase bg-clip-text 4xl:text-[38px] bg-gradient-to-b from-[#BAA716] to-[#ffff] text-[42px] 3xl:text-[38px] font-bold"
                      style={{ fontFamily: "Sansation" }}
                    >
                      CHALLENGES
                    </span>
                  </p>
                  <p
                    className="text-white text-[24px] leading-[1.1] 3xl:text-[14px] 4xl:text-[18px] font-regular mt-2  3xl:mt-1"
                    style={{ fontFamily: "Sansation" }}
                  >
                    Managing employee burnout and retention, navigating
                    regulatory changes, and developing future leaders within the
                    organization.
                  </p>
                </div>
              </div>
            </div>
            <div className="absolute left-[95rem] top-[18rem] 3xl:top-[13rem] 4xl:top-[12rem] 3xl:left-[33rem]">
              <Image
                src="/assets/ValuesBanner.png"
                alt="Value Banner"
                width={500}
                height={500}
                className="fixed 3xl:w-[310px] 4xl:w-[400px]"
              />
              <p className="text-white absolute w-[20rem] 3xl:w-[15rem] text-[24px] 3xl:text-[16px] 4xl:text-[20px] text-center top-[5rem] left-[6rem] 3xl:top-[3.5rem] 3xl:left-[2.5rem] 4xl:top-[4.2rem] 4xl:left-[2.6rem] leading-[1.3]">
                Prioritizes sustainability, innovation, and community support.
                Believes in transparent and ethical farming practices, and
                values the importance of family and tradition in farming.
              </p>
            </div>
            <div className="absolute left-[150rem] 3xl:left-[76rem] 4xl:left-[135rem] flex flex-col gap-28 3xl:gap-24 4xl:gap-[4.5rem]">
              <div className="flex items-center justify-between">
                <div className="flex leading-none">
                  <p
                    className="text-white uppercase text-[64px] 3xl:text-[40px] 4xl:text-[48px] font-bold"
                    style={{ fontFamily: "Sansation" }}
                  >
                    Steps to
                  </p>
                  <span
                    className="text-transparent uppercase mx-4 bg-clip-text bg-gradient-to-b from-[#BAA716] to-[#ffff] text-[64px] 3xl:text-[40px] 4xl:text-[48px] font-bold"
                    style={{ fontFamily: "Sansation" }}
                  >
                    Success
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-8 3xl:gap-3 4xl:gap-[1rem] w-[100rem]">
                <div className="flex flex-col bg-black px-[36px] py-[5px] 3xl:px-[20px] 4xl:px-[20px] 3xl:py-[3px] 4xl:py-[3px] rounded-[38px] absolute bottom-[14.5rem]  3xl:bottom-[11rem] 4xl:bottom-[10.7rem] left-[1rem]">
                  <p
                    className="text-white font-bold text-[14px] 3xl:text-[10px] 4xl:text-[12px] p-0 m-0 leading-none"
                    style={{ fontFamily: "Sansation" }}
                  >
                    STEP
                  </p>
                  <p
                    className="text-transparent bg-clip-text bg-gradient-to-b from-[#BAA716] to-[#FFFF] font-bold text-[48px]  3xl:text-[32px] 4xl:text-[40px] p-0 m-0 leading-none"
                    style={{
                      fontFamily: "Sansation",
                      WebkitTextStroke: "0.5px white",
                    }}
                  >
                    01
                  </p>
                </div>
                <div className="border border-red-500 bg-[#E4E4E4] rounded-[10px] w-[322px] h-[270px] 3xl:w-[190px] 3xl:h-[200px] 4xl:w-[230px] 4xl:h-[200px] flex justify-center items-center">
                  <p
                    className="flex mx-8 items-center text-black text-[20px] 3xl:text-[14px] 4xl:text-[16px]"
                    style={{ fontFamily: "Sansation" }}
                  >
                    Go to the &quot;Contact Us&quot; page on the PhlattLine website.
                  </p>
                </div>
                <span>
                  <Image
                    src="/assets/whiteArrow.png"
                    alt="Arrow Icon"
                    width={30}
                    height={30}
                    className="3xl:w-[1.4rem] 4xl:w-[1.4rem]"
                  />
                </span>
                <div className="flex flex-col bg-black px-[36px] py-[5px] 3xl:px-[20px] 4xl:px-[20px] 3xl:py-[3px] 4xl:py-[3px]  rounded-[38px]  absolute bottom-[14.5rem]  3xl:bottom-[11rem] 4xl:bottom-[10.7rem] left-[27rem] 3xl:left-[16rem] 4xl:left-[19rem]">
                  <p
                    className="text-white font-bold text-[14px] 3xl:text-[10px] 4xl:text-[12px] p-0 m-0 leading-none"
                    style={{ fontFamily: "Sansation" }}
                  >
                    STEP
                  </p>
                  <p
                    className="text-transparent bg-clip-text bg-gradient-to-b from-[#BAA716] to-[#ffff] font-bold text-[48px]  3xl:text-[32px] 4xl:text-[40px] p-0 m-0 leading-none"
                    style={{
                      fontFamily: "Sansation",
                      WebkitTextStroke: "0.5px white",
                    }}
                  >
                    02
                  </p>
                </div>
                <div className="border border-red-500 bg-[#E4E4E4] rounded-[10px] w-[322px] h-[270px]  3xl:w-[190px] 3xl:h-[200px] 4xl:w-[230px] 4xl:h-[200px] flex justify-center items-center">
                  <p
                    className="flex mx-8 items-center text-black text-[20px] 3xl:text-[14px] 4xl:text-[16px]"
                    style={{ fontFamily: "Sansation" }}
                  >
                    Fill out the inquiry form with details about your
                    challenges.
                  </p>
                </div>
                <span>
                  <Image
                    src="/assets/whiteArrow.png"
                    alt="Arrow Icon"
                    width={30}
                    height={30}
                    className="3xl:w-[1.4rem] 4xl:w-[1.4rem]"

                  />
                </span>
                <div className="flex flex-col bg-black px-[36px] py-[5px] 3xl:px-[20px] 4xl:px-[20px] 3xl:py-[3px] 4xl:py-[3px]  rounded-[38px]  absolute bottom-[14.5rem]  3xl:bottom-[11rem] 4xl:bottom-[10.7rem] left-[53rem] 3xl:left-[31.5rem] 4xl:left-[37.5rem]">
                  <p
                    className="text-white font-bold text-[14px] 3xl:text-[10px] 4xl:text-[12px] p-0 m-0 leading-none"
                    style={{ fontFamily: "Sansation" }}
                  >
                    STEP
                  </p>
                  <p
                    className="text-transparent bg-clip-text bg-gradient-to-b from-[#BAA716] to-[#ffff] font-bold text-[48px]  3xl:text-[32px] 4xl:text-[40px] p-0 m-0 leading-none"
                    style={{
                      fontFamily: "Sansation",
                      WebkitTextStroke: "0.5px white",
                    }}
                  >
                    03
                  </p>
                </div>
                <div className="border border-red-500 bg-[#E4E4E4] rounded-[10px] w-[322px] h-[270px] 3xl:w-[190px] 3xl:h-[200px] 4xl:w-[230px] 4xl:h-[200px] flex justify-center items-center">
                  <p
                    className="flex mx-8 items-center text-black text-[20px] 3xl:text-[14px] 4xl:text-[16px]"
                    style={{ fontFamily: "Sansation" }}
                  >
                    Submit the form and wait for a PhlattLine representative to
                    contact you.
                  </p>
                </div>
                <span>
                  <Image
                    src="/assets/whiteArrow.png"
                    alt="Arrow Icon"
                    width={30}
                    height={30}
                    className="3xl:w-[1.4rem] 4xl:w-[1.4rem]"

                  />
                </span>
                <div className="flex flex-col bg-black px-[36px] py-[5px] 3xl:px-[20px] 4xl:px-[20px] 3xl:py-[3px] 4xl:py-[3px]  rounded-[38px]  absolute bottom-[14.5rem]  3xl:bottom-[11rem] 4xl:bottom-[10.7rem] left-[79rem] 3xl:left-[46.5rem] 4xl:left-[56rem]">
                  <p
                    className="text-white font-bold text-[14px] 3xl:text-[10px] 4xl:text-[12px] p-0 m-0 leading-none"
                    style={{ fontFamily: "Sansation" }}
                  >
                    STEP
                  </p>
                  <p
                    className="text-transparent bg-clip-text bg-gradient-to-b from-[#BAA716] to-[#ffff] font-bold text-[48px]  3xl:text-[32px] 4xl:text-[40px] p-0 m-0 leading-none"
                    style={{
                      fontFamily: "Sansation",
                      WebkitTextStroke: "0.5px white",
                    }}
                  >
                    04
                  </p>
                </div>
                <div className="border border-red-500 bg-[#E4E4E4] rounded-[10px] w-[322px] h-[270px] 3xl:w-[190px] 3xl:h-[200px] 4xl:w-[230px] 4xl:h-[200px] flex justify-center items-center">
                  <p
                    className="flex mx-8 items-center text-black text-[20px] 3xl:text-[14px] 4xl:text-[16px]"
                    style={{ fontFamily: "Sansation" }}
                  >
                    Register for the ODaaS platform to access on-demand learning
                    resources and personalized learning paths.
                  </p>
                  <div className="absolute left-[83rem] 3xl:left-[48rem] 4xl:left-[58.5rem] bottom-[-2rem] 4xl:bottom-[-1.5rem]">
                    <ButtonWrapper
                      text="Register Now"
                      className="border-red-400 text-white  bg-gradient-to-b from-[#B50D34] to-[#BAA716]"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[100rem] left-[265rem] 3xl:left-[126rem] bottom-[6.4rem] 4xl:left-[196rem] 4xl:bottom-[5rem] 3xl:bottom-[4.6rem] flex flex-col gap-16 3xl:gap-12 4xl:gap-8 justify-center items-center absolute">
              <div className="flex  leading-none gap-2 ">
                <p className="text-white uppercase text-[64px] 3xl:text-[40px] 4xl:text-[48px] font-bold">
                  Our
                </p>
                <p
                  className="text-transparent ml-3 uppercase bg-clip-text 4xl:text-[48px] bg-gradient-to-b from-[#BAA716] to-[#ffff] text-[64px] 3xl:text-[40px] font-bold"
                  style={{
                    fontFamily: "Sansation",
                  }}
                >
                  services
                </p>
              </div>
              <div className="flex ">
                <div className="flex flex-col absolute left-[15rem] top-[15rem] 3xl:left-[31rem] 4xl:top-[10rem] 4xl:left-[28rem] 3xl:top-[11rem] leading-none gap-2 3xl:gap-0">
                  <p className="text-white uppercase text-[30px] 3xl:text-[20px] 4xl:text-[20px] font-bold">
                    Organizational
                  </p>
                  <p
                    className="text-transparent uppercase bg-clip-text 4xl:text-[20px] bg-gradient-to-b from-[#BAA716] to-[#ffff] text-[30px]  3xl:text-[20px] font-bold"
                    style={{
                      fontFamily: "Sansation",
                      WebkitTextStroke: "0.3px white",
                    }}
                  >
                    Development
                  </p>
                  <span className="w-[24%] relative left-[8rem] 3xl:left-[6rem] top-[3rem] 4xl:left-[6rem] 4xl:top-[3rem]">
                    <Image
                      src="/assets/arrowGif.gif"
                      alt="Arrow Gif"
                      height={100}
                      width={100}
                      style={{ transform: "rotate(-270deg)" }}
                    />
                  </span>
                </div>
                <div className="flex flex-col absolute left-[50rem] top-[15rem] 3xl:left-[50rem] 3xl:top-[11rem] 4xl:left-[52rem] 4xl:top-[10rem] leading-none gap-2 3xl:gap-0">
                  <p className="text-white uppercase text-[30px] 3xl:text-[20px] 4xl:text-[20px]  font-bold">
                    Digital Media
                  </p>
                  <p
                    className="text-transparent uppercase bg-clip-text 4xl:text-[20px] bg-gradient-to-b from-[#BAA716] to-[#ffff] text-[30px] 3xl:text-[20px] font-bold"
                    style={{
                      fontFamily: "Sansation",
                      WebkitTextStroke: "0.3px white",
                    }}
                  >
                    Solutions
                  </p>
                  <span className="w-[30%] relative left-[10rem] 3xl:left-[6rem] top-[3rem] 4xl:left-[4rem] 4xl:top-[3rem]">
                    <Image
                      src="/assets/arrowGif.gif"
                      alt="Arrow Gif"
                      height={100}
                      width={100}
                      style={{ transform: "rotate(-270deg)" }}
                    />
                  </span>
                </div>
                <div className="flex flex-col absolute left-[88rem] top-[15rem] 3xl:left-[70rem] 3xl:top-[11rem] 4xl:left-[75rem] 4xl:top-[10rem]  leading-none gap-2 3xl:gap-0 ">
                  <p className="text-white uppercase text-[30px] 3xl:text-[20px] 4xl:text-[20px] font-bold">
                    PhlattLine
                  </p>
                  <p
                    className="text-transparent uppercase bg-clip-text 4xl:text-[20px] bg-gradient-to-b from-[#BAA716] to-[#ffff] text-[30px] 3xl:text-[20px] font-bold"
                    style={{
                      fontFamily: "Sansation",
                      WebkitTextStroke: "0.3px white",
                    }}
                  >
                    Studios
                  </p>
                  <span className="w-[38%] relative left-[8rem] 3xl:left-[4rem] top-[3rem] 4xl:left-[3rem] 4xl:top-[3rem]">
                    <Image
                      src="/assets/arrowGif.gif"
                      alt="Arrow Gif"
                      height={100}
                      width={100}
                      style={{ transform: "rotate(-270deg)" }}
                    />
                  </span>
                </div>
                <div className="flex gap-72 3xl:gap-28 4xl:gap-40">
                  <Image
                    src="/assets/AgricultureDoor.png"
                    alt="About Door"
                    height={1000}
                    width={1000}
                    className="h-[460px] w-[290px] 3xl:h-[345px] 4xl:h-[358px] 3xl:w-[25%] 4xl:w-[25%]"
                  />
                  <Image
                    src="/assets/AgricultureDoor.png"
                    height={1000}
                    width={1000}
                    alt="About Door"
                    className="h-[460px] w-[290px] 3xl:h-[345px] 4xl:h-[358px] 3xl:w-[25%] 4xl:w-[25%]"
                  />
                  <Image
                    src="/assets/AgricultureDoor.png"
                    alt="About Door"
                    className="h-[460px] w-[290px] 3xl:h-[345px] 4xl:h-[358px] 3xl:w-[25%] 4xl:w-[25%]"
                    height={1000}
                    width={1000}
                  />
                </div>
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

export default AlexJohnson;

type CardType = {
  url: string;
  ProUrl?: string; // Optional property
  id: number;
};

const cards: CardType[] = [
  {
    url: "./assets/Richard.png",
    ProUrl: "./assets/Richard.png",
    id: 1,
  },
];
