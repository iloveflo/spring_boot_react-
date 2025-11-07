import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function GioHang() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Hàm định dạng giá tiền
  const formatVND = (value) =>
    value?.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch("/api/cart");
        const data = await res.json();
        if (data?.data) {
          setCart(data.data);
        } else {
          setCart({ items: [], totalPrice: 0 });
        }
      } catch (err) {
        console.error("Error fetching cart:", err);
        setError("Lỗi khi tải giỏ hàng");
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mb-4"></div>
          <p className="text-xl text-gray-600">Đang tải giỏ hàng...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center bg-red-50 p-8 rounded-2xl">
          <i className="fas fa-exclamation-circle text-red-500 text-5xl mb-4"></i>
          <p className="text-red-500 text-xl">{error}</p>
        </div>
      </div>
    );

  if (!cart) return null;

  const isEmpty = !cart.items || cart.items.length === 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            <i className="fas fa-shopping-cart mr-4"></i>
            Giỏ Hàng
          </h1>
          <p className="text-white/90 text-lg">
            {isEmpty
              ? "Giỏ hàng của bạn đang trống"
              : `${cart.items.length} sản phẩm trong giỏ hàng`}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isEmpty ? (
          // Giỏ hàng trống
          <div className="text-center py-16">
            <div className="bg-white rounded-3xl p-12 shadow-lg max-w-md mx-auto">
              <i className="fas fa-shopping-cart text-gray-300 text-8xl mb-6"></i>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Giỏ hàng của bạn đang trống
              </h2>
              <p className="text-gray-600 mb-8">
                Hãy khám phá và thêm sản phẩm yêu thích vào giỏ hàng!
              </p>
              <Link
                to="/sanpham"
                className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <i className="fas fa-shopping-bag mr-2"></i>
                Tiếp Tục Mua Sắm
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Danh sách sản phẩm */}
            <div className="lg:col-span-2 space-y-4">
              {cart.items.map((item) => (
                <div
                  key={item.cartDetailId}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="flex gap-6">
                    {/* Ảnh sản phẩm */}
                    <Link
                      to={`/chitietsp/${item.product?.id}`}
                      className="flex-shrink-0"
                    >
                      <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden bg-gray-100">
                        {item.imageUrl ? (
                          <img
                            src={item.imageUrl}
                            alt={item.product?.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <i className="fas fa-image text-gray-400 text-2xl"></i>
                          </div>
                        )}
                      </div>
                    </Link>

                    {/* Thông tin sản phẩm */}
                    <div className="flex-1 min-w-0">
                      <Link
                        to={`/chitietsp/${item.product?.id}`}
                        className="block"
                      >
                        <h3 className="text-lg font-bold text-gray-800 mb-2 hover:text-blue-600 transition-colors">
                          {item.product?.name || "Sản phẩm"}
                        </h3>
                      </Link>

                      {/* Màu sắc và kích thước */}
                      <div className="flex gap-4 mb-3 text-sm text-gray-600">
                        {item.color?.name && (
                          <div>
                            <span className="font-medium">Màu: </span>
                            <span>{item.color.name}</span>
                          </div>
                        )}
                        {item.size?.name && (
                          <div>
                            <span className="font-medium">Size: </span>
                            <span>{item.size.name}</span>
                          </div>
                        )}
                      </div>

                      {/* Giá */}
                      <div className="mb-4">
                        <span className="text-xl font-bold text-red-600">
                          {formatVND(item.price)}
                        </span>
                      </div>

                      {/* Số lượng */}
                      <div className="flex items-center gap-4">
                        <label className="text-sm font-medium text-gray-700">
                          Số lượng:
                        </label>
                        <div className="inline-flex items-center border-2 border-gray-200 rounded-lg overflow-hidden bg-white">
                          <button
                            className="px-3 py-1 hover:bg-gray-100 transition-colors text-gray-600 hover:text-gray-800"
                            disabled={item.quantity <= 1}
                          >
                            <i className="fas fa-minus text-xs"></i>
                          </button>
                          <span className="px-4 py-1 font-semibold min-w-[40px] text-center border-x border-gray-200">
                            {item.quantity}
                          </span>
                          <button
                            className="px-3 py-1 hover:bg-gray-100 transition-colors text-gray-600 hover:text-gray-800"
                          >
                            <i className="fas fa-plus text-xs"></i>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Tổng tiền và nút xóa */}
                    <div className="flex flex-col items-end justify-between">
                      <div className="text-right mb-4">
                        <p className="text-sm text-gray-600 mb-1">Thành tiền:</p>
                        <p className="text-xl font-bold text-blue-600">
                          {formatVND(item.price * item.quantity)}
                        </p>
                      </div>
                      <button
                        className="text-red-500 hover:text-red-700 transition-colors"
                        title="Xóa sản phẩm"
                      >
                        <i className="fas fa-trash text-lg"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Tóm tắt đơn hàng */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Tóm Tắt Đơn Hàng
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Tạm tính:</span>
                    <span className="font-semibold">
                      {formatVND(cart.totalPrice || 0)}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Phí vận chuyển:</span>
                    <span className="font-semibold text-green-600">
                      {cart.totalPrice >= 500000 ? "Miễn phí" : "30.000đ"}
                    </span>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-xl font-bold text-gray-800">
                      <span>Tổng cộng:</span>
                      <span className="text-red-600">
                        {formatVND(
                          cart.totalPrice +
                            (cart.totalPrice >= 500000 ? 0 : 30000)
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-4 rounded-xl font-bold text-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                    onClick={() => alert("Chức năng thanh toán sẽ được thêm sau")}
                  >
                    <i className="fas fa-credit-card mr-2"></i>
                    Thanh Toán
                  </button>
                  <Link
                    to="/sanpham"
                    className="block w-full text-center bg-gray-100 text-gray-700 px-6 py-4 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300"
                  >
                    <i className="fas fa-arrow-left mr-2"></i>
                    Tiếp Tục Mua Sắm
                  </Link>
                </div>

                {/* Thông tin bổ sung */}
                <div className="mt-6 pt-6 border-t border-gray-200 space-y-3 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <i className="fas fa-shield-halved text-green-500"></i>
                    <span>Bảo hành chính hãng</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="fas fa-truck text-blue-500"></i>
                    <span>Miễn phí vận chuyển đơn trên 500k</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="fas fa-rotate-left text-purple-500"></i>
                    <span>Đổi trả trong 7 ngày</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default GioHang;
