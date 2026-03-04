import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Edit,
  Plus,
  Search,
  ShoppingCart,
  Trash2,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";
import type { StockItem } from "../backend";
import StockItemForm from "../components/StockItemForm";
import {
  useDeleteStockItem,
  useGetAllStockItems,
  useMarkTrending,
} from "../hooks/useQueries";

export default function ProductManagement() {
  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editItem, setEditItem] = useState<StockItem | undefined>(undefined);

  const { data: stockItems = [], isLoading } = useGetAllStockItems();
  const deleteItem = useDeleteStockItem();
  const markTrending = useMarkTrending();

  const filtered = stockItems.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase()),
  );

  const cardStyle = {
    background: "oklch(0.14 0.008 250)",
    border: "1px solid oklch(0.22 0.015 250)",
  };

  return (
    <div className="p-6 lg:p-8 page-enter">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link
              to="/admin"
              data-ocid="products.back.link"
              className="p-1.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "oklch(0.75 0.18 72 / 0.12)" }}
            >
              <ShoppingCart
                className="w-4 h-4"
                style={{ color: "oklch(0.75 0.18 72)" }}
              />
            </div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              Products
            </h1>
          </div>
          <p className="text-muted-foreground text-sm pl-1">
            {stockItems.length} products in catalog
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setEditItem(undefined);
            setFormOpen(true);
          }}
          data-ocid="products.primary_button"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground font-semibold rounded-xl text-sm h-11 neon-btn"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          data-ocid="products.search_input"
          className="w-full pl-10 pr-4 py-2.5 rounded-xl text-foreground placeholder:text-muted-foreground/50 text-sm transition-all neon-input"
          style={{
            background: "oklch(0.14 0.008 250)",
            border: "1px solid oklch(0.22 0.015 250)",
          }}
        />
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="space-y-3" data-ocid="products.loading_state">
          {["a", "b", "c", "d", "e"].map((k) => (
            <div
              key={`skeleton-${k}`}
              className="h-14 rounded-xl bg-muted animate-pulse"
            />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div
          className="text-center py-16 rounded-xl shadow-card"
          style={cardStyle}
          data-ocid="products.empty_state"
        >
          <ShoppingCart className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-foreground font-semibold">No products found</p>
          <p className="text-muted-foreground text-sm mt-1">
            Add your first product to get started
          </p>
        </div>
      ) : (
        <div
          className="rounded-xl overflow-hidden shadow-card"
          style={cardStyle}
        >
          <div className="overflow-x-auto">
            <table className="w-full" data-ocid="products.table">
              <thead>
                <tr
                  style={{
                    background: "oklch(0.18 0.01 250 / 0.5)",
                    borderBottom: "1px solid oklch(0.22 0.015 250)",
                  }}
                >
                  <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Product
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden sm:table-cell">
                    Category
                  </th>
                  <th className="text-right py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Price
                  </th>
                  <th className="text-right py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">
                    Stock
                  </th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Trending
                  </th>
                  <th className="text-right py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item, idx) => (
                  <tr
                    key={item.id.toString()}
                    className="transition-colors group"
                    style={{
                      borderBottom: "1px solid oklch(0.22 0.015 250 / 0.5)",
                    }}
                    data-ocid={`products.item.${idx + 1}`}
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
                    <td className="py-4 px-4">
                      <p className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors">
                        {item.name}
                      </p>
                    </td>
                    <td className="py-4 px-4 hidden sm:table-cell">
                      <span
                        className="text-xs font-medium px-2.5 py-1 rounded-full"
                        style={{
                          background: "oklch(0.18 0.01 250)",
                          color: "oklch(0.55 0.02 250)",
                          border: "1px solid oklch(0.22 0.015 250)",
                        }}
                      >
                        {item.category}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span className="font-semibold text-sm text-primary">
                        ₹{Number(item.unitPrice).toLocaleString("en-IN")}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right hidden md:table-cell">
                      <span
                        className="font-semibold text-sm"
                        style={{
                          color: item.isLowStock
                            ? "oklch(0.75 0.18 72)"
                            : "oklch(0.94 0.01 250)",
                        }}
                      >
                        {item.quantity.toString()}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <button
                        type="button"
                        onClick={() =>
                          markTrending.mutate({
                            id: item.id,
                            isTrending: !item.isTrending,
                          })
                        }
                        disabled={markTrending.isPending}
                        data-ocid={`products.trending.toggle.${idx + 1}`}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold transition-all"
                        style={
                          item.isTrending
                            ? {
                                background: "oklch(0.72 0.18 200 / 0.12)",
                                color: "oklch(0.72 0.18 200)",
                                border: "1px solid oklch(0.72 0.18 200 / 0.25)",
                              }
                            : {
                                background: "transparent",
                                color: "oklch(0.55 0.02 250)",
                                border: "1px solid oklch(0.22 0.015 250)",
                              }
                        }
                      >
                        <TrendingUp className="w-3 h-3" />
                        {item.isTrending ? "Yes" : "No"}
                      </button>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => {
                            setEditItem(item);
                            setFormOpen(true);
                          }}
                          title="Edit"
                          data-ocid={`products.edit_button.${idx + 1}`}
                          className="p-1.5 rounded-lg transition-all"
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
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm(`Delete "${item.name}"?`)) {
                              deleteItem.mutate(item.id);
                            }
                          }}
                          disabled={deleteItem.isPending}
                          title="Delete"
                          data-ocid={`products.delete_button.${idx + 1}`}
                          className="p-1.5 text-destructive rounded-lg transition-all disabled:opacity-30"
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
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

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
