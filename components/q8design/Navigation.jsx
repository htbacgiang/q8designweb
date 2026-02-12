import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { 
  FaBars, 
  FaTimes, 
  FaPhone, 
  FaEnvelope,
  FaChevronDown,
  FaHome,
  FaUser,
  FaCog,
  FaProjectDiagram,
  FaNewspaper,
  FaUsers,
  FaMapMarkerAlt
} from "react-icons/fa";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const router = useRouter();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  }, [router.asPath]);

  const navigationItems = [
    {
      name: "Trang chủ",
      href: "/",
      icon: FaHome
    },
    {
      name: "Giới thiệu",
      href: "/gioi-thieu",
      icon: FaUser
    },
    {
      name: "Dịch vụ",
      href: "/dich-vu",
      icon: FaCog,
      dropdownItems: [
        { name: "Thiết kế kiến trúc", href: "/dich-vu/thiet-ke-kien-truc" },
        { name: "Thiết kế nội thất", href: "/dich-vu/thiet-ke-noi-that" },
        { name: "Thi công trọn gói", href: "/dich-vu/thi-cong-tron-goi" },
        { name: "Cải tạo không gian", href: "/dich-vu/cai-tao-noi-that-chung-cu" }
      ]
    },
    {
      name: "Dự án",
      href: "/du-an",
      icon: FaProjectDiagram,
   
    },
    {
      name: "Bài viết",
      href: "/bai-viet",
      icon: FaNewspaper
    },
    {
      name: "Tuyển dụng",
      href: "/tuyen-dung",
      icon: FaUsers
    },
    {
      name: "Liên hệ",
      href: "/lien-he",
      icon: FaMapMarkerAlt
    }
  ];

  const isActivePath = (href) => {
    if (href === "/") {
      return router.pathname === "/";
    }
    return router.pathname.startsWith(href);
  };

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  return (
    <>

      {/* Main Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "q8-bg-surface backdrop-blur-md shadow-lg border-b" 
          : "bg-white/80 backdrop-blur-sm shadow-sm"
      }`} style={{borderColor: isScrolled ? 'var(--q8-alabaster)' : 'transparent'}}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="q8-logo group flex items-center">
              <div className="relative group-hover:scale-105 transition-transform duration-300">
                <Image
                  src="/logo-q8.png"
                  alt="Q8 Design Logo"
                  width={180}
                  height={60}
                  priority
                  className="h-12 w-auto object-contain"
                />
              </div>
             
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item, index) => (
                <div key={index} className="relative group">
                  {item.dropdownItems ? (
                    <>
                      <button
                        className={`flex items-center space-x-1 px-3 py-2 rounded-lg font-medium transition-all duration-300 ${
                          isActivePath(item.href)
                            ? "q8-text-brand q8-bg-light"
                            : "q8-text-secondary hover:q8-text-brand hover:q8-bg-light"
                        }`}
                      >
                        <span>{item.name}</span>
                        <FaChevronDown className="text-xs transition-transform group-hover:rotate-180" />
                      </button>
                      
                      {/* Dropdown Menu */}
                      <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <div className="p-2">
                          {item.dropdownItems.map((dropdownItem, dropdownIndex) => (
                            <Link
                              key={dropdownIndex}
                              href={dropdownItem.href}
                              className="flex items-center px-4 py-3 q8-text-oslo-gray hover:q8-text-cod-gray hover:q8-bg-alabaster rounded-xl transition-all duration-300"
                            >
                              {dropdownItem.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={`px-3 py-2 rounded-lg font-medium transition-all duration-300 ${
                        isActivePath(item.href)
                          ? "q8-text-cod-gray q8-bg-alabaster"
                          : "q8-text-oslo-gray hover:q8-text-cod-gray hover:q8-bg-alabaster"
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* CTA Button & Mobile Menu Toggle */}
            <div className="flex items-center space-x-4 ">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                aria-label="Toggle mobile menu"
              >
                {isMenuOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div className={`lg:hidden fixed top-0 left-0 h-screen w-4/5 bg-gradient-to-br from-white to-gray-50 shadow-2xl border-r border-gray-200 z-50 transform transition-all duration-500 ease-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}>
          {/* Header with close button */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-white/80 backdrop-blur-sm">
            <Link href="/" className="q8-logo group flex items-center">
              <div className="relative group-hover:scale-105 transition-transform duration-300">
                <Image
                  src="/logo-q8.png"
                  alt="Q8 Design Logo"
                  width={120}
                  height={40}
                  priority
                  className="h-8 w-auto object-contain"
                />
              </div>
            </Link>
           
          </div>

          {/* Navigation Content */}
          <div className="flex flex-col h-full overflow-y-auto">
        

            {/* Navigation Items */}
            <div className="flex-1 p-6 space-y-3">
              {navigationItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index}>
                    {item.dropdownItems ? (
                      <>
                        <button
                          onClick={() => toggleDropdown(index)}
                          className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl font-bold transition-all duration-300 shadow-sm hover:shadow-md ${
                            isActivePath(item.href)
                              ? "bg-gradient-to-r from-orange-100 to-orange-50 text-orange-800 border border-orange-200"
                              : "bg-white hover:bg-gradient-to-r hover:from-gray-50 hover:to-white text-gray-700 hover:text-gray-900 border border-gray-100 hover:border-gray-200"
                          }`}
                        >
                          <div className="flex items-center space-x-4">
                            <div className={`p-2 rounded-xl ${
                              isActivePath(item.href) ? "bg-orange-200" : "bg-gray-100"
                            }`}>
                              <Icon className={`text-lg ${
                                isActivePath(item.href) ? "text-orange-600" : "text-gray-600"
                              }`} />
                            </div>
                            <span className="text-lg">{item.name}</span>
                          </div>
                          <FaChevronDown className={`text-sm transition-transform duration-300 ${
                            activeDropdown === index ? "rotate-180" : ""
                          }`} />
                        </button>
                        
                        {/* Mobile Dropdown */}
                        <div className={`transition-all duration-300 overflow-hidden ${
                          activeDropdown === index ? "max-h-64 opacity-100 mt-2" : "max-h-0 opacity-0"
                        }`}>
                          <div className="pl-3 space-y-2">
                            {item.dropdownItems.map((dropdownItem, dropdownIndex) => (
                              <Link
                                key={dropdownIndex}
                                href={dropdownItem.href}
                                className="block px-5 py-3 ml-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all duration-300 border-l-2 border-gray-200 hover:border-orange-300"
                              >
                                {dropdownItem.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        className={`flex items-center space-x-4 px-5 py-4 rounded-2xl font-bold transition-all duration-300 shadow-sm hover:shadow-md ${
                          isActivePath(item.href)
                            ? "bg-gradient-to-r from-orange-100 to-orange-50 text-orange-800 border border-orange-200"
                            : "bg-white hover:bg-gradient-to-r hover:from-gray-50 hover:to-white text-gray-700 hover:text-gray-900 border border-gray-100 hover:border-gray-200"
                        }`}
                      >
                        <div className={`p-2 rounded-xl ${
                          isActivePath(item.href) ? "bg-orange-200" : "bg-gray-100"
                        }`}>
                          <Icon className={`text-lg ${
                            isActivePath(item.href) ? "text-orange-600" : "text-gray-600"
                          }`} />
                        </div>
                        <span className="text-lg">{item.name}</span>
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
            
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gradient-to-r from-black/40 to-black/20 backdrop-blur-md lg:hidden transition-opacity duration-500"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
}
