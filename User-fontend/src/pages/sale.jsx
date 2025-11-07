import { useEffect, useState } from "react";
import ProductGrid from "../components/ds-sanpham";

function Sale() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [promotions, setPromotions] = useState([]);
  const [selectedPromotion, setSelectedPromotion] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        // Lấy tất cả sản phẩm có promotion (có discount)
        // Backend sẽ tự filter các sản phẩm có promotion
        params.append("sort", "id");
        params.append("direction", "desc");

        const res = await fetch(`/api/products?${params.toString()}`);
        const data = await res.json();
        
        if (data?.data) {
          // Filter chỉ lấy sản phẩm có discount > 0
          const saleProducts = data.data
            .filter(p => p.discountPercentage && p.discountPercentage > 0)
            .map((p) => {
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
          setProducts(saleProducts);
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
  }, [selectedPromotion]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-500 via-pink-500 to-orange-500 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block mb-4 animate-bounce">
            <i className="fas fa-fire text-6xl"></i>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            SALE LỚN
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-6">
            Giảm giá cực sốc - Cơ hội mua sắm không thể bỏ lỡ!
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-xl border border-white/30">
              <i className="fas fa-tag mr-2"></i>
              <span className="font-semibold">Giảm đến 50%</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-xl border border-white/30">
              <i className="fas fa-clock mr-2"></i>
              <span className="font-semibold">Số lượng có hạn</span>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Info Banner */}
        <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-6 mb-8 border-2 border-red-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center text-white text-2xl">
                <i className="fas fa-bolt"></i>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">
                  Ưu đãi đặc biệt
                </h3>
                <p className="text-gray-600">
                  Áp dụng cho tất cả sản phẩm trong trang này
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 mb-1">Tổng số sản phẩm sale:</p>
              <p className="text-3xl font-bold text-red-600">{products.length}</p>
            </div>
          </div>
        </div>

        {/* Products */}
        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-600 mb-4"></div>
            <p className="text-xl text-gray-600">Đang tải sản phẩm sale...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
            <i className="fas fa-tag text-gray-300 text-6xl mb-4"></i>
            <p className="text-xl text-gray-600 mb-2">Hiện chưa có sản phẩm sale</p>
            <p className="text-gray-500">Hãy quay lại sau để xem các ưu đãi mới!</p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                <i className="fas fa-fire text-red-500 mr-2"></i>
                Sản Phẩm Đang Sale
              </h2>
              <p className="text-gray-600">
                Tất cả sản phẩm đều được giảm giá đặc biệt
              </p>
            </div>
            <ProductGrid products={products} itemsPerPage={12} />
          </>
        )}

        {/* CTA Section */}
        {products.length > 0 && (
          <div className="mt-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-3xl p-12 text-center text-white shadow-2xl">
            <h3 className="text-3xl font-bold mb-4">
              Đừng bỏ lỡ cơ hội này!
            </h3>
            <p className="text-xl mb-6 text-white/90">
              Mua ngay để nhận ưu đãi tốt nhất
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#top"
                className="inline-block bg-white text-red-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <i className="fas fa-arrow-up mr-2"></i>
                Xem Lại Sản Phẩm
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sale;
