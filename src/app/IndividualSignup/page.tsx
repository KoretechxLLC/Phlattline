"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MdEmail, MdLock, MdPerson, MdPhone } from "react-icons/md";
import Image from "next/image";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { Input } from "../components/Input";
import { useDispatch, useSelector } from "react-redux";
import { Register,setError, setSuccess  } from "@/redux/slices/auth.slice";
import StackedNotifications from "../components/Stackednotification";
import { RootState } from "@/redux/store";

const World = dynamic(() => import("../components/GlobeWorld"), { ssr: false });

const SignupScreen = () => {
  return (
    <section className="grid min-h-screen grid-cols-1 bg-black lg:grid-cols-[1fr,_600px] 2xl:grid-cols-[1fr,_900px]">
      <IndividualSignUp />
      <SignUpImage />
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
  const [lastname, setlastname]= React.useState("");
  const dispatch:any = useDispatch(); 
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const {success, error } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const [errors, setErrors] = useState({ email: "", password: "" });
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


  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (validate()) {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      formData.append("first_name", name);
      formData.append("last_name", lastname);
      formData.append("phone_number", phone);
    
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
    }
    if (error !== null) {
    setNotification({
    id: Date.now(),
    text: error,
    type: "error",
    });
    dispatch(setError());
    }
    }, [success, error]);



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
        <StackedNotifications
        notification={notification}
        setNotification={setNotification}
      />
      <div className="w-full max-w-lg">
        <motion.h1
          variants={primaryVariants}
          className="mb-2 text-center text-3xl md:text-5xl font-semibold text-white uppercase"
          style={{ fontFamily: "Sansation" }}
        >
          SIGNUP
        </motion.h1>
        <motion.p
          variants={primaryVariants}
           className="mb-8 text-center text-sm md:text-[15px] text-white"
          style={{ fontFamily: "Sansation" }}
        >
          Register to start your career
        </motion.p>
        <form onSubmit={handleSubmit} className="w-full">

          <motion.div
            variants={primaryVariants}
            className="mb-4 w-full relative"
          >
            <Input
              id="text-input"
              placeholder="Enter Your First Name"
              type="text"
              value={name}
              onChange={(e: any) => setName(e.target.value)}
              style={{ fontFamily: "Sansation" }}
              className="bg-black border-2 border-[#b74b279d] text-white"
              required
            />
            <MdPerson className="absolute top-5 right-5 size-5 text-white" />
          </motion.div>

          <motion.div
            variants={primaryVariants}
            className="mb-4 w-full relative"
          >
            <Input
              id="text-input"
              placeholder="Enter Your Last Name"
              type="text"
              value={lastname}
              onChange={(e: any) => setlastname(e.target.value)}
              style={{ fontFamily: "Sansation" }}
              className="bg-black border-2 border-[#b74b279d] text-white"
              required
            />
            <MdPerson className="absolute top-5 right-5 size-5 text-white" />
          </motion.div>

          <motion.div
            variants={primaryVariants}
            className="mb-4 w-full relative"
          >
            <Input
              id="email-input"
              placeholder="Enter Your Email"
              type="text"
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}
              style={{ fontFamily: "Sansation" }}
              className="bg-black border-2 border-[#b74b279d] text-white"
              required
            />
            <MdEmail className="absolute top-5 right-5 size-5 text-white" />
          </motion.div>

          <motion.div
            variants={primaryVariants}
            className="mb-4 w-full relative"
          >
           <Input
              id="number-input"
              type="tel"
              placeholder="Enter your number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={{ fontFamily: "Sansation" }}
              className="bg-black border-2 border-[#b74b279d] text-white"
              required
            />
            <MdPhone className="absolute top-5 right-5 size-5 text-white" />
          </motion.div>

          <motion.div
            variants={primaryVariants}
            className="mb-4 w-full relative"
          >
            


            <Input
              id="password-input"
              placeholder="Enter Your Password"
              type="password"
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
              style={{ fontFamily: "Sansation" }}
              className="bg-black border-2 border-[#b74b279d] text-white"
              required
            />
            <MdLock className="absolute top-5 right-5 size-5 text-white" />
          </motion.div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 py-2">
            <motion.button
              variants={primaryVariants}
              whileTap={{
                scale: 0.985,
              }}
              type="submit"
              onClick={() => router.push("/Login")}
              className="mb-1.5 w-full sm:w-40 rounded-lg border border-red-500 text-red-500 bg-black px-4 py-2 my-1 text-center font-medium text-red transition-colors"
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
              Sign up
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

