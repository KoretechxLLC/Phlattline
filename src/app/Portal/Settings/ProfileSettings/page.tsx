"use client";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  MdEmail,
  MdLock,
  MdPerson,
  MdPhone,
  MdWork,
  MdDateRange,
} from "react-icons/md";
import Image from "next/image";

const ProfileSettings = () => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-4 p-4">
      <Profile />
      <ProfileImage />
    </section>
  );
};

const Profile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [designation, setDesignation] = useState("");
  const [date, setDate] = useState(""); // Ensure this is initialized as an empty string
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  return (
    <form className="flex flex-col justify-center space-y-10">
      {/* First Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <motion.div
          initial="initial"
          animate="animate"
          variants={primaryVariants}
          className="relative py-2 border border-gray-500 rounded-2xl"
        >
          <input
            id="first-name"
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full bg-black text-white py-2 px-4 rounded-xl border-none focus:outline-none"
            required
          />
          <MdPerson className="absolute top-1/2 right-5 transform -translate-y-1/2 text-white" />
        </motion.div>
        <motion.div
          initial="initial"
          animate="animate"
          variants={primaryVariants}
          className="relative py-2 border border-gray-500 rounded-2xl"
        >
          <input
            id="last-name"
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full bg-black text-white py-2 px-4 rounded-xl border-none focus:outline-none"
            required
          />
          <MdPerson className="absolute top-1/2 right-5 transform -translate-y-1/2 text-white" />
        </motion.div>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <motion.div
          initial="initial"
          animate="animate"
          variants={primaryVariants}
          className="relative py-2 border border-gray-500 rounded-2xl"
        >
          <input
            id="phone"
            type="tel"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full bg-black text-white py-2 px-4 rounded-xl border-none focus:outline-none"
            required
          />
          <MdPhone className="absolute top-1/2 right-5 transform -translate-y-1/2 text-white" />
        </motion.div>
        <motion.div
          initial="initial"
          animate="animate"
          variants={primaryVariants}
          className="relative py-2 border border-gray-500 rounded-2xl"
        >
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-black text-white py-2 px-4 rounded-xl border-none focus:outline-none"
            required
          />
          <MdEmail className="absolute top-1/2 right-5 transform -translate-y-1/2 text-white" />
        </motion.div>
      </div>

      {/* Third Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <motion.div
          initial="initial"
          animate="animate"
          variants={primaryVariants}
          className="relative py-2 border border-gray-500 rounded-2xl"
        >
          <input
            id="designation"
            type="text"
            placeholder="Designation"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            className="w-full bg-black text-white py-2 px-4 rounded-xl border-none focus:outline-none"
          />
          <MdWork className="absolute top-1/2 right-5 transform -translate-y-1/2 text-white" />
        </motion.div>
        <motion.div
          initial="initial"
          animate="animate"
          variants={primaryVariants}
          className="relative py-2 border border-gray-500 rounded-2xl"
        >
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full bg-black text-white py-2 px-4 rounded-xl border-none focus:outline-none" // Apply consistent styles
          />
          <MdDateRange className="absolute top-1/2 right-5 transform -translate-y-1/2 text-white" />
        </motion.div>
      </div>

      {/* Fourth Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <motion.div
          initial="initial"
          animate="animate"
          variants={primaryVariants}
          className="relative py-2 border border-gray-500 rounded-2xl"
        >
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-black text-white py-2 px-4 rounded-xl border-none focus:outline-none"
            required
          />
          <MdLock className="absolute top-1/2 right-5 transform -translate-y-1/2 text-white" />
        </motion.div>
        <motion.div
          initial="initial"
          animate="animate"
          variants={primaryVariants}
          className="relative py-2 border border-gray-500 rounded-2xl"
        >
          <input
            id="confirm-password"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full bg-black text-white py-2 px-4 rounded-xl border-none focus:outline-none"
            required
          />
          <MdLock className="absolute top-1/2 right-5 transform -translate-y-1/2 text-white" />
        </motion.div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row justify-center gap-8 py-2 mx-4 mt-10">
        <motion.div
          initial="initial"
          animate="animate"
          variants={primaryVariants}
          whileTap={{ scale: 0.985 }}
          className="cursor-pointer w-full sm:w-40 rounded-lg border border-red-500 text-red-500 bg-black px-2 py-2 text-center font-medium"
        >
          Cancel
        </motion.div>
        <button
          className="w-full sm:w-40 rounded-lg bg-gradient-to-b from-[#BAA716] to-[#B50D34] px-4 py-2 text-center font-medium text-white text-lg transition-transform hover:scale-[1.02] active:scale-[0.98]"
          type="submit"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default ProfileSettings;

const ProfileImage = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Image
        alt="User profile image"
        src="/assets/UserProfileLg.png"
        width={5000}
        height={5000}
        className="w-60 h-60"
      />
      <h2 className="text-white text-xl font-medium mt-4">User Name</h2>
      <p className="text-gray-400 text-sm">600x600 or larger recommended</p>
      <div className="flex gap-4 mt-4">
        <button className="w-full sm:w-40 rounded-lg border border-red-500 text-red-500 bg-black px-2 py-2 text-center font-medium">
          Upload
        </button>
        <button className="w-full sm:w-40 rounded-lg border border-red-500 bg-red-500 px-2 py-2 text-center text-white font-medium">
          Remove
        </button>
      </div>
    </div>
  );
};

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
