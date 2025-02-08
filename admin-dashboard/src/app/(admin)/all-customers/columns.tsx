import type { ColumnDef } from "@tanstack/react-table";

export type Customer = {
  _id: string;
  clerkId: string;
  fullName: string;
  email: string;
  isAdmin: boolean;
};

export const columns: ColumnDef<Customer>[] = [
  {
    accessorKey: "fullName",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "clerkId",
    header: "Clerk ID",
  },
  {
    accessorKey: "isAdmin",
    header: "Admin Status",
  },
];