const SignUpImage = () => {
  const globeConfig = {
    pointSize: 10,
    globeColor: "#062056", // Keep this as is for the globe color
    showAtmosphere: true,
    atmosphereColor: "#BAA716", // Atmosphere color
    atmosphereAltitude: 0.3,
    emissive: "#0078aa",
    emissiveIntensity: 0.2,
    shininess: 1,
    polygonColor: "rgba(255, 255, 255, 1)", // Change opacity to 1 for bright white land
    ambientLight: "#ffffff", // Ambient light color
    directionalLeftLight: "#ffffff", // Left directional light
    directionalTopLight: "#ffffff", // Top directional light
    pointLight: "#ffffff", // Point light color
    arcTime: 1000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    initialPosition: { lat: 22.3193, lng: 114.1694 },
    autoRotate: true,
    autoRotateSpeed: 0.5,
  };

  const colors = ["#ffffff", "#ffffff", "#ffffff"];
  const sampleArcs = [
    {
      order: 1,
      startLat: -19.885592,
      startLng: -43.951191,
      endLat: -22.9068,
      endLng: -43.1729,
      arcAlt: 0.1,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 1,
      startLat: 28.6139,
      startLng: 77.209,
      endLat: 3.139,
      endLng: 101.6869,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 1,
      startLat: -19.885592,
      startLng: -43.951191,
      endLat: -1.303396,
      endLng: 36.852443,
      arcAlt: 0.5,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 2,
      startLat: 1.3521,
      startLng: 103.8198,
      endLat: 35.6762,
      endLng: 139.6503,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 2,
      startLat: 51.5072,
      startLng: -0.1276,
      endLat: 3.139,
      endLng: 101.6869,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 2,
      startLat: -15.785493,
      startLng: -47.909029,
      endLat: 36.162809,
      endLng: -115.119411,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 3,
      startLat: -33.8688,
      startLng: 151.2093,
      endLat: 22.3193,
      endLng: 114.1694,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 3,
      startLat: 21.3099,
      startLng: -157.8581,
      endLat: 40.7128,
      endLng: -74.006,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 3,
      startLat: -6.2088,
      startLng: 106.8456,
      endLat: 51.5072,
      endLng: -0.1276,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 4,
      startLat: 11.986597,
      startLng: 8.571831,
      endLat: -15.595412,
      endLng: -56.05918,
      arcAlt: 0.5,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 4,
      startLat: -34.6037,
      startLng: -58.3816,
      endLat: 22.3193,
      endLng: 114.1694,
      arcAlt: 0.7,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 4,
      startLat: 51.5072,
      startLng: -0.1276,
      endLat: 48.8566,
      endLng: -2.3522,
      arcAlt: 0.1,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 5,
      startLat: 14.5995,
      startLng: 120.9842,
      endLat: 51.5072,
      endLng: -0.1276,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 5,
      startLat: 1.3521,
      startLng: 103.8198,
      endLat: -33.8688,
      endLng: 151.2093,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 5,
      startLat: 34.0522,
      startLng: -118.2437,
      endLat: 48.8566,
      endLng: -2.3522,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 6,
      startLat: -15.432563,
      startLng: 28.315853,
      endLat: 1.094136,
      endLng: -63.34546,
      arcAlt: 0.7,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 6,
      startLat: 37.5665,
      startLng: 126.978,
      endLat: 35.6762,
      endLng: 139.6503,
      arcAlt: 0.1,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 6,
      startLat: 22.3193,
      startLng: 114.1694,
      endLat: 51.5072,
      endLng: -0.1276,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 7,
      startLat: -19.885592,
      startLng: -43.951191,
      endLat: -15.595412,
      endLng: -56.05918,
      arcAlt: 0.1,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 7,
      startLat: 48.8566,
      startLng: -2.3522,
      endLat: 52.52,
      endLng: 13.405,
      arcAlt: 0.1,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 7,
      startLat: 52.52,
      startLng: 13.405,
      endLat: 34.0522,
      endLng: -118.2437,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 8,
      startLat: -8.833221,
      startLng: 13.264837,
      endLat: -33.936138,
      endLng: 18.436529,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 8,
      startLat: 49.2827,
      startLng: -123.1207,
      endLat: 52.3676,
      endLng: 4.9041,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 8,
      startLat: 1.3521,
      startLng: 103.8198,
      endLat: 40.7128,
      endLng: -74.006,
      arcAlt: 0.5,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 9,
      startLat: 51.5072,
      startLng: -0.1276,
      endLat: 34.0522,
      endLng: -118.2437,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 9,
      startLat: 22.3193,
      startLng: 114.1694,
      endLat: -22.9068,
      endLng: -43.1729,
      arcAlt: 0.7,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 9,
      startLat: 1.3521,
      startLng: 103.8198,
      endLat: -34.6037,
      endLng: -58.3816,
      arcAlt: 0.5,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 10,
      startLat: -22.9068,
      startLng: -43.1729,
      endLat: 28.6139,
      endLng: 77.209,
      arcAlt: 0.7,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 10,
      startLat: 34.0522,
      startLng: -118.2437,
      endLat: 31.2304,
      endLng: 121.4737,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 10,
      startLat: -6.2088,
      startLng: 106.8456,
      endLat: 52.3676,
      endLng: 4.9041,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 11,
      startLat: 41.9028,
      startLng: 12.4964,
      endLat: 34.0522,
      endLng: -118.2437,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 11,
      startLat: -6.2088,
      startLng: 106.8456,
      endLat: 31.2304,
      endLng: 121.4737,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 11,
      startLat: 22.3193,
      startLng: 114.1694,
      endLat: 1.3521,
      endLng: 103.8198,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 12,
      startLat: 34.0522,
      startLng: -118.2437,
      endLat: 37.7749,
      endLng: -122.4194,
      arcAlt: 0.1,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 12,
      startLat: 35.6762,
      startLng: 139.6503,
      endLat: 22.3193,
      endLng: 114.1694,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 12,
      startLat: 22.3193,
      startLng: 114.1694,
      endLat: 34.0522,
      endLng: -118.2437,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 13,
      startLat: 52.52,
      startLng: 13.405,
      endLat: 22.3193,
      endLng: 114.1694,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 13,
      startLat: 11.986597,
      startLng: 8.571831,
      endLat: 35.6762,
      endLng: 139.6503,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 13,
      startLat: -22.9068,
      startLng: -43.1729,
      endLat: -34.6037,
      endLng: -58.3816,
      arcAlt: 0.1,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 14,
      startLat: -33.936138,
      startLng: 18.436529,
      endLat: 21.395643,
      endLng: 39.883798,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
  ];
  return (
    <div className="hidden lg:block">
      {typeof window !== "undefined" && (
        <World data={sampleArcs} globeConfig={globeConfig} />
      )}
      {/* <Image
        alt="An example image"
        src="/assets/SignUpImg.png"
        width={600}
        height={600}
        objectFit="cover"
      /> */}
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
