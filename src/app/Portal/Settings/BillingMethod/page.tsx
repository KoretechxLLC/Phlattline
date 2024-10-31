"use client";
import React from "react";
import TransactionDetails from "@/app/components/TransactionDetails";
import { Button } from "@/app/components/button-sidebar";
import { useRouter } from "next/navigation";
import CreditCard from "@/app/components/CreditCard";

const BillingMethod = () => {
  const router = useRouter();
  return (
    <section className="flex flex-col 4xl:gap-3 gap-4">
      <CreditCard />
      <div className="flex justify-end">
        <Button
          className="rounded-lg"
          color="primary"
          onClick={() => router.push("/Portal/Settings/PurchaseHistory")}
        >
          Purchase History
        </Button>
      </div>
      <TransactionDetails />
    </section>
  );
};

export default BillingMethod;
