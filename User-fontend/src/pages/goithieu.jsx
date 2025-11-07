import React from "react";
import { Link } from "react-router-dom";

function GioiThieu() {
  const developers = [
    "Trần Huy Sơn",
    "Trần Đức Thắng",
    "Nguyễn Minh Sơn",
    "Phạm Việt Trung",
    "Nguyễn Văn Quốc Thái"
  ];

  const values = [
    {
      icon: "fa-gem",
      title: "Chất Lượng Cao Cấp",
      description: "Chúng tôi cam kết mang đến những sản phẩm thời trang chất lượng cao, được chọn lọc kỹ lưỡng từ các thương hiệu uy tín.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: "fa-heart",
      title: "Khách Hàng Là Trọng Tâm",
      description: "Mọi quyết định của chúng tôi đều hướng đến việc mang lại trải nghiệm tốt nhất cho khách hàng.",
      color: "from-pink-500 to-pink-600"
    },
    {
      icon: "fa-lightbulb",
      title: "Đổi Mới Sáng Tạo",
      description: "Luôn cập nhật xu hướng thời trang mới nhất, mang đến những bộ sưu tập độc đáo và hiện đại.",
      color: "from-yellow-500 to-yellow-600"
    },
    {
      icon: "fa-shield-halved",
      title: "Uy Tín & Tin Cậy",
      description: "Xây dựng niềm tin với khách hàng thông qua sự minh bạch, trung thực trong mọi giao dịch.",
      color: "from-green-500 to-green-600"
    }
  ];

  const milestones = [
    { year: "2024", title: "Thành Lập", desc: "Lux Fashion ra đời với sứ mệnh mang thời trang cao cấp đến mọi người" },
    { year: "2024", title: "Mở Rộng", desc: "Mở rộng danh mục sản phẩm và đối tác thương hiệu" },
    { year: "2024", title: "Phát Triển", desc: "Xây dựng hệ thống online và dịch vụ khách hàng chuyên nghiệp" }
  ];

  const stats = [
    { number: "1000+", label: "Sản Phẩm", icon: "fa-tshirt" },
    { number: "50+", label: "Thương Hiệu", icon: "fa-store" },
    { number: "5000+", label: "Khách Hàng", icon: "fa-users" },
    { number: "99%", label: "Hài Lòng", icon: "fa-star" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-lg">
              <i className="fas fa-info-circle mr-4"></i>
              Về Chúng Tôi
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8">
              Lux Fashion - Điểm đến của thời trang cao cấp, nơi phong cách gặp gỡ chất lượng
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Link
                to="/sanpham"
                className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <i className="fas fa-shopping-bag mr-2"></i>
                Khám Phá Sản Phẩm
              </Link>
              <Link
                to="/combo"
                className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-xl font-bold hover:bg-white/30 transition-all duration-300 transform hover:scale-105 border border-white/30"
              >
                <i className="fas fa-gift mr-2"></i>
                Xem Combo Đặc Biệt
              </Link>
            </div>
          </div>
        </div>
        {/* Decorative waves */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="rgb(249, 250, 251)"/>
          </svg>
        </div>
      </section>

      {/* About Us Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                Về Lux Fashion
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Câu Chuyện Của Chúng Tôi
            </h2>
            <p className="text-lg text-gray-600 mb-4 leading-relaxed">
              Lux Fashion được thành lập với niềm đam mê mang đến những sản phẩm thời trang cao cấp, 
              chất lượng tốt nhất cho khách hàng Việt Nam. Chúng tôi tin rằng mỗi người đều xứng đáng 
              có được phong cách riêng, thể hiện cá tính qua những bộ trang phục đẹp và sang trọng.
            </p>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Với đội ngũ chuyên nghiệp và tận tâm, chúng tôi không chỉ bán hàng mà còn tư vấn, 
              hỗ trợ khách hàng tìm được những sản phẩm phù hợp nhất với phong cách và nhu cầu của mình.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="bg-blue-50 px-6 py-4 rounded-xl">
                <div className="text-3xl font-bold text-blue-600 mb-1">2024</div>
                <div className="text-sm text-gray-600">Năm thành lập</div>
              </div>
              <div className="bg-purple-50 px-6 py-4 rounded-xl">
                <div className="text-3xl font-bold text-purple-600 mb-1">100%</div>
                <div className="text-sm text-gray-600">Cam kết chất lượng</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-8 shadow-2xl">
              <div className="bg-white rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  <i className="fas fa-bullseye text-blue-600 mr-2"></i>
                  Sứ Mệnh
                </h3>
                <p className="text-gray-600 mb-6">
                  Mang đến cho khách hàng những sản phẩm thời trang cao cấp với chất lượng tốt nhất, 
                  giá cả hợp lý và dịch vụ chăm sóc khách hàng tận tâm.
                </p>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  <i className="fas fa-eye text-purple-600 mr-2"></i>
                  Tầm Nhìn
                </h3>
                <p className="text-gray-600">
                  Trở thành thương hiệu thời trang hàng đầu tại Việt Nam, được khách hàng tin tưởng 
                  và yêu mến vì chất lượng sản phẩm và dịch vụ xuất sắc.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Thành Tựu Của Chúng Tôi
            </h2>
            <p className="text-gray-600 text-lg">Những con số nói lên chất lượng dịch vụ</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl mb-4 mx-auto">
                  <i className={`fas ${stat.icon}`}></i>
                </div>
                <div className="text-4xl font-bold text-gray-800 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Giá Trị Cốt Lõi
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Những nguyên tắc và giá trị mà chúng tôi luôn tuân thủ trong mọi hoạt động
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-full flex items-center justify-center text-white text-2xl mb-6`}>
                <i className={`fas ${value.icon}`}></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">{value.title}</h3>
              <p className="text-gray-600 leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Hành Trình Phát Triển
            </h2>
            <p className="text-gray-600 text-lg">Những cột mốc quan trọng trong quá trình xây dựng thương hiệu</p>
          </div>
          <div className="relative max-w-4xl mx-auto">
            {/* Timeline line */}
            <div className="absolute left-8 md:left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-purple-500"></div>
            
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className="relative flex items-start gap-6"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-8 md:left-0 w-4 h-4 bg-blue-500 rounded-full border-4 border-white shadow-lg transform -translate-x-1/2 z-10 mt-2"></div>
                  
                  {/* Content */}
                  <div className="flex-1 ml-16 md:ml-12">
                    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <div className="text-3xl font-bold text-blue-600 mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Đội Ngũ Phát Triển
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Những người đã tạo nên Lux Fashion với đam mê và tâm huyết
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {developers.map((developer, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl mb-4 mx-auto">
                <i className="fas fa-user"></i>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">{developer}</h3>
              <p className="text-sm text-gray-600">Developer</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="relative px-8 md:px-16 py-12 md:py-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Sẵn Sàng Khám Phá Thời Trang?
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Khám phá bộ sưu tập đa dạng của chúng tôi và tìm cho mình phong cách riêng
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/sanpham"
                className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <i className="fas fa-shopping-bag mr-2"></i>
                Xem Sản Phẩm
              </Link>
              <Link
                to="/combo"
                className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-xl font-bold hover:bg-white/30 transition-all duration-300 transform hover:scale-105 border border-white/30"
              >
                <i className="fas fa-gift mr-2"></i>
                Xem Combo
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default GioiThieu;
