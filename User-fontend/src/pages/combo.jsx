import React from "react";
import { Link } from "react-router-dom";

function Combo() {
  // Dữ liệu mẫu cho các combo (có thể thay thế bằng API call sau)
  const combos = [
    {
      id: 1,
      name: "Combo Thời Trang Mùa Hè",
      description: "Bộ sưu tập quần áo mùa hè cao cấp",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500",
      originalPrice: 2500000,
      salePrice: 1999000,
      discount: 20,
      items: 5,
      rating: 4.8
    },
    {
      id: 2,
      name: "Combo Công Sở Chuyên Nghiệp",
      description: "Set đồ công sở thanh lịch và sang trọng",
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500",
      originalPrice: 3200000,
      salePrice: 2499000,
      discount: 22,
      items: 4,
      rating: 4.9
    },
    {
      id: 3,
      name: "Combo Thể Thao Năng Động",
      description: "Bộ quần áo thể thao chất lượng cao",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
      originalPrice: 1800000,
      salePrice: 1399000,
      discount: 22,
      items: 3,
      rating: 4.7
    },
    {
      id: 4,
      name: "Combo Dạo Phố Thời Thượng",
      description: "Phong cách trẻ trung và hiện đại",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500",
      originalPrice: 2200000,
      salePrice: 1799000,
      discount: 18,
      items: 4,
      rating: 4.6
    },
    {
      id: 5,
      name: "Combo Đi Chơi Cuối Tuần",
      description: "Set đồ casual thoải mái và phong cách",
      image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=500",
      originalPrice: 1900000,
      salePrice: 1499000,
      discount: 21,
      items: 3,
      rating: 4.8
    },
    {
      id: 6,
      name: "Combo Sang Trọng Đặc Biệt",
      description: "Bộ sưu tập cao cấp cho dịp đặc biệt",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=500",
      originalPrice: 4500000,
      salePrice: 3499000,
      discount: 22,
      items: 6,
      rating: 5.0
    }
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              <i className="fas fa-gift mr-4"></i>
              Combo Đặc Biệt
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
              Tiết kiệm hơn khi mua combo - Nhiều sản phẩm, giá tốt hơn!
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-white">
                <i className="fas fa-tag mr-2"></i>
                Giảm giá lên đến 25%
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-white">
                <i className="fas fa-shipping-fast mr-2"></i>
                Miễn phí vận chuyển
              </div>
            </div>
          </div>
        </div>
        {/* Decorative waves */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="rgb(249, 250, 251)"/>
          </svg>
        </div>
      </div>

      {/* Combo Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Khám Phá Các Combo Hấp Dẫn
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Chọn combo phù hợp với phong cách của bạn và tiết kiệm nhiều hơn
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {combos.map((combo) => (
            <div
              key={combo.id}
              className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
            >
              {/* Badge */}
              <div className="relative">
                <div className="absolute top-4 right-4 z-10">
                  <span className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    -{combo.discount}%
                  </span>
                </div>
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-yellow-400 text-gray-800 px-3 py-1 rounded-full text-xs font-semibold">
                    <i className="fas fa-star mr-1"></i>
                    {combo.rating}
                  </span>
                </div>
                
                {/* Image */}
                <div className="w-full h-64 overflow-hidden bg-gray-200">
                  <img
                    src={combo.image}
                    alt={combo.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                  {combo.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {combo.description}
                </p>

                {/* Items count */}
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <i className="fas fa-box mr-2 text-blue-500"></i>
                  <span>{combo.items} sản phẩm trong combo</span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-2xl font-bold text-red-600">
                      {formatPrice(combo.salePrice)}₫
                    </div>
                    <div className="text-sm text-gray-400 line-through">
                      {formatPrice(combo.originalPrice)}₫
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Tiết kiệm</div>
                    <div className="text-lg font-semibold text-green-600">
                      {formatPrice(combo.originalPrice - combo.salePrice)}₫
                    </div>
                  </div>
                </div>

                {/* Button */}
                <Link
                  to={`/combo/${combo.id}`}
                  className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <i className="fas fa-shopping-cart mr-2"></i>
                  Xem Chi Tiết
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-8 md:p-12 text-center text-white shadow-2xl">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            <i className="fas fa-envelope mr-3"></i>
            Đăng Ký Nhận Thông Tin Combo Mới
          </h3>
          <p className="text-lg mb-6 text-white/90">
            Nhận thông báo về các combo mới và ưu đãi đặc biệt
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Nhập email của bạn"
              className="flex-1 px-6 py-3 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors shadow-lg">
              <i className="fas fa-paper-plane mr-2"></i>
              Đăng Ký
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Combo;
