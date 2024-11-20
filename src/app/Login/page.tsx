"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MdEmail, MdLock } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { RootState } from "@/redux/store";
import { Input } from "../components/Input";
import { login, setError, setSuccess } from "../../redux/slices/auth.slice";
import StackedNotifications from "../components/Stackednotification";
import Image from "next/image";
import { SparklesCore } from "../components/sparkles";
import { AuroraBackground } from "../components/AuroraBackground";

const World = dynamic(() => import("../components/GlobeWorld"), { ssr: false });

const LoginScreen = () => {
  return (
    <section className="grid min-h-screen grid-cols-1 lg:grid-cols-[1fr,_600px] 2xl:grid-cols-[1fr,_900px] gap-4 p-4">
      <div className="flex items-center justify-center">
        <Login />
      </div>
    </section>
  );
};

export type NotificationType = {
  id: number;
  text: string;
  type: "error" | "success";
};

const Login = () => {
  const router = useRouter();
  const dispatch: any = useDispatch();
  const { success, error } = useSelector((state: RootState) => state.auth);
  const [email, setEmail] = useState<string>("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [password, setPassword] = useState<string>("");
  const [notification, setNotification] = useState<NotificationType | null>(
    null
  );

  const validate = () => {
    const newErrors = { email: "", password: "" };
    let isValid = true;

    if (!email) {
      newErrors.email = "Email is required";
      isValid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      dispatch(login({ email: email, password: password }));
    }
  };

  useEffect(() => {
    if (success !== null) {
      setNotification({
        id: Date.now(),
        text: success,
        type: "success",
      });
      dispatch(setSuccess());
      setTimeout(() => {
        router.push("/Portal/Dashboard");
      }, 2000);
    }
    if (error !== null) {
      setNotification({
        id: Date.now(),
        text: error,
        type: "error",
      });
      dispatch(setError());
    }
  }, [success, router, error, dispatch]);

  const { data: session } = useSession();

  const handleGoogleSignIn = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (session) {
      setNotification({
        id: Date.now(),
        text: "Already Signed In",
        type: "success",
      });
      router.push("/Dashboard");
    } else {
      await signIn("google", {
        callbackUrl: "/",
      });
    }
  };

  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      transition={{ staggerChildren: 0.05 }}
      viewport={{ once: true }}
      className="flex items-center justify-center px-4 py-10 md:py-20 z-50"
    >
      <StackedNotifications
        notification={notification}
        setNotification={setNotification}
      />
      <div className="w-full max-w-lg">
        <div className="w-full flex flex-col items-center justify-center overflow-hidden rounded-md">
          <h1 className="md:text-3xl text-3xl lg:text-3xl font-bold text-center text-white relative z-20">
            LOGIN
          </h1>
          <div className="w-[40rem] relative">
            {/* Gradients */}
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-[#B50D34] to-transparent h-[2px] w-3/4 blur-sm" />
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-[#BAA716] to-transparent h-px w-3/4" />
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-[#B50D34]  to-transparent h-[5px] w-1/4 blur-sm" />
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-[#BAA716] to-transparent h-px w-1/4" />

            <SparklesCore
              background="transparent"
              minSize={0.4}
              maxSize={1}
              particleDensity={1200}
              className="w-full h-full flex justify-center"
              particleColor="#FFFFFF"
            />
            <div className="absolute inset-0 w-full h-full [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
            <motion.p
              variants={primaryVariants}
              className="mb-8 text-center text-sm md:text-[15px] text-white absolute top-5 left-56"
            >
              Login To Start Your Journey
            </motion.p>
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate className="w-full">
          {/* Email Input */}
          <motion.div
            variants={primaryVariants}
            className="mb-2 w-full relative py-2"
          >
            <Input
              id="email-input"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-black border-2 border-[#b74b279d] text-white"
              required
            />
            <MdEmail className="absolute top-1/2 right-5 transform -translate-y-1/2 text-white" />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </motion.div>

          {/* Password Input */}
          <motion.div
            variants={primaryVariants}
            className="mb-2 w-full relative py-2"
          >
            <Input
              id="password-input"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-black border-2 border-[#b74b279d] text-white"
              required
            />
            <MdLock className="absolute top-1/2 right-5 transform -translate-y-1/2 text-white" />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </motion.div>

          {/* Buttons */}
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-8 py-2 mx-4 mt-10">
            <div className="group relative inline-block">
              <motion.div
                variants={primaryVariants}
                whileTap={{ scale: 0.985 }}
                className="cursor-pointer mb-1.5 w-full sm:w-40 rounded-lg border border-red-500 text-red-500 bg-black px-2 py-2 text-center font-medium"
              >
                Register
              </motion.div>
              <div className="hidden group-hover:block absolute z-10 w-40 bg-white text-red-500 py-2 px-4">
                <ul>
                  <li
                    className="cursor-pointer rounded-lg hover:bg-red-500 hover:text-white transition-colors pl-1"
                    onClick={() => router.push("/IndividualSignup")}
                  >
                    Individual
                  </li>
                  <li
                    className="cursor-pointer rounded-lg hover:bg-red-500 hover:text-white transition-colors pl-1"
                    onClick={() => router.push("/OrganizationSignup")}
                  >
                    Organization
                  </li>

                  <li
                    className="cursor-pointer rounded-lg hover:bg-red-500 hover:text-white transition-colors pl-1"
                    onClick={() => router.push("/EmployeeSignup")}
                  >
                    Employee
                  </li>


                </ul>
              </div>
            </div>
            <div className="cursor-pointer">
              <button
                className="w-full cursor-pointer sm:w-40 rounded-lg bg-gradient-to-b from-[#BAA716] to-[#B50D34] px-4 py-2 text-center font-medium text-white text-lg transition-transform hover:scale-[1.02] active:scale-[0.98]"
                type="submit"
              >
                Login
              </button>
            </div>
          </div>

          <motion.div className="text-center">
            <h1 className="text-xl py-16 text-white">OR</h1>
            <div className="flex justify-center gap-4">
              <motion.button className="cursor-pointer w-12 mx-4 sm:w-16">
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
                  onClick={handleGoogleSignIn}
                />
              </motion.button>
            </div>
          </motion.div>
        </form>
      </div>
    </motion.div>
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
