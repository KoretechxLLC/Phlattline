"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import ButtonWrapper from "./components/Button";

const PageNotFound = () => {
  const router: any = useRouter();
  return (
    <section className="bg-black dark:bg-black flex h-screen items-center">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <Image
            height={100}
            width={100}
            src="/assets/404.svg"
            className="h-full w-full"
            alt="pone picture"
          />
          <p className="mb-4 text-lg font-light text-white dark:text-white">
            Sorry, we can&apos;t find that page. You&apos;ll find lots to
            explore on the home page.
          </p>
          <div
            onClick={() => router.push("/")}
            className="inline-flex cursor-pointer text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4"
          >
            <ButtonWrapper text="Back" className="border-red-500 text-white " />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageNotFound;
