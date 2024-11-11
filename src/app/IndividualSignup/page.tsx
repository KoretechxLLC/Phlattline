"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  MdDomain,
  MdEmail,
  MdLock,
  MdPerson,
  MdPhone,
  MdWork,
} from "react-icons/md";
import Image from "next/image";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { Input } from "../components/Input";
import { Select } from "../components/select";
import { useDispatch, useSelector } from "react-redux";
import { Register, setError, setSuccess } from "@/redux/slices/auth.slice";
import StackedNotifications from "../components/Stackednotification";
import { RootState } from "@/redux/store";
import { SparklesCore } from "../components/sparkles";
import "react-phone-input-2/lib/style.css";
import { CustomPhoneInput } from "../components/phoneInput";
import {
  getCategories,
  getSubCategories,
} from "@/redux/slices/categories.slice";

const World = dynamic(() => import("../components/GlobeWorld"), { ssr: false });

const SignupScreen = () => {
  return (
    <section className="grid min-h-screen grid-cols-1 lg:grid-cols-[1fr,_600px] 2xl:grid-cols-[1fr,_900px] gap-4 p-4">
      <div className="flex items-center justify-center">
        <IndividualSignUp />
      </div>
    </section>
  );
};

export type NotificationType = {
  id: number;
  text: string;
  type: "error" | "success";
};

