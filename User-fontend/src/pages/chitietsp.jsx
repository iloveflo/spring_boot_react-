import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("description");

  // Hàm định dạng giá tiền
  const formatVND = (value) =>
    value?.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();
        if (data?.data) setProduct(data.data);
        else setError("Không tìm thấy sản phẩm");
      } catch {
        setError("Lỗi khi tải dữ liệu sản phẩm.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mb-4"></div>
          <p className="text-xl text-gray-600">Đang tải sản phẩm...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center bg-red-50 p-8 rounded-2xl">
          <i className="fas fa-exclamation-circle text-red-500 text-5xl mb-4"></i>
          <p className="text-red-500 text-xl">{error}</p>
          <Link
            to="/sanpham"
            className="mt-4 inline-block text-blue-600 hover:text-blue-800"
          >
            ← Quay lại danh sách sản phẩm
          </Link>
        </div>
      </div>
    );

  if (!product) return null;

  const sizes = ["S", "M", "L", "XL", "XXL"];
  const images = product.images || (product.imageUrl ? [product.imageUrl] : []);
  const mainImage = images[selectedImageIndex] || images[0] || "";

  // ✅ Giá tính theo số lượng
  const totalSalePrice = (product.salePrice || product.price) * quantity;
  const totalOriginalPrice = (product.originalPrice || product.price) * quantity;
  const discount = product.discountPercentage || 0;
  const rating = product.averageRating || 0;

  // Render stars
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <i key={i} className="fas fa-star text-yellow-400"></i>
      );
    }
    if (hasHalfStar) {
      stars.push(
        <i key="half" className="fas fa-star-half-alt text-yellow-400"></i>
      );
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <i key={`empty-${i}`} className="far fa-star text-yellow-400"></i>
      );
    }
    return stars;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <nav className="flex items-center gap-2 text-sm text-gray-600">
          <Link to="/home" className="hover:text-blue-600 transition-colors">
            <i className="fas fa-home"></i> Trang chủ
          </Link>
          <i className="fas fa-chevron-right text-xs"></i>
          <Link to="/sanpham" className="hover:text-blue-600 transition-colors">
            Sản phẩm
          </Link>
          <i className="fas fa-chevron-right text-xs"></i>
          <span className="text-gray-800 font-medium">{product.name}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Gallery Ảnh sản phẩm */}
          <div className="space-y-4">
            {/* Ảnh chính */}
            <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl group">
              <img
                src={mainImage}
                alt={product.name}
                className="w-full h-[500px] md:h-[600px] object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {discount > 0 && (
                <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-full font-bold text-lg shadow-lg">
                  -{discount}%
                </div>
              )}
              <button className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-all shadow-lg">
                <i className="fas fa-heart text-gray-600 hover:text-red-500"></i>
              </button>
            </div>

            {/* Thumbnail images */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImageIndex === index
                        ? "border-blue-600 shadow-lg scale-105"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Thông tin sản phẩm */}
          <div className="space-y-6">
            {/* Tên và rating */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  {renderStars(rating)}
                  <span className="text-gray-600 font-medium">
                    ({rating.toFixed(1)})
                  </span>
                </div>
                <span className="text-gray-400">|</span>
                <span className="text-gray-600">
                  Mã SP: <span className="font-semibold">#{product.id}</span>
                </span>
              </div>
            </div>

            {/* Thương hiệu và danh mục */}
            <div className="flex items-center gap-4 flex-wrap">
              {product.supplier?.name && (
                <div className="bg-blue-50 px-4 py-2 rounded-xl">
                  <span className="text-sm text-gray-600">Thương hiệu: </span>
                  <span className="font-semibold text-blue-600">
                    {product.supplier.name}
                  </span>
                </div>
              )}
              {product.category?.name && (
                <div className="bg-purple-50 px-4 py-2 rounded-xl">
                  <span className="text-sm text-gray-600">Danh mục: </span>
                  <span className="font-semibold text-purple-600">
                    {product.category.name}
                  </span>
                </div>
              )}
            </div>

            {/* Giá sản phẩm */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl border-2 border-blue-100">
              <div className="flex items-baseline gap-4 flex-wrap">
                <span className="text-4xl md:text-5xl font-bold text-red-600">
                  {formatVND(totalSalePrice)}
                </span>
                {product.originalPrice > product.salePrice && (
                  <>
                    <span className="text-2xl text-gray-400 line-through">
                      {formatVND(totalOriginalPrice)}
                    </span>
                    <span className="bg-red-500 text-white px-3 py-1 rounded-lg font-bold text-lg">
                      Tiết kiệm {formatVND(totalOriginalPrice - totalSalePrice)}
                    </span>
                  </>
                )}
              </div>
              {quantity > 1 && (
                <p className="text-sm text-gray-600 mt-2">
                  {formatVND(product.salePrice || product.price)} × {quantity}
                </p>
              )}
            </div>

            {/* Chọn size */}
            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-3">
                <i className="fas fa-ruler mr-2 text-blue-500"></i>
                Kích thước:
              </label>
              <div className="flex gap-3 flex-wrap">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      selectedSize === size
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105"
                        : "bg-white border-2 border-gray-200 text-gray-700 hover:border-blue-400 hover:shadow-md"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Số lượng */}
            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-3">
                <i className="fas fa-sort-numeric-up mr-2 text-blue-500"></i>
                Số lượng:
              </label>
              <div className="inline-flex items-center border-2 border-gray-200 rounded-xl overflow-hidden bg-white">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-4 py-3 hover:bg-gray-100 transition-colors text-gray-600 hover:text-gray-800"
                  disabled={quantity === 1}
                >
                  <i className="fas fa-minus"></i>
                </button>
                <span className="px-6 py-3 font-semibold text-lg min-w-[60px] text-center border-x border-gray-200">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-4 py-3 hover:bg-gray-100 transition-colors text-gray-600 hover:text-gray-800"
                >
                  <i className="fas fa-plus"></i>
                </button>
              </div>
            </div>

            {/* Nút hành động */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                onClick={() => alert("Mua ngay - sẽ thêm logic sau")}
              >
                <i className="fas fa-bolt"></i>
                Mua Ngay
              </button>
              <button
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                onClick={() =>
                  alert(
                    `Thêm vào giỏ: ${product.name}, size ${selectedSize}, SL ${quantity}`
                  )
                }
              >
                <i className="fas fa-shopping-cart"></i>
                Thêm Vào Giỏ
              </button>
            </div>

            {/* Thông tin bổ sung */}
            <div className="bg-gray-50 rounded-2xl p-6 space-y-3">
              <div className="flex items-center gap-3">
                <i className="fas fa-truck text-blue-500 text-xl"></i>
                <span className="text-gray-700">
                  <strong>Miễn phí vận chuyển</strong> cho đơn hàng trên 500k
                </span>
              </div>
              <div className="flex items-center gap-3">
                <i className="fas fa-shield-halved text-green-500 text-xl"></i>
                <span className="text-gray-700">
                  <strong>Bảo hành chính hãng</strong> - Cam kết chất lượng
                </span>
              </div>
              <div className="flex items-center gap-3">
                <i className="fas fa-rotate-left text-purple-500 text-xl"></i>
                <span className="text-gray-700">
                  <strong>Đổi trả dễ dàng</strong> trong vòng 7 ngày
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-16">
          <div className="border-b border-gray-200 mb-6">
            <div className="flex gap-4">
              {[
                { id: "description", label: "Mô tả", icon: "fa-file-alt" },
                { id: "specs", label: "Thông số", icon: "fa-info-circle" },
                { id: "reviews", label: "Đánh giá", icon: "fa-star" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 font-semibold border-b-2 transition-colors flex items-center gap-2 ${
                    activeTab === tab.id
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-600 hover:text-gray-800"
                  }`}
                >
                  <i className={`fas ${tab.icon}`}></i>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg min-h-[300px]">
            {activeTab === "description" && (
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Mô Tả Sản Phẩm
                </h3>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                  {product.description || "Chưa có mô tả cho sản phẩm này."}
                </p>
              </div>
            )}

            {activeTab === "specs" && (
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                  Thông Số Kỹ Thuật
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Mã sản phẩm:</span>
                    <span className="font-semibold">#{product.id}</span>
                  </div>
                  {product.category?.name && (
                    <div className="flex justify-between py-3 border-b border-gray-200">
                      <span className="text-gray-600">Danh mục:</span>
                      <span className="font-semibold">{product.category.name}</span>
                    </div>
                  )}
                  {product.supplier?.name && (
                    <div className="flex justify-between py-3 border-b border-gray-200">
                      <span className="text-gray-600">Thương hiệu:</span>
                      <span className="font-semibold">{product.supplier.name}</span>
                    </div>
                  )}
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Đánh giá:</span>
                    <span className="font-semibold">{rating.toFixed(1)} / 5.0</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                  Đánh Giá Sản Phẩm
                </h3>
                <div className="text-center py-12">
                  <i className="fas fa-comments text-gray-300 text-5xl mb-4"></i>
                  <p className="text-gray-500">
                    Chưa có đánh giá nào. Hãy là người đầu tiên đánh giá sản phẩm này!
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
