import { useEffect, useState } from "react";
import ProductGrid from "../components/ds-sanpham";

function SanPham() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  
  // Filters
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSuppliers, setSelectedSuppliers] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minRating, setMinRating] = useState("");
  const [searchName, setSearchName] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        if (data?.data) {
          setCategories(data.data);
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();

    const fetchSuppliers = async () => {
      try {
        const res = await fetch("/api/suppliers");
        const data = await res.json();
        if (data?.data) {
          setSuppliers(data.data);
        }
      } catch (err) {
        console.error("Error fetching suppliers:", err);
      }
    };
    fetchSuppliers();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        
        if (selectedCategory) params.append("categoryId", selectedCategory);
        if (selectedSuppliers.length > 0) {
          selectedSuppliers.forEach(id => params.append("supplierIds", id));
        }
        if (minPrice) params.append("minPrice", minPrice);
        if (maxPrice) params.append("maxPrice", maxPrice);
        if (minRating) params.append("minRating", minRating);
        if (searchName) params.append("name", searchName);
        params.append("sort", sortBy);
        params.append("direction", sortDirection);

        const res = await fetch(`/api/products?${params.toString()}`);
        const data = await res.json();
        
        if (data?.data) {
          const mapped = data.data.map((p) => {
            const imageLink = p.imageUrl || (p.images && p.images[0]) || "";
            return {
              id: p.id,
              name: p.name,
              brand: p.supplierName || "N/A",
              rating: p.rating || 0,
              price: p.salePrice || p.price || 0,
              sale: p.discountPercentage || 0,
              image: imageLink,
            };
          });
          setProducts(mapped);
        } else {
          setProducts([]);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, selectedSuppliers, minPrice, maxPrice, minRating, searchName, sortBy, sortDirection]);

  const handleSupplierToggle = (supplierId) => {
    setSelectedSuppliers(prev => 
      prev.includes(supplierId)
        ? prev.filter(id => id !== supplierId)
        : [...prev, supplierId]
    );
  };

  const handleResetFilters = () => {
    setSelectedCategory("");
    setSelectedSuppliers([]);
    setMinPrice("");
    setMaxPrice("");
    setMinRating("");
    setSearchName("");
    setSortBy("name");
    setSortDirection("asc");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            <i className="fas fa-shopping-bag mr-4"></i>
            Sản Phẩm
          </h1>
          <p className="text-white/90 text-lg">
            Khám phá bộ sưu tập đa dạng của chúng tôi
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">
                  <i className="fas fa-filter mr-2 text-blue-500"></i>
                  Bộ Lọc
                </h2>
                <button
                  onClick={handleResetFilters}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  <i className="fas fa-redo mr-1"></i>
                  Đặt lại
                </button>
              </div>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tìm kiếm:
                </label>
                <input
                  type="text"
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                  placeholder="Tên sản phẩm..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Danh mục:
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Tất cả</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Supplier Filter */}
              {suppliers.length > 0 && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Thương hiệu:
                  </label>
                  <div className="max-h-48 overflow-y-auto space-y-2">
                    {suppliers.map((supplier) => (
                      <label
                        key={supplier.id}
                        className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
                      >
                        <input
                          type="checkbox"
                          checked={selectedSuppliers.includes(supplier.id)}
                          onChange={() => handleSupplierToggle(supplier.id)}
                          className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">
                          {supplier.name}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Price Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Giá:
                </label>
                <div className="space-y-2">
                  <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    placeholder="Từ (VNĐ)"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    placeholder="Đến (VNĐ)"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Rating Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Đánh giá tối thiểu:
                </label>
                <select
                  value={minRating}
                  onChange={(e) => setMinRating(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Tất cả</option>
                  <option value="4">4 sao trở lên</option>
                  <option value="3">3 sao trở lên</option>
                  <option value="2">2 sao trở lên</option>
                  <option value="1">1 sao trở lên</option>
                </select>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Sort Bar */}
            <div className="bg-white rounded-2xl p-4 shadow-lg mb-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-700">
                  Sắp xếp theo:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="name">Tên</option>
                  <option value="price">Giá</option>
                  <option value="id">Mới nhất</option>
                </select>
                <button
                  onClick={() => setSortDirection(sortDirection === "asc" ? "desc" : "asc")}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  title={sortDirection === "asc" ? "Tăng dần" : "Giảm dần"}
                >
                  <i className={`fas fa-sort-${sortDirection === "asc" ? "amount-up" : "amount-down"}`}></i>
                </button>
              </div>
              <div className="text-sm text-gray-600">
                Tìm thấy <span className="font-bold text-blue-600">{products.length}</span> sản phẩm
              </div>
            </div>

            {/* Products */}
            {loading ? (
              <div className="text-center py-16">
                <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mb-4"></div>
                <p className="text-xl text-gray-600">Đang tải sản phẩm...</p>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
                <i className="fas fa-search text-gray-300 text-6xl mb-4"></i>
                <p className="text-xl text-gray-600 mb-2">Không tìm thấy sản phẩm</p>
                <p className="text-gray-500">Thử thay đổi bộ lọc của bạn</p>
              </div>
            ) : (
              <ProductGrid products={products} itemsPerPage={12} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SanPham;
