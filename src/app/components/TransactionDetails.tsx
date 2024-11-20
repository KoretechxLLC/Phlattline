"use client";

import * as React from "react";
import Icon from "@/app/components/utility-icon";
import {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/app/components/button-sidebar";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/app/components/table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/app/components/badge";
import { cn } from "@/app/lib/utils";

// Define data type
export type CoursesDataProps = {
  invoice: string;
  date: string;
  status: "paid" | "cancelled" | "pending"; // Changed spelling
  product: string;
  instructor: string;
  card: string;
  price: string;
  company: string;
};

interface TransactionDetailsProps {
  visibleColumns?: string[]; // Prop to control which columns are visible
}

// Static data array
const data: CoursesDataProps[] = [
  {
    invoice: "INV-001",
    date: "2024-10-20",
    status: "paid",
    product: "Introduction to Programming",
    instructor: "John Williams",
    card: "**** 1234",
    price: "$1,200",
    company: "MasterCard",
  },
  {
    invoice: "INV-002",
    date: "2024-10-21",
    status: "cancelled", // Changed spelling
    product: "Advanced Data Science",
    instructor: "Emily Clark",
    card: "**** 5678",
    price: "$200",
    company: "PayPal",
  },
  {
    invoice: "INV-003",
    date: "2024-10-22",
    status: "pending",
    product: "Machine Learning Basics",
    instructor: "Michael Brown",
    card: "**** 9012",
    price: "$150",
    company: "Visa",
  },
];

// Function to get color based on status
const getColorForStatus = (status: "paid" | "cancelled" | "pending") => {
  switch (status) {
    case "paid":
      return "bg-blue-500";
    case "cancelled":
      return "bg-red-500"; // Red for cancelled
    case "pending":
      return "bg-yellow-800";
    default:
      return "bg-gray-500";
  }
};

// Column definitions
const columns: ColumnDef<CoursesDataProps>[] = [
  {
    header: "Product",
    cell: ({ row }) => {
      const courseName = row.original.product;
      const instructorName = row.original.instructor;

      return (
        <span className="flex items-center">
          <Badge
            className={`rounded-full ${getColorForStatus(
              row.original.status
            )} text-white px-2 py-1`}
          >
            <Icon icon="mdi:books" className="text-white w-10 h-10 text-3xl" />
          </Badge>
          <span className="ml-2">
            {courseName}{" "}
            <span className="text-yellow-500">of {instructorName}</span>
          </span>
        </span>
      );
    },
  },
  {
    header: "Date",
    cell: ({ row }) => <span>{row.original.date}</span>,
  },
  {
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      const statusClass: { [key: string]: string } = {
        paid: "bg-green-900 text-green-500",
        cancelled: "bg-red-900 text-red-500", // Changed spelling
        pending: "bg-yellow-900 text-yellow-500",
      };
      const className = statusClass[status] || "bg-default/10 text-default";
      return (
        <Badge
          className={cn(
            "flex items-center px-2 max-w-[90px] justify-center py-1 rounded-full",
            className
          )}
        >
          {status === "paid" && (
            <Icon icon="charm:tick" className="text-green-500 w-5 h-5 mr-1" />
          )}
          {status === "cancelled" && (
            <Icon icon="oui:cross" className="text-red-500 w-5 h-5 mr-1" />
          )}
          {status === "pending" && (
            <Icon
              icon="ic:outline-pending"
              className="text-yellow-500 w-5 h-5 mr-1"
            />
          )}
          {status}
        </Badge>
      );
    },
  },
  {
    header: "Invoice",
    cell: ({ row }) => <span>{row.original.invoice}</span>,
  },
  {
    header: "Card",
    cell: ({ row }) => (
      <span className="flex space-x-3 items-center">
        {row.original.company === "MasterCard" && (
          <Icon icon="logos:mastercard" className="w-8 h-8 " />
        )}
        {row.original.company === "PayPal" && (
          <Icon icon="logos:paypal" className="w-8 h-8 " />
        )}
        {row.original.company === "Visa" && (
          <Icon icon="logos:visa" className="w-9 h-9 " />
        )}
        {row.original.company === "UnionPay" && (
          <Icon icon="logos:unionpay" className="w-8 h-8 " />
        )}
        <span>{row.original.card}</span>
      </span>
    ),
  },
  {
    header: "Price",
    cell: ({ row }) => <span>{row.original.price}</span>,
  },
];

const TransactionDetails: React.FC<TransactionDetailsProps> = ({
  visibleColumns = ["product", "date", "status", "invoice", "card", "price"],
}) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 6,
  });

  // Filter columns based on visibleColumns
  const filteredColumns = columns.filter((column, index) => {
    const columnNames = [
      "product",
      "date",
      "status",
      "invoice",
      "card",
      "price",
    ];
    return visibleColumns.includes(columnNames[index]);
  });

  const table = useReactTable({
    data,
    columns: filteredColumns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
  });

  return (
    <div className="w-full overflow-x-auto ">
      <Table className="overflow-hidden ">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="bg-default-200">
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="4xl:h-[65px] h-[75px]"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={filteredColumns.length}
                className="h-24 text-center"
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex items-center justify-center gap-2 flex-none py-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="w-8 h-8 border-transparent hover:bg-transparent"
        >
          <ChevronLeft className="w-5 h-5 text-default-900" />
        </Button>
        <span className="text-sm font-medium text-default-900">
          {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>
        <Button
          variant="outline"
          size="icon"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="w-8 h-8 border-transparent hover:bg-transparent"
        >
          <ChevronRight className="w-5 h-5 text-default-900" />
        </Button>
      </div>
    </div>
  );
};

export default TransactionDetails;
