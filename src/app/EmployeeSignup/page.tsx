"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Input } from "../components/Input";
import { RiTeamFill } from "react-icons/ri";
import { SparklesCore } from "../components/sparkles";
import { MdDomain, MdEmail, MdLock, MdOutlineDateRange, MdPhone, MdWork } from "react-icons/md";
import { CustomPhoneInput } from "../components/phoneInput";
import { Employeeregister, Register, setError, setSuccess } from "@/redux/slices/auth.slice";
import { RootState } from "@/redux/store";
import StackedNotifications from "../components/Stackednotification";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import the DatePicker styles
import { MdBadge } from "react-icons/md";

const SignupScreen = () => {
  return (
    <section className="grid min-h-screen grid-cols-1 lg:grid-cols-[1fr,_600px] 2xl:grid-cols-[1fr,_900px] gap-4 p-4">
      <div className="flex items-center justify-center">
        <EmployeeSignup />
      </div>
    </section>
  );
};

export type NotificationType = {
  id: number;
  text: string;
  type: "error" | "success";
};

const EmployeeSignup = () => {
  const [firstName, setfirstName] = React.useState("");
  const [lastName, setlastName] = React.useState("");
  const [empEmail, setempEmail] = React.useState("");
  const [designation, setdesignation] = React.useState("");
  const [gender, setGender] = useState(""); // <-- Add this line
  const [empPhone, setempPhone] = React.useState("");
  const [selectedType, setSelectedType] = useState("");
  const [employeeNumber, setEmployeeNumber] = useState("");
  const [password, setPassword] = useState("");
  const [employeeCode, setEmployeeCode] = useState("");
  const [dob, setDob] = useState(null); // Initialize as null
  const [notification, setNotification] = useState<NotificationType | null>(
    null
  );
  const dispatch: any = useDispatch();
  const { success, error } = useSelector((state: RootState) => state.auth);
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    empEmail: "",
    designtion: "",
    empPhone: "",
    dob: "",
    gender: "",
    password: "",
    employeeCode: "",
  });

  const validate = () => {
    const newErrors: any = {
      firstName: "",
      lastName: "",
      empEmail: "",
      designtion: "",
      empPhone: "",
      dob: "",
      gender: "",
      password: "",
      employeeCode: "",
    };
    let isValid = true;

    if (!firstName) {
      newErrors.firstName = "First name is required";
      isValid = false;
    }

    if (!empEmail) {
      newErrors.empEmail = "Employee email is required";
      isValid = false;
    }

    if (!empPhone) {
      newErrors.empPhone = "Employee phone number is required";
      isValid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    }


    if (!employeeCode) {
      newErrors.employeeCode = "Employee Code is required"
      isValid = false;
    }

    if (!gender) {
      newErrors.gender = "Gender is required";
      isValid = false;
    }


    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();


    if (validate()) {
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", empEmail);
      formData.append("designation", designation);
      formData.append("phoneNumber", empPhone);
      formData.append("dob", dob ? new Date(dob).toLocaleDateString() : "");
      formData.append("gender", gender);
      formData.append("password", password);
      formData.append("organization_code", employeeCode);

      try {
        await dispatch(Employeeregister(formData));
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

            <div className="absolute inset-0 w-full h-full  [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
            <motion.p
              variants={primaryVariants}
              className="mb-8 text-center text-sm md:text-[15px] text-white absolute top-5 left-56"
            >
              Register As An Employee
            </motion.p>
          </div>
        </div>
        <form onSubmit={handleSubmit} noValidate className="w-full">
          <motion.div
            variants={primaryVariants}
            className="mb-4 w-full relative"
          >
            <Input
              id="first-name"
              type="text"
              value={firstName}
              onChange={(e: any) => setfirstName(e.target.value)}
              placeholder="First Name"
              className="bg-black border-2 border-[#b74b279d] text-white"
              required
            />
            <RiTeamFill className="absolute top-5 right-5 size-5 text-white" />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
            )}
          </motion.div>

          <motion.div
            variants={primaryVariants}
            className="mb-4 w-full relative"
          >
            <Input
              id="last-name"
              type="text"
              value={lastName}
              onChange={(e: any) => setlastName(e.target.value)}
              placeholder="Last Name"
              className="bg-black border-2 border-[#b74b279d] text-white"
              required
            />
            <RiTeamFill className="absolute top-5 right-5 size-5 text-white" />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
            )}
          </motion.div>

          <motion.div
            variants={primaryVariants}
            className="mb-2 w-full relative"
          >
            <Input
              id="email-input"
              placeholder="Enter Your Email"
              type="text"
              value={empEmail}
              onChange={(e: any) => setempEmail(e.target.value)}
              className="bg-black border-2 border-[#b74b279d] text-white"
              required
            />
            <MdEmail className="absolute top-5 right-5 size-5 text-white" />
            {errors.empEmail && (
              <p className="text-red-500 text-sm mt-1">{errors.empEmail}</p>
            )}
          </motion.div>

          <motion.div
            variants={primaryVariants}
            className="mb-4 w-full relative"
          >
            <Input
              id="your-designation"
              type="text"
              value={designation}
              onChange={(e: any) => setdesignation(e.target.value)}
              placeholder="Enter Your Designation"
              className="bg-black border-2 border-[#b74b279d] text-white"
              required
            />
            <MdWork className="absolute top-5 right-5 size-5 text-white" />
            {errors.designtion && (
              <p className="text-red-500 text-sm mt-1">{errors.designtion}</p>
            )}
          </motion.div>

          <motion.div
            variants={primaryVariants}
            className="mb-2 w-full relative"
          >
            <CustomPhoneInput
              value={empPhone}
              onChange={(phone) => setempPhone(phone)}
            />
            <MdPhone className="absolute top-5 right-5 size-5 text-white" />
            {errors.empPhone && (
              <p className="text-red-500 text-sm mt-1">{errors.empPhone}</p>
            )}
          </motion.div>

          <motion.div
            variants={primaryVariants}
            className="mb-4 w-full relative"
          >
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="bg-black border-2 border-[#b74b279d] text-white w-full p-2 rounded pt-4 pb-4 mt-2"
              required
            >
              <option value="" disabled>
                Select Your Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.gender && (
              <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
            )}
          </motion.div>
          <motion.div
            variants={primaryVariants}
            className="mb-4 w-full relative"
          >
            <div className="w-full"> {/* Wrap DatePicker in a full-width div */}
              <DatePicker
                selected={dob}
                onChange={(date: any) => setDob(date)}
                placeholderText="Select Your Date of Birth"
                className="bg-black border-2 border-[#b74b279d] text-white p-2 rounded w-full pt-3 pb-3"
                showMonthDropdown // Enable month dropdown
                showYearDropdown // Enable year dropdown
                dateFormat="MM/dd/yyyy"
              />
              <MdOutlineDateRange className="absolute top-3 right-4 text-white" />
            </div>
            {errors.dob && (
              <p className="text-red-500 text-sm mt-1">{errors.dob}</p>
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

          <motion.div
            variants={primaryVariants}
            className="mb-2 w-full relative"
          >
            <Input
              id="employee-code-input"
              placeholder="Enter Your Employee Code"
              type="text"
              value={employeeCode}
              onChange={(e: any) => setEmployeeCode(e.target.value)}
              className="bg-black border-2 border-[#b74b279d] text-white"
              required
            />
            <MdBadge className="absolute top-5 right-5 size-5 text-white" />
            {errors.employeeCode && (
              <p className="text-red-500 text-sm mt-1">{errors.employeeCode}</p>
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
              Register
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
