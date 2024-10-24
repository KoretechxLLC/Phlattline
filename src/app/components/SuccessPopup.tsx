"use client";
import React from "react";
import { Card, CardContent, CardHeader } from "@/app/components/Card";
import Image from "next/image";
import { Button } from "@/app/components/button-sidebar";

const SucessPopup = () => {
  return (
    <Card>
      <CardHeader>
        <div>
          <Image src="" alt="" width={100} height={100} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="border-[1px] rounded-lg">
          <h1>Success</h1>
          <span>
            We are delighted to inform you that we receive your payment.
          </span>
          <Button
            className="text-white px-5 text-sm md:text-base lg:text-base flex w-full h-12 justify-center items-center rounded-3xl bg-gradient-to-b from-[#B50D34] to-[#BAA716]"
            size="default"
            variant="default"
          >
            Continue
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SucessPopup;
