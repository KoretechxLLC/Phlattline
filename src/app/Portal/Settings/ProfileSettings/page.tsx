"use client";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setError, setSuccess, UpdateUser } from "@/redux/slices/auth.slice";
import StackedNotifications from "@/app/components/Stackednotification";

const ProfileSettings = () => {
  const [profileImage, setProfileImage] = useState<File | null>(null);
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-4 p-4">
      <Profile profileImage={profileImage} />
      <ProfileImage setProfileImage={setProfileImage} />
    </section>
  );
};

const Profile = ({ profileImage }: any) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [designation, setDesignation] = useState("");
  const [date, setDate] = useState(""); // Ensure this is initialized as an empty string
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const { userData, success, error } = useSelector(
    (state: RootState) => state.auth
  );
  const [notification, setNotification] = useState<NotificationType | null>(
    null
  );
  const [data, setData] = useState<any>();

  const dispatch: any = useDispatch();

  useEffect(() => {
    setData(userData);
  }, [userData]);
  const submitHandleChange = async (e: any) => {
    e.preventDefault();

    const formData = new FormData();

    if (firstName || userData?.first_name)
      formData.append("first_name", firstName || userData?.first_name);

    if (lastName || userData?.last_name)
      formData.append("last_name", lastName || userData?.last_name);

    if (phone || userData?.phone_number)
      formData.append("phone_number", phone || userData?.phone_number);

    if (userData?.email) formData.append("email", userData.email); // Assuming email is not editable

    // Only append date_of_birth if it's not null or undefined
    if (date !== null && date !== undefined) {
      formData.append("date_of_birth", date);
    } else if (userData?.date_of_birth) {
      formData.append("date_of_birth", userData.date_of_birth);
    }

    if (designation || userData?.designation)
      formData.append("designation", designation || userData?.designation);

    if (profileImage || userData?.profile)
      formData.append("profile_image", profileImage || userData?.profile);

    if (userData?.id) formData.append("userId", userData.id);

    // Ensure userId is present before dispatching
    if (userData?.id) {
      dispatch(UpdateUser(formData));
    } else {
      console.error("User ID is required to update user data.");
    }
  };

  useEffect(() => {
    if (success === "Successfully profile updated") {
      setNotification({
        id: Date.now(),
        text: success,
        type: "success",
      });
      dispatch(setSuccess());
    } else if (error) {
      setNotification({
        id: Date.now(),
        text: error,
        type: "error",
      });
      dispatch(setError());
    }
  }, [success, error, dispatch]);

  return (
    <form className="flex flex-col justify-center space-y-10">
      <StackedNotifications
        notification={notification}
        setNotification={setNotification}
      />
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
            value={data && data?.first_name}
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
            value={data && data?.last_name}
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
            value={data && data?.phone_number}
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
            value={data && data?.email}
            disabled
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
            value={data && data?.designation}
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
            value={data && data?.date_of_birth}
            onChange={(e) => setDate(e.target.value)}
            className="w-full bg-black text-white py-2 px-4 rounded-xl border-none focus:outline-none" // Apply consistent styles
          />
          <MdDateRange className="absolute top-1/2 right-5 transform -translate-y-1/2 text-white" />
        </motion.div>
      </div>

      {/* Fourth Row */}
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            value={data && data?.password}
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
            value={data && data?.password}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full bg-black text-white py-2 px-4 rounded-xl border-none focus:outline-none"
            required
          />
          <MdLock className="absolute top-1/2 right-5 transform -translate-y-1/2 text-white" />
        </motion.div>
      </div> */}

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
          onClick={submitHandleChange}
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default ProfileSettings;

export type NotificationType = {
  id: number;
  text: string;
  type: "error" | "success";
};

const ProfileImage = ({ setProfileImage }: any) => {
  const [image, setImage] = useState<string | undefined>();
  const [imageFile, setImageFile] = useState<any | null>();
  const { userData } = useSelector((state: RootState) => state.auth);
  const [data, setData] = useState<any>();
  const [notification, setNotification] = useState<NotificationType | null>(
    null
  );

  useEffect(() => {
    setData(userData);
  }, [userData]);

  const handleImageChange = (event: any) => {
    const file = event.target.files?.[0];
    if (
      file &&
      (file.type === "image/jpeg" ||
        file.type === "image/jpg" ||
        file.type === "image/png")
    ) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        setImage(imageUrl);
        setImageFile(file);
        setProfileImage(file);
      };
      reader.readAsDataURL(file);
    } else {
      setNotification({
        id: Date.now(),
        text: "Please upload a valid image file (jpeg, jpg, png).",
        type: "error",
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {data?.profile_image || image ? (
        <div className="w-60 h-60 ring-4 ring-[#B50D34] md:mt-0 mt-3 flex items-center justify-center rounded-full overflow-hidden">
          <Image
            alt="User profile image"
            src={image ? image : `/users/profileimage/${data.profile_image}`}
            layout="responsive" // Use responsive layout to control aspect ratio
            width={500} // Adjust width for better performance
            height={500} // Adjust height for better performance
            className="rounded-full object-cover" // Use object-cover to fill the container
          />
        </div>
      ) : (
        <div className="w-60 h-60 ring-4 ring-white md:mt-0 mt-3 flex items-center justify-center bg-gradient-to-b from-[#BAA716] to-[#B50D34] rounded-full">
          <span className="text-white text-2xl md:text-8xl font-bold pt-3">
            {data?.first_name?.charAt(0).toUpperCase() +
              data?.last_name?.charAt(0).toUpperCase()}
          </span>
        </div>
      )}
      <h2 className="text-white text-xl font-medium mt-4 uppercase">
        {data && data?.first_name + " " + data?.last_name}
      </h2>
      <p className="text-gray-400 text-sm">600x600 or larger recommended</p>
      <div className="flex gap-4 mt-4">
        <div className="flex justify-center items-center">
          <label className="w-full sm:w-40 rounded-lg border border-red-500 text-red-500 bg-black px-10 py-3 text-center  md:text-[16px] text-[13px] font-bold cursor-pointer ">
            UPLOAD
            <input
              type="file"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </div>

        <button
          onClick={() => setImage("")}
          className="w-full sm:w-40 rounded-lg border border-red-500 bg-red-500 px-2 py-2 text-center text-white font-medium"
        >
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