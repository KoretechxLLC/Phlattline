"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/table";
import { Button } from "./button-sidebar";

const jobsTable = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableCell>S.NO</TableCell>
          <TableCell>Names</TableCell>
          <TableCell>Type</TableCell>
          <TableCell>Rate</TableCell>
          <TableCell>Action</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {" "}
        <TableCell>1</TableCell>
        <TableCell>Organization Name</TableCell>
        <TableCell>Coporate</TableCell>
        <TableCell>3.8/5</TableCell>
        <TableCell>
          <Button color="primary">Open Position</Button>
        </TableCell>
      </TableBody>
    </Table>
  );
};

export default jobsTable;
