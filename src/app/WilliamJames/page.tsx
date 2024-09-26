"use client";
import { motion, useTransform, useScroll } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import ButtonWrapper from "../components/Button";

const WilliamProfile = () => {
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

  const [xTransform, setXTransform] = useState(["0%", "-17.5%"]); // default for larger screens

  useEffect(() => {
    // Function to set the transform based on screen width
    const handleResize = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth <= 1024) {
        setXTransform(["0%", "-60.5%"]); // For screens <= 1024px
      } else if (screenWidth <= 1281) {
        setXTransform(["0%", "-67.3%"]);
      } else if (screenWidth <= 1550) {
        setXTransform(["0%", "-65.3%"]);
      }
      else {
        setXTransform(["0%", "-72.5%"]); // For screens > 1280px
      }
    };

    handleResize(); // Call once on mount to set the initial value
    window.addEventListener("resize", handleResize); // Listen to window resize

    return () => {
      window.removeEventListener("resize", handleResize); // Cleanup on unmount
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
      className={`group relative 3xl:w-[433rem] 4xl:w-[412rem] h-[100vh] w-[498rem] overflow-hidden ${
        card.id === 1 ? "flex items-center justify-center" : ""
      }`}
    >
      {/* Card 1 (with ProUrl and other content) */}
      {card.ProUrl && card.id === 1 && (
        <div className="absolute flex justify-center items-center inset-0 z-10  w-[75rem] 3xl:w-[45rem] 4xl:w-[60rem] 6xl:w-[21rem]  bg-cover bg-center ">
          {/* Name overlay */}
          <div className="relative leading-none 3xl:left-[15.5rem] 4xl:left-[13.5rem] left-[17rem] top-[-5rem] w-[100%] inset-0 flex justify-center  items-center gap-16 3xl:gap-8 4xl:gap-8  ">
            <div className="">
              <img
                src="./assets/williamProfile.png"
                alt=""
                className="w-[70vw] 3xl:w-[105vw] 4xl:w-[75vw]"
              />
            </div>
            <div className="flex flex-col gap-8">
              <div className="flex flex-col">
                <span
                  className="text-black uppercase text-[64px] fullHD:text-[64px] 3xl:text-[40px] 4xl:text-[48px] 5xl:text-[52px] 7xl:text-[52px] 8xl:text-[52px] font-bold"
                  style={{ fontFamily: "Sansation" }}
                >
                  WILLIAM
                </span>
                <span
                  className="fullHD:text-[64px] uppercase text-[64px] 3xl:text-[40px] 4xl:text-[48px] 5xl:text-[52px] 7xl:text-[52px] 8xl:text-[52px] font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#BAA716] to-[#B50D34]"
                  style={{ fontFamily: "Sansation" }}
                >
                  James
                </span>
              </div>
              <div>
                <button
                  className="text-white uppercase px-[20px] fullHD:px-[20px] py-[10px] fullHD:py-[10px] text-[24px] fullHD:text-[24px] 3xl:text-[16px] 4xl:text-[20px] 5xl:text-[18px] 8xl:text-[18px] 7xl:text-[18px] flex w-full p-1 justify-center items-center rounded-3xl bg-gradient-to-b whitespace-nowrap from-[#BAA716] to-[#B50D34]"
                  style={{ fontFamily: "Sansation" }}
                >
                  Finance Officer
                </button>
              </div>
            </div>
            <div>
              <p
                className="text-black text-[24px] 3xl:text-[14px] 4xl:text-[18px] font-regular leading-normal"
                style={{ fontFamily: "Sansation" }}
              >
                William James is a seasoned finance officer with a strong
                background in financial analysis and management. With over ten
                years of experience, he has successfully managed complex
                financial operations, ensuring regulatory compliance and
                enhancing financial outcomes.
              </p>
            </div>
          </div>
          <div className="absolute 3xl:left-[90rem] 4xl:left-[75rem]  flex justify-center items-center inset-0 z-20 left-[108rem] 3xl:gap-10 w-[80rem] gap-12  3xl:w-[21rem]">
            <div className="w-[32rem] 3xl:w-[25rem] 4xl:w-[27rem] relative">
              <div className="flex flex-col leading-none gap-2 4xl:gap-[0.2rem]">
                <p
                  className="text-black uppercase text-[64px] fullHD:text-[64px] 3xl:text-[40px] 4xl:text-[48px] 5xl:text-[52px] 7xl:text-[52px] 8xl:text-[52px] font-bold"
                  style={{ fontFamily: "Sansation" }}
                >
                  SERVICES
                </p>
                <p
                  className="text-black uppercase text-[64px] fullHD:text-[64px] w-[40rem] fullHD:w-[40rem] 3xl:text-[40px] 4xl:text-[48px] 7xl:text-[52px] 8xl:text-[52px] 5xl:text-[52px] font-bold "
                  style={{ fontFamily: "Sansation" }}
                >
                  WHERE I WAS
                </p>
                <p
                  className="text-black uppercase text-[64px] fullHD:text-[64px] 3xl:text-[40px] 4xl:text-[48px] 5xl:text-[52px] 7xl:text-[52px] 8xl:text-[52px] font-bold flex flex-row items-center gap-4 fullHD:gap-4 3xl:gap-2"
                  style={{ fontFamily: "Sansation" }}
                >
                  IN
                  <span
                    className="text-transparent uppercase bg-clip-text 4xl:text-[48px] bg-gradient-to-b from-[#BAA716] to-[#B50D34] text-[64px] fullHD:text-[64px] 3xl:text-[40px] 5xl:text-[52px] 7xl:text-[52px] 8xl:text-[52px] font-bold"
                    style={{ fontFamily: "Sansation" }}
                  >
                    TROUBLE
                  </span>
                  <span className="mt-7 3xl:mt-4 3xl:ml-4 3xl:w-[4rem] 4xl:w-[4rem] ">
                    <img src="./assets/Pointer.png" alt="" />
                  </span>
                </p>
              </div>
              <p
                className="text-black text-[18px] fullHD:text-[18px] 3xl:text-[13px] 4xl:text-[16px] 5xl:text-[14px] 7xl:text-[14px] 8xl:text-[14px] 6xl:text-[19px] font-regular mt-4  fullHD:mt-4 3xl:mt-2 4xl:mt-1"
                style={{ fontFamily: "Sansation" }}
              >
                William James, a finance officer, recently faced significant
                challenges in financial reporting, budgeting, and forecasting.
                Despite his extensive experience, these areas became
                increasingly problematic, impacting his ability to maintain
                financial stability within his organization. He discovered
                Phlattline, a company renowned for its comprehensive range of
                services and courses
              </p>
              <p
                className="text-black text-[24px] fullHD:text-[24px] 3xl:text-[16px] 4xl:text-[14px] 5xl:text-[15px] 7xl:text-[15px] 8xl:text-[15px] font-bold mt-4 fullHD:mt-4 3xl:mt-2 4xl:mt-2"
                style={{ fontFamily: "Sansation" }}
              >
                Checkout which courses I have selected
              </p>
              <div className="flex flex-start">
                <ButtonWrapper
                  text="Select Courses"
                  className="text-black border-red-500"
                />
              </div>
            </div>
            <div className="flex flex-col w-[20rem] 3xl:w-[12rem] 4xl:w-[13rem] gap-[5rem] absolute 3xl:fixed left-[60rem] 4xl:left-[54rem] 3xl:left-[115rem]  3xl:gap-[3rem]">
              <img src="./assets/financialReporting.png" alt=""  />
              <img src="./assets/budgetingForcasting.png" alt=""  />
            </div>
            <div className="">
              <img
                src="./assets/Window.png"
                alt=""
                className="absolute top-0 3xl:absolute left-[87rem] 3xl:left-[40rem] 4xl:left-[70rem] w-[30vw] 3xl:w-[35vw] 3xl:h-[79vh] 4xl:h-[77.5vh] h-[77.5vh]"
              />
            </div>
          </div>
          <div className="absolute left-[252rem] 3xl:left-[182rem] 4xl:left-[190rem]">
            <div className="flex flex-col gap-24">
              <div className="flex items-center 3xl:left-[56rem] 4xl:left-[63rem] gap-12 4xl:gap-1 3xl:gap-8  w-[100rem]">
                <div className="flex flex-col 3xl:w-[22rem] 4xl:w-[27rem] w-[38rem] leading-none">
                  <p
                    className="text-Black text-[64px] fullHD:text-[64px] 3xl:text-[40px] 4xl:text-[48px] 5xl:text-[52px] 7xl:text-[52px] 8xl:text-[52px] font-bold"
                    style={{ fontFamily: "Sansation" }}
                  >
                    HOW{" "}
                    <span
                      className="text-transparent bg-clip-text bg-gradient-to-b from-[#BAA716] to-[#B50D34] text-[64px] fullHD:text-[64px] 3xl:text-[40px] 4xl:text-[48px] 5xl:text-[52px] 8xl:text-[52px] 7xl:text-[52px] font-bold"
                      style={{ fontFamily: "Sansation" }}
                    >
                      PHLATTLINE
                    </span>
                  </p>
                  <p
                    className="text-Black text-[64px] fullHD:text-[64px] 3xl:text-[40px] 4xl:text-[48px] 5xl:text-[52px] 7xl:text-[52px] 8xl:text-[52px] font-bold"
                    style={{ fontFamily: "Sansation" }}
                  >
                    WILL HELP
                  </p>
                </div>
                <div className="w-[30rem] fullHD:w-[30rem] 3xl:w-[20rem] 4xl:w-[25rem] 5xl:w-[28rem] 8xl:w-[28rem] 7xl:w-[28rem]">
                  <p
                    className="text-black text-[18px] fullHD:text-[18px] 3xl:text-[12px] 4xl:text-[16px] 5xl:text-[18px] 7xl:text-[18px] 8xl:text-[18px] font-regular 3xl:mt-2"
                    style={{ fontFamily: "Sansation" }}
                  >
                    Phlattline provides William James with personalized advising
                    and specialized courses to help him improve his financial
                    reporting, budgeting, and forecasting skills. This will
                    enable him to recognize difficulties, improve plans, and
                    attain professional success.
                  </p>
                </div>
                <div className="w-[20rem] fullHD:w-[20rem] 3xl:w-[10rem] 5xl:w-[12rem] 7xl:w-[12rem] 8xl:w-[12rem]  flex flex-col justify-center items-center">
                  <ButtonWrapper text="Learn More" className="border-red-500" />
                  <button
                    className="text-white text-[24px] fullHD:text-[24px] 3xl:text-[14px] 4xl:text-[16px] 5xl:text-[17px] 7xl:text-[17px] 8xl:text-[17px] flex flex-row py-[3px] fullHD:py-[3px] px-[10px] fullHD:px-[10px] justify-center items-center rounded bg-gradient-to-b whitespace-nowrap from-[#BAA716] to-[#B50D34] border-2 border-red-700"
                    style={{ fontFamily: "Sansation" }}
                  >
                    Register Now
                  </button>
                </div>
              </div>
              <div
                className="flex items-center
               gap-8  3xl:gap-6 4xl:gap-[1.6rem] w-[100rem]  "
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
                <div className="border border-red-500 bg-[#E4E4E4] rounded-[10px]  py-[50px] fullHD:py-[50px] 3xl:py-[30px] 3xl:px-[5px] 4xl:py-[45px] 4xl:px-[25px]  px-[20px] ">
                  <p
                    className="text-transparent bg-clip-text flex flex-center items-center bg-gradient-to-b from-[#BAA716] to-[#B50D34] text-[36px] 3xl:text-[22px] 4xl:text-[22px] font-bold"
                    style={{ fontFamily: "Sansation" }}
                  >
                    LOREM IPSUM
                  </p>
                </div>
                <span>
                  <img src="./assets/rightArrow.png" alt="" />
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
                <div className="border border-red-500 bg-[#E4E4E4] rounded-[10px]  py-[50px] fullHD:py-[50px] 3xl:py-[30px] 3xl:px-[5px] 4xl:py-[45px] 4xl:px-[25px]  px-[20px] fullHD:px-[20px]">
                  <p
                    className="text-transparent bg-clip-text flex flex-center items-center bg-gradient-to-b from-[#BAA716] to-[#B50D34]  text-[36px] 3xl:text-[22px] 4xl:text-[22px] font-bold"
                    style={{ fontFamily: "Sansation" }}
                  >
                    LOREM IPSUM
                  </p>
                </div>
                <span>
                  <img src="./assets/rightArrow.png" alt="" />
                </span>
                <div className="flex flex-col bg-black px-[36px] py-[5px] 3xl:px-[20px] 3xl:py-[3px] 4xl:px-[20px]  4xl:py-[3px] rounded-[38px] fullHD:rounded-[38px] absolute bottom-[7rem]  3xl:bottom-[4.5rem] 4xl:bottom-[6rem] left-[49rem]  3xl:left-[31rem] 4xl:left-[37rem]">
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
                <div className="border border-red-500 bg-[#E4E4E4] rounded-[10px] fullHD:rounded-[10px] py-[50px] fullHD:py-[50px] 3xl:py-[30px] 3xl:px-[5px] 4xl:py-[45px] 4xl:px-[25px] px-[20px] ">
                  <p
                    className="text-transparent bg-clip-text flex flex-center items-center bg-gradient-to-b from-[#BAA716] to-[#B50D34]  text-[36px] 3xl:text-[22px] 4xl:text-[22px] font-bold"
                    style={{ fontFamily: "Sansation" }}
                  >
                    LOREM IPSUM
                  </p>
                </div>
                <span>
                  <img src="./assets/rightArrow.png" alt="" />
                </span>
                <div className="flex flex-col bg-black px-[36px] py-[5px] fullHD:py-[5px] 3xl:px-[20px] 3xl:py-[3px] 4xl:px-[20px]  4xl:py-[3px] rounded-[38px]  absolute bottom-[7rem] 3xl:bottom-[4.5rem] 4xl:bottom-[6rem] left-[73rem] 3xl:left-[47rem] 4xl:left-[55rem]">
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
          <div className="absolute left-[369rem] 3xl:left-[265rem] 4xl:left-[280rem] flex items-center gap-20 3xl:gap-12 ">
            <div className="w-[35rem]  3xl:w-[25rem] 4xl:w-[32rem] flex flex-col">
              <div className="flex flex-col leading-none gap-3  3xl:gap-1 4xl:gap-1">
                <p
                  className="text-black text-[64px] fullHD:text-[64px] 3xl:text-[40px] 4xl:text-[48px] 5xl:text-[52px] 7xl:text-[52px] 8xl:text-[52px] font-bold"
                  style={{ fontFamily: "Sansation" }}
                >
                  COURSES
                </p>
                <p
                  className="text-black text-[64px] fullHD:text-[64px] 3xl:text-[40px] 5xl:text-[52px] 7xl:text-[52px] 8xl:text-[52px] 4xl:text-[48px] font-bold "
                  style={{ fontFamily: "Sansation" }}
                >
                  I SELECT FROM
                </p>
                <p
                  className="text-transparent bg-clip-text bg-gradient-to-b from-[#BAA716] to-[#B50D34] text-[64px] fullHD:text-[64px] 3xl:text-[40px] 4xl:text-[48px] 5xl:text-[52px] 7xl:text-[52px] 8xl:text-[52px] font-bold"
                  style={{ fontFamily: "Sansation" }}
                >
                  PHLATTLINE
                </p>
              </div>
              <p
                className="text-black text-[18px] fullHD:text-[18px] 3xl:text-[12px] 4xl:text-[16px] font-regular mt-4 3xl:mt-2 4xl:mt-2"
                style={{ fontFamily: "Sansation" }}
              >
                William James is enrolling in Phlattline classes to enhance his
                financial reporting, budgeting, and forecasting skills. These
                specialized programs aim to provide practical insights and
                advanced knowledge, enhancing his ability to tackle financial
                management challenges and improve his performance as a finance
                officer.
              </p>
              <p
                className="text-black text-[24px] 3xl:text-[14px] 4xl:text-[14px] font-bold mt-4 fullHD:mt-4 3xl:mt-2"
                style={{ fontFamily: "Sansation" }}
              >
                READY TO BECOME AN ADAPTIVE LEADER
              </p>
              <div className="flex flex-start">
                <ButtonWrapper text="Register Now" className="border-red-500" />
              </div>
            </div>
            <div className="flex flex-col relative top-16">
              <div className="relative border border-red-500 flex flex-center flex-col items-center bg-[#E4E4E4] rounded-[10px]  pt-[90px]  3xl:pt-[50px] 4xl:pt-[60px] 3xl:px-[30px] px-[60px]">
                <span className="absolute 3xl:left-[4.5rem] 4xl:left-[5rem] top-[-4rem] 4xl:top-[-3rem] 3xl:top-[-3rem]">
                  <img
                    className="3xl:w-[70%] 4xl:w-[70%]"
                    src="./assets/financeIcon.png
                        "
                    alt=""
                  />
                </span>
                <p
                  className="text-transparent bg-clip-text  leading-none bg-gradient-to-b from-[#BAA716] to-[#B50D34] text-[36px]  3xl:text-[22px] 4xl:text-[22px] font-bold"
                  style={{ fontFamily: "Sansation" }}
                >
                  FINANCIAL
                </p>
                <p
                  className="text-transparent bg-clip-text  leading-none bg-gradient-to-b from-[#BAA716] to-[#B50D34] text-[36px]  3xl:text-[22px] 4xl:text-[22px] font-bold"
                  style={{ fontFamily: "Sansation" }}
                >
                  REPORTING
                </p>
                <div className="">
                  <ButtonWrapper
                    text="Select Courses"
                    className="border-red-500"
                  />
                </div>
              </div>
              <div className="relative border border-red-500 flex flex-center flex-col items-center bg-[#E4E4E4] rounded-[10px]  pt-[90px] 3xl:pt-[70px] 3xl:left-[17rem] 4xl:pt-[70px] 4xl:left-[17rem] left-[26rem] 4xl:bottom-[4.5rem] bottom-[6rem] 3xl:px-[30px] 4xl:px-[30px]">
                <span className="absolute left-[6.5rem]  3xl:left-[4.5rem] 4xl:left-[4.5rem] top-[-4rem] 3xl:top-[-2rem] 4xl:top-[-2rem]">
                  <img
                    className="3xl:w-[70%] 4xl:w-[70%]"
                    src="./assets/calculatorIcon.png"
                    alt=""
                  />
                </span>
                <p
                  className="text-transparent bg-clip-text  leading-none bg-gradient-to-b from-[#BAA716] to-[#B50D34] text-[36px]
                    3xl:text-[22px] 4xl:text-[22px] font-bold"
                  style={{ fontFamily: "Sansation" }}
                >
                  BUDGETING &
                </p>
                <p
                  className="text-transparent bg-clip-text  leading-none bg-gradient-to-b from-[#BAA716] to-[#B50D34] text-[36px]  3xl:text-[22px] 4xl:text-[22px] font-bold"
                  style={{ fontFamily: "Sansation" }}
                >
                  FORECASTING
                </p>
                <div>
                  <ButtonWrapper
                    text="Select Courses"
                    className="border-red-500"
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

export default WilliamProfile;

type CardType = {
  url: string;
  ProUrl: string;
  id: number;
};

const cards: CardType[] = [
  {
    url: "./assets/WilliamJames.png",
    ProUrl: "./assets/williamProfile.png",
    id: 1,
  },
];
