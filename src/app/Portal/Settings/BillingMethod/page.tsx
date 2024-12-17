"use client";
import React, { useState } from "react";
import TransactionDetails from "@/app/components/TransactionDetails";
import { Button } from "@/app/components/button-sidebar";
import CreditCard from "@/app/components/CreditCard";
import PurchaseHistory from "@/app/Portal/Settings/PurchaseHistory/page"; // Import PurchaseHistory
import Icon from "@/app/components/utility-icon";

const BillingMethod = () => {
  const [showPurchaseHistory, setShowPurchaseHistory] = useState(false);

  return (
    <section className="flex flex-col 4xl:gap-3 gap-4">
      {!showPurchaseHistory ? (
        <>
          <CreditCard />
          <div className="flex justify-end">
            <Button
              className="rounded-lg"
              color="primary"
              onClick={() => setShowPurchaseHistory(true)} // Show Purchase History
            >
              Purchase History
            </Button>
          </div>
          <TransactionDetails />
        </>
      ) : (
        <>
          <div className="flex justify-start 4xl:mb-2 mb-4">
            <Button
              className="rounded-lg"
              color="default"
              onClick={() => setShowPurchaseHistory(false)} // Back to Billing Method
            >
              <Icon
                icon="weui:back-outlined"
                className="w-10 h-10 text-white mr-2"
              />
            </Button>
          </div>
          <PurchaseHistory />
        </>
      )}
    </section>
  );
};

export default BillingMethod;
