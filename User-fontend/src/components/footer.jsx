import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Xử lý đăng ký newsletter
    console.log("Subscribed:", email);
    setEmail("");
    alert("Cảm ơn bạn đã đăng ký nhận thông tin!");
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300 mt-16 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-8">
          {/* Cột 1: Logo và mô tả */}
          <div className="lg:col-span-1">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              LUX FASHION
            </h2>
            <p className="text-sm leading-6 mb-4 text-gray-400">
              Cửa hàng thời trang cao cấp mang đến phong cách trẻ trung, hiện đại và tinh tế.
            </p>
            
            {/* Newsletter Subscription */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-white mb-2">Đăng ký nhận tin</h4>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email của bạn"
                  className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <i className="fas fa-paper-plane"></i>
                </button>
              </form>
            </div>
          </div>

          {/* Cột 2: Nhà phát triển */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <i className="fas fa-users text-blue-400"></i>
              Nhà phát triển
            </h3>
            <ul className="space-y-3 text-sm">
              {[
                "Trần Huy Sơn",
                "Trần Đức Thắng",
                "Nguyễn Minh Sơn",
                "Phạm Việt Trung",
                "Nguyễn Văn Quốc Thái"
              ].map((name, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer group"
                >
                  <i className="fas fa-user-circle text-blue-400 text-xs opacity-0 group-hover:opacity-100 transition-opacity"></i>
                  <span>{name}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Cột 3: Hỗ trợ khách hàng */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <i className="fas fa-headset text-blue-400"></i>
              Hỗ trợ khách hàng
            </h3>
            <ul className="space-y-3 text-sm">
              {[
                { label: "Chính sách bảo hành", icon: "fa-shield-alt" },
                { label: "Vận chuyển & đổi trả", icon: "fa-truck" },
                { label: "Câu hỏi thường gặp", icon: "fa-question-circle" },
                { label: "Hướng dẫn mua hàng", icon: "fa-shopping-bag" },
                { label: "Chính sách bảo mật", icon: "fa-lock" }
              ].map((item, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer group"
                >
                  <i className={`fas ${item.icon} text-blue-400 text-xs`}></i>
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Cột 4: Liên hệ */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <i className="fas fa-map-marker-alt text-blue-400"></i>
              Liên hệ
            </h3>
            <ul className="space-y-3 text-sm mb-6">
              <li className="flex items-start gap-3">
                <i className="fas fa-map-marker-alt text-blue-400 mt-1"></i>
                <span>Nguyên Xá, Nam Từ Liêm, Hà Nội</span>
              </li>
              <li className="flex items-center gap-3 hover:text-white transition-colors">
                <i className="fas fa-phone text-blue-400"></i>
                <a href="tel:0123456789" className="hover:underline">0123 456 789</a>
              </li>
              <li className="flex items-center gap-3 hover:text-white transition-colors">
                <i className="fas fa-envelope text-blue-400"></i>
                <a href="mailto:support@luxfashion.vn" className="hover:underline">support@luxfashion.vn</a>
              </li>
            </ul>

            {/* Mạng xã hội */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-white mb-3">Theo dõi chúng tôi</h4>
              <div className="flex gap-3">
                {[
                  { url: "https://www.facebook.com/share/1BwfQcHehr/", icon: "fa-facebook-f", color: "hover:text-blue-400", bg: "bg-blue-600" },
                  { url: "https://instagram.com", icon: "fa-instagram", color: "hover:text-pink-400", bg: "bg-pink-600" },
                  { url: "https://tiktok.com", icon: "fa-tiktok", color: "hover:text-gray-300", bg: "bg-gray-700" },
                  { url: "#", icon: "fa-youtube", color: "hover:text-red-400", bg: "bg-red-600" }
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className={`w-10 h-10 ${social.bg} rounded-full flex items-center justify-center text-white ${social.color} transition-all duration-300 hover:scale-110 hover:shadow-lg`}
                  >
                    <i className={`fab ${social.icon}`}></i>
                  </a>
                ))}
              </div>
            </div>

            {/* Payment Methods */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-white mb-3">Phương thức thanh toán</h4>
              <div className="flex flex-wrap gap-2">
                {["fa-cc-visa", "fa-cc-mastercard", "fa-cc-paypal", "fa-cc-amazon-pay"].map((icon, index) => (
                  <div
                    key={index}
                    className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-600 transition-all duration-300"
                  >
                    <i className={`fab ${icon} text-lg`}></i>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-400 text-center md:text-left">
              © {new Date().getFullYear()} <span className="text-white font-semibold">Lux Fashion</span>. All rights reserved.
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                Điều khoản sử dụng
              </Link>
              <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                Chính sách bảo mật
              </Link>
              <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
