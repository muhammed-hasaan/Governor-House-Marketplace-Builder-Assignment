"use client";

import { DataTable } from "@/components/data-table";
import { columns, type Customer } from "./columns";
import { CheckCircle, XCircle } from "lucide-react";

const clientColumns = [
  ...columns,
  {
    accessorKey: "isAdmin",
    header: "Admin Status",
    cell: ({
      // @ts-expect-error   (function (err : Error) {
      row,
    }) => (
      <div className="flex items-center">
        {row.getValue("isAdmin") ? (
          <CheckCircle className="h-4 w-4 text-green-500" />
        ) : (
          <XCircle className="h-4 w-4 text-red-500" />
        )}
      </div>
    ),
  },
];

interface ClientDataTableProps {
  data: Customer[];
}

export function ClientDataTable({ data }: ClientDataTableProps) {
  return <DataTable columns={clientColumns} data={data} />;
}
