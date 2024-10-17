"use client";
import { motion, useTransform, useScroll } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const SophiaRodriguez = () => {
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

  const [xTransform, setXTransform] = useState(["0%", "-50%"]); // default for larger screens

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth <= 1024) {
        setXTransform(["0%", "-41.5%"]); // For screens <= 1024px
      } else if (screenWidth <= 1280) {
        setXTransform(["0%", "-41.3%"]);
      } else if (screenWidth <= 1550) {
        setXTransform(["0%", "-52.3%"]);
      } else {
        setXTransform(["0%", "-50%"]); // For screens > 1280px
      }
    };

    handleResize(); // Call once on mount to set initial value
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize); // Cleanup
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
      className={`group relative 3xl:w-[405rem] 4xl:w-[412rem] h-[100vh] w-[498rem] overflow-hidden ${
        card.id === 1 ? "flex items-center justify-center" : ""
      }`}
    >
      {/* Card 1 with ProUrl */}
      {card.ProUrl && card.id === 1 && (
        <div className="absolute flex justify-center items-center inset-0 z-10 w-[75rem] 3xl:w-[45rem] 4xl:w-[60rem] bg-cover bg-center">
          <div className="relative leading-none 3xl:left-[12rem] 4xl:left-[13.5rem] left-[17rem] top-[-4rem] w-[100%] inset-0 flex justify-center  items-center gap-16 3xl:gap-8 4xl:gap-8 ">
            <div className="">
              <img
                src="./assets/sophiaProfile.png"
                alt="Jordan Profile"
                className="w-[55vw] 3xl:w-[85vw] 4xl:w-[55vw]"
              />
            </div>
            <div className="flex flex-col gap-8">
              <div className="flex flex-col">
                <span
                  className="text-black uppercase text-[64px] 3xl:text-[40px] 4xl:text-[48px] font-bold"
                  style={{ fontFamily: "Sansation" }}
                >
                  Sophia
                </span>
                <span
                  className="uppercase text-[64px] 3xl:text-[40px] 4xl:text-[48px] font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#BAA716] to-[#B50D34]"
                  style={{ fontFamily: "Sansation" }}
                >
                  Rodriguez
                </span>
              </div>
              <div>
                <button
                  className="text-white uppercase px-[20px] py-[10px] text-[24px] 3xl:text-[16px] 4xl:text-[20px] flex w-full p-1 justify-center items-center rounded-3xl bg-gradient-to-b whitespace-nowrap from-[#BAA716] to-[#B50D34]"
                  style={{ fontFamily: "Sansation" }}
                >
                  Senior Vice President
                </button>
              </div>
            </div>
            <div className="">
              <p
                className="text-black text-[24px] 3xl:text-[14px] 4xl:text-[18px] font-regular leading-normal"
                style={{ fontFamily: "Sansation" }}
              >
                50 years old, living in Provo, Utah. Senior Vice President at a
                regional bank.
              </p>
              <br />
              <p
                className="text-black text-[24px] 3xl:text-[14px] 4xl:text-[18px] font-regular leading-normal"
                style={{ fontFamily: "Sansation" }}
              >
                Holds a degree in Finance and an Executive MBA. Over 25 years of
                experience in the banking sector, with extensive experience in
                leading large teams and managing complex projects.
              </p>
            </div>
          </div>

          <div className="absolute 3xl:left-[120rem] 4xl:left-[120rem]  flex justify-center items-center inset-0 z-20 left-[155rem] 3xl:gap-10 w-[80rem] gap-12  3xl:w-[21rem]">
            <div className="w-[35rem] 3xl:w-[25rem] 4xl:w-[27rem] relative">
              <div className="flex flex-col items-center leading-none gap-8  w-[60rem]  3xl:w-[33rem] 4xl:w-[45rem]">
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
                    className="text-black text-[24px] 3xl:text-[14px] 4xl:text-[18px] font-regular leading-normal ml-20 3xl:ml-12 mt-2 3xl:mt-1"
                    style={{ fontFamily: "Sansation" }}
                  >
                    Aims to enhance her leadership style to better adapt to the
                    digital transformation in the banking sector. Interested in
                    developing a more agile leadership approach to drive
                    innovation and improve customer experience.
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
                    className="text-black text-[24px] 3xl:text-[14px] 4xl:text-[18px] font-regular leading-normal ml-20 3xl:ml-12 mt-2  3xl:mt-1"
                    style={{ fontFamily: "Sansation" }}
                  >
                    Faces the challenge of leading through significant industry
                    disruptions, including fintech innovations and changing
                    regulatory landscapes. Needs to balance risk management with
                    the need for innovation.
                  </p>
                </div>
              </div>
            </div>
            <div className="">
              <img
                src="./assets/Window.png"
                alt=""
                className="absolute top-0 3xl:absolute left-[38rem] 3xl:left-[6rem] 4xl:left-[42rem] w-[30vw] 3xl:w-[35vw] 3xl:h-[77.5vh] 4xl:h-[77.5vh] h-[77.5vh]"
              />
            </div>
            <div className="flex items-center justify-center relative left-[93rem]  3xl:left-[54rem] 4xl:left-[77rem] gap-12 3xl:gap-6 w-[100rem]">
              <div className="w-[40rem] 3xl:w-[25rem] 4xl:w-[32rem] h-[20rem] 3xl:h-[15rem] 4xl:h-[18rem] border-[15px] border-black">
                <div className="w-[38rem] 3xl:w-[23rem] 4xl:w-[30rem] h-[18rem]  3xl:h-[13rem] 4xl:h-[16rem] border-[15px] border-white flex items-center justify-center">
                  <div className="flex flex-col bg-white px-[25px] py-[20px] 3xl:px-[20px] 3xl:py-[20px]  rounded-[60px] absolute bottom-[16.5rem]  3xl:bottom-[12rem] 4xl:bottom-[14.5rem] left-[4rem] 3xl:left-[3rem] 4xl:left-[3rem]">
                    <p
                      className="text-transparent bg-clip-text bg-gradient-to-b from-[#BAA716] to-[#B50D34] font-bold text-[48px] 3xl:text-[32px] p-0 m-0 leading-none"
                      style={{ fontFamily: "Sansation" }}
                    >
                      VALUES
                    </p>
                  </div>
                  <p
                    className="text-black w-[30rem]  3xl:w-[18rem] 4xl:w-[24rem] text-[24px] 3xl:text-[14px] 4xl:text-[18px] font-regular leading-normal"
                    style={{ fontFamily: "Sansation" }}
                  >
                    Values integrity, transparency, and customer-centricity.
                    Committed to lifelong learning and professional development.
                  </p>
                </div>
              </div>
              <div className="w-[55rem] 3xl:w-[30rem] 4xl:w-[38rem] h-[20rem] 3xl:h-[15rem] 4xl:h-[18rem]  border-[15px] border-black">
                <div className="w-[53rem] 3xl:w-[28rem] 4xl:w-[36rem]  h-[18rem] border-[15px] 3xl:h-[13rem]  4xl:h-[16rem] border-white flex items-center justify-center">
                  <div className="flex flex-col bg-white px-[25px] py-[20px] 3xl:px-[20px] 3xl:py-[20px]  rounded-[60px] absolute bottom-[16.5rem] 3xl:bottom-[12rem] 4xl:bottom-[14.5rem] left-[46rem] 3xl:left-[30rem] 4xl:left-[38rem]">
                    <p
                      className="text-transparent bg-clip-text bg-gradient-to-b from-[#BAA716] to-[#B50D34] font-bold text-[48px] 3xl:text-[32px] p-0 m-0 leading-none"
                      style={{ fontFamily: "Sansation" }}
                    >
                      BEHAVIOR
                    </p>
                  </div>
                  <p
                    className="text-black w-[45rem] 3xl:w-[22rem] 4xl:w-[30rem]  text-[24px] 3xl:text-[14px] 4xl:text-[18px] font-regular leading-normal"
                    style={{ fontFamily: "Sansation" }}
                  >
                    Regular attendee of finance and leadership conferences,
                    participates in executive roundtables, and reads industry
                    publications. Looks for advanced leadership courses and
                    executive coaching that offer personalized feedback and peer
                    learning opportunities.
                  </p>
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

export default SophiaRodriguez;

type CardType = {
  url: string;
  ProUrl?: string; // Optional property
  id: number;
};

const cards: CardType[] = [
  {
    url: "./assets/WilliamJames.png",
    ProUrl: "./assets/sophiaProfile.png",
    id: 1,
  },
];
