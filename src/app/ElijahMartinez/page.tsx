// "use client";
// import { motion, useTransform, useScroll } from "framer-motion";
// import { useRef, useState, useEffect } from "react";
// import ButtonWrapper from "../components/Button";

// const WilliamProfile = () => {
//   return (
//     <div className="bg-neutral-800">
//       <HorizontalScrollCarousel />
//     </div>
//   );
// };

// const HorizontalScrollCarousel = () => {
//   const targetRef = useRef<HTMLDivElement | null>(null);
//   const { scrollYProgress } = useScroll({
//     target: targetRef,
//   });

//   const [xTransform, setXTransform] = useState(["0%", "-17.5%"]); // default for larger screens

//   useEffect(() => {
//     // Function to set the transform based on screen width
//     const handleResize = () => {
//       const screenWidth = window.innerWidth;

//       if (screenWidth <= 1024) {
//         setXTransform(["0%", "-13.7%"]); // For screens <= 1024px
//       } else if (screenWidth <= 1152) {
//         setXTransform(["0%", "-13.7%"]); // For screens <= 1152px
//       } else if (screenWidth <= 1280) {
//         setXTransform(["0%", "-17.5%"]); // For screens <= 1280px
//       } else if (screenWidth <= 1360) {
//         setXTransform(["0%", "-12.3%"]); // For screens <= 1360px
//       } else if (screenWidth <= 1366) {
//         setXTransform(["0%", "-18.6%"]); // For screens <= 1366px
//       } else if (screenWidth <= 1536) {
//         setXTransform(["0%", "-18.3%"]); // For screens <= 1536px
//       } else {
//         setXTransform(["0%", "-10.6%"]); // For screens > 1360px
//       }
//     };

//     handleResize(); // Call once on mount to set initial value
//     window.addEventListener("resize", handleResize); // Listen to window resize

//     return () => {
//       window.removeEventListener("resize", handleResize); // Cleanup on unmount
//     };
//   }, []);

//   const x = useTransform(scrollYProgress, [0, 1], xTransform);

//   return (
//     <section ref={targetRef} className="relative h-[300vh]">
//       <div className="sticky top-0 flex h-screen items-center overflow-hidden">
//         <motion.div style={{ x }} className="flex">
//           {cards.map((card) => (
//             <Card card={card} key={card.id} />
//           ))}
//         </motion.div>
//       </div>
//     </section>
//   );
// };
// const Card = ({ card }: { card: CardType }) => {
//   return (
//     <div
//       className={`group relative min-h-screen h-full w-[498rem] 3xl:w-[395rem] 7xl:w-[335rem] 4xl:w-[462rem] 5xl:w-[375rem] 6xl:w-[530rem] 8xl:w-[368rem] fullHD:w-[563rem] overflow-hidden ${
//         card.id === 1 ? "flex items-center justify-center" : ""
//       }`}
//     >
//       {/* Card 1 (with ProUrl and other content) */}
//       {card.ProUrl && card.id === 1 && (
//         <div
//           style={{
//             backgroundImage: `url(${card.ProUrl})`,
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//           }}
//           className="absolute inset-0 z-10 5xl:w-[15rem] 7xl:w-[-1] 6xl:w-[21rem] fullHD:w-[-1rem] bg-cover bg-center h-[43%] 3xl:h-[46%] w-[-1rem] left-[3%] 3xl:left-[3%] 5xl:left-[11rem] 6xl:left-[14rem] fullHD:left-[15rem] top-[12%]"
//         >
//           {/* Name overlay */}
//           <div className="absolute leading-none inset-0 flex flex-col items-center gap-0 justify-center left-[30rem] fullHD:left-[32rem] fullHD:top-[-8] top-[-8rem] 3xl:left-[23rem] 4xl:left-[27rem] 5xl:left-[24rem] 8xl:left-[24rem] 7xl:left-[24rem] 6xl:left-[30rem] 3xl:top-[-2rem] 4xl:top-[-5rem] 5xl:top-[-2rem] 8xl:top-[-2rem] 7xl:top-[-2rem] 6xl:top-[-5rem]">
//             <span
//               className="text-Black uppercase text-[64px] fullHD:text-[64px] 3xl:text-[40px] 4xl:text-[48px] 5xl:text-[52px] 7xl:text-[52px] 8xl:text-[52px] font-bold"
//               style={{ fontFamily: "Sansation" }}
//             >
//               Elijah
//             </span>
//             <span
//               className="fullHD:text-[64px] uppercase text-[64px] 3xl:text-[40px] 4xl:text-[48px] 5xl:text-[52px] 7xl:text-[52px] 8xl:text-[52px] font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#BAA716] to-[#B50D34]"
//               style={{ fontFamily: "Sansation" }}
//             >
//               Martinez
//             </span>
//           </div>

