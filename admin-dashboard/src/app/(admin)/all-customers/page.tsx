import { client } from "@/lib/client";
import { ClientDataTable } from "./client-data-table";

const AllCustomer = async () => {
  const customers = await client.fetch(`*[_type == "customer"]{
    _id,
    clerkId,
    fullName,
    email,
    isAdmin
  }`);

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <h1 className="text-3xl font-bold mb-6">All Customers</h1>
      <ClientDataTable data={customers} />
    </div>
  );
};

export default AllCustomer;