const IndividualSignUp = () => {
  const [name, setName] = React.useState("");
  const [lastname, setlastname] = React.useState("");
  const dispatch: any = useDispatch();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const { success, error } = useSelector((state: RootState) => state.auth);
  const { userSubCategories, userCategories } = useSelector(
    (state: RootState) => state.categories
  );
  const router = useRouter();
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [notification, setNotification] = useState<NotificationType | null>(
    null
  );
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [selectedDesignation, setSelectedDesignation] = useState("");

  useEffect(() => {
    dispatch(getCategories({}));
  }, []);

  useEffect(() => {
    if (selectedIndustry) {
      dispatch(getSubCategories({ subCategories: Number(selectedIndustry) }));
    }
  }, [selectedIndustry]);

  const validate = () => {
    const newErrors = {
      name: "",
      lastname: "",
      email: "",
      phone: "",
      password: "",
      industry: "",
      designation: "",
    };
    let isValid = true;

    if (!name) {
      newErrors.name = "First name is required";
      isValid = false;
    }

    if (!lastname) {
      newErrors.lastname = "Last name is required";
      isValid = false;
    }

    if (!email) {
      newErrors.email = "Email is required";
      isValid = false;
    }

    if (!phone) {
      newErrors.phone = "Phone number is required";
      isValid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    if (!selectedIndustry) {
      newErrors.industry = "Industry is required";
      isValid = false;
    }

    if (!selectedDesignation) {
      newErrors.designation = "Designation is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (validate()) {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      formData.append("first_name", name);
      formData.append("last_name", lastname);
      formData.append("phone_number", phone);
      formData.append("categoryId", selectedIndustry);
      formData.append("SubCategoryId", selectedDesignation);
      try {
        await dispatch(Register(formData));
      } catch (error) {
        console.error("Registration failed", error);
      }
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
      router.push("/Login");
    }
    if (error !== null) {
      setNotification({
        id: Date.now(),
        text: error,
        type: "error",
      });
      dispatch(setError());
    }
  }, [success, error, dispatch]);

  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      transition={{
        staggerChildren: 0.05,
      }}
      viewport={{ once: true }}
      className="flex items-center justify-center px-4 py-10 md:py-20 z-50"
    >
      <StackedNotifications
        notification={notification}
        setNotification={setNotification}
      />
      <div className="w-full max-w-lg">
        <div className="w-full bg-transparent flex flex-col items-center justify-center overflow-hidden rounded-md">
          <h1 className="md:text-3xl text-3xl lg:text-3xl font-bold text-center text-white relative z-20">
            SIGNUP
          </h1>
          <div className="w-[40rem] relative">
            {/* Gradients */}
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-[#B50D34] to-transparent h-[2px] w-3/4 blur-sm" />
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-[#BAA716] to-transparent h-px w-3/4" />
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-[#B50D34]  to-transparent h-[5px] w-1/4 blur-sm" />
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-[#BAA716] to-transparent h-px w-1/4" />

            {/* Core component */}
            <SparklesCore
              background="transparent"
              minSize={0.4}
              maxSize={1}
              particleDensity={1200}
              className="w-full h-full flex justify-center"
              particleColor="#FFFFFF"
            />

            {/* Radial Gradient to prevent sharp edges */}
            <div className="absolute inset-0 w-full h-full [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
            <motion.p
              variants={primaryVariants}
              className="mb-8 text-center text-sm md:text-[15px] text-white absolute top-5 left-56"
            >
              Register to start your career
            </motion.p>
          </div>
        </div>
        <form onSubmit={handleSubmit} noValidate className="w-full">
          {/* First Name */}
          <motion.div
            variants={primaryVariants}
            className="mb-2 w-full relative"
          >
            <Input
              id="text-input"
              placeholder="Enter Your First Name"
              type="text"
              value={name}
              onChange={(e: any) => setName(e.target.value)}
              className="bg-black border-2 border-[#b74b279d] text-white"
              required
            />
            <MdPerson className="absolute top-5 right-5 size-5 text-white" />
            {/* {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )} */}
          </motion.div>

          {/* Last Name */}
          <motion.div
            variants={primaryVariants}
            className="mb-2 w-full relative"
          >
            <Input
              id="text-input"
              placeholder="Enter Your Last Name"
              type="text"
              value={lastname}
              onChange={(e: any) => setlastname(e.target.value)}
              className="bg-black border-2 border-[#b74b279d] text-white"
              required
            />
            <MdPerson className="absolute top-5 right-5 size-5 text-white" />
            {/* {errors.lastname && (
              <p className="text-red-500 text-sm mt-1">{errors.lastname}</p>
            )} */}
          </motion.div>

          {/* Industry Select */}
          <motion.div
            variants={primaryVariants}
            className="mb-2 w-full relative"
          >
            <Select
              id="industry-select"
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="bg-black border-2 border-[#b74b279d] text-white w-full p-2"
              options={userCategories}
              placeholder={"Select Your Industry"}
              required
            />
            <MdDomain className="absolute top-5 right-6 size-5 text-white" />
            {/* {errors.industry && (
              <p className="text-red-500 text-sm mt-1">{errors.industry}</p>
            )} */}
          </motion.div>

          <motion.div
            variants={primaryVariants}
            className="mb-2 w-full relative"
          >
            <Select
              id="designation-select"
              value={selectedDesignation}
              onChange={(e) => setSelectedDesignation(e.target.value)}
              className="bg-black border-2 border-[#b74b279d] text-white w-full p-2"
              options={userSubCategories}
              placeholder={"Select Your Designation"}
              required
            />
            <MdWork className="absolute top-5 right-6 size-5 text-white" />
            {/* {errors.designation && (
              <p className="text-red-500 text-sm mt-1">{errors.designation}</p>
            )} */}
          </motion.div>

          {/* Email */}
          <motion.div
            variants={primaryVariants}
            className="mb-2 w-full relative"
          >
            <Input
              id="email-input"
              placeholder="Enter Your Email"
              type="text"
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}
              className="bg-black border-2 border-[#b74b279d] text-white"
              required
            />
            <MdEmail className="absolute top-5 right-5 size-5 text-white" />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </motion.div>

          {/* Phone */}
          <motion.div
            variants={primaryVariants}
            className="mb-2 w-full relative"
          >
            <CustomPhoneInput
              value={phone}
              onChange={(phone) => setPhone(phone)}
            />
            <MdPhone className="absolute top-5 right-5 size-5 text-white" />
            {/* {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )} */}
          </motion.div>

          {/* Password */}
          <motion.div
            variants={primaryVariants}
            className="mb-2 w-full relative"
          >
            <Input
              id="password-input"
              placeholder="Enter Your Password"
              type="password"
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
              className="bg-black border-2 border-[#b74b279d] text-white"
              required
            />
            <MdLock className="absolute top-5 right-5 size-5 text-white" />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </motion.div>

          {/* Submit Button */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 py-2">
            <motion.button
              variants={primaryVariants}
              whileTap={{ scale: 0.985 }}
              type="button"
              onClick={() => router.push("/Login")}
              className="mb-1.5 w-full cursor-pointer sm:w-40 rounded-lg border border-red-500 text-red-500 bg-black px-4 py-2 my-1 text-center font-medium text-red transition-colors"
            >
              Login
            </motion.button>
            <motion.button
              variants={primaryVariants}
              whileTap={{ scale: 0.985 }}
              type="submit"
              className="theme-gradient cursor-pointer mb-1.5 w-full sm:w-40 rounded-lg px-4 py-2 text-center font-medium text-white transition-colors"
            >
              Sign up
            </motion.button>
          </div>
          <motion.div className="text-center text-white">
            <h1 className="text-xl py-0">OR</h1>
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
