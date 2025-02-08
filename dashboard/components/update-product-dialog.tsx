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
import { updateProduct, getCategories, uploadImage } from "@/lib/product";

export function UpdateProductDialog({ product, onClose, onUpdate }: any) {
  const [name, setName] = useState(product.name);
  const [category, setCategory] = useState(product.category);
  const [price, setPrice] = useState(product.price.toString());
  const [quantity, setQuantity] = useState(product.quantity.toString());
  const [imageFile, setImageFile] = useState(null);
  const [tags, setTags] = useState(product.tags.join(", "));
  const [description, setDescription] = useState(product.description || "");
  const [features, setFeatures] = useState(product.features.join("\n"));
  const [height, setHeight] = useState(product.dimensions.height);
  const [width, setWidth] = useState(product.dimensions.width);
  const [depth, setDepth] = useState(product.dimensions.depth);
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
    let imageAssetId = product.image?.asset?._ref;
    if (imageFile) {
      const asset = await uploadImage(imageFile);
      imageAssetId = asset._id;
    }
    await updateProduct(product._id, {
      name,
      category,
      price: Number.parseFloat(price),
      quantity: Number.parseInt(quantity),
      imageAssetId,
      tags: tags.split(",").map((tag: any) => tag.trim()),
      description,
      features: features
        .split("\n")
        .filter((feature: any) => feature.trim() !== ""),
      dimensions: { height, width, depth },
    });
    onUpdate();
    onClose();
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Update Product</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Select onValueChange={setCategory} defaultValue={category}>
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
            // @ts-expect-error "Please provide a file
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
          <Button type="submit">Update Product</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
