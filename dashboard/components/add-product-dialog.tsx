"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addProduct, getCategories, uploadImage } from "@/lib/product";

export function AddProductDialog({ onClose }: any) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [tags, setTags] = useState("");
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState("");
  const [height, setHeight] = useState("");
  const [width, setWidth] = useState("");
  const [depth, setDepth] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    const fetchedCategories = await getCategories();
    setCategories(fetchedCategories);
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    let imageAssetId = null;
    if (imageFile) {
      const asset = await uploadImage(imageFile);
      imageAssetId = asset._id;
    }
    await addProduct({
      name,
      category,
      price: Number.parseFloat(price),
      quantity: Number.parseInt(quantity),
      imageAssetId,
      tags: tags.split(",").map((tag) => tag.trim()),
      description,
      features: features.split("\n").filter((feature) => feature.trim() !== ""),
      dimensions: { height, width, depth },
    });
    onClose();
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Select onValueChange={setCategory} required>
            <SelectTrigger>
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat: any) => (
                <SelectItem key={cat._id} value={cat._id}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <Input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
          <Input
            type="file"
            // @ts-expect-error input placeholder=" Quantity" placeholder
            onChange={(e) => setImageFile(e.target.files[0])}
          />
          <Input
            placeholder="Tags (comma-separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
          <Textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Textarea
            placeholder="Features (one per line)"
            value={features}
            onChange={(e) => setFeatures(e.target.value)}
          />
          <div className="grid grid-cols-3 gap-4">
            <Input
              placeholder="Height"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
            <Input
              placeholder="Width"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
            />
            <Input
              placeholder="Depth"
              value={depth}
              onChange={(e) => setDepth(e.target.value)}
            />
          </div>
          <Button type="submit">Add Product</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
