"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AddProductDialog } from "@/components/add-product-dialog";

export function AddProductButton() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsDialogOpen(true)}>Add Product</Button>
      {isDialogOpen && (
        <AddProductDialog onClose={() => setIsDialogOpen(false)} />
      )}
    </>
  );
}
