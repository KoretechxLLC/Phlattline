import React from "react";
import ButtonWrapper from "../components/Button";
import Map from "../components/Map";

const Page = () => {
  return (
    <div
      style={{
        backgroundImage: 'url("/assets/ContactBg.png")',
        backgroundSize: "contain",
        backgroundPosition: "center",
        width: "100%", // Ensures the div covers the full viewport width
        height: "100vh", // Ensures the div covers the full viewport height
      }}
    >
      <div className="flex justify-center items-center gap-12 relative top-32 3xl:left-[7rem] 4xl:left-[5rem]">
        <div className="flex flex-col ">
          <h1
            className="uppercase text-transparent bg-clip-text 4xl:text-[38px] bg-gradient-to-b from-[#BAA716] to-[#B50D34] text-[48px] 3xl:text-[38px] font-bold mb-8"
            style={{ fontFamily: "Sansation" }}
          >
            Fill OUt To Reach Us
          </h1>
          <div className="flex flex-col gap-4 4xl:gap-2  3xl:w-[100%] 4xl:w-[100%]">
            <div className="flex gap-4 3xl:gap-2 4xl:gap-2">
              <span className="flex flex-col w-[45%] 3xl:w-[37%] 4xl:w-[40%]">
                <label
                  htmlFor="name"
                  className="font-bold uppercase text-black text-[16px] 3xl:text-[12px] 4xl:text-[14px]"
                >
                  Name
                </label>
                <input
                  type="text"
                  className="border-b-2 border-red-500 font-bold text-[24px] 3xl:text-[18px] 4xl:text-[20px] py-2 px-3 mt-1 bg-[#E6DCCE] text-black rounded outline-none"
                />
              </span>
              <span className="flex flex-col w-[45%] 3xl:w-[37%] 4xl:w-[40%]">
                <label
                  htmlFor="name"
                  className="font-bold uppercase text-black text-[16px] 3xl:text-[12px] 4xl:text-[14px]"
                >
                  Email
                </label>
                <input
                  type="text"
                  className="border-b-2 border-red-500 font-bold text-[24px] 3xl:text-[18px] 4xl:text-[20px] py-2 px-3 mt-1 bg-[#E6DCCE] text-black rounded outline-none"
                />
              </span>
            </div>
            <div>
              <span className="flex flex-col w-[92%] 3xl:w-[75%] 4xl:w-[80%]">
                <label
                  htmlFor="name"
                  className="font-bold uppercase text-black text-[16px] 3xl:text-[12px] 4xl:text-[14px]"
                >
                  Service
                </label>
                <input
                  type="text"
                  className="border-b-2 border-red-500 font-bold text-[24px] 3xl:text-[18px] 4xl:text-[20px] py-2 px-3 mt-1 bg-[#E6DCCE] text-black rounded outline-none"
                />
              </span>
            </div>
            <div>
              <span className="flex flex-col w-[92%] 3xl:w-[75%] 4xl:w-[80%]">
                <label
                  htmlFor="name"
                  className="font-bold uppercase text-black text-[16px] 3xl:text-[12px] 4xl:text-[14px]"
                >
                  Message
                </label>
                <textarea
                  className="border-b-2 border-red-500 font-bold text-[24px] 3xl:text-[18px] 4xl:text-[20px] py-2 px-3 mt-1 bg-[#E6DCCE] text-black rounded outline-none"
                  rows={5} // Set the number of visible text lines
                  cols={50} // Set the width of the textarea
                ></textarea>
              </span>
            </div>
            <div className="relative left-[16rem] 3xl:left-[6rem] 4xl:left-[10rem]">
              <ButtonWrapper
                text="Submit"
                className="text-black border-red-500"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-14 3xl:gap-10 4xl:gap-12 relative 3xl:right-[8rem] 4xl:right-[6rem]">
          <div className="flex items-center gap-6 3xl:gap-4 4xl:gap-2">
            <span>
              <img
                src="/assets/PhoneIcon.png"
                alt=""
                className="3xl:w-[85%] 4xl:w-[85%]"
              />
            </span>
            <span className="flex flex-col leading-normal">
              <p className="font-bold  text-white text-[18px] 3xl:text-[13px] 4xl:text-[15px]">
                Phone
              </p>
              <p className="font-bold  text-white text-[24px] 3xl:text-[18px] 4xl:text-[20px]">
                +18013869049
              </p>
            </span>
          </div>
          <div className="flex items-center gap-6 3xl:gap-4 4xl:gap-4">
            <span>
              <img
                src="/assets/EmailIcon.png"
                alt=""
                className="3xl:w-[85%] 4xl:w-[85%]"
              />
            </span>
            <span className="flex flex-col leading-normal">
              <p className="font-bold  text-white text-[18px] 3xl:text-[13px] 4xl:text-[15px]">
                Email us
              </p>
              <p className="font-bold  text-white text-[24px] 3xl:text-[18px] 4xl:text-[20px]">
                support@phlattline.com
              </p>
            </span>
          </div>
          <div className="flex items-center gap-6 3xl:gap-4 4xl:gap-5">
            <span>
              <img
                src="/assets/LocationIcon.png"
                alt=""
                className="3xl:w-[85%] 4xl:w-[85%]"
              />
            </span>
            <span className="flex flex-col leading-normal">
              <p className="font-bold  text-white text-[18px] 3xl:text-[13px] 4xl:text-[15px]">
                Location
              </p>
              <p className="font-bold  text-white text-[24px] 3xl:text-[18px] 4xl:text-[20px]">
                Tremonton, Utah
              </p>
            </span>
          </div>
          <div>
            <Map />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
