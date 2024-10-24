"use client";
import { motion, useTransform, useScroll } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import ButtonWrapper from "../components/Button";
import Image from "next/image";

const Richard = () => {
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

  const [xTransform, setXTransform] = useState(["0%", "-61.5%"]); // default for larger screens

  useEffect(() => {
    // Function to set the transform based on screen width
    const handleResize = () => {
      if (typeof window !== "undefined") {
        const screenWidth = window.innerWidth;

        if (screenWidth <= 1024) {
          setXTransform(["0%", "-52.5%"]); // For screens <= 1024px
        } else if (screenWidth <= 1281) {
          setXTransform(["0%", "-51%"]);
        } else if (screenWidth <= 1550) {
          setXTransform(["0%", "-59.7%"]);
        } else {
          setXTransform(["0%", "-61.5%"]); // For screens > 1280px
        }
      }

      handleResize(); // Call once on mount to set the initial value
      window.addEventListener("resize", handleResize); // Listen to window resize

      return () => {
        window.removeEventListener("resize", handleResize); // Cleanup on unmount
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
      className={`group relative 3xl:w-[460rem] 4xl:w-[463rem] h-[100vh] w-[575rem] overflow-hidden ${
        card.id === 1 ? "flex items-center justify-center" : ""
      }`}
    >
      {/* Card 1 (with ProUrl and other content) */}
      {card.ProUrl && card.id === 1 && (
        <div className="absolute flex justify-center items-center inset-0 z-10  w-[75rem] 3xl:w-[45rem] 4xl:w-[60rem] bg-cover bg-center ">
          {/* Name overlay */}
          <div className="relative leading-none 3xl:left-[13rem] 4xl:left-[13.5rem] left-[21.5rem] top-[-2rem] w-[100%] inset-0 flex justify-center  items-center gap-16 3xl:gap-8 4xl:gap-8  ">
            <div className="">
              <Image
                src="/assets/richardProfile.png"
                alt="Richard Profile"
                width={1000}
                height={1000}
                className="w-[95vw] 3xl:w-[130vw] 4xl:w-[90vw]"
              />
            </div>
            <div className="flex flex-col gap-8">
              <div className="flex flex-col">
                <span
                  className="text-white uppercase text-[64px] 3xl:text-[40px] 4xl:text-[48px] font-bold"
                  style={{ fontFamily: "Sansation" }}
                >
                  Mr
                </span>
                <span
                  className=" uppercase text-[64px] 3xl:text-[40px] 4xl:text-[48px] font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#c9b54b] to-[#ffff]"
                  style={{ fontFamily: "Sansation" }}
                >
                  RICHARD
                </span>
              </div>
              <div>
                <button
                  className="text-white uppercase px-[20px] py-[10px]  text-[24px]  3xl:text-[16px] 4xl:text-[20px]  flex w-full p-1 justify-center items-center rounded-3xl bg-gradient-to-b whitespace-nowrap from-[#BAA716] to-[#B50D34]"
                  style={{ fontFamily: "Sansation" }}
                >
                  Ecologist
                </button>
              </div>
            </div>
            <div>
              <p
                className="text-white text-[24px] 3xl:text-[14px] 4xl:text-[18px] font-regular leading-normal"
                style={{ fontFamily: "Sansation" }}
              >
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry &apos; standard
                dummy text ever since the 1500s, when an unknown printer took a
                galley of type and scrambled it to make a type specimen book. It
                has survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged.
              </p>
            </div>
          </div>
          <div className="absolute 3xl:left-[93rem] 4xl:left-[80rem]  flex justify-center items-center inset-0 z-20 left-[108rem] 3xl:gap-10 w-[80rem] gap-12  3xl:w-[21rem]">
            <div className="w-[32rem] 3xl:w-[22rem] 4xl:w-[27rem] relative">
              <div className="flex flex-col leading-none gap-2 4xl:gap-[0.2rem]">
                <p
                  className="text-white uppercase text-[64px] 3xl:text-[40px] 4xl:text-[48px] font-bold"
                  style={{ fontFamily: "Sansation" }}
                >
                  SERVICES
                </p>
                <p
                  className="text-white uppercase text-[64px] fullHD:text-[64px] w-[40rem] 3xl:text-[40px] 4xl:text-[48px] 7xl:text-[52px] 8xl:text-[52px] 5xl:text-[52px] font-bold "
                  style={{ fontFamily: "Sansation" }}
                >
                  WHERE I WAS
                </p>
                <p
                  className="text-white uppercase text-[64px] fullHD:text-[64px] 3xl:text-[40px] 4xl:text-[48px]  font-bold flex flex-row items-center gap-4  3xl:gap-2"
                  style={{ fontFamily: "Sansation" }}
                >
                  IN
                  <span
                    className="text-transparent uppercase bg-clip-text 4xl:text-[48px] bg-gradient-to-b from-[#c9b54b] to-[#ffff] text-[64px] 3xl:text-[40px] 5xl:text-[52px] 7xl:text-[52px] 8xl:text-[52px] font-bold"
                    style={{ fontFamily: "Sansation" }}
                  >
                    TROUBLE
                  </span>
                  <span className="mt-7 3xl:mt-4 3xl:ml-4 w-[4rem] 3xl:w-[4rem] 4xl:w-[4rem] ">
                    <Image
                      src="/assets/WhitePointer.png"
                      alt="Pointer"
                      width={1000}
                      height={1000}
                    />
                  </span>
                </p>
              </div>
              <p
                className="text-white text-[18px] 3xl:text-[13px] 4xl:text-[16px] font-regular mt-4 3xl:mt-2 4xl:mt-1"
                style={{ fontFamily: "Sansation" }}
              >
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry &apos; standard
                dummy text ever since the 1500s, when an unknown printer took a
                galley of type and scrambled it to make a type specimen book.
              </p>
            </div>
            <div className="flex flex-col w-[20rem] 3xl:w-[12rem] 4xl:w-[13rem] gap-[5rem] absolute 3xl:fixed left-[55rem] 4xl:left-[48rem] 3xl:left-[108rem] 3xl:gap-[3rem]">
              <Image
                src="/assets/climate.png"
                alt="Climate Icon"
                width={1000}
                height={1000}
              />
              <Image
                src="/assets/ecosystem.png"
                alt="EcoSystem Icon"
                width={1000}
                height={1000}
              />
            </div>
            <div className="flex items-center">
              <Image
                src="/assets/richardBanner.png"
                alt="Banner Image"
                width={500}
                height={500}
                className="absolute left-[80rem] 3xl:left-[30rem] 4xl:left-[64rem]"
              />
              <div className="w-[13rem] flex justify-center relative left-[38.5rem] 3xl:left-[17rem] 4xl:left-[20rem] top-16 3xl:top-12 4xl:top-16">
                <ButtonWrapper
                  text="Select Courses"
                  className="border-red-500 text-white"
                />
              </div>
            </div>
          </div>
          <div className="absolute left-[248rem] 3xl:left-[167rem] 4xl:left-[190rem]">
            <div className="flex flex-col gap-24">
              <div className="flex items-center 3xl:left-[56rem] 4xl:left-[63rem] gap-12 4xl:gap-1 3xl:gap-8  w-[100rem]">
                <div className="flex flex-col 3xl:w-[22rem] 4xl:w-[27rem] w-[38rem] leading-none">
                  <p
                    className="text-white text-[64px] 3xl:text-[40px] 4xl:text-[48px] font-bold"
                    style={{ fontFamily: "Sansation" }}
                  >
                    HOW{" "}
                    <span
                      className="text-transparent bg-clip-text bg-gradient-to-b from-[#c9b54b] to-[#ffff] text-[64px] 3xl:text-[40px] 4xl:text-[48px] font-bold"
                      style={{ fontFamily: "Sansation" }}
                    >
                      PHLATTLINE
                    </span>
                  </p>
                  <p
                    className="text-white text-[64px] 3xl:text-[40px] 4xl:text-[48px] font-bold"
                    style={{ fontFamily: "Sansation" }}
                  >
                    WILL HELP
                  </p>
                </div>
                <div className="w-[30rem] 3xl:w-[20rem] 4xl:w-[25rem] ">
                  <p
                    className="text-white text-[19px] 3xl:text-[12px] 4xl:text-[16px] font-regular 3xl:mt-2"
                    style={{ fontFamily: "Sansation" }}
                  >
                    Based on nearly a decades worth of Research and Study in
                    Leadership Development, PhlattLine is capable and able to
                    provide Core and Advanced leadership training focused on
                    becoming an Adaptive Leader.
                  </p>
                </div>
                <div className="w-[20rem] 3xl:w-[10rem] flex flex-col justify-center items-center">
                  <ButtonWrapper
                    text="Learn More"
                    className="border-red-500 text-white"
                  />
                  <button
                    className="text-white text-[20px] 3xl:text-[14px] 4xl:text-[16px] flex flex-row py-[3px] px-[10px] justify-center items-center rounded bg-gradient-to-b whitespace-nowrap from-[#BAA716] to-[#B50D34] border-2 border-red-700"
                    style={{ fontFamily: "Sansation" }}
                  >
                    Register Now
                  </button>
                </div>
              </div>
              <div
                className="flex items-center
               gap-[2.2rem]  3xl:gap-6 4xl:gap-[1.6rem] w-[100rem]  "
              >
                <div className="flex flex-col bg-black px-[36px] py-[5px] 3xl:px-[20px] 4xl:px-[20px] 3xl:py-[3px] 4xl:py-[3px]  rounded-[38px]  absolute bottom-[7rem]  3xl:bottom-[4.5rem] 4xl:bottom-[6rem] left-[1rem]">
                  <p
                    className="text-white font-bold text-[14px]  3xl:text-[10px] 4xl:text-[10px]  p-0 m-0 leading-none"
                    style={{ fontFamily: "Sansation" }}
                  >
                    STEP
                  </p>
                  <p
                    className="text-transparent bg-clip-text bg-gradient-to-b from-[#BAA716] to-[#B50D34] font-bold text-[48px]  3xl:text-[32px] 4xl:text-[32px]  p-0 m-0 leading-none"
                    style={{ fontFamily: "Sansation" }}
                  >
                    01
                  </p>
                </div>
                <div className="border border-red-500 bg-[#E4E4E4] rounded-[10px]  py-[50px] 3xl:py-[30px] 3xl:px-[5px] 4xl:py-[45px] 4xl:px-[25px]  px-[20px] ">
                  <p
                    className="text-transparent bg-clip-text flex flex-center items-center bg-gradient-to-b from-[#BAA716] to-[#B50D34] text-[36px] 3xl:text-[22px] 4xl:text-[22px] font-bold"
                    style={{ fontFamily: "Sansation" }}
                  >
                    LOREM IPSUM
                  </p>
                </div>
                <span>
                  <Image
                    src="/assets/whiteArrow.png"
                    alt="Arrow"
                    width={30}
                    height={30}
                  />
                </span>
                <div className="flex flex-col bg-black px-[36px]  py-[5px]  3xl:px-[20px] 4xl:px-[20px]   3xl:py-[3px] 4xl:py-[3px] rounded-[38px]  absolute bottom-[7rem]  3xl:bottom-[4.5rem] 4xl:bottom-[6rem] left-[25rem]  3xl:left-[16rem] 4xl:left-[19rem] ">
                  <p
                    className="text-white font-bold text-[14px]  3xl:text-[10px] 4xl:text-[10px]  p-0 m-0 leading-none"
                    style={{ fontFamily: "Sansation" }}
                  >
                    STEP
                  </p>
                  <p
                    className="text-transparent bg-clip-text bg-gradient-to-b from-[#BAA716] to-[#B50D34] font-bold text-[48px]  3xl:text-[32px] 4xl:text-[32px]  p-0 m-0 leading-none"
                    style={{ fontFamily: "Sansation" }}
                  >
                    02
                  </p>
                </div>
                <div className="border border-red-500 bg-[#E4E4E4] rounded-[10px]  py-[50px] 3xl:py-[30px] 3xl:px-[5px] 4xl:py-[45px] 4xl:px-[25px]  px-[20px] ">
                  <p
                    className="text-transparent bg-clip-text flex flex-center items-center bg-gradient-to-b from-[#BAA716] to-[#B50D34]  text-[36px] 3xl:text-[22px] 4xl:text-[22px] font-bold"
                    style={{ fontFamily: "Sansation" }}
                  >
                    LOREM IPSUM
                  </p>
                </div>
                <span>
                  <Image
                    src="/assets/whiteArrow.png"
                    alt="Arrow"
                    width={30}
                    height={30}
                  />
                </span>
                <div className="flex flex-col bg-black px-[36px] py-[5px] 3xl:px-[20px] 3xl:py-[3px] 4xl:px-[20px]  4xl:py-[3px] rounded-[38px] absolute bottom-[7rem]  3xl:bottom-[4.5rem] 4xl:bottom-[6rem] left-[49rem] 3xl:left-[31rem] 4xl:left-[37rem]">
                  <p
                    className="text-white font-bold text-[14px]  3xl:text-[10px] 4xl:text-[10px]  p-0 m-0 leading-none"
                    style={{ fontFamily: "Sansation" }}
                  >
                    STEP
                  </p>
                  <p
                    className="text-transparent bg-clip-text bg-gradient-to-b from-[#BAA716] to-[#B50D34] font-bold text-[48px]  3xl:text-[32px] 4xl:text-[32px]  p-0 m-0 leading-none"
                    style={{ fontFamily: "Sansation" }}
                  >
                    03
                  </p>
                </div>
                <div className="border border-red-500 bg-[#E4E4E4] rounded-[10px] py-[50px] 3xl:py-[30px] 3xl:px-[5px] 4xl:py-[45px] 4xl:px-[25px] px-[20px] ">
                  <p
                    className="text-transparent bg-clip-text flex flex-center items-center bg-gradient-to-b from-[#BAA716] to-[#B50D34]  text-[36px] 3xl:text-[22px] 4xl:text-[22px] font-bold"
                    style={{ fontFamily: "Sansation" }}
                  >
                    LOREM IPSUM
                  </p>
                </div>
                <span>
                  <Image
                    src="/assets/whiteArrow.png"
                    alt="Arrow"
                    width={30}
                    height={30}
                  />
                </span>
                <div className="flex flex-col bg-black px-[36px] py-[5px] 3xl:px-[20px] 3xl:py-[3px] 4xl:px-[20px] 4xl:py-[3px] rounded-[38px] absolute bottom-[7rem] 3xl:bottom-[4.5rem] 4xl:bottom-[6rem] left-[73rem] 3xl:left-[47rem] 4xl:left-[55rem]">
                  <p
                    className="text-white font-bold text-[14px]  3xl:text-[10px] 4xl:text-[10px]  p-0 m-0 leading-none"
                    style={{ fontFamily: "Sansation" }}
                  >
                    STEP
                  </p>
                  <p
                    className="text-transparent bg-clip-text bg-gradient-to-b from-[#BAA716] to-[#B50D34] font-bold text-[48px]  3xl:text-[32px] 4xl:text-[32px]  p-0 m-0 leading-none"
                    style={{ fontFamily: "Sansation" }}
                  >
                    04
                  </p>
                </div>
                <div className="border border-red-500 bg-[#E4E4E4] rounded-[10px]  py-[50px]  3xl:py-[30px] 3xl:px-[5px] 4xl:py-[45px] 4xl:px-[25px] px-[20px]">
                  <p
                    className="text-transparent bg-clip-text flex flex-center items-center bg-gradient-to-b from-[#BAA716] to-[#B50D34]  text-[36px] 4xl:text-[22px] 3xl:text-[22px] font-bold"
                    style={{ fontFamily: "Sansation" }}
                  >
                    LOREM IPSUM
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute left-[369rem] 3xl:left-[245rem] 4xl:left-[280rem] flex items-center justify-center gap-20 3xl:gap-8 4xl:gap-8">
            <div className="w-[35rem]  3xl:w-[22rem] 4xl:w-[29rem] flex flex-col">
              <div className="flex flex-col leading-none gap-3  3xl:gap-1 4xl:gap-1">
                <p
                  className="text-white text-[64px] 3xl:text-[40px] 4xl:text-[48px] font-bold"
                  style={{ fontFamily: "Sansation" }}
                >
                  COURSES
                </p>
                <p
                  className="text-white text-[64px]  3xl:text-[40px] 4xl:text-[48px] font-bold "
                  style={{ fontFamily: "Sansation" }}
                >
                  I SELECT FROM
                </p>
                <p
                  className="text-transparent bg-clip-text bg-gradient-to-b from-[#c9b54b] to-[#ffff] text-[64px] 3xl:text-[40px] 4xl:text-[48px] font-bold"
                  style={{ fontFamily: "Sansation" }}
                >
                  PHLATTLINE
                </p>
              </div>
              <p
                className="text-white text-[18px] 3xl:text-[12px] 4xl:text-[16px] font-regular mt-4 3xl:mt-2 4xl:mt-2"
                style={{ fontFamily: "Sansation" }}
              >
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry &apos; standard
                dummy text ever since the 1500s, when an unknown printer took a
                galley of type and scrambled it to make a type specimen book. It
                has survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged.
              </p>
            </div>
            <div className="flex flex-col gap-[18rem] 3xl:gap-[13rem] 4xl:gap-[15rem] w-[35rem] 3xl:w-[25rem]">
              <div className="flex">
                <div className="border border-red-500 flex flex-center flex-col items-center bg-[#E4E4E4] rounded-[10px] pt-[90px] 3xl:pt-[58px] absolute  3xl:px-[45px] px-[60px]">
                  <span className="absolute left-[6.5rem] 3xl:left-[4.5rem] 4xl:left-[6.5rem] top-[-4rem] 3xl:top-[-2rem]">
                    <Image
                      className="w-[100%] 3xl:w-[70%] 4xl:w-[90%]"
                      src="/assets/financeIcon.png"
                      alt="Finance Icon"
                      width={1000}
                      height={1000}
                    />
                  </span>
                  <p
                    className="text-transparent uppercase bg-clip-text  leading-none bg-gradient-to-b from-[#BAA716] to-[#B50D34] text-[36px]
                    3xl:text-[22px] 4xl:text-[28px] font-bold"
                    style={{ fontFamily: "Sansation" }}
                  >
                    climate
                  </p>
                  <p
                    className="text-transparent uppercase bg-clip-text  leading-none bg-gradient-to-b from-[#BAA716] to-[#B50D34] text-[36px] 3xl:text-[22px] 4xl:text-[28px] font-bold"
                    style={{ fontFamily: "Sansation" }}
                  >
                    change
                  </p>
                  <p
                    className="text-transparent uppercase bg-clip-text  leading-none bg-gradient-to-b from-[#BAA716] to-[#B50D34] text-[36px] 3xl:text-[22px] 4xl:text-[28px] font-bold"
                    style={{ fontFamily: "Sansation" }}
                  >
                    research
                  </p>
                  <div className="">
                    <ButtonWrapper
                      text="Select Course"
                      className="border-red-500 text-black"
                    />
                  </div>
                </div>
                <div className="border border-red-500 flex flex-center flex-col bg-[#E4E4E4] rounded-[10px] pt-[126px] 3xl:pt-[79px] 4xl:pt-[120px] left-[63rem] absolute 3xl:left-[40rem] 4xl:left-[51rem]  3xl:px-[30px] 4xl:px-[40px] px-[60px]">
                  <span className="absolute left-[8.5rem] 3xl:left-[4.5rem] 4xl:left-[7rem] top-[-4rem] 3xl:top-[-2rem]">
                    <Image
                      className="w-[100%] 3xl:w-[70%] 4xl:w-[90%]"
                      src="/assets/calculatorIcon.png"
                      alt="Calculator Icon"
                      width={1000}
                      height={1000}
                    />
                  </span>
                  <p
                    className="text-transparent uppercase text-center bg-clip-text leading-none bg-gradient-to-b from-[#BAA716] to-[#B50D34] text-[36px]
                    3xl:text-[22px] 4xl:text-[28px] font-bold"
                    style={{ fontFamily: "Sansation" }}
                  >
                    ecosystem
                  </p>
                  <p
                    className="text-transparent uppercase text-center bg-clip-text  leading-none bg-gradient-to-b from-[#BAA716] to-[#B50D34] text-[36px] 3xl:text-[22px] 4xl:text-[28px] font-bold"
                    style={{ fontFamily: "Sansation" }}
                  >
                    Management
                  </p>
                  <div className="">
                    <ButtonWrapper
                      text="Select Course"
                      className="border-red-500 text-black"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col relative">
                <p
                  className="text-white text-[24px] 3xl:text-[14px] 4xl:text-[20px] font-bold mt-4  3xl:mt-2"
                  style={{ fontFamily: "Sansation" }}
                >
                  READY TO BECOME AN ADAPTIVE LEADER
                </p>
                <div className=" flex flex-start">
                  <ButtonWrapper
                    text="Register Now"
                    className="border-red-500 text-white"
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

export default Richard;

type CardType = {
  url: string;
  ProUrl: string;
  id: number;
};

const cards: CardType[] = [
  {
    url: "./assets/Richard.png",
    ProUrl: "./assets/richardProfile.png",
    id: 1,
  },
];
