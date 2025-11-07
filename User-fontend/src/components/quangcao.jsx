import { useState, useEffect } from "react";

// 🖼️ import ảnh (đổi thành ảnh của bạn)
import img1 from "../assets/anhqc1.jpg";
import img2 from "../assets/anhqc2.jpg";
import img3 from "../assets/anhqc3.png";
import img4 from "../assets/anhqc4.jpg";

function Slider() {
  const images = [img1, img2, img3, img4];
  const [currentIndex, setCurrentIndex] = useState(0);

  //  Tự động đổi ảnh mỗi 3 giây
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(timer); // Dọn dẹp khi unmount
  }, [images.length]);

  // 👉 Ảnh kế tiếp
  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  // 👈 Ảnh trước
  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden z-0 mx-auto">
      {/* Khối chứa ảnh trượt ngang */}
      <div
        className="flex w-full h-full transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`
        }}
      >
        {images.map((img, index) => (
          <div key={index} className="w-full h-full flex-shrink-0 relative">
            <img
              src={img}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent"></div>
          </div>
        ))}
      </div>

      {/* Nút điều hướng */}
      <button
        onClick={prevImage}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm text-gray-800 text-2xl md:text-3xl w-12 h-12 md:w-14 md:h-14 rounded-full hover:bg-white transition-all duration-300 shadow-lg hover:scale-110 flex items-center justify-center z-10"
        aria-label="Previous slide"
      >
        <i className="fas fa-chevron-left"></i>
      </button>

      <button
        onClick={nextImage}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm text-gray-800 text-2xl md:text-3xl w-12 h-12 md:w-14 md:h-14 rounded-full hover:bg-white transition-all duration-300 shadow-lg hover:scale-110 flex items-center justify-center z-10"
        aria-label="Next slide"
      >
        <i className="fas fa-chevron-right"></i>
      </button>

      {/* Dots indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-white w-8'
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default Slider;
