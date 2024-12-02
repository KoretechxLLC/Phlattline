"use client";
import { motion, useTransform, useScroll } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import ButtonWrapper from "../components/Button";

const HiroshiTanaka = () => {
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

  const [xTransform, setXTransform] = useState(["0%", "-80%"]); // default for larger screens

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        const screenWidth = window.innerWidth;

        if (screenWidth <= 1280) {
          setXTransform(["0%", "-69.5%"]); // For screens <= 1024px
        } else if (screenWidth <= 1550) {
          setXTransform(["0%", "-80%"]);
        } else {
          setXTransform(["0%", "-80%"]); // For screens > 1280px
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
      className={`group relative 3xl:w-[445rem] 4xl:w-[500rem] h-[100vh] w-[600rem] overflow-hidden ${
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
                className="w-[55vw] 3xl:w-[65vw] 4xl:w-[55vw]"
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
                  className="text-white py-[10px] font-bold text-[24px] 3xl:text-[16px] 4xl:text-[20px] flex w-[10rem] 3xl:w-[12rem] 4xl:w-[16rem] p-2 justify-center items-center rounded-3xl bg-gradient-to-b whitespace-nowrap from-[#BAA716] to-[#B50D34]"
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

          <div className="absolute 3xl:left-[138rem] 4xl:left-[130rem]  flex justify-center items-center inset-0 z-20 left-[153rem] 3xl:gap-10 w-[80rem]  3xl:w-[21rem]">
            <div className="w-[35rem] 3xl:w-[25rem] 4xl:w-[27rem] relative  3xl:top-[-2rem]">
              <div className="flex flex-col items-center leading-none gap-12  w-[48rem]  3xl:w-[30rem] 4xl:w-[40rem]">
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
                    Increase crop yield and profitability while maintaining
                    sustainable farming practices. Adopt new technologies to
                    improve efficiency and reduce environmental impact.
                  </p>
                </div>
                <div>
                  <p
                    className="text-white text-[64px] 3xl:w-[6%] 3xl:h-[6%] 3xl:text-[40px] 4xl:text-[48px] font-bold flex flex-row items-baseline gap-4 3xl:gap-2"
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
                    Faces unpredictable weather patterns, fluctuating market
                    prices, and the need to comply with environmental
                    regulations. Struggles with labor shortages, the high cost
                    of modern farming equipment, employee professional
                    development, retention and morale, and leadership
                    development.
                  </p>
                </div>
              </div>
            </div>
            <div className="absolute left-[35rem] top-[19rem] 3xl:top-[12rem] 4xl:top-[12rem] 3xl:left-[-16rem] 4xl:left-[28rem]">
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
            <div className="relative left-[84rem] 3xl:left-[49rem] 4xl:left-[73rem] 3xl:bottom-[1rem] flex flex-col gap-[1rem] 3xl:gap-[0.5rem] 4xl:gap-[0.5rem]">
              <div className="flex items-center justify-between w-[90rem] 3xl:w-[55rem] 4xl:w-[75rem]">
                <div className="flex leading-none">
                  <p
                    className="text-white text-[64px] 3xl:text-[40px] 4xl:text-[48px] font-bold"
                    style={{ fontFamily: "Sansation" }}
                  >
                    HOW{" "}
                  </p>
                  <span
                    className="text-transparent mx-4 bg-clip-text bg-gradient-to-b from-[#BAA716] to-[#ffff] text-[64px] 3xl:text-[40px] 4xl:text-[48px] font-bold"
                    style={{ fontFamily: "Sansation" }}
                  >
                    PHLATTLINE
                  </span>

                  <p
                    className="text-white text-[64px] 3xl:text-[40px] 4xl:text-[48px] font-bold"
                    style={{ fontFamily: "Sansation" }}
                  >
                    WILL HELP
                  </p>
                </div>
                <div className="flex  justify-center items-center">
                  <ButtonWrapper
                    text="Learn More"
                    className="border-yellow-200 text-white"
                  />
                </div>
              </div>
              <div className="flex w-[95rem] h-[35vh] 3xl:left-[54rem] 4xl:left-[77rem] gap-48  3xl:gap-[4.5rem] 4xl:gap-[8rem]">
                <div className="">
                  <Image
                    src="/assets/professionalDevelopment.png"
                    alt="Professional Development"
                    width={450}
                    height={450}
                    className="fixed 3xl:w-[310px] 4xl:w-[400px]"
                  />
                  <p className="text-white relative w-[20rem] 3xl:w-[14rem] 4xl:w-[18rem] text-[24px] 3xl:text-[16px] 4xl:text-[20px] text-center top-[6rem] left-[4rem] 3xl:top-[4.5rem] 3xl:left-[2.5rem] 4xl:top-[5.7rem] 4xl:left-[3.6rem] leading-[1.1]">
                    PhlattLine offers training programs to enhance the skills of
                    farm employees, ensuring they are well-equipped to handle
                    modern farming techniques and technologies.
                  </p>
                </div>
                <div className="">
                  <Image
                    src="/assets/employeeRetention.png"
                    alt="Employee Retention"
                    width={450}
                    height={450}
                    className="fixed 3xl:w-[310px] 4xl:w-[400px]"
                  />
                  <p className="text-white relative w-[20rem] 3xl:w-[14rem] 4xl:w-[18rem]  text-[24px] 3xl:text-[16px] 4xl:text-[20px] text-center top-[6rem] left-[4rem] 3xl:top-[4.5rem] 3xl:left-[2.5rem] 4xl:top-[5.8rem] 4xl:left-[3.6rem] leading-[1.1]">
                    Implements employee engagement initiatives and recognition
                    programs to boost morale and retain top talent. Provides
                    wellness programs to support the well-being of farm workers.
                  </p>
                </div>
                <div className="">
                  <Image
                    src="/assets/leaderDevelopment.png"
                    alt="Leadership Development"
                    width={450}
                    height={450}
                    className="fixed 3xl:w-[310px] 4xl:w-[400px]"
                  />
                  <p className="text-white relative w-[20rem] 3xl:w-[14rem] 4xl:w-[18rem]  text-[24px] 3xl:text-[16px] 4xl:text-[20px] text-center top-[7rem] left-[4rem] 3xl:top-[4.8rem] 3xl:left-[2.5rem] 4xl:top-[6rem] 4xl:left-[3.6rem] leading-[1.1]">
                    Provides leadership coaching and mentoring programs to help
                    Alex develop effective leadership skills and build a strong
                    leadership pipeline within the farm.
                  </p>
                </div>
              </div>
              <div className="flex justify-center gap-8 w-[92%] 3xl:w-[55%] 4xl:w-[76%] 4xl:mt-[2.5rem] relative left-[3rem]">
                <div className="flex flex-col">
                  <p className="text-transparent bg-clip-text bg-gradient-to-b from-[#BAA716] to-[#ffff] text-[26px] 3xl:text-[18px] 4xl:text-[22px] uppercase font-bold">Operational</p>
                  <p className="text-transparent bg-clip-text bg-gradient-to-b from-[#BAA716] to-[#ffff] text-[26px] 3xl:text-[18px] 4xl:text-[22px] uppercase font-bold">Efficiency</p>
                </div>
                <div>
                  <p className="text-white text-[22px] 3xl:text-[16px] 4xl:text-[18px]">
                    Offers advanced analytics and forecasting tools to help Alex
                    predict weather patterns and market trends, allowing for
                    better planning and decision-making. Provides solutions for
                    automating farm operations, reducing labor dependency, and
                    optimizing resource usage to lower costs and improve
                    sustainability.
                  </p>
                </div>
              </div>
            </div>
            <div className="absolute left-[208rem] 3xl:left-[100rem] 4xl:left-[198rem] flex flex-col gap-28 3xl:gap-24 4xl:gap-[4.5rem]">
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
                    className="text-transparent bg-clip-text bg-gradient-to-b from-[#BAA716] to-[#ffff] font-bold text-[48px]  3xl:text-[32px] 4xl:text-[40px] p-0 m-0 leading-none"
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
                    Go to the &quot;Contact Us&quot; page on the PhlattLine
                    website.
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
            <div className="w-[100rem] left-[336rem] 3xl:left-[155rem] bottom-[9rem] 4xl:left-[267rem] 4xl:bottom-[6.5rem] 3xl:bottom-[5.8rem] flex flex-col gap-16 3xl:gap-12 4xl:gap-8 justify-center items-center absolute">
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

export default HiroshiTanaka;

type CardType = {
  url: string;
  ProUrl?: string; // Optional property
  id: number;
};

const cards: CardType[] = [
  {
    url: "./assets/HiroshiBg.png",
    ProUrl: "./assets/AminaProfile.png",
    id: 1,
  },
];
