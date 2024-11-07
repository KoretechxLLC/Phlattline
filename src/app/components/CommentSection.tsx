"use client";
import Image from "next/image";
import React from "react";
import { Button } from "@/app/components/button-sidebar";
import ChatToolbar from "@/app/components/ChatToolbar";

const CommentSection = () => {
  const author = {
    name: "John Doe",
    image: "/assets/userProfile.png", // Example author image
    rating: 4.9,
    designation: "Senior Designer",
  };

  // Dummy comment data
  const dummyComment = {
    userName: "Jane Smith",
    profileImage: "/assets/userProfile.png", // Replace with actual image path
    time: "2 hours ago",
    text: "This course is amazing! I learned a lot.",
  };

  return (
    <div className="w-full h-full rounded-lg">
      {/* Input for New Comment and Toolbar in the Same Row */}
      <div className="flex items-center w-full p-5 my-3 border border-[#2D2C2C80] bg-black rounded-xl">
        <div className="rounded-full overflow-hidden">
          {author.image ? (
            <div className="w-10 h-10 ring-1 ring-[#fff] md:mt-0 mt-3 flex items-center justify-center rounded-full overflow-hidden">
              <Image
                src={author.image}
                alt={author.name}
                className="w-full h-full object-cover"
                width={100}
                height={100}
              />
            </div>
          ) : (
            <div className="w-10 h-10 ring-1 ring-white md:mt-0 mt-3 flex items-center justify-center bg-[#BAA716]  rounded-full">
              <span className="text-white text-sm md:text-sm font-bold py-3">
                {author.name?.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>
        <div className="flex-grow mx-5 rounded-2xl bg-[#62626280]">
          <div className="flex items-center w-full">
            <input
              type="text"
              className="p-5 w-full focus:outline-none rounded-md bg-transparent text-white placeholder-gray-400"
              placeholder="Comment"
            />
            <ChatToolbar />
          </div>
        </div>
      </div>

      {/* Buttons below the input */}
      <div className="flex justify-between my-2 space-x-4">
        <Button variant="default" className="hover:underline w-full">
          Like
        </Button>
        <Button className="hover:underline w-full">Reply</Button>
      </div>

      {/* Dummy Comment */}
      <div className="flex items-start border rounded-xl p-5 border-gray-600 space-x-3 my-3">
        <div className="rounded-full overflow-hidden">
          <Image
            src={dummyComment.profileImage}
            alt={dummyComment.userName}
            className="w-10 h-10 object-cover"
            width={40}
            height={40}
          />
        </div>
        <div className="flex-grow border rounded-lg border-[#62626280] bg-[#62626280] p-4 flex flex-col">
          <div className="flex justify-between">
            <h3 className="text-sm font-bold text-white">
              {dummyComment.userName}
            </h3>
            <span className="text-xs text-gray-400">{dummyComment.time}</span>
          </div>
          <p className="text-gray-300 mt-1">{dummyComment.text}</p>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
