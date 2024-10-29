"use client";
import React from "react";
import TransactionDetails from "@/app/components/TransactionDetails";

const PurchaseHistory = () => {
  // Specify the columns to display
  const columnsToShow = ["product", "date", "status", "price"];

  return (
    <section className="flex items-center justify-center lg:my-52 5xl:my-36">
      <TransactionDetails visibleColumns={columnsToShow} />
    </section>
  );
};

export default PurchaseHistory;
