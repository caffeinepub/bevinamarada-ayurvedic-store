import { AlertCircle, Package, Save, Upload, X } from "lucide-react";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { ExternalBlob } from "../backend";
import type { StockItem } from "../backend";
import { useActor } from "../hooks/useActor";
import { useAddStockItem, useUpdateStockItem } from "../hooks/useQueries";

export interface StockItemFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editItem?: StockItem;
}

const categories = [
  "Tablets",
  "Capsules",
  "Syrups",
  "Injections",
  "Topical",
  "Vitamins",
  "Supplements",
  "Ayurvedic",
  "Homeopathic",
  "Other",
];

export default function StockItemForm({
  open,
  onOpenChange,
  editItem,
}: StockItemFormProps) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Tablets");
  const [quantity, setQuantity] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [lowStockThreshold, setLowStockThreshold] = useState("10");
  const [expiryDate, setExpiryDate] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { actor, isFetching } = useActor();
  const addMutation = useAddStockItem();
  const updateMutation = useUpdateStockItem();

  useEffect(() => {
    if (open) {
      setSubmitError(null);
      if (editItem) {
        setName(editItem.name);
        setCategory(editItem.category);
        setQuantity(String(editItem.quantity));
        setUnitPrice(String(editItem.unitPrice));
        setLowStockThreshold(String(editItem.lowStockThreshold));
        setExpiryDate(
          editItem.expiryDate
            ? new Date(Number(editItem.expiryDate) / 1_000_000)
                .toISOString()
                .split("T")[0]
            : "",
        );
        setImagePreview(editItem.image ? editItem.image.getDirectURL() : null);
      } else {
        setName("");
        setCategory("Tablets");
        setQuantity("");
        setUnitPrice("");
        setLowStockThreshold("10");
        setExpiryDate("");
        setImagePreview(null);
      }
      setImageFile(null);
      setUploadProgress(0);
    }
  }, [open, editItem]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setImagePreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setSubmitError("Product name is required.");
      return;
    }

    setSubmitError(null);

    try {
      let imageBlob: ExternalBlob | null = null;
      if (imageFile) {
        const bytes = new Uint8Array(await imageFile.arrayBuffer());
        imageBlob = ExternalBlob.fromBytes(bytes).withUploadProgress((pct) =>
          setUploadProgress(pct),
        );
      } else if (editItem?.image) {
        imageBlob = editItem.image;
      }

      const expiryTimestamp = expiryDate
        ? BigInt(new Date(expiryDate).getTime()) * 1_000_000n
        : null;

      if (editItem) {
        await updateMutation.mutateAsync({
          id: editItem.id,
          name: name.trim(),
          category,
          quantity: BigInt(quantity || "0"),
          unitPrice: BigInt(unitPrice || "0"),
          lowStockThreshold: BigInt(lowStockThreshold || "10"),
          image: imageBlob,
          expiryDate: expiryTimestamp,
        });
      } else {
        await addMutation.mutateAsync({
          name: name.trim(),
          category,
          quantity: BigInt(quantity || "0"),
          unitPrice: BigInt(unitPrice || "0"),
          lowStockThreshold: BigInt(lowStockThreshold || "10"),
          image: imageBlob,
          expiryDate: expiryTimestamp,
        });
      }
      onOpenChange(false);
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to save item. Please try again.";
      setSubmitError(message);
    }
  };

  const isLoading = addMutation.isPending || updateMutation.isPending;
  const isBackendReady = !!actor && !isFetching;

  const inputClass =
    "w-full px-3.5 py-2.5 rounded-xl text-foreground placeholder:text-muted-foreground/50 text-sm transition-all neon-input";
  const inputStyle = {
    background: "oklch(0.18 0.01 250)",
    border: "1px solid oklch(0.22 0.015 250)",
  };
  const labelClass = "block text-sm font-semibold text-foreground mb-1.5";

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 backdrop-blur-sm"
        style={{ background: "oklch(0 0 0 / 0.7)" }}
        role="button"
        tabIndex={0}
        aria-label="Close dialog"
        onClick={() => {
          if (!isLoading) onOpenChange(false);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            if (!isLoading) onOpenChange(false);
          }
        }}
      />

      {/* Dialog */}
      <div
        className="relative rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-modal"
        style={{
          background: "oklch(0.14 0.008 250)",
          border: "1px solid oklch(0.22 0.015 250)",
        }}
        data-ocid="stock.dialog"
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4 sticky top-0 z-10"
          style={{
            background: "oklch(0.14 0.008 250)",
            borderBottom: "1px solid oklch(0.22 0.015 250)",
          }}
        >
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "oklch(0.75 0.22 150 / 0.12)" }}
            >
              <Package className="w-4 h-4 text-primary" />
            </div>
            <h2 className="text-lg font-bold text-foreground font-heading">
              {editItem ? "Edit Stock Item" : "Add New Item"}
            </h2>
          </div>
          <button
            type="button"
            onClick={() => {
              if (!isLoading) onOpenChange(false);
            }}
            disabled={isLoading}
            data-ocid="stock.close_button"
            className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-colors disabled:opacity-50"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Backend connecting notice */}
        {!isBackendReady && (
          <div
            className="mx-6 mt-4 flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-sm font-medium"
            style={{
              background: "oklch(0.72 0.18 200 / 0.08)",
              border: "1px solid oklch(0.72 0.18 200 / 0.2)",
              color: "oklch(0.72 0.18 200)",
            }}
          >
            <div
              className="w-3.5 h-3.5 rounded-full border border-t-transparent animate-spin"
              style={{
                borderColor: "oklch(0.72 0.18 200 / 0.4)",
                borderTopColor: "oklch(0.72 0.18 200)",
              }}
            />
            Connecting to backend...
          </div>
        )}

        {/* Submit error */}
        {submitError && (
          <div
            data-ocid="stock.error_state"
            className="mx-6 mt-4 flex items-start gap-2.5 px-3.5 py-3 rounded-xl text-sm font-medium"
            style={{
              background: "oklch(0.62 0.22 25 / 0.1)",
              border: "1px solid oklch(0.62 0.22 25 / 0.3)",
            }}
          >
            <AlertCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
            <p className="text-destructive">{submitError}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Image Upload */}
          <div>
            <label htmlFor="product-image" className={labelClass}>
              Product Image
            </label>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              data-ocid="stock.upload_button"
              className="w-full rounded-xl p-4 text-center cursor-pointer transition-all"
              style={{
                border: "2px dashed oklch(0.22 0.015 250)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor =
                  "oklch(0.75 0.22 150 / 0.5)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor =
                  "oklch(0.22 0.015 250)";
              }}
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-24 h-24 object-cover rounded-xl mx-auto"
                />
              ) : (
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <Upload className="w-8 h-8 opacity-40" />
                  <p className="text-sm font-medium">Click to upload image</p>
                  <p className="text-xs opacity-60">PNG, JPG up to 5MB</p>
                </div>
              )}
            </button>
            <input
              id="product-image"
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            {uploadProgress > 0 && uploadProgress < 100 && (
              <div className="mt-2">
                <div
                  className="h-1.5 rounded-full overflow-hidden"
                  style={{ background: "oklch(0.22 0.015 250)" }}
                >
                  <div
                    className="h-full bg-primary rounded-full transition-all"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {uploadProgress}% uploaded
                </p>
              </div>
            )}
          </div>

          {/* Name */}
          <div>
            <label htmlFor="product-name" className={labelClass}>
              Product Name *
            </label>
            <input
              id="product-name"
              data-ocid="stock.name.input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Ashwagandha Capsules"
              required
              className={inputClass}
              style={inputStyle}
            />
          </div>

          {/* Category */}
          <div>
            <label htmlFor="product-category" className={labelClass}>
              Category
            </label>
            <select
              id="product-category"
              data-ocid="stock.category.select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={inputClass}
              style={inputStyle}
            >
              {categories.map((cat) => (
                <option
                  key={cat}
                  value={cat}
                  style={{ background: "oklch(0.14 0.008 250)" }}
                >
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Quantity & Price */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="product-quantity" className={labelClass}>
                Quantity
              </label>
              <input
                id="product-quantity"
                data-ocid="stock.quantity.input"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="0"
                min="0"
                className={inputClass}
                style={inputStyle}
              />
            </div>
            <div>
              <label htmlFor="product-price" className={labelClass}>
                Unit Price (₹)
              </label>
              <input
                id="product-price"
                data-ocid="stock.price.input"
                type="number"
                value={unitPrice}
                onChange={(e) => setUnitPrice(e.target.value)}
                placeholder="0"
                min="0"
                className={inputClass}
                style={inputStyle}
              />
            </div>
          </div>

          {/* Low Stock Threshold */}
          <div>
            <label htmlFor="product-threshold" className={labelClass}>
              Low Stock Threshold
            </label>
            <input
              id="product-threshold"
              data-ocid="stock.threshold.input"
              type="number"
              value={lowStockThreshold}
              onChange={(e) => setLowStockThreshold(e.target.value)}
              placeholder="10"
              min="0"
              className={inputClass}
              style={inputStyle}
            />
          </div>

          {/* Expiry Date */}
          <div>
            <label htmlFor="product-expiry" className={labelClass}>
              Expiry Date
            </label>
            <input
              id="product-expiry"
              data-ocid="stock.expiry.input"
              type="date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              className={inputClass}
              style={{
                ...inputStyle,
                colorScheme: "dark",
              }}
            />
          </div>

          {/* Footer */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                if (!isLoading) onOpenChange(false);
              }}
              disabled={isLoading}
              data-ocid="stock.cancel_button"
              className="flex-1 px-4 py-2.5 text-foreground font-semibold rounded-xl hover:bg-muted transition-colors text-sm disabled:opacity-50 h-11"
              style={{ border: "1px solid oklch(0.22 0.015 250)" }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || !isBackendReady}
              data-ocid="stock.submit_button"
              className="flex-1 px-4 py-2.5 bg-primary text-primary-foreground font-semibold rounded-xl text-sm flex items-center justify-center gap-2 disabled:opacity-60 h-11 neon-btn"
            >
              {isLoading ? (
                <>
                  <div
                    className="w-4 h-4 border-2 rounded-full animate-spin"
                    style={{
                      borderColor: "oklch(0.09 0.005 250 / 0.3)",
                      borderTopColor: "oklch(0.09 0.005 250)",
                    }}
                  />
                  {uploadProgress > 0
                    ? `Uploading ${uploadProgress}%`
                    : "Saving..."}
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  {editItem ? "Save Changes" : "Add Item"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
