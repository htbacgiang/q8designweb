import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  FaBars,
  FaTimes,
  FaChevronDown,
  FaHome,
  FaUser,
  FaCog,
  FaProjectDiagram,
  FaNewspaper,
  FaUsers,
  FaMapMarkerAlt,
  FaFacebookF,
  FaLinkedin,
  FaInstagram,
  FaYoutube
} from "react-icons/fa";

export default function Navigation2() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeSubDropdown, setActiveSubDropdown] = useState(null);
  const [navigationItems, setNavigationItems] = useState([]);
  const router = useRouter();

  // Load navigation từ API (cache localStorage 5 phút)
  useEffect(() => {
    const CACHE_KEY = "nav_items";
    const CACHE_TTL = 5 * 60 * 1000; // 5 phút

    const loadNav = async () => {
      // Đọc cache trước — hiện ngay, không delay
      try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const { data, ts } = JSON.parse(cached);
          if (Date.now() - ts < CACHE_TTL) {
            setNavigationItems(data);
            return; // Cache còn hạn, không cần fetch
          }
        }
      } catch (_) { }

      // Cache hết hạn hoặc không có → fetch API
      try {
        const r = await fetch("/api/navigation");
        const d = await r.json();
        if (d.success && Array.isArray(d.items)) {
          const items = d.items.filter((i) => i.isActive !== false);
          setNavigationItems(items);
          localStorage.setItem(CACHE_KEY, JSON.stringify({ data: items, ts: Date.now() }));
        }
      } catch (_) { }
    };

    loadNav();
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
    setActiveSubDropdown(null);
  }, [router.asPath]);

  const getIconForPath = (href) => {
    if (href === "/") return FaHome;
    if (href.includes("gioi-thieu")) return FaUser;
    if (href.includes("dich-vu")) return FaCog;
    if (href.includes("du-an")) return FaProjectDiagram;
    if (href.includes("bai-viet")) return FaNewspaper;
    if (href.includes("tuyen-dung")) return FaUsers;
    if (href.includes("lien-he")) return FaMapMarkerAlt;
    return FaBars;
  };

  const isActivePath = (href) => {
    if (href === "/") {
      return router.pathname === "/";
    }
    return router.pathname.startsWith(href);
  };

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
    setActiveSubDropdown(null);
  };

  const toggleSubDropdown = (key) => {
    setActiveSubDropdown(activeSubDropdown === key ? null : key);
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-[100] bg-white shadow-lg border-b"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="q8-logo group flex items-center transition-all duration-500 ease-in-out">
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

            <div className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item, index) => (
                <div key={item._id || index} className="relative group">
                  {item.children && item.children.length > 0 ? (
                    <>
                      <button
                        className={`flex items-center space-x-1 px-3 py-2 rounded-lg font-medium transition-all duration-300 ${isActivePath(item.href)
                            ? "q8-text-brand q8-bg-light"
                            : "q8-text-secondary hover:q8-text-brand hover:q8-bg-light"
                          }`}
                      >
                        <span>{item.name}</span>
                        <FaChevronDown className="text-xs transition-transform group-hover:rotate-180" />
                      </button>

                      <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0" style={{ overflow: 'visible' }}>
                        <div className="p-2">
                          {item.children.map((child2, ci2) => (
                            <div key={child2._id || ci2} className="relative group/sub">
                              {child2.children && child2.children.length > 0 ? (
                                <>
                                  <div
                                    className="flex items-center justify-between px-4 py-3 q8-text-oslo-gray hover:q8-text-cod-gray cursor-default transition-colors duration-200"
                                    style={{ borderBottom: ci2 < item.children.length - 1 ? '1px solid #f3f4f6' : 'none' }}
                                  >
                                    <span className="text-sm font-medium">{child2.name}</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-amber-500" fill="currentColor" viewBox="0 0 320 512">
                                      <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
                                    </svg>
                                  </div>

                                  <div className="absolute left-full top-0 ml-2 bg-white rounded-2xl shadow-2xl border border-gray-100 opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-300 z-50 p-2"
                                    style={{ minWidth: '260px' }}
                                  >
                                    <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                                      {child2.children.map((child3, ci3) => (
                                        <Link
                                          key={child3._id || ci3}
                                          href={child3.href}
                                          className="block text-sm text-gray-600 px-3 py-2 hover:bg-gray-50 rounded-xl hover:text-amber-500 transition-colors duration-200 whitespace-nowrap"
                                        >
                                          {child3.name}
                                        </Link>
                                      ))}
                                    </div>
                                  </div>
                                </>
                              ) : (
                                <Link
                                  href={child2.href}
                                  className="flex items-center px-4 py-3 q8-text-oslo-gray hover:q8-text-cod-gray hover:q8-bg-alabaster rounded-xl transition-all duration-300"
                                >
                                  {child2.name}
                                </Link>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={`px-3 py-2 rounded-lg font-medium transition-all duration-300 ${isActivePath(item.href)
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

            <div className="flex items-center space-x-4 ">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-500 ease-in-out bg-gray-100 hover:bg-gray-200 text-gray-700"
                aria-label="Toggle mobile menu"
              >
                {isMenuOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </div>
        </div>

        <div className={`lg:hidden fixed top-0 left-0 h-screen w-4/5 bg-gradient-to-br from-white to-gray-50 shadow-2xl border-r border-gray-200 z-50 transform transition-all duration-500 ease-out ${isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}>
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

          <div className="flex flex-col h-full overflow-y-auto">


            <div className="flex-1 p-6 space-y-2">
              {navigationItems.map((item, index) => {
                const Icon = getIconForPath(item.href);
                return (
                  <div key={item._id || index}>
                    {item.children && item.children.length > 0 ? (
                      <>
                        <button
                          onClick={() => toggleDropdown(index)}
                          className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl font-bold transition-all duration-300 shadow-sm hover:shadow-md ${isActivePath(item.href)
                              ? "bg-gradient-to-r from-orange-100 to-orange-50 text-orange-800 border border-orange-200"
                              : "bg-white hover:bg-gradient-to-r hover:from-gray-50 hover:to-white text-gray-700 hover:text-gray-900 border border-gray-100 hover:border-gray-200"
                            }`}
                        >
                          <div className="flex items-center space-x-4">
                            <div className={`p-2 rounded-xl ${isActivePath(item.href) ? "bg-orange-200" : "bg-gray-100"
                              }`}>
                              <Icon className={`text-lg ${isActivePath(item.href) ? "text-orange-600" : "text-gray-600"
                                }`} />
                            </div>
                            <span className="text-lg">{item.name}</span>
                          </div>
                          <FaChevronDown className={`text-sm transition-transform duration-300 ${activeDropdown === index ? "rotate-180" : ""
                            }`} />
                        </button>

                        {/* Mobile Dropdown */}
                        <div className={`transition-all duration-300 overflow-hidden ${activeDropdown === index ? "max-h-screen opacity-100 mt-2" : "max-h-0 opacity-0"
                          }`}>
                          <div className="pl-3 space-y-2">
                            {item.children.map((child2, ci2) => (
                              <div key={child2._id || ci2}>
                                {child2.children && child2.children.length > 0 ? (
                                  <>
                                    <button
                                      onClick={() => toggleSubDropdown(`${index}-${ci2}`)}
                                      className="w-full flex items-center justify-between px-5 py-3 ml-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all duration-300 border-l-2 border-gray-200"
                                    >
                                      <span>{child2.name}</span>
                                      <FaChevronDown className={`text-xs transition-transform ${activeSubDropdown === `${index}-${ci2}` ? "rotate-180" : ""}`} />
                                    </button>
                                    <div className={`transition-all duration-300 overflow-hidden ${activeSubDropdown === `${index}-${ci2}` ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                                      <div className="pl-6 space-y-1 mt-1">
                                        {child2.children.map((child3, ci3) => (
                                          <Link
                                            key={child3._id || ci3}
                                            href={child3.href}
                                            className="block px-4 py-2 ml-3 text-gray-500 hover:text-gray-800 hover:bg-gray-50 rounded-lg text-sm border-l-2 border-gray-100"
                                          >
                                            {child3.name}
                                          </Link>
                                        ))}
                                      </div>
                                    </div>
                                  </>
                                ) : (
                                  <Link
                                    href={child2.href}
                                    className="block px-5 py-3 ml-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all duration-300 border-l-2 border-gray-200 hover:border-orange-300"
                                  >
                                    {child2.name}
                                  </Link>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        className={`flex items-center space-x-4 px-5 py-4 rounded-2xl font-bold transition-all duration-300 shadow-sm hover:shadow-md ${isActivePath(item.href)
                            ? "bg-gradient-to-r from-orange-100 to-orange-50 text-orange-800 border border-orange-200"
                            : "bg-white hover:bg-gradient-to-r hover:from-gray-50 hover:to-white text-gray-700 hover:text-gray-900 border border-gray-100 hover:border-gray-200"
                          }`}
                      >
                        <div className={`p-2 rounded-xl ${isActivePath(item.href) ? "bg-orange-200" : "bg-gray-100"
                          }`}>
                          <Icon className={`text-lg ${isActivePath(item.href) ? "text-orange-600" : "text-gray-600"
                            }`} />
                        </div>
                        <span className="text-lg">{item.name}</span>
                      </Link>
                    )}
                  </div>
                );
              })}

              {/* Social Media Links */}
              <div className="pt-6 mt-4 border-t border-gray-100">
                <p className="text-sm font-semibold text-gray-500 mb-4 text-center">Kết nối với chúng tôi</p>
                <div className="flex justify-center space-x-4">
                  {[
                    { name: "Facebook", icon: FaFacebookF, href: "https://facebook.com/Q8designvn", color: "text-blue-600 hover:bg-blue-50 hover:border-blue-200" },
                    { name: "LinkedIn", icon: FaLinkedin, href: "https://www.linkedin.com/company/q8-design-vietnam/", color: "text-blue-700 hover:bg-blue-50 hover:border-blue-200" },
                    { name: "Instagram", icon: FaInstagram, href: "https://instagram.com/q8design", color: "text-pink-600 hover:bg-pink-50 hover:border-pink-200" },
                    { name: "YouTube", icon: FaYoutube, href: "https://youtube.com/@q8design", color: "text-red-600 hover:bg-red-50 hover:border-red-200" },
                  ].map((social, idx) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={idx}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-10 h-10 rounded-full flex items-center justify-center bg-white shadow-sm border border-gray-100 transition-all duration-300 ${social.color}`}
                        aria-label={social.name}
                      >
                        <Icon className="text-lg" />
                      </a>
                    );
                  })}
                </div>
              </div>
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
