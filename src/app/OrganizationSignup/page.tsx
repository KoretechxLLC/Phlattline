"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SignupScreen = () => {
  return (
    <section className="grid min-h-screen grid-cols-1 bg-black-50 md:grid-cols-[1fr,_400px] lg:grid-cols-[1fr,_600px]">
      <OrganizationSignup />
      <SignUpImage />
    </section>
  );
};

const OrganizationSignup = () => {
  const router: any = useRouter();
  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      transition={{
        staggerChildren: 0.05,
      }}
      viewport={{ once: true }}
      className="flex items-center justify-center px-4 py-10 md:py-20"
    >
      <div className="w-full max-w-lg">
        <motion.h1
          variants={primaryVariants}
          className="mb-2 text-center text-3xl md:text-4xl font-semibold"
          style={{ fontFamily: "Sansation" }}
        >
          SIGNUP
        </motion.h1>
        <motion.p
          variants={primaryVariants}
          className="mb-8 text-center text-sm md:text-base"
          style={{ fontFamily: "Sansation" }}
        >
          Register your Organization
        </motion.p>

        <form onSubmit={(e) => e.preventDefault()} className="w-full">
          <motion.div
            variants={primaryVariants}
            className="mb-2 w-full relative"
          >
            <input
              id="org-name"
              type="text"
              placeholder="Organization Name"
              className="w-full pl-10 rounded-lg border-[1px] border-gray-500 bg-black text-gray border-grey-300 px-2.5 py-3.5 my-1 focus:outline-gray-600"
              style={{ fontFamily: "Sansation" }}
              required
            />
          </motion.div>

          <motion.div
            variants={primaryVariants}
            className="mb-2 w-full relative"
          >
            <input
              id="role-input"
              type="text"
              placeholder="Role/Position"
              className="w-full pl-10 rounded-lg border-[1px] border-gray-500 bg-black text-gray border-grey-300 px-5.5 py-3.5 my-1 focus:outline-gray-600"
              style={{ fontFamily: "Sansation" }}
              required
            />
          </motion.div>

          <motion.div
            variants={primaryVariants}
            className="mb-2 w-full relative"
          >
            <input
              id="num-emp"
              type="number"
              placeholder="How many employees?"
              className="w-full pl-10 rounded-lg border-[1px] border-gray-500 bg-black text-gray border-grey-300 px-5.5 py-3.5 my-1 focus:outline-gray-600"
              style={{ fontFamily: "Sansation" }}
              required
            />
          </motion.div>

          <motion.div
            variants={primaryVariants}
            className="mb-2 w-full relative"
          >
            <input
              id="org-type"
              type="text"
              placeholder="Organization"
              className="w-full pl-10 rounded-lg border-[1px] border-gray-500 bg-black text-gray border-grey-300 px-5.5 py-3.5 my-1 focus:outline-gray-600"
              style={{ fontFamily: "Sansation" }}
              required
            />
          </motion.div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 py-2">
            <motion.button
              variants={primaryVariants}
              whileTap={{
                scale: 0.985,
              }}
              onClick={() => router.push("/Login")}
              type="submit"
              className="mb-1.5 w-full sm:w-40 rounded-lg border border-red-500 text-red-500 bg-black px-4 py-2 my-1 text-center font-medium text-red transition-color"
              style={{ fontFamily: "Sansation" }}
            >
              Login
            </motion.button>

            <motion.button
              variants={primaryVariants}
              whileTap={{
                scale: 0.985,
              }}
              type="submit"
              className="button-gradient mb-1.5 w-full sm:w-40 rounded-lg px-4 py-2 text-center font-medium text-white transition-colors"
              style={{ fontFamily: "Sansation" }}
            >
              Done
            </motion.button>
          </div>
        </form>
        <motion.div className="text-center">
          <h1 className="text-xl py-5" style={{ fontFamily: "Sansation" }}>
            OR
          </h1>
          <div className="flex justify-center gap-4">
            <motion.button className="w-12 mx-4 sm:w-16">
              <Image
                src="/assets/FbIcon.png"
                alt="Facebook"
                width={55}
                height={55}
              />
            </motion.button>
            <motion.button className="w-12 sm:w-16">
              <Image
                src="/assets/GoogleIcon.png"
                alt="Google"
                width={50}
                height={50}
              />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const SignUpImage = () => {
  return (
    <div className="hidden md:block">
      <Image
        alt="An example image"
        src="/assets/SignUpImg.png"
        width={600}
        height={600}
        objectFit="cover"
      />
    </div>
  );
};

export default SignupScreen;

const primaryVariants = {
  initial: {
    y: 25,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
  },
};
