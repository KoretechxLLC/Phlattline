"use client";
import React from "react";
import { motion } from "framer-motion";
import { MdEmail, MdLock } from "react-icons/md";
import Image from "next/image";
import { useRouter } from "next/navigation";

const LoginScreen = () => {
  return (
    <section className="grid  min-h-screen grid-cols-1 bg-black-50 md:grid-cols-[1fr,_400px] lg:grid-cols-[1fr,_600px]">
      <Login />
      <LoginImage />
    </section>
  );
};

const Login = () => {
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
          Login
        </motion.h1>
        <motion.p
          variants={primaryVariants}
          className="mb-8 text-center text-sm md:text-base"
          style={{ fontFamily: "Sansation" }}
        >
          Login To Start Your Journey
        </motion.p>

        <form onSubmit={(e) => e.preventDefault()} className="w-full">
          <motion.div
            variants={primaryVariants}
            className="mb-2 w-full relative py-2"
          >
            <input
              id="email-input"
              type="email"
              placeholder="Enter your email"
              className="w-full pl-10 rounded-lg border-[1px] border-gray-600 bg-black text-gray border-grey-300 px-5.5 py-5 my-1 focus:outline-gray-600"
              style={{ fontFamily: "Sansation" }}
              required
            />
            <MdEmail className="absolute top-8 right-5 size-5 text-gray-500" />
          </motion.div>

          <motion.div
            variants={primaryVariants}
            className="mb-2 w-full relative"
          >
            <MdLock className="absolute top-7 right-5 size-5 text-gray-500" />
            <input
              id="password-input"
              type="password"
              placeholder="Enter your password"
              className="w-full pl-10 rounded-lg border-[1px] border-gray-600 bg-black text-gray border-grey-300 px-5.5 py-5 my-1 focus:outline-gray-600"
              style={{ fontFamily: "Sansation" }}
              required
            />
          </motion.div>
          <div className="flex flex-col sm:flex-row justify-center gap-8 sm:gap-8 py-2 mx-4">
            <div className="group relative inline-block">
              <motion.div
                variants={primaryVariants}
                whileTap={{
                  scale: 0.985,
                }}
                className="mb-1.5 w-full sm:w-40 rounded-lg border border-red-500 text-red-500 bg-black px-2 py-2 text-center font-medium text-red transition-colors"
                style={{ fontFamily: "Sansation" }}
              >
                Register
              </motion.div>
              <div
                className="hidden group-hover:block rounded absolute z-10 w-40 bg-white text-red-500 py-2 px-4"
                style={{ fontFamily: "Sansation" }}
              >
                <ul>
                  <div
                    className="cursor-pointer pl-1 rounded-lg hover:bg-red-500 hover:text-white hover:duration-300 ease-in-out"
                    onClick={() => router.push("/IndividualSignup")}
                  >
                    <li>Individual</li>
                  </div>
                  <div
                    className="cursor-pointer pl-1  rounded-lg hover:bg-red-500 hover:text-white hover:duration-300 ease-in-out"
                    onClick={() => router.push("/OrganizationSignup")}
                  >
                    <li>Organization</li>
                  </div>
                </ul>
              </div>
            </div>
            <motion.button
              variants={primaryVariants}
              whileTap={{
                scale: 0.985,
              }}
              type="submit"
              className="button-gradient mb-1.5 w-full sm:w-40 rounded-lg  px-4 py-2 text-center font-medium text-white transition-color"
              style={{ fontFamily: "Sansation" }}
            >
              Login
            </motion.button>
          </div>
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
        </form>
      </div>
    </motion.div>
  );
};

const LoginImage = () => {
  return (
    <div className="hidden md:block">
      <Image
        alt="A Login image"
        src="/assets/LoginImg.png"
        width={600}
        height={600}
        objectFit="cover"
      />
    </div>
  );
};

export default LoginScreen;

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
