import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedColorId, setSelectedColorId] = useState(null);
  const [selectedSizeId, setSelectedSizeId] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("description");
  const [reviews, setReviews] = useState([]);
  const [myReview, setMyReview] = useState(null);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);

  // Hàm định dạng giá tiền
  const formatVND = (value) =>
    value?.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();
        if (data?.data) {
          setProduct(data.data);
          // Tự động chọn color và size đầu tiên nếu có variants
          if (data.data.variants && data.data.variants.length > 0) {
            const firstVariant = data.data.variants[0];
            setSelectedColorId(firstVariant.color?.id);
            setSelectedSizeId(firstVariant.size?.id);
            setSelectedVariant(firstVariant);
          }
        } else {
          setError("Không tìm thấy sản phẩm");
        }
      } catch {
        setError("Lỗi khi tải dữ liệu sản phẩm.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // Fetch reviews
  useEffect(() => {
    if (id) {
      const fetchReviews = async () => {
        try {
          const res = await fetch(`/api/reviews/product/${id}`);
          const data = await res.json();
          if (data?.data) {
            setReviews(data.data);
          }
        } catch (err) {
          console.error("Error fetching reviews:", err);
        }
      };
      fetchReviews();

      // Fetch my review
      const fetchMyReview = async () => {
        try {
          const res = await fetch(`/api/reviews/my-review?productId=${id}`);
          const data = await res.json();
          if (data?.data) {
            setMyReview(data.data);
            setReviewRating(data.data.rating || 5);
            setReviewComment(data.data.comment || "");
          }
        } catch (err) {
          console.error("Error fetching my review:", err);
        }
      };
      fetchMyReview();
    }
  }, [id]);

  // Tìm variant khi color hoặc size thay đổi
  useEffect(() => {
    if (product?.variants && selectedColorId && selectedSizeId) {
      const variant = product.variants.find(
        (v) =>
          v.color?.id === selectedColorId && v.size?.id === selectedSizeId
      );
      setSelectedVariant(variant || null);
      // Reset quantity về 1 khi đổi variant
      setQuantity(1);
    }
  }, [product, selectedColorId, selectedSizeId]);

  // Lấy danh sách colors và sizes từ variants
  const getAvailableColors = () => {
    if (!product?.variants) return [];
    const colorMap = new Map();
    product.variants.forEach((v) => {
      if (v.color) {
        colorMap.set(v.color.id, v.color);
      }
    });
    return Array.from(colorMap.values());
  };

  const getAvailableSizes = () => {
    if (!product?.variants || !selectedColorId) return [];
    const sizeMap = new Map();
    product.variants
      .filter((v) => v.color?.id === selectedColorId)
      .forEach((v) => {
        if (v.size) {
          sizeMap.set(v.size.id, v.size);
        }
      });
    return Array.from(sizeMap.values());
  };

  const handleAddToCart = async () => {
    if (!selectedVariant) {
      alert("Vui lòng chọn màu sắc và kích thước!");
      return;
    }
    if (quantity > selectedVariant.quantity) {
      alert(`Chỉ còn ${selectedVariant.quantity} sản phẩm trong kho!`);
      return;
    }

    try {
      const res = await fetch("/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          variantId: selectedVariant.id,
          quantity: quantity,
        }),
      });

      if (res.ok) {
        alert("Đã thêm vào giỏ hàng!");
      } else {
        alert("Có lỗi xảy ra khi thêm vào giỏ hàng!");
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
      alert("Có lỗi xảy ra khi thêm vào giỏ hàng!");
    }
  };

  const handleSubmitReview = async () => {
    if (!reviewComment.trim()) {
      alert("Vui lòng nhập đánh giá!");
      return;
    }

    setSubmittingReview(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: parseInt(id),
          rating: reviewRating,
          comment: reviewComment,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setMyReview(data.data);
        // Refresh reviews list
        const reviewsRes = await fetch(`/api/reviews/product/${id}`);
        const reviewsData = await reviewsRes.json();
        if (reviewsData?.data) {
          setReviews(reviewsData.data);
        }
        alert("Cảm ơn bạn đã đánh giá!");
      } else {
        alert("Có lỗi xảy ra khi gửi đánh giá!");
      }
    } catch (err) {
      console.error("Error submitting review:", err);
      alert("Có lỗi xảy ra khi gửi đánh giá!");
    } finally {
      setSubmittingReview(false);
    }
  };

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

  const images = product.images || (product.imageUrl ? [product.imageUrl] : []);
  const mainImage = images[selectedImageIndex] || images[0] || "";

  // ✅ Giá tính theo số lượng
  const totalSalePrice = (product.salePrice || product.price) * quantity;
  const totalOriginalPrice = (product.originalPrice || product.price) * quantity;
  const discount = product.discountPercentage || 0;
  const rating = product.averageRating || 0;

  const availableColors = getAvailableColors();
  const availableSizes = getAvailableSizes();

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

            {/* Chọn màu sắc */}
            {availableColors.length > 0 && (
              <div>
                <label className="block text-lg font-semibold text-gray-800 mb-3">
                  <i className="fas fa-palette mr-2 text-blue-500"></i>
                  Màu sắc:
                </label>
                <div className="flex gap-3 flex-wrap">
                  {availableColors.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => {
                        setSelectedColorId(color.id);
                        // Reset size khi đổi màu
                        setSelectedSizeId(null);
                      }}
                      className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                        selectedColorId === color.id
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105"
                          : "bg-white border-2 border-gray-200 text-gray-700 hover:border-blue-400 hover:shadow-md"
                      }`}
                    >
                      {color.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Chọn size */}
            {availableSizes.length > 0 && (
              <div>
                <label className="block text-lg font-semibold text-gray-800 mb-3">
                  <i className="fas fa-ruler mr-2 text-blue-500"></i>
                  Kích thước:
                </label>
                <div className="flex gap-3 flex-wrap">
                  {availableSizes.map((size) => (
                    <button
                      key={size.id}
                      onClick={() => setSelectedSizeId(size.id)}
                      className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                        selectedSizeId === size.id
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105"
                          : "bg-white border-2 border-gray-200 text-gray-700 hover:border-blue-400 hover:shadow-md"
                      }`}
                    >
                      {size.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Thông báo số lượng tồn kho */}
            {selectedVariant && (
              <div className={`p-4 rounded-xl ${
                selectedVariant.quantity > 0
                  ? "bg-green-50 border border-green-200"
                  : "bg-red-50 border border-red-200"
              }`}>
                <p className={`font-semibold ${
                  selectedVariant.quantity > 0 ? "text-green-700" : "text-red-700"
                }`}>
                  <i className={`fas ${selectedVariant.quantity > 0 ? "fa-check-circle" : "fa-times-circle"} mr-2`}></i>
                  {selectedVariant.quantity > 0
                    ? `Còn ${selectedVariant.quantity} sản phẩm trong kho`
                    : "Hết hàng"}
                </p>
              </div>
            )}

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
                  onClick={() => {
                    const maxQty = selectedVariant?.quantity || 999;
                    setQuantity((q) => Math.min(maxQty, q + 1));
                  }}
                  className="px-4 py-3 hover:bg-gray-100 transition-colors text-gray-600 hover:text-gray-800"
                  disabled={selectedVariant && quantity >= selectedVariant.quantity}
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
                disabled={!selectedVariant || selectedVariant.quantity === 0}
              >
                <i className="fas fa-bolt"></i>
                Mua Ngay
              </button>
              <button
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleAddToCart}
                disabled={!selectedVariant || selectedVariant.quantity === 0}
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

                {/* Form đánh giá */}
                <div className="bg-gray-50 rounded-xl p-6 mb-8">
                  <h4 className="font-semibold text-gray-800 mb-4">
                    {myReview ? "Cập nhật đánh giá của bạn" : "Viết đánh giá"}
                  </h4>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Đánh giá:
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => setReviewRating(star)}
                          className="text-2xl focus:outline-none"
                        >
                          <i
                            className={`fas fa-star ${
                              star <= reviewRating
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                          ></i>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nhận xét:
                    </label>
                    <textarea
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows="4"
                      placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm này..."
                    ></textarea>
                  </div>
                  <button
                    onClick={handleSubmitReview}
                    disabled={submittingReview}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50"
                  >
                    {submittingReview ? "Đang gửi..." : myReview ? "Cập nhật" : "Gửi đánh giá"}
                  </button>
                </div>

                {/* Danh sách đánh giá */}
                <div className="space-y-6">
                  {reviews.length === 0 ? (
                    <div className="text-center py-12">
                      <i className="fas fa-comments text-gray-300 text-5xl mb-4"></i>
                      <p className="text-gray-500">
                        Chưa có đánh giá nào. Hãy là người đầu tiên đánh giá sản phẩm này!
                      </p>
                    </div>
                  ) : (
                    reviews.map((review) => (
                      <div
                        key={review.id}
                        className="border-b border-gray-200 pb-6 last:border-b-0"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                            {review.userName?.charAt(0) || "U"}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h5 className="font-semibold text-gray-800">
                                {review.userName || "Người dùng"}
                              </h5>
                              <div className="flex">
                                {renderStars(review.rating)}
                              </div>
                            </div>
                            <p className="text-gray-600">{review.comment}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
