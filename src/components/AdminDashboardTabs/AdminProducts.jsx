import React, { useState, useEffect } from 'react';
import '../../CSS/AdminDashboard/AdminProducts.css';

const PRODUCTS_PER_PAGE = 5; // adjust as needed

const AdminProducts = () => {
  const [products, setProducts] = useState(() => {
    return JSON.parse(localStorage.getItem('products')) || [];
  });

  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
    image: null, // image file or base64 string
  });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Sorting: 'name', 'price', 'category' or ''
  const [sortKey, setSortKey] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); // asc or desc

  // Bulk delete selected product ids
  const [selectedIds, setSelectedIds] = useState([]);

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  // Handle input changes including file upload
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      const file = files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setForm((prev) => ({ ...prev, image: reader.result }));
        };
        reader.readAsDataURL(file);
      }
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Add or update product
  const handleAddProduct = (e) => {
    e.preventDefault();

    if (!form.name || !form.category || !form.price) {
      alert('Please fill in all required fields (name, category, price)');
      return;
    }

    if (editId) {
      // Update existing
      const updatedProducts = products.map((p) =>
        p.id === editId
          ? {
              ...p,
              ...form,
              price: parseFloat(form.price),
            }
          : p
      );
      setProducts(updatedProducts);
      localStorage.setItem('products', JSON.stringify(updatedProducts));
      setEditId(null);
    } else {
      // Add new
      const newProduct = {
        id: Date.now(),
        name: form.name.trim(),
        category: form.category.trim(),
        price: parseFloat(form.price),
        description: form.description.trim(),
        image: form.image || null,
      };
      const updatedProducts = [...products, newProduct];
      setProducts(updatedProducts);
      localStorage.setItem('products', JSON.stringify(updatedProducts));
    }

    setForm({ name: '', category: '', price: '', description: '', image: null });
    setCurrentPage(1); // reset page to 1 after add/update
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const filtered = products.filter((p) => p.id !== id);
      setProducts(filtered);
      localStorage.setItem('products', JSON.stringify(filtered));
      setSelectedIds((prev) => prev.filter((sid) => sid !== id));
    }
  };

  // Bulk delete selected
  const handleBulkDelete = () => {
    if (selectedIds.length === 0) {
      alert('Please select at least one product to delete');
      return;
    }
    if (window.confirm(`Delete ${selectedIds.length} selected product(s)?`)) {
      const filtered = products.filter((p) => !selectedIds.includes(p.id));
      setProducts(filtered);
      localStorage.setItem('products', JSON.stringify(filtered));
      setSelectedIds([]);
    }
  };

  const handleEdit = (id) => {
    const productToEdit = products.find((p) => p.id === id);
    if (!productToEdit) return;

    setForm({
      name: productToEdit.name,
      category: productToEdit.category,
      price: productToEdit.price.toString(),
      description: productToEdit.description || '',
      image: productToEdit.image || null,
    });
    setEditId(id);
  };

  // Sorting handler
  const handleSort = (key) => {
    if (sortKey === key) {
      // Toggle order
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  // Filtered and sorted products
  const filteredProducts = products
    .filter((product) => {
      const matchesName = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = product.category.toLowerCase().includes(categoryFilter.toLowerCase());
      return matchesName && matchesCategory;
    })
    .sort((a, b) => {
      if (!sortKey) return 0;
      let valA = a[sortKey];
      let valB = b[sortKey];
      if (typeof valA === 'string') valA = valA.toLowerCase();
      if (typeof valB === 'string') valB = valB.toLowerCase();
      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

  // Pagination calculation
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  // Select/Deselect product checkbox
  const toggleSelect = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((sid) => sid !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  // Select/Deselect all visible products
  const toggleSelectAll = () => {
    const visibleIds = paginatedProducts.map((p) => p.id);
    const allSelected = visibleIds.every((id) => selectedIds.includes(id));
    if (allSelected) {
      // Unselect all
      setSelectedIds(selectedIds.filter((id) => !visibleIds.includes(id)));
    } else {
      // Select all visible
      setSelectedIds([...new Set([...selectedIds, ...visibleIds])]);
    }
  };

  return (
    <div className="admin-products-tab">
      <h1>Manage Products</h1>

      {/* Filters */}
      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search by product name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        {/* <input
          type="text"
          placeholder="Filter by category..."
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="category-input"
        /> */}
      </div>

      {/* Product form */}
      <form className="product-form" onSubmit={handleAddProduct}>
        <input
          type="text"
          name="name"
          placeholder="Product Name *"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category *"
          value={form.category}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price ($) *"
          value={form.price}
          onChange={handleChange}
          min="0"
          step="0.01"
          required
        />
        <input
          type="file"
          accept="image/*"
          name="image"
          onChange={handleChange}
          style={{ marginTop: '0.5rem' }}
        />
        {form.image && (
          <div className="preview-image">
            <img src={form.image} alt="Preview" />
          </div>
        )}

        <button type="submit">{editId ? 'Update Product' : 'Add Product'}</button>
        {editId && (
          <button
            type="button"
            onClick={() => {
              setEditId(null);
              setForm({ name: '', category: '', price: '', description: '', image: null });
            }}
            className="cancel-btn"
          >
            Cancel
          </button>
        )}
      </form>

      {/* Bulk actions */}
      <div className="bulk-actions">
        <label>
          <input
            type="checkbox"
            onChange={toggleSelectAll}
            checked={
              paginatedProducts.length > 0 &&
              paginatedProducts.every((p) => selectedIds.includes(p.id))
            }
          />
          Select All
        </label>
        <button className="delete-selected-btn" onClick={handleBulkDelete}>
          Delete Selected
        </button>
      </div>

      {/* Products Table */}
      {paginatedProducts.length === 0 ? (
        <p className="no-products">No products found.</p>
      ) : (
        <table className="products-table">
          <thead>
            <tr>
              <th></th>
              <th onClick={() => handleSort('name')} className="sortable">
                Name {sortKey === 'name' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
              </th>
              <th onClick={() => handleSort('category')} className="sortable">
                Category {sortKey === 'category' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
              </th>
              <th>Description</th>
              <th onClick={() => handleSort('price')} className="sortable">
                Price ($) {sortKey === 'price' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
              </th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedProducts.map(({ id, name, category, price, description, image }) => (
              <tr key={id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(id)}
                    onChange={() => toggleSelect(id)}
                  />
                </td>
                <td>{name}</td>
                <td>{category}</td>
                <td>{description}</td>
                <td>{price.toFixed(2)}</td>
                <td>
                  {image ? (
                    <img
                      src={image}
                      alt={name}
                      style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '6px' }}
                    />
                  ) : (
                    'No Image'
                  )}
                </td>
                <td className="btns">
                  <button className="edit-btn" onClick={() => handleEdit(id)}>
                    Edit
                  </button>
                  <button className="delete-btn" onClick={() => handleDelete(id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => {
            const page = i + 1;
            return (
              <button
                key={page}
                className={page === currentPage ? 'active-page' : ''}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            );
          })}

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
