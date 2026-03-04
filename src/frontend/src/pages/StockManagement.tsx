import {
  AlertTriangle,
  Edit,
  Package,
  Plus,
  Search,
  ShoppingCart,
  Trash2,
  TrendingUp,
} from "lucide-react";
import React, { useState } from "react";
import type { StockItem } from "../backend";
import StockItemForm from "../components/StockItemForm";
import {
  useAddSale,
  useDeleteStockItem,
  useGetAllStockItems,
  useMarkTrending,
} from "../hooks/useQueries";

type FilterTab = "all" | "low-stock" | "trending" | "out-of-stock";

export default function StockManagement() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [formOpen, setFormOpen] = useState(false);
  const [editItem, setEditItem] = useState<StockItem | undefined>(undefined);

  const { data: stockItems = [], isLoading } = useGetAllStockItems();
  const deleteMutation = useDeleteStockItem();
  const saleMutation = useAddSale();
  const trendingMutation = useMarkTrending();

  const filtered = stockItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase());
    if (!matchesSearch) return false;
    if (activeTab === "low-stock") return item.isLowStock;
    if (activeTab === "trending") return item.isTrending;
    if (activeTab === "out-of-stock") return Number(item.quantity) === 0;
    return true;
  });

  const tabs: { key: FilterTab; label: string; count: number }[] = [
    { key: "all", label: "All Items", count: stockItems.length },
    {
      key: "low-stock",
      label: "Low Stock",
      count: stockItems.filter((i) => i.isLowStock).length,
    },
    {
      key: "trending",
      label: "Trending",
      count: stockItems.filter((i) => i.isTrending).length,
    },
    {
      key: "out-of-stock",
      label: "Out of Stock",
      count: stockItems.filter((i) => Number(i.quantity) === 0).length,
    },
  ];

  const handleEdit = (item: StockItem) => {
    setEditItem(item);
    setFormOpen(true);
  };

  const handleAdd = () => {
    setEditItem(undefined);
    setFormOpen(true);
  };

  const handleDelete = (id: bigint) => {
    if (confirm("Are you sure you want to delete this item?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleSale = (item: StockItem) => {
    const qty = prompt(
      `Enter quantity to sell for "${item.name}" (available: ${item.quantity}):`,
    );
    if (!qty) return;
    const quantity = Number.parseInt(qty);
    if (Number.isNaN(quantity) || quantity <= 0)
      return alert("Invalid quantity");
    if (quantity > Number(item.quantity)) return alert("Insufficient stock");
    saleMutation.mutate({ stockItemId: item.id, quantity: BigInt(quantity) });
  };

  return (
    <div className="p-6 lg:p-8 page-enter">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground font-display">
            Stock Management
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Manage your pharmaceutical inventory
          </p>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          data-ocid="stock.primary_button"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground font-semibold rounded-xl text-sm h-11 neon-btn"
        >
          <Plus className="w-4 h-4" />
          Add Item
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-5">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            data-ocid={`stock.${tab.key}.tab`}
            className="px-4 py-2 rounded-xl text-sm font-semibold transition-all"
            style={
              activeTab === tab.key
                ? {
                    background: "oklch(0.75 0.22 150)",
                    color: "oklch(0.09 0.005 250)",
                    boxShadow: "0 0 8px oklch(0.75 0.22 150 / 0.3)",
                  }
                : {
                    background: "oklch(0.14 0.008 250)",
                    color: "oklch(0.94 0.01 250)",
                    border: "1px solid oklch(0.22 0.015 250)",
                  }
            }
          >
            {tab.label}
            <span
              className="ml-2 px-1.5 py-0.5 rounded-full text-xs font-medium"
              style={
                activeTab === tab.key
                  ? {
                      background: "oklch(0 0 0 / 0.2)",
                      color: "oklch(0.09 0.005 250)",
                    }
                  : {
                      background: "oklch(0.18 0.01 250)",
                      color: "oklch(0.55 0.02 250)",
                    }
              }
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search by name or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          data-ocid="stock.search_input"
          className="w-full pl-10 pr-4 py-2.5 rounded-xl text-foreground placeholder:text-muted-foreground/50 text-sm transition-all neon-input"
          style={{
            background: "oklch(0.14 0.008 250)",
            border: "1px solid oklch(0.22 0.015 250)",
          }}
        />
      </div>

      {/* Table */}
      <div
        className="rounded-xl overflow-hidden shadow-card"
        style={{
          background: "oklch(0.14 0.008 250)",
          border: "1px solid oklch(0.22 0.015 250)",
        }}
      >
        {isLoading ? (
          <div
            className="flex items-center justify-center py-16"
            data-ocid="stock.loading_state"
          >
            <div
              className="w-8 h-8 border-2 rounded-full animate-spin"
              style={{
                borderColor: "oklch(0.22 0.015 250)",
                borderTopColor: "oklch(0.75 0.22 150)",
              }}
            />
          </div>
        ) : filtered.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-16 text-muted-foreground"
            data-ocid="stock.empty_state"
          >
            <Package className="w-12 h-12 mb-3 opacity-30" />
            <p className="font-semibold text-foreground">No items found</p>
            <p className="text-sm mt-1">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full" data-ocid="stock.table">
              <thead>
                <tr
                  style={{
                    background: "oklch(0.18 0.01 250 / 0.5)",
                    borderBottom: "1px solid oklch(0.22 0.015 250)",
                  }}
                >
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Product
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Category
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Qty
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Price
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item, idx) => (
                  <tr
                    key={String(item.id)}
                    className="transition-colors"
                    style={{
                      borderBottom: "1px solid oklch(0.22 0.015 250 / 0.5)",
                    }}
                    data-ocid={`stock.item.${idx + 1}`}
                    onMouseEnter={(e) => {
                      (
                        e.currentTarget as HTMLTableRowElement
                      ).style.background = "oklch(0.18 0.01 250 / 0.4)";
                    }}
                    onMouseLeave={(e) => {
                      (
                        e.currentTarget as HTMLTableRowElement
                      ).style.background = "";
                    }}
                  >
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        {item.image ? (
                          <img
                            src={item.image.getDirectURL()}
                            alt={item.name}
                            className="w-9 h-9 rounded-lg object-cover"
                            style={{
                              border: "1px solid oklch(0.22 0.015 250)",
                            }}
                          />
                        ) : (
                          <div
                            className="w-9 h-9 rounded-lg flex items-center justify-center"
                            style={{ background: "oklch(0.75 0.22 150 / 0.1)" }}
                          >
                            <Package className="w-4 h-4 text-primary" />
                          </div>
                        )}
                        <div>
                          <p className="font-semibold text-foreground text-sm">
                            {item.name}
                          </p>
                          {item.isTrending && (
                            <span
                              className="inline-flex items-center gap-1 text-xs font-medium"
                              style={{ color: "oklch(0.72 0.18 200)" }}
                            >
                              <TrendingUp className="w-3 h-3" /> Trending
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-muted-foreground">
                      {item.category}
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className="text-sm font-semibold"
                        style={{
                          color:
                            Number(item.quantity) === 0
                              ? "oklch(0.62 0.22 25)"
                              : item.isLowStock
                                ? "oklch(0.75 0.18 72)"
                                : "oklch(0.94 0.01 250)",
                        }}
                      >
                        {String(item.quantity)}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm font-semibold text-foreground">
                      ₹{Number(item.unitPrice).toLocaleString("en-IN")}
                    </td>
                    <td className="px-4 py-4">
                      {Number(item.quantity) === 0 ? (
                        <span
                          className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold"
                          style={{
                            background: "oklch(0.62 0.22 25 / 0.12)",
                            color: "oklch(0.62 0.22 25)",
                            border: "1px solid oklch(0.62 0.22 25 / 0.2)",
                          }}
                        >
                          Out of Stock
                        </span>
                      ) : item.isLowStock ? (
                        <span
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold"
                          style={{
                            background: "oklch(0.75 0.18 72 / 0.12)",
                            color: "oklch(0.75 0.18 72)",
                            border: "1px solid oklch(0.75 0.18 72 / 0.25)",
                          }}
                        >
                          <AlertTriangle className="w-3 h-3" /> Low Stock
                        </span>
                      ) : (
                        <span
                          className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold"
                          style={{
                            background: "oklch(0.75 0.22 150 / 0.12)",
                            color: "oklch(0.75 0.22 150)",
                            border: "1px solid oklch(0.75 0.22 150 / 0.2)",
                          }}
                        >
                          In Stock
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => handleSale(item)}
                          disabled={Number(item.quantity) === 0}
                          title="Record Sale"
                          data-ocid={`stock.sale.button.${idx + 1}`}
                          className="p-1.5 rounded-lg text-primary transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                          style={{}}
                          onMouseEnter={(e) => {
                            (
                              e.currentTarget as HTMLButtonElement
                            ).style.background = "oklch(0.75 0.22 150 / 0.1)";
                          }}
                          onMouseLeave={(e) => {
                            (
                              e.currentTarget as HTMLButtonElement
                            ).style.background = "";
                          }}
                        >
                          <ShoppingCart className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            trendingMutation.mutate({
                              id: item.id,
                              isTrending: !item.isTrending,
                            })
                          }
                          title={
                            item.isTrending
                              ? "Remove Trending"
                              : "Mark Trending"
                          }
                          data-ocid={`stock.trending.toggle.${idx + 1}`}
                          className="p-1.5 rounded-lg transition-colors"
                          style={
                            item.isTrending
                              ? {
                                  color: "oklch(0.72 0.18 200)",
                                  background: "oklch(0.72 0.18 200 / 0.1)",
                                }
                              : {}
                          }
                          onMouseEnter={(e) => {
                            if (!item.isTrending)
                              (
                                e.currentTarget as HTMLButtonElement
                              ).style.background = "oklch(0.18 0.01 250)";
                          }}
                          onMouseLeave={(e) => {
                            if (!item.isTrending)
                              (
                                e.currentTarget as HTMLButtonElement
                              ).style.background = "";
                          }}
                        >
                          <TrendingUp
                            className="w-4 h-4"
                            style={
                              item.isTrending
                                ? { color: "oklch(0.72 0.18 200)" }
                                : { color: "oklch(0.55 0.02 250)" }
                            }
                          />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleEdit(item)}
                          title="Edit"
                          data-ocid={`stock.edit_button.${idx + 1}`}
                          className="p-1.5 rounded-lg transition-colors"
                          style={{ color: "oklch(0.72 0.18 200)" }}
                          onMouseEnter={(e) => {
                            (
                              e.currentTarget as HTMLButtonElement
                            ).style.background = "oklch(0.72 0.18 200 / 0.1)";
                          }}
                          onMouseLeave={(e) => {
                            (
                              e.currentTarget as HTMLButtonElement
                            ).style.background = "";
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(item.id)}
                          title="Delete"
                          data-ocid={`stock.delete_button.${idx + 1}`}
                          className="p-1.5 rounded-lg text-destructive transition-colors"
                          onMouseEnter={(e) => {
                            (
                              e.currentTarget as HTMLButtonElement
                            ).style.background = "oklch(0.62 0.22 25 / 0.1)";
                          }}
                          onMouseLeave={(e) => {
                            (
                              e.currentTarget as HTMLButtonElement
                            ).style.background = "";
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Stock Item Form Dialog */}
      <StockItemForm
        open={formOpen}
        onOpenChange={(open) => {
          setFormOpen(open);
          if (!open) setEditItem(undefined);
        }}
        editItem={editItem}
      />
    </div>
  );
}
