"use client";
import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  MdEmail,
  MdLock,
  MdPerson,
  MdPhone,
  MdWork,
  MdDateRange,
  MdDomain,
} from "react-icons/md";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  setError,
  setSuccess,
  updateOrganization,
  setUpdateOrganizationSuccess,
  setUpdateOrganizationError,
  UpdateUser,
  setUpdateUserData,
  DeleteUserProfile,
} from "@/redux/slices/auth.slice";
import StackedNotifications from "@/app/components/Stackednotification";

import "react-datepicker/dist/react-datepicker.css";
import { ImListNumbered } from "react-icons/im";
import { GoCopy } from "react-icons/go";
import { Select } from "@/app/components/select";
import { Input } from "@/app/components/Input";
import { CustomDatePicker } from "@/app/components/customDatePicker";
import { getCategories } from "@/redux/slices/categories.slice";
import ImageDeleteModal from "@/app/components/ImageDeleteModal";

const OrganizationProfileSettings = () => {
  const [profileImage, setProfileImage] = useState<File | null>(null);

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-4 p-4">
      <Profile profileImage={profileImage} />
      <ProfileImage
        setProfileImage={setProfileImage}
        profileImage={profileImage}
      />
    </section>
  );
};

const Profile = ({ profileImage }: any) => {
  const router = useRouter();
  const {
    userData,
    updateOrganizationSuccess,
    updateOrganizationError,
    updatedOrganization,
  } = useSelector((state: RootState) => state.auth);
  const [notification, setNotification] = useState<NotificationType | null>(
    null
  );

  const [obj, setObj] = useState({
    orgName: "",
    phoneNo: "",
    NoOfEmployees: "",
    orgType: "",
  });

  const [data, setData] = useState<any>();

  const dispatch: any = useDispatch();

  useEffect(() => {
    setData(userData);
  }, [userData]);

  const submitHandleChange = async (e: any) => {
    e.preventDefault();

    const formData = new FormData();

    if (!obj.orgName || !obj.NoOfEmployees || !obj.orgType || !obj.phoneNo) {
      setNotification({
        id: Date.now(),
        text: "Required Field Missing",
        type: "success",
      });
      return;
    }

    formData.append("organization_id", userData?.organization_id);

    formData.append("organization_name", obj?.orgName);

    formData.append("phone_number", obj?.phoneNo);

    formData.append("no_of_employees", obj?.NoOfEmployees);

    formData.append("categoryId", obj.orgType);

    formData.append("profile_image", profileImage || userData?.image);

    if (userData?.id) formData.append("user_id", userData.id);

    // Ensure userId is present before dispatching
    if (userData?.id) {
      dispatch(updateOrganization(formData));
    } else {
      console.error("User ID is required to update user data.");
    }
  };
  useEffect(() => {
    if (updateOrganizationSuccess) {
      let user = { ...userData };
      user.organizations = updatedOrganization.organization;
      user.profile_image = updatedOrganization.user.profile_image;

      dispatch(setUpdateUserData(user));

      setNotification({
        id: Date.now(),
        text: updateOrganizationSuccess,
        type: "success",
      });
      dispatch(setUpdateOrganizationSuccess());
    } else if (updateOrganizationError) {
      setNotification({
        id: Date.now(),
        text: updateOrganizationError,
        type: "error",
      });
      dispatch(setUpdateOrganizationError());
    }
  }, [updateOrganizationSuccess, updateOrganizationError, dispatch]);

  const inputRef: any = useRef(null);
  const [showMessage, setShowMessage] = useState(false);

  const handleCopy = () => {
    if (inputRef.current) {
      navigator.clipboard.writeText(inputRef.current.value);
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 2000);
    }
  };

  const { userCategories } = useSelector(
    (state: RootState) => state.categories
  );
  let orgCategories: { id: number; name: string | number }[] = [];

  useEffect(() => {
    dispatch(getCategories({}));
  }, []);

  useEffect(() => {
    if (userData) {
      setObj((prevObj) => ({
        ...prevObj,
        orgName: userData?.organizations?.organization_name,
        phoneNo: userData?.organizations?.phone_number,
        NoOfEmployees: userData?.organizations?.no_of_employees,
        orgType: userData?.organizations?.categoryId,
      }));
    }
  }, [userData]);

  useEffect(() => {
    if (
      userCategories &&
      userCategories?.length > 0 &&
      userData?.organizations?.categoryId
    ) {
    }
  }, [userCategories, userCategories?.length, userData]);

  return (
    <form className="flex flex-col justify-center space-y-10">
      <StackedNotifications
        notification={notification}
        setNotification={setNotification}
      />
      {/* First Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="relative  border border-[#62626280] rounded-2xl">
          <Input
            id="first-name"
            type="text"
            placeholder="Organization Name"
            value={obj.orgName}
            onChange={(e) => setObj({ ...obj, orgName: e.target.value })}
            className="w-full bg-black text-white py-2 px-4 rounded-xl border-none focus:outline-none"
            required
          />
          <MdPerson className="absolute top-1/2 right-5 transform -translate-y-1/2 text-white" />
        </div>
        <div className="relative  border border-[#62626280] rounded-2xl">
          <Input
            id="email"
            type="email"
            placeholder="Email"
            value={data?.organizations?.email}
            disabled
            className="w-full bg-black text-white py-2 px-4 rounded-xl border-none focus:outline-none"
            required
          />
          <MdEmail className="absolute top-1/2 right-5 transform -translate-y-1/2 text-white" />
        </div>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="relative  border border-[#62626280] rounded-2xl">
          <Input
            id="phone"
            type="tel"
            placeholder="Phone"
            value={obj.phoneNo}
            onChange={(e) => setObj({ ...obj, phoneNo: e.target.value })}
            className="w-full bg-black text-white py-2 px-4 rounded-xl border-none focus:outline-none"
            required
          />
          <MdPhone className="absolute top-1/2 right-5 transform -translate-y-1/2 text-white" />
        </div>
        <div className="relative  border border-[#62626280] rounded-2xl">
          <CustomDatePicker
            value={new Date(
              data?.organizations?.created_at
            ).toLocaleDateString()}
            disabled
            placeholderText="Joining Date"
            className="w-full bg-black text-white py-2 px-4 rounded-xl border-none focus:outline-none"
          />
          <MdDateRange className="absolute top-1/2 right-5 transform -translate-y-1/2 text-white" />
        </div>
      </div>

      {/* Third Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="relative">
          <Select
            id="organization type"
            value={obj.orgType}
            onChange={(e) => setObj({ ...obj, orgType: e.target.value })}
            className="bg-black text-white w-full p-2 py-4 border border-[#62626280] rounded-2xl"
            options={userCategories}
            placeholder={"Select Organization Type"}
            required
          />

          <MdWork className="absolute top-1/2 right-5 transform -translate-y-1/2 text-white" />
        </div>
        <div className="relative  border border-[#62626280] rounded-2xl">
          <Input
            id="num-emp"
            type="number"
            value={obj.NoOfEmployees}
            onChange={(e) => setObj({ ...obj, NoOfEmployees: e.target.value })}
            placeholder="How many employees?"
            className="w-full bg-black text-white py-2 px-4 rounded-xl focus:outline-none"
            required
          />
          <ImListNumbered className="absolute top-5 right-5 size-5 text-white" />
        </div>
      </div>

      {/* Fourth Row */}
      <div className="grid grid-cols-1  gap-4">
        <div className="relative  border border-[#62626280] rounded-2xl">
          <Input
            id="Code"
            ref={inputRef}
            type="text"
            value={data?.organizations.organization_code}
            placeholder="Code"
            className="w-full bg-black text-white py-2 px-4 rounded-xl focus:outline-none"
            disabled
          />
          <GoCopy
            className="absolute top-5 right-5 size-5 text-white cursor-pointer"
            onClick={handleCopy}
          />
          {showMessage && (
            <span className="absolute top-[-2rem] right-[0.4rem] text-sm text-gray-400 p-1 rounded">
              Copied!
            </span>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row justify-center gap-8 py-2 mx-4 mt-10">
        <div className="cursor-pointer w-full sm:w-40 rounded-lg border border-red-500 text-red-500 bg-black px-2 py-2 text-center font-medium">
          Cancel
        </div>
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

export default OrganizationProfileSettings;

export type NotificationType = {
  id: number;
  text: string;
  type: "error" | "success";
};

const ProfileImage = ({ setProfileImage, profileImage }: any) => {
  const [image, setImage] = useState<string | undefined>();
  const [imageFile, setImageFile] = useState<any | null>();
  const [imgError, setImgError] = useState(false);
  const { userData } = useSelector((state: RootState) => state.auth);
  const [data, setData] = useState<any>();
  const [notification, setNotification] = useState<NotificationType | null>(
    null
  );
  const { deleteProfileSuccess, deleteProfileError } = useSelector(
    (state: any) => state.auth
  );

  const dispatch: any = useDispatch();

  useEffect(() => {
    setData(userData);
  }, [userData, profileImage]);

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

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRemoveImage = () => {
    setIsModalOpen(true);
  };

  const confirmRemoveImage = () => {
    const userId = userData?.id;
    if (userId) {
      dispatch(DeleteUserProfile(userId));
      setImage("");
    }
    setIsModalOpen(false);
  };

  const cancelRemoveImage = () => {
    setIsModalOpen(false);
  };

  const handleError = () => {
    setImgError(true);
  };

  useEffect(() => {
    if (deleteProfileSuccess) {
      setImage("");
      setProfileImage("");
    }

    if (deleteProfileError) {
      console.error("Error deleting profile image:", deleteProfileError);
    }
  }, [deleteProfileSuccess, deleteProfileError, userData]);

  return (
    <div className="flex flex-col items-center justify-center">
      {data?.profile_image || image || imgError ? (
        <div className="w-60 h-60 ring-4 ring-[#B50D34] md:mt-0 mt-3 flex items-center justify-center rounded-full overflow-hidden">
          <Image
            alt="User profile image"
            src={
              image
                ? image
                : imgError
                ? "/assets/DummyImg.png" // Show dummy image if there's an error or no image
                : `/api/images?filename=${userData.profile_image}&folder=profileImage`
            }
            layout="responsive" // Use responsive layout to control aspect ratio
            width={500} // Adjust width for better performance
            height={500} // Adjust height for better performance
            className="rounded-full object-cover !h-[100%]"
            onError={handleError} // Trigger error handler if the image fails to load
          />
        </div>
      ) : (
        <div className="w-60 h-60 ring-4 ring-white md:mt-0 mt-3 flex items-center justify-center bg-gradient-to-b from-[#BAA716] to-[#B50D34] rounded-full">
          {userData && userData?.user_type_id == 2 ? (
            <span className="text-white text-2xl md:text-8xl font-bold pt-3">
              {userData?.organizations?.organization_name
                .charAt(0)
                .toUpperCase()}
            </span>
          ) : (
            <span className="text-white text-2xl md:text-8xl font-bold pt-3">
              {data?.first_name?.charAt(0).toUpperCase() +
                data?.last_name?.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
      )}
      {data?.user_type_id == 2 ? (
        <h2 className="text-white text-xl font-medium mt-4 uppercase">
          {data?.organizations.organization_name}
        </h2>
      ) : (
        <h2 className="text-white text-xl font-medium mt-4 uppercase">
          {data && data?.first_name + " " + data?.last_name}
        </h2>
      )}
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
          onClick={() => handleRemoveImage()}
          className="w-full sm:w-40 rounded-lg border border-red-500 bg-red-500 px-2 py-2 text-center text-white font-medium"
        >
          Remove
        </button>
        <ImageDeleteModal
          isOpen={isModalOpen}
          onConfirm={confirmRemoveImage}
          onCancel={cancelRemoveImage}
        />
      </div>
    </div>
  );
};
