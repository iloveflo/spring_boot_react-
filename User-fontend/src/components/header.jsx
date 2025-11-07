import React, { useState } from "react";
import { Link } from "react-router-dom";
import HaGioHang from "../assets/logogiohang.jpeg";
import LogoChinh from "../assets/LogoChinh.png";

function Logo() {
  return (
    <Link to="/home" className="flex items-center group">
      <div className="relative">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <img 
          src={LogoChinh} 
          alt="Lux Fashion Logo" 
          className="relative w-32 sm:w-40 md:w-44 lg:w-48 xl:w-52 h-auto transition-all duration-300 hover:scale-105 drop-shadow-lg filter brightness-110 contrast-105" 
          style={{ imageRendering: 'crisp-edges' }}
        />
      </div>
    </Link>
  );
}

function Menu() {
  const [activeMenu, setActiveMenu] = useState(null);
  
  const menuItems = [
    { path: "/gioithieu", label: "Giới thiệu", icon: "fa-info-circle" },
    { path: "/sanpham", label: "Sản phẩm", icon: "fa-tshirt" },
    { path: "/combo", label: "Combo", icon: "fa-gift" },
    { path: "/sale", label: "Sale", icon: "fa-tag" },
    { path: "/hang", label: "Hãng", icon: "fa-store" },
    { path: "/thongtinkhachhang", label: "Thông tin", icon: "fa-user" },
  ];

  return (
    <nav className="hidden lg:block">
      <ul className="flex list-none gap-2 xl:gap-4 items-center">
        {menuItems.map((item) => (
          <li key={item.path} className="relative group">
            <Link
              className="text-white hover:text-yellow-300 transition-all duration-300 font-semibold text-xs xl:text-sm flex items-center justify-center gap-1.5 xl:gap-2 py-2 px-2 xl:px-3 relative h-full"
              to={item.path}
              onMouseEnter={() => setActiveMenu(item.path)}
              onMouseLeave={() => setActiveMenu(null)}
              style={{ lineHeight: '1.5' }}
            >
              <i className={`fas ${item.icon} text-xs w-3 xl:w-4 flex items-center justify-center`}></i>
              <span className="whitespace-nowrap">{item.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-300 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  
  const menuItems = [
    { path: "/gioithieu", label: "Giới thiệu", icon: "fa-info-circle" },
    { path: "/sanpham", label: "Sản phẩm", icon: "fa-tshirt" },
    { path: "/combo", label: "Combo", icon: "fa-gift" },
    { path: "/sale", label: "Sale", icon: "fa-tag" },
    { path: "/hang", label: "Hãng", icon: "fa-store" },
    { path: "/thongtinkhachhang", label: "Thông tin", icon: "fa-user" },
  ];

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-white p-2 hover:bg-white/20 rounded-lg transition-colors"
      >
        <i className={`fas ${isOpen ? "fa-times" : "fa-bars"} text-xl`}></i>
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-gradient-to-br from-blue-600 to-purple-600 shadow-2xl z-50">
          <nav className="px-4 py-6">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <Link
                    className="text-white hover:bg-white/20 block px-4 py-3 rounded-lg transition-all duration-300 flex items-center gap-3"
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                  >
                    <i className={`fas ${item.icon} w-5`}></i>
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}

function NutLoc() {
  return (
    <button
      className="hidden lg:flex items-center justify-center gap-1.5 px-3 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-all duration-300 font-semibold text-xs shadow-lg hover:shadow-xl border border-white/30 h-9"
      type="button"
    >
      <i className="fas fa-filter text-xs"></i>
      <span className="hidden 2xl:inline whitespace-nowrap">Lọc</span>
    </button>
  );
}

function TimKiem() {
  const [searchValue, setSearchValue] = useState("");
  
  return (
    <div className="hidden lg:flex items-center relative">
      <div className="relative flex items-center">
        <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10 text-xs"></i>
        <input
          type="text"
          placeholder="Tìm kiếm..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="pl-9 pr-8 py-2 w-40 xl:w-48 2xl:w-56 text-xs xl:text-sm text-gray-800 bg-white rounded-lg border-2 border-transparent focus:border-yellow-300 focus:outline-none shadow-lg transition-all duration-300 h-9"
          style={{ lineHeight: '1.5' }}
        />
        {searchValue && (
          <button
            onClick={() => setSearchValue("")}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 z-10"
          >
            <i className="fas fa-times text-xs"></i>
          </button>
        )}
      </div>
    </div>
  );
}

function GioHang() {
  const itemCount = 3; // Có thể lấy từ state/context sau
  
  return (
    <Link
      className="relative text-white hover:text-yellow-300 transition-all duration-300 p-2 rounded-lg hover:bg-white/20 group flex items-center h-9"
      to="/giohang"
    >
      <div className="relative flex items-center">
        <i className="fa-solid fa-cart-shopping text-lg xl:text-xl"></i>
        {itemCount > 0 && (
          <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center animate-pulse">
            {itemCount}
          </span>
        )}
      </div>
      <span className="hidden 2xl:inline-block ml-1.5 text-xs font-semibold whitespace-nowrap">Giỏ hàng</span>
    </Link>
  );
}

function TaiKhoan() {
  return (
    <Link
      className="hidden lg:flex items-center justify-center gap-1.5 px-3 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-all duration-300 font-semibold text-xs shadow-lg hover:shadow-xl border border-white/30 h-9"
      to="/taikhoan"
    >
      <i className="fas fa-user-circle text-sm xl:text-base"></i>
      <span className="hidden 2xl:inline whitespace-nowrap">Tài khoản</span>
    </Link>
  );
}

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 shadow-2xl sticky top-0 z-50 w-full backdrop-blur-sm overflow-hidden">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 xl:px-8">
        <div className="flex items-center justify-between py-2 lg:py-3 gap-2">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center min-w-0">
            <Logo />
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex flex-1 justify-center items-center min-w-0 mx-2">
            <Menu />
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-2.5 xl:gap-3 flex-shrink-0">
            <NutLoc />
            <TimKiem />
            <GioHang />
            <TaiKhoan />
            <MobileMenu />
          </div>
        </div>
      </div>
      
      {/* Bottom border with gradient */}
      <div className="h-1 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400"></div>
    </header>
  );
}