//           <div className="absolute inset-0 flex items-center justify-center fullHD:left-[25rem] left-[23rem] 3xl:left-[19rem] 4xl:left-[23rem] 5xl:left-[17rem] 8xl:left-[17rem] 7xl:left-[17rem] 6xl:left-[25.5rem] 3xl:top-[7rem] 4xl:top-[6rem]  5xl:top-[10rem] 8xl:top-[10rem] 7xl:top-[10rem] 6xl:top-[8rem] fullHD:top-[14rem] top-[8rem] fullHD:w-56 w-56 3xl:w-36">
//             <div className="">
//               <button
//                 className="text-white uppercase px-[20px] fullHD:px-[20px] py-[2px] fullHD:py-[2px] text-[24px] fullHD:text-[24px] 3xl:text-[16px] 4xl:text-[20px] 5xl:text-[18px] 8xl:text-[18px] 7xl:text-[18px] flex flex-row w-full p-1 justify-center items-center rounded-3xl bg-gradient-to-b whitespace-nowrap from-[#BAA716] to-[#B50D34]"
//                 style={{ fontFamily: "Sansation" }}
//               >
//                 Founder and CEO
//               </button>
//             </div>
//           </div>

//           <div className="absolute left-[45rem] fullHD:left-[45rem] 3xl:left-[30rem] 4xl:left-[35rem] 5xl:left-[33rem] 7xl:left-[33rem] 8xl:left-[33rem] 6xl:left-[39rem] top-[5rem] fullHD:top-[8rem] 3xl:top-[6.5rem] 4xl:top-[7rem] 5xl:top-[6rem] 7xl:top-[5.5rem] 8xl:top-[5.5rem] 6xl:top-[8rem] w-[32rem] fullHD:w-[32rem] 3xl:w-[19rem] 4xl:w-[25rem]">
//             <p
//               className="text-black text-[24px] fullHD:text-[24px] 3xl:text-[14px] 4xl:text-[18px] 5xl:text-[17px] 8xl:text-[19px] 7xl:text-[19px] 6xl:text-[19px] font-regular leading-normal"
//               style={{ fontFamily: "Sansation" }}
//             >
//               33 years old, based in Ogden, Utah. Founder and CEO of an
//               eco-friendly construction startup.
//             </p>
//             <br />
//             <p
//               className="text-black text-[24px] fullHD:text-[24px] 3xl:text-[14px] 4xl:text-[18px] 5xl:text-[17px] 8xl:text-[19px] 7xl:text-[19px] 6xl:text-[19px] font-regular leading-normal"
//               style={{ fontFamily: "Sansation" }}
//             >
//               Degree in Environmental Science and Civil Engineering. Launched
//               the startup 7 years ago, growing it from a small team to a notable
//               player in sustainable construction in Utah.
//             </p>
//           </div>
//           <div className="absolute flex inset-0 z-20 left-[110rem] fullHD:left-[110rem] top-[-2rem] fullHD:top-[-2rem] 3xl:top-[-1rem] 4xl:top-[1rem] 5xl:top-[-3rem] 7xl:top-[-6rem] 8xl:top-[-3rem] 6xl:top-[2rem] 3xl:left-[62rem] 3xl:gap-10 4xl:left-[79rem] 5xl:left-[78rem] 7xl:left-[77rem] 8xl:left-[88rem] 6xl:left-[75rem] w-[50rem] fullHD:w-[50rem] 3xl:w-[21rem]">
//             <div className="w-[35rem] fullHD:w-[35rem] 3xl:w-[25rem] 4xl:w-[27rem] relative top-[6rem]">
//               <div className="flex flex-col items-center leading-none gap-12 fullHD:gap-12 w-[60rem] fullHD:w-[60rem] 3xl:w-[37rem]">
//                 <div>
//                   <p
//                     className="text-black text-[64px] 3xl:w-[6%] 3xl:h-[6%] fullHD:text-[64px] 3xl:text-[40px] 4xl:text-[48px] 5xl:text-[52px] 7xl:text-[52px] 8xl:text-[52px] font-bold flex flex-row  gap-4 fullHD:gap-4 3xl:gap-2"
//                     style={{ fontFamily: "Sansation" }}
//                   >
//                     <img src="./assets/goalIcon.png" alt="" />
//                     <span
//                       className="text-transparent bg-clip-text 4xl:text-[48px] bg-gradient-to-b from-[#BAA716] to-[#B50D34] text-[64px] fullHD:text-[64px] 3xl:text-[40px] 5xl:text-[52px] 7xl:text-[52px] 8xl:text-[52px] font-bold"
//                       style={{ fontFamily: "Sansation" }}
//                     >
//                       GOAL
//                     </span>
//                   </p>
//                   <p
//                     className="text-black text-[24px] fullHD:text-[24px] 3xl:text-[14px] 4xl:text-[18px] 5xl:text-[17px] 8xl:text-[19px] 7xl:text-[19px] 6xl:text-[19px] font-regular leading-normal ml-20 fullHD:ml-20 3xl:ml-12 mt-2 fullHD:mt-2 3xl:mt-1"
//                     style={{ fontFamily: "Sansation" }}
//                   >
//                     Aims to strengthen leadership capabilities to manage a
//                     growing team effectively, foster innovation, and maintain a
//                     competitive edge in the tech industry. Seeks to develop a
//                     more strategic mindset to contribute to the company &apos; s
//                     long-term vision.
//                   </p>
//                 </div>
//                 <div>
//                   <p
//                     className="text-black text-[64px] 3xl:w-[6%] 3xl:h-[6%] fullHD:text-[64px] 3xl:text-[40px] 4xl:text-[48px] 5xl:text-[52px] 7xl:text-[52px] 8xl:text-[52px] font-bold flex flex-row items-baseline gap-4 fullHD:gap-4 3xl:gap-2"
//                     style={{ fontFamily: "Sansation" }}
//                   >
//                     <img src="./assets/ChallengesIcon.png" alt="" />
//                     <span
//                       className="text-transparent bg-clip-text 4xl:text-[48px] bg-gradient-to-b from-[#BAA716] to-[#B50D34] text-[64px] fullHD:text-[64px] 3xl:text-[40px] 5xl:text-[52px] 7xl:text-[52px] 8xl:text-[52px] font-bold"
//                       style={{ fontFamily: "Sansation" }}
//                     >
//                       CHALLENGES
//                     </span>
//                   </p>
//                   <p
//                     className="text-black text-[24px] fullHD:text-[24px] 3xl:text-[14px] 4xl:text-[18px] 5xl:text-[17px] 8xl:text-[19px] 7xl:text-[19px] 6xl:text-[19px] font-regular leading-normal ml-20 fullHD:ml-20 3xl:ml-12 mt-2 fullHD:mt-2 3xl:mt-1"
//                     style={{ fontFamily: "Sansation" }}
//                   >
//                     Struggles with balancing the operational demands of a
//                     growing business with the strategic focus needed to stay
//                     ahead in a competitive and rapidly evolving industry. Faces
//                     challenges in attracting and retaining top talent with a
//                     shared vision for sustainability.
//                   </p>
//                 </div>
//               </div>
//             </div>
//             <div>
//               <img
//                 src="./assets/Window2.png"
//                 alt=""
//                 className="absolute w-[29vw] fullHD:w-[33vw] h-[78vh] fullHD:h-[78vh] left-[65rem] fullHD:left-[65rem] bottom-[-13.5rem] fullHD:bottom-[-11.5rem] 3xl:w-[33vw] 3xl:h-[80vh] 3xl:left-[38rem] 4xl:left-[45rem]  5xl:left-[53rem] 7xl:left-[53rem] 8xl:left-[53rem] 6xl:left-[50rem]  3xl:bottom-[-9.5rem] 4xl:bottom-[-12.7rem] 5xl:bottom-[-10rem] 7xl:bottom-[-9.9rem] 8xl:bottom-[-9.9rem] 6xl:bottom-[-14.4rem]"
//               />
//             </div>
//             <div className="flex flex-col gap-24 fullHD:gap-24">
//               <div className="flex items-center relative left-[77rem] fullHD:left-[91rem] 3xl:left-[43rem] 4xl:left-[50rem] 5xl:left-[60rem] 8xl:left-[60rem]  7xl:left-[55rem] 6xl:left-[55rem] gap-12 fullHD:gap-28 3xl:gap-6 5xl:gap-8 8xl:gap-12 7xl:gap-8 top-[12rem] fullHD:top-[-10rem] 3xl:top-[10rem] 5xl:top-[7rem] 8xl:top-[7rem] 7xl:top-[7rem] fullHD:w-[100rem] w-[100rem]">
//                 <img src="./assets/valueBanner.png" alt="" />
//                 <img src="./assets/behaviorBanner.png" alt="" />
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//       <div
//         style={{
//           backgroundImage: `url(${card.url})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//         }}
//         className="absolute inset-0 z-0"
//       ></div>
//     </div>
//   );
// };

