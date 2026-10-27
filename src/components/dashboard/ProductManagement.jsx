import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Layers, 
  ArrowUpDown,
  Eye
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatPrice } from '../../utils/formatters';

export const ProductManagement = () => {
  const {
    products,
    deleteProduct,
    updateStock,
    setEditingProduct,
    setIsAddProductModalOpen,
    setSelectedProductForDetail,
    currency
  } = useStore();

  const [searchFilter, setSearchFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredProducts = products.filter((prod) => {
    const matchSearch =
      prod.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      prod.brand.toLowerCase().includes(searchFilter.toLowerCase()) ||
      (prod.sku && prod.sku.toLowerCase().includes(searchFilter.toLowerCase()));
    const matchCat = categoryFilter === 'all' || prod.category === categoryFilter;
    return matchSearch && matchCat;
  });

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsAddProductModalOpen(true);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to remove "${name}" from Soft-Dew?`)) {
      deleteProduct(id);
    }
  };

  return (
    <div className="product-management-wrapper animate-fade-in">
      {/* Top Controls Bar */}
      <div className="table-controls-bar">
        <div className="search-filter-pair">
          <div className="table-search-box">
            <Search size={16} className="text-slate-400" />
            <input
              type="text"
              placeholder="Filter by name, brand, or SKU..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="table-search-input"
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="table-cat-select"
          >
            <option value="all">All Categories ({products.length})</option>
            <option value="skincare">Skincare</option>
            <option value="haircare">Salon Hair Care</option>
            <option value="makeup">Luxury Makeup</option>
            <option value="salon-tools">Pro Salon Tools</option>
            <option value="spa-bath">Spa & Bath</option>
            <option value="nail-studio">Nail Studio</option>
          </select>
        </div>

        <button
          onClick={() => {
            setEditingProduct(null);
            setIsAddProductModalOpen(true);
          }}
          className="btn btn-primary btn-sm"
        >
          <Plus size={16} />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Products Table (Desktop) & Cards (Mobile) */}
      <div className="table-card">
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock Control</th>
                <th>Status</th>
                <th>Authenticity Seal</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-slate-500">
                    No beauty items found matching your filters.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => {
                  const isLowStock = (p.stock || 0) <= 10;
                  const isOutOfStock = (p.stock || 0) <= 0;

                  return (
                    <tr key={p.id}>
                      {/* Product Column */}
                      <td>
                        <div className="table-prod-cell">
                          <img src={p.image} alt={p.name} className="table-prod-img" />
                          <div>
                            <span className="table-prod-brand">{p.brand}</span>
                            <h5 className="table-prod-name">{p.name}</h5>
                            <span className="table-prod-sku">SKU: {p.sku}</span>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td>
                        <span className="cat-chip">{p.category}</span>
                      </td>

                      {/* Price */}
                      <td>
                        <div className="price-cell">
                          <strong>{formatPrice(p.discountPrice || p.price, currency)}</strong>
                          {p.discountPrice && (
                            <span className="line-through text-xs text-slate-400 block">
                              {formatPrice(p.price, currency)}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Stock Stepper */}
                      <td>
                        <div className="inline-stock-stepper">
                          <button
                            onClick={() => updateStock(p.id, -1)}
                            className="stock-btn"
                            title="Decrease stock"
                          >
                            -
                          </button>
                          <span className={`stock-val ${isLowStock ? 'text-rose-600 font-bold' : ''}`}>
                            {p.stock || 0}
                          </span>
                          <button
                            onClick={() => updateStock(p.id, 1)}
                            className="stock-btn"
                            title="Increase stock"
                          >
                            +
                          </button>
                        </div>
                      </td>

                      {/* Stock Status Badge */}
                      <td>
                        {isOutOfStock ? (
                          <span className="stock-status-pill out">Out of Stock</span>
                        ) : isLowStock ? (
                          <span className="stock-status-pill low">
                            <AlertTriangle size={11} className="inline mr-1" />
                            Low ({p.stock})
                          </span>
                        ) : (
                          <span className="stock-status-pill in">
                            <CheckCircle2 size={11} className="inline mr-1" />
                            Available
                          </span>
                        )}
                      </td>

                      {/* Authenticity Seal */}
                      <td>
                        <span className="auth-seal-pill">
                          <ShieldCheck size={12} className="inline mr-1 text-emerald" />
                          {p.badge || 'Verified'}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="text-right">
                        <div className="table-actions-row">
                          <button
                            onClick={() => setSelectedProductForDetail(p)}
                            className="tbl-action-btn view"
                            title="Preview customer view"
                          >
                            <Eye size={15} />
                          </button>
                          <button
                            onClick={() => handleEdit(p)}
                            className="tbl-action-btn edit"
                            title="Edit product"
                          >
                            <Edit3 size={15} />
                          </button>
                          <button
                            onClick={() => handleDelete(p.id, p.name)}
                            className="tbl-action-btn delete"
                            title="Delete product"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
