"use client";
import { motion, useTransform, useScroll } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import ButtonWrapper from "../components/Button";
import ReactPlayer from "react-player";
import Image from "next/image";
import { useRouter } from "next/navigation";

const About = () => {
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

  const [xTransform, setXTransform] = useState(["0%", "-63%"]); // default for larger screens

  useEffect(() => {
    // Function to set the transform based on screen width
    const handleResize = () => {
      if (typeof window !== "undefined") {
        const screenWidth = window.innerWidth;

        if (screenWidth <= 1024) {
          setXTransform(["0%", "-13.1%"]); // For screens <= 1024px
        } else if (screenWidth <= 1280) {
          setXTransform(["0%", "-13.3%"]);
        } else if (screenWidth <= 1550) {
          setXTransform(["0%", "-15.5%"]);
        } else {
          setXTransform(["0%", "-63%"]); // For screens > 1280px
        }
      }

      handleResize(); // Call once on mount to set initial value
      window.addEventListener("resize", handleResize); // Listen to window resize

      return () => {
        window.removeEventListener("resize", handleResize); // Cleanup on unmount
      };
    };
  }, []); // Empty dependency array ensures this runs only on mount

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
  const [isPlaying, setIsPlaying] = useState(true);
  const router = useRouter();
  const [client, setClient] = useState(false);

  useEffect(() => {
    setClient(true);
  }, []);

  return (
    <div
      className={`group relative h-[100vh] w-[572rem] 3xl:w-[446rem] 4xl:w-[440rem] overflow-hidden ${
        card.id === 1 ? "flex items-center justify-center" : ""
      }`}
    >
      {client && card.ProUrl && card.id === 1 && (
        <div
          style={{
            backgroundImage: `url(${card.url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="absolute inset-0 z-10 bg-cover bg-center"
        >
          {/* Name overlay */}
          <div className="absolute w-[30rem] leading-none inset-0 flex flex-col items-start gap-2 justify-center left-[36rem] top-[-15rem] 3xl:left-[28rem] 4xl:left-[27rem] 3xl:top-[-6rem] 4xl:top-[-7rem]">
            <span
              className="text-white uppercase text-[84px] 3xl:text-[50px] 4xl:text-[48px] font-bold"
              style={{
                fontFamily: "Sansation",
                WebkitTextStroke: "1px #C2512E",
              }}
            >
              Adaptive
            </span>
            <span
              className="uppercase text-[84px] 3xl:text-[50px] 4xl:text-[52px] font-bold text-white"
              style={{
                fontFamily: "Sansation",
                WebkitTextStroke: "1px #C2512E",
              }}
            >
              Leadership
            </span>
            <span
              className="uppercase text-[84px] 3xl:text-[50px] 4xl:text-[52px] font-bold text-white"
              style={{
                fontFamily: "Sansation",
                WebkitTextStroke: "1px #C2512E",
              }}
            >
              for You and
            </span>
            <span
              className="uppercase text-[84px] 3xl:text-[50px] 4xl:text-[52px] font-bold text-white"
              style={{
                fontFamily: "Sansation",
                WebkitTextStroke: "1px #C2512E",
              }}
            >
              Your
            </span>
            <span className="w-[20%] absolute left-[10rem] bottom-[12rem] 3xl:left-[7.5rem] 3xl:bottom-[9rem] 4xl:left-[8rem] 4xl:bottom-[9.5rem] flex items-center">
              <Image
                src="/assets/MobileAnimation.gif"
                alt="Mobile Animation"
                height={1000}
                width={1000}
                onClick={() => router.push("/Contact")}
              />
            </span>
          </div>

          <div className="absolute flex items-center inset-0 z-20 left-[120rem] 3xl:left-[85rem] 3xl:gap-10 4xl:left-[100rem] w-[100rem] 3xl:w-[21rem]">
            <div className="w-[100rem] 3xl:w-[25rem] 4xl:w-[27rem] relative">
              <div className="flex flex-col w-[40rem] 3xl:w-[27rem] 4xl:w-[34rem] leading-none gap-2 ">
                <p className="text-white uppercase text-[64px] 3xl:text-[40px] 4xl:text-[48px] font-bold">
                  About
                </p>
                <p
                  className="text-transparent uppercase bg-clip-text 4xl:text-[48px] bg-gradient-to-b from-[#BAA716] to-[#B50D34] text-[64px] 3xl:text-[40px] font-bold"
                  style={{
                    fontFamily: "Sansation",
                    WebkitTextStroke: "1px white",
                  }}
                >
                  PhlattLine
                </p>
                <p className="text-white text-[18px] leading-6  3xl:text-[13px] 4xl:text-[16px] font-regular mt-4 3xl:mt-2">
                  At PhlattLine, we believe in the transformative power of
                  adaptive leadership. Our mission is to equip leaders with the
                  tools and strategies necessary to drive meaningful change and
                  foster an environment of trust, engagement, and performance.
                  With our expertise, we help organizations navigate the
                  complexities of modern leadership, ensuring they meet and
                  exceed industry standards. Our approach is grounded in
                  real-world data and tailored to meet the unique needs of each
                  client. Join us on a journey to unlock your leadership
                  potential and make a lasting impact.
                </p>
                <div className="flex flex-start">
                  <ButtonWrapper
                    text="Choose Services"
                    className="border-red-500 text-white "
                  />
                </div>
              </div>
              <div className="absolute border-[14px] top-0 3xl:top-[3rem] 4xl:top-[3rem] border-black rounded left-[50rem] 3xl:left-[31rem] 4xl:left-[38rem]">
                <ReactPlayer
                  autoPlay
                  loop
                  muted
                  playing={isPlaying}
                  url="/assets/AboutVideo.mp4"
                  className="!w-[640px] !h-[360px] 3xl:!w-[420px] 3xl:!h-[235px] 4xl:!w-[480px] 4xl:!h-[270px]"
                />
                <div>
                  <Image
                    src={
                      isPlaying ? "/assets/PauseBtn.png" : "/assets/PlayBtn.png"
                    }
                    className="cursor-pointer absolute right-[2rem] w-[13%] top-[16rem] 3xl:top-[9rem] 3xl:!w-[18%] 4xl:top-[11rem] 4xl:!w-[16%]"
                    onClick={() => setIsPlaying(!isPlaying)}
                    alt="Play Pause Button"
                    height={1000}
                    width={1000}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-24">
              <div className="flex items-center relative  left-[85rem] 3xl:left-[54rem] 4xl:left-[70rem] gap-12 3xl:gap-8 4xl:gap-8 w-[100rem]">
                <div className="w-[100rem] flex gap-32 3xl:gap-12 4xl:gap-12 3xl:w-[55rem] 4xl:w-[60rem] relative ">
                  <div className="flex flex-col w-[40rem] leading-none gap-2 relative top-[4rem] 3xl:top-[2rem] 4xl:top-[1rem]">
                    <p className="text-white uppercase text-[64px] 3xl:text-[40px] 4xl:text-[48px]  font-bold">
                      How
                    </p>
                    <p
                      className="text-transparent uppercase bg-clip-text 4xl:text-[48px] bg-gradient-to-b from-[#BAA716] to-[#B50D34] text-[64px] 3xl:text-[40px] font-bold"
                      style={{
                        fontFamily: "Sansation",
                        WebkitTextStroke: "1px white",
                      }}
                    >
                      PhlattLine
                    </p>
                    <p className="text-white uppercase text-[64px] 3xl:text-[40px] 4xl:text-[48px] font-bold">
                      Can Work
                    </p>
                    <p className="text-white text-[18px] leading-6 3xl:text-[13px] 4xl:text-[16px] font-regular mt-4 3xl:mt-2">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry
                      &apos; s standard dummy text ever since the 1500s, when an
                      unknown printer took a galley of type and scrambled it to
                      make a type specimen book. It has survived not only five
                      centuries, but also the leap into electronic typesetting,
                      remaining essentially unchanged.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 3xl:gap-0 relative bottom-[3rem] 3xl:bottom-[1rem] 4xl:bottom-[1rem]">
                    <div className="flex flex-start gap-4 3xl:gap-0 4xl:gap-0">
                      <Image
                        src="/assets/AboutBanner1.png"
                        height={1000}
                        width={1000}
                        alt="About Banner"
                        className="w-[48%] h-[95%] 3xl:w-[48%] 3xl:h-[95%] 4xl:w-[48%] 4xl:h-[95%]"
                      />
                      <Image
                        src="/assets/AboutBanner2.png"
                        alt="About Banner"
                        height={1000}
                        width={1000}
                        className="w-[48%] h-[95%] 3xl:w-[48%] 3xl:h-[95%] 4xl:w-[48%] 4xl:h-[95%]"
                      />
                    </div>
                    <div className="flex flex-end relative left-[10rem] gap-4 3xl:left-[4rem] 4xl:left-[4rem] 3xl:gap-0 4xl:gap-0">
                      <Image
                        src="/assets/AboutBanner3.png"
                        alt="About Banner"
                        height={1000}
                        width={1000}
                        className="w-[48%] h-[95%] 3xl:w-[48%] 3xl:h-[95%] 4xl:w-[48%] 4xl:h-[95%]"
                      />
                      <Image
                        src="/assets/AboutBanner4.png"
                        alt="About Banner"
                        height={1000}
                        width={1000}
                        className="w-[48%] h-[95%] 3xl:w-[48%] 3xl:h-[95%] 4xl:w-[48%] 4xl:h-[95%]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center relative left-[112rem] 3xl:left-[4rem] 4xl:left-[42rem] gap-12 3xl:gap-8 w-[100rem]">
              <div className="w-[100rem] flex flex-col gap-20 justify-center items-center relative bottom-[3rem]">
                <div className="flex  leading-none gap-2 ">
                  <p className="text-white uppercase text-[64px] 3xl:text-[40px] 4xl:text-[48px] font-bold">
                    Our
                  </p>
                  <p
                    className="text-transparent uppercase bg-clip-text 4xl:text-[48px] bg-gradient-to-b from-[#BAA716] to-[#B50D34] text-[64px] 3xl:text-[40px] font-bold"
                    style={{
                      fontFamily: "Sansation",
                      WebkitTextStroke: "1px white",
                    }}
                  >
                    services
                  </p>
                </div>
                <div className="flex ">
                  <div className="flex flex-col absolute left-[15rem] top-[15rem] 3xl:left-[27rem] 4xl:top-[14rem] 4xl:left-[27rem] 3xl:top-[14rem] leading-none gap-2 3xl:gap-0">
                    <p className="text-white uppercase text-[30px] 3xl:text-[20px] 4xl:text-[20px] font-bold">
                      Organizational
                    </p>
                    <p
                      className="text-transparent uppercase bg-clip-text 4xl:text-[20px] bg-gradient-to-b from-[#BAA716] to-[#B50D34] text-[30px]  3xl:text-[20px] font-bold"
                      style={{
                        fontFamily: "Sansation",
                        WebkitTextStroke: "1px white",
                      }}
                    >
                      Development
                    </p>
                  </div>
                  <div className="flex flex-col absolute left-[50rem] top-[15rem] 3xl:left-[48rem] 3xl:top-[14rem] 4xl:left-[48rem] 4xl:top-[14rem] leading-none gap-2 3xl:gap-0">
                    <p className="text-white uppercase text-[30px] 3xl:text-[20px] 4xl:text-[20px]  font-bold">
                      Digital Media
                    </p>
                    <p
                      className="text-transparent uppercase bg-clip-text 4xl:text-[20px] bg-gradient-to-b from-[#BAA716] to-[#B50D34] text-[30px] 3xl:text-[20px] font-bold"
                      style={{
                        fontFamily: "Sansation",
                        WebkitTextStroke: "1px white",
                      }}
                    >
                      Solutions
                    </p>
                  </div>
                  <div className="flex flex-col absolute left-[88rem] top-[15rem] 3xl:left-[68rem] 3xl:top-[14rem] 4xl:left-[68rem] 4xl:top-[14rem]  leading-none gap-2 3xl:gap-0 ">
                    <p className="text-white uppercase text-[30px] 3xl:text-[20px] 4xl:text-[20px] font-bold">
                      PhlattLine
                    </p>
                    <p
                      className="text-transparent uppercase bg-clip-text 4xl:text-[20px] bg-gradient-to-b from-[#BAA716] to-[#B50D34] text-[30px] 3xl:text-[20px] font-bold"
                      style={{
                        fontFamily: "Sansation",
                        WebkitTextStroke: "1px white",
                      }}
                    >
                      Studios
                    </p>
                  </div>
                  <div className="flex gap-72 3xl:gap-28 4xl:gap-40">
                    <Image
                      src="/assets/AboutDoor.png"
                      alt="About Door"
                      height={1000}
                      width={1000}
                      className="h-[460px] w-[290px] 3xl:w-[21%] 4xl:w-[18%]"
                    />
                    <Image
                      src="/assets/AboutDoor.png"
                      height={1000}
                      width={1000}
                      alt="About Door"
                      className="h-[460px] w-[290px] 3xl:w-[21%] 4xl:w-[18%]"
                    />
                    <Image
                      src="/assets/AboutDoor.png"
                      alt="About Door"
                      className="h-[460px] w-[290px] 3xl:w-[21%] 4xl:w-[18%]"
                      height={1000}
                      width={1000}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Background image for each card */}
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

export default About;

type CardType = {
  url: string;
  ProUrl: string;
  name: string;
  name2: string;
  id: number;
  designation: string;
  description: string;
  heading1: string;
  heading2: string;
  heading3: string;
  heading4: string;
};

const cards: CardType[] = [
  {
    url: "./assets/AboutBg.png",
    ProUrl: "./assets/williamProfile.png",
    name: "WILLIAM",
    name2: "JAMES",
    designation: "Finance Officer",
    description:
      "William James is a seasoned finance officer with a strong background in financial analysis and management. With over ten years of experience, he has successfully managed complex financial operations, ensuring regulatory compliance and enhancing financial outcomes.",
    heading1: "SERVICES   ",
    heading2: "WHERE I WAS",
    heading3: "IN",
    heading4: " TROUBLE",
    id: 1,
  },
];