// export default WilliamProfile;

// type CardType = {
//   url: string;
//   ProUrl: string;
//   name: string;
//   name2: String;
//   id: number;
//   designation: String;
//   description: String;
//   heading1: String;
//   heading2: String;
//   heading3: String;
//   heading4: String;
// };

// const cards: CardType[] = [
//   {
//     url: "./assets/Nancy.png",
//     ProUrl: "./assets/ElijahProfile.png",
//     name: "JORDAN",
//     name2: "LEE",
//     designation: "DIRECTOR",
//     description:
//       "38 years old, resides in Salt Lake City, Utah. A director in a fast-growing software startup.",
//     heading1: "SERVICES   ",
//     heading2: "WHERE I WAS",
//     heading3: "IN",
//     heading4: " TROUBLE",
//     id: 1,
//   },
//   {
//     url: "",
//     ProUrl: "",
//     name: "",
//     name2: "",
//     designation: "",
//     description: "",
//     heading1: "",
//     heading2: "",
//     heading3: "",
//     heading4: "",
//     id: 2,
//   },
//   {
//     url: "",
//     ProUrl: "",
//     name: "",
//     name2: "",
//     designation: "",
//     description: "",
//     heading1: "",
//     heading2: "",
//     heading3: "",
//     heading4: "",
//     id: 3,
//   },
//   {
//     url: "",
//     ProUrl: "",
//     name: "",
//     name2: "",
//     designation: "",
//     description: "",
//     heading1: "",
//     heading2: "",
//     heading3: "",
//     heading4: "",
//     id: 4,
//   },
// ];
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

  const [xTransform, setXTransform] = useState(["0%", "-17.5%"]); // default for larger screens

  useEffect(() => {
    const handleResize = () => {
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
            {/* <div className="flex items-center justify-center relative left-[93rem]  3xl:left-[54rem] 4xl:left-[77rem] gap-12 3xl:gap-6 w-[100rem]">
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
                    Deep commitment to environmental sustainability, innovation,
                    and community engagement. Values transparent and ethical
                    business practices.
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
                    Engages with industry forums, sustainability conferences,
                    and green building initiatives. Actively seeks out
                    mentorship and networking opportunities with leaders in
                    sustainable practices. Prefers experiential learning and
                    case studies relevant to the construction and sustainability
                    sectors.
                  </p>
                </div>
              </div>
            </div> */}
            <div className="flex flex-col gap-24 ">
              <div className="flex relative left-[100rem] bottom-[13rem] 3xl:bottom-[10rem] 4xl:bottom-[10rem]  3xl:left-[55rem] 4xl:left-[70rem] gap-16 3xl:gap-8 4xl:gap-12 w-[100rem]">
                <img src="./assets/valueBanner.png" alt="" className="3xl:w-[25rem] 3xl:h-[70vh] 4xl:w-[28rem] 4xl:h-[70vh]" />
                <img src="./assets/behaviorBanner.png" alt="" className="3xl:w-[25rem] 3xl:h-[70vh] 4xl:w-[30rem] 4xl:h-[70vh]" />
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
