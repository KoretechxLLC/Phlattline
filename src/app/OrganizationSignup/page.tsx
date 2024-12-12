"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { Input } from "../components/Input";
import { RiTeamFill } from "react-icons/ri";
import { BiSolidUserBadge } from "react-icons/bi";
import { ImListNumbered } from "react-icons/im";
import { SparklesCore } from "../components/sparkles";
import { MdDomain, MdEmail, MdLock, MdPhone } from "react-icons/md";
import { CustomPhoneInput } from "../components/phoneInput";
import { Select } from "../components/select";
import {
  organizationRegister,
  Register,
  setError,
  setOrganizationError,
  setOrganizationSuccess,
  setSuccess,
} from "@/redux/slices/auth.slice";
import { RootState } from "@/redux/store";
import StackedNotifications from "../components/Stackednotification";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "@/redux/slices/categories.slice";

const SignupScreen = () => {
  return (
    <section className="grid min-h-screen grid-cols-1 lg:grid-cols-[1fr,_600px] 2xl:grid-cols-[1fr,_900px] gap-4 p-4">
      <div className="flex items-center justify-center">
        <OrganizationSignup />
      </div>
    </section>
  );
};

export type NotificationType = {
  id: number;
  text: string;
  type: "error" | "success";
};

const OrganizationSignup = () => {
  const { userCategories } = useSelector(
    (state: RootState) => state.categories
  );
  let orgCategories = [];
  useEffect(() => {
    dispatch(getCategories({}));
  }, []);
  if (userCategories) {
    orgCategories = userCategories;
  }

  const [orgName, setOrgName] = React.useState("");
  const [orgEmail, setOrgEmail] = React.useState("");
  const [orgPhone, setOrgPhone] = React.useState("");
  const [selectedType, setSelectedType] = useState("");
  const [employeeNumber, setEmployeeNumber] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [notification, setNotification] = useState<NotificationType | null>(
    null
  );
  const dispatch: any = useDispatch();
  const {
    success,
    error,
    organizationSuccess,
    organizationError,
    organizationIsLoading,
  } = useSelector((state: RootState) => state.auth);
  const [errors, setErrors] = useState({
    orgName: "",
    orgEmail: "",
    orgPhone: "",
    orgType: "",
    employeeNumber: "",
    role: "",
    password: "",
  });

  const validate = () => {
    const newErrors = {
      orgName: "",
      orgEmail: "",
      orgPhone: "",
      orgType: "",
      employeeNumber: "",
      role: "",
      password: "",
    };
    let isValid = true;

    if (!orgName) {
      newErrors.orgName = "Organization name is required";
      isValid = false;
    }

    if (!orgEmail) {
      newErrors.orgEmail = "Organizatio email is required";
      isValid = false;
    }

    if (!orgPhone) {
      newErrors.orgPhone = "Organization phone number is required";
      isValid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    if (!selectedType) {
      newErrors.orgType = "Organization Type is required";
      isValid = false;
    }

    if (!employeeNumber) {
      newErrors.employeeNumber = "Select number of Employees";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (validate()) {
      const formData = new FormData();
      formData.append("organization_name", orgName);
      formData.append("email", orgEmail);
      formData.append("phone_number", orgPhone);
      formData.append("categoryId", selectedType);
      formData.append("no_of_employees", employeeNumber);

      formData.append("password", password);

      try {
        await dispatch(organizationRegister(formData));
      } catch (error) {
        console.error("Registration failed", error);
      }
    }
  };

  useEffect(() => {
    if (organizationSuccess !== null) {
      setNotification({
        id: Date.now(),
        text: organizationSuccess,
        type: "success",
      });
      dispatch(setOrganizationSuccess());
      setTimeout(() => {
        router.push("/Login");
      }, 3000);
    }
    if (organizationError !== null) {
      setNotification({
        id: Date.now(),
        text: organizationError,
        type: "error",
      });
      dispatch(setOrganizationError());
    }
  }, [organizationSuccess, organizationError, dispatch]);
  const router: any = useRouter();
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
        <div className="w-full flex flex-col items-center justify-center overflow-hidden rounded-md">
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
            <div className="absolute inset-0 w-full h-full  [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
            <motion.p
              variants={primaryVariants}
              className="mb-8 text-center text-sm md:text-[15px] text-white absolute top-5 left-56"
            >
              Register your Organization
            </motion.p>
          </div>
        </div>
        <form onSubmit={handleSubmit} noValidate className="w-full">
          <motion.div
            variants={primaryVariants}
            className="mb-4 w-full relative"
          >
            <Input
              id="org-name"
              type="text"
              value={orgName}
              onChange={(e: any) => setOrgName(e.target.value)}
              placeholder="Organization Name"
              className="bg-black border-2 border-[#b74b279d] text-white"
              required
            />
            <RiTeamFill className="absolute top-5 right-5 size-5 text-white" />
            {errors.orgName && (
              <p className="text-red-500 text-sm mt-1">{errors.orgName}</p>
            )}
          </motion.div>
          <motion.div
            variants={primaryVariants}
            className="mb-2 w-full relative"
          >
            <Input
              id="email-input"
              placeholder="Enter Organization Email"
              type="text"
              value={orgEmail}
              onChange={(e: any) => setOrgEmail(e.target.value)}
              className="bg-black border-2 border-[#b74b279d] text-white"
              required
            />
            <MdEmail className="absolute top-5 right-5 size-5 text-white" />
            {errors.orgEmail && (
              <p className="text-red-500 text-sm mt-1">{errors.orgEmail}</p>
            )}
          </motion.div>
          <motion.div
            variants={primaryVariants}
            className="mb-2 w-full relative"
          >
            <CustomPhoneInput
              value={orgPhone}
              onChange={(phone) => setOrgPhone(phone)}
            />
            <MdPhone className="absolute top-5 right-5 size-5 text-white" />
            {errors.orgPhone && (
              <p className="text-red-500 text-sm mt-1">{errors.orgPhone}</p>
            )}
          </motion.div>

          <motion.div
            variants={primaryVariants}
            className="mb-2 w-full relative"
          >
            <Select
              id="organization type"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="bg-black border-2 border-[#b74b279d] text-white w-full p-2"
              options={orgCategories}
              placeholder={"Select Organization Type"}
              required
            />
            <MdDomain className="absolute top-5 right-6 size-5 text-white" />
            {errors.orgType && (
              <p className="text-red-500 text-sm mt-1">{errors.orgType}</p>
            )}
          </motion.div>

          <motion.div
            variants={primaryVariants}
            className="mb-4 w-full relative"
          >
            <Input
              id="num-emp"
              type="number"
              value={employeeNumber}
              onChange={(e) => setEmployeeNumber(e.target.value)}
              placeholder="How many employees?"
              className="bg-black border-2 border-[#b74b279d] text-white"
              required
            />
            <ImListNumbered className="absolute top-5 right-5 size-5 text-white" />
            {errors.employeeNumber && (
              <p className="text-red-500 text-sm mt-1">
                {errors.employeeNumber}
              </p>
            )}
          </motion.div>

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

          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 py-2 mt-6">
            <motion.button
              variants={primaryVariants}
              whileTap={{
                scale: 0.985,
              }}
              onClick={() => router.push("/Login")}
              type="button"
              className="mb-1.5 w-full sm:w-40 rounded-lg border border-red-500 text-red-500 bg-black px-4 py-2 my-1 text-center font-medium text-red transition-color"
            >
              Login
            </motion.button>

            <motion.button
              variants={primaryVariants}
              whileTap={{
                scale: 0.985,
              }}
              type="submit"
              className="theme-gradient mb-1.5 w-full sm:w-40 rounded-lg px-4 py-2 text-center font-medium text-white transition-colors"
            >
              Sign up
            </motion.button>
          </div>
        </form>
        <motion.div className="text-center">
          <h1 className="text-xl py-5 text-white">OR</h1>
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
