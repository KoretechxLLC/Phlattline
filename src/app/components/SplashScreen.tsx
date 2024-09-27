"use client";

import Image from "next/image";

const splashScreen = () => {
  return (
    <div className="bg-slate-950 w-screen h-screen flex justify-center items-center">
      <Image
        src="/assets/logogif.gif"
        alt="Logo GIF"
        width={100} // Adjust the width as per your requirement
        height={100} // Adjust the height as per your requirement
        className="w-[30rem]"
      />
    </div>
  );
};

export default splashScreen;
