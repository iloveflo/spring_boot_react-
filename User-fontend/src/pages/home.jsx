import React from "react";
import { Link } from "react-router-dom";
import QuangCao from '../components/quangcao';
import ProductSection from '../components/dsspnoibat';

function Home() {
  const categories = [
    { name: "Áo Thun", icon: "fa-tshirt", path: "/sanpham", color: "from-blue-500 to-blue-600" },
    { name: "Quần", icon: "fa-user", path: "/sanpham", color: "from-purple-500 to-purple-600" },
    { name: "Combo", icon: "fa-gift", path: "/combo", color: "from-pink-500 to-pink-600" },
    { name: "Sale", icon: "fa-tag", path: "/sale", color: "from-red-500 to-red-600" },
    { name: "Phụ Kiện", icon: "fa-glasses", path: "/sanpham", color: "from-yellow-500 to-yellow-600" },
    { name: "Giày Dép", icon: "fa-shoe-prints", path: "/sanpham", color: "from-green-500 to-green-600" },
  ];

  const features = [
    { icon: "fa-truck-fast", title: "Miễn phí vận chuyển", desc: "Cho đơn hàng trên 500k" },
    { icon: "fa-shield-halved", title: "Bảo hành chính hãng", desc: "Cam kết chất lượng" },
    { icon: "fa-rotate-left", title: "Đổi trả dễ dàng", desc: "Trong vòng 7 ngày" },
    { icon: "fa-headset", title: "Hỗ trợ 24/7", desc: "Luôn sẵn sàng phục vụ" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Slider Section */}
      <section className="relative">
        <QuangCao />
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            <i className="fas fa-th-large mr-3"></i>
            Danh Mục Sản Phẩm
          </h2>
          <p className="text-gray-600 text-lg">Khám phá bộ sưu tập đa dạng của chúng tôi</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <Link
              key={index}
              to={category.path}
              className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
              <div className="relative z-10 text-center">
                <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${category.color} rounded-full flex items-center justify-center text-white text-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <i className={`fas ${category.icon}`}></i>
                </div>
                <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 text-center group"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl group-hover:scale-110 transition-transform duration-300">
                  <i className={`fas ${feature.icon}`}></i>
                </div>
                <h3 className="font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
              <i className="fas fa-star mr-2"></i>
              Sản Phẩm Nổi Bật
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Bộ Sưu Tập Đặc Biệt
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Những sản phẩm được yêu thích nhất với chất lượng cao và thiết kế độc đáo
          </p>
        </div>
        
        <ProductSection apiUrl="/api/products/featured" />
        
        <div className="text-center mt-12">
          <Link
            to="/sanpham"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <span>Xem Tất Cả Sản Phẩm</span>
            <i className="fas fa-arrow-right"></i>
          </Link>
        </div>
      </section>

      {/* Banner Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="relative px-8 md:px-16 py-12 md:py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  <i className="fas fa-fire mr-3"></i>
                  Sale Lớn Cuối Năm
                </h2>
                <p className="text-white/90 text-lg mb-6">
                  Giảm giá lên đến 50% cho tất cả sản phẩm. Cơ hội mua sắm tuyệt vời không thể bỏ lỡ!
                </p>
                <Link
                  to="/sale"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <span>Mua Ngay</span>
                  <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
              <div className="text-center">
                <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full p-8 md:p-12">
                  <div className="text-6xl md:text-8xl font-bold text-white mb-2">50%</div>
                  <div className="text-xl text-white/90 font-semibold">GIẢM GIÁ</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Tại Sao Chọn Chúng Tôi?
            </h2>
            <p className="text-gray-600 text-lg">Những lý do khiến khách hàng tin tưởng</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-3xl mb-6 mx-auto">
                <i className="fas fa-award"></i>
              </div>
              <h3 className="text-xl font-bold text-center text-gray-800 mb-4">Chất Lượng Cao</h3>
              <p className="text-gray-600 text-center">
                Sản phẩm được chọn lọc kỹ lưỡng, đảm bảo chất lượng tốt nhất cho khách hàng
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl mb-6 mx-auto">
                <i className="fas fa-heart"></i>
              </div>
              <h3 className="text-xl font-bold text-center text-gray-800 mb-4">Khách Hàng Là Trọng Tâm</h3>
              <p className="text-gray-600 text-center">
                Dịch vụ chăm sóc khách hàng tận tâm, luôn lắng nghe và đáp ứng nhu cầu của bạn
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center text-white text-3xl mb-6 mx-auto">
                <i className="fas fa-rocket"></i>
              </div>
              <h3 className="text-xl font-bold text-center text-gray-800 mb-4">Giao Hàng Nhanh</h3>
              <p className="text-gray-600 text-center">
                Hệ thống vận chuyển hiện đại, đảm bảo giao hàng nhanh chóng và an toàn
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
