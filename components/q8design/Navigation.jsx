import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  FaBars,
  FaTimes,
  FaChevronDown,
} from "react-icons/fa";

const DESKTOP_BREAKPOINT = 1024;

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeSubDropdown, setActiveSubDropdown] = useState(null);
  const [navigationItems, setNavigationItems] = useState([]);
  const router = useRouter();

  // Load navigation từ API
  useEffect(() => {
    fetch("/api/navigation")
      .then((r) => r.json())
      .then((d) => {
        if (d.success && Array.isArray(d.items)) {
          setNavigationItems(d.items.filter((i) => i.isActive !== false));
        }
      })
      .catch(() => {});
  }, []);

  // Detect desktop và scroll
  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= DESKTOP_BREAKPOINT);
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    checkDesktop();
    handleScroll();
    window.addEventListener("resize", checkDesktop);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("resize", checkDesktop);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
    setActiveSubDropdown(null);
  }, [router.asPath]);

  const isActivePath = (href) => {
    if (href === "/") return router.pathname === "/";
    return router.pathname.startsWith(href);
  };

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
    setActiveSubDropdown(null);
  };

  const toggleSubDropdown = (key) => {
    setActiveSubDropdown(activeSubDropdown === key ? null : key);
  };

  const isTransparentNav = !isScrolled;

  return (
    <>
      {/* Main Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ease-in-out ${
          isScrolled ? "bg-white shadow-lg border-b" : ""
        }`}
        style={{
          borderColor: isScrolled ? "var(--q8-alabaster)" : "transparent",
          ...(isTransparentNav ? { backgroundColor: "transparent" } : {}),
        }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link
              href="/"
              className={`q8-logo group flex items-center transition-all duration-500 ease-in-out ${
                isTransparentNav ? "brightness-0 invert" : ""
              }`}
            >
              <div className="relative group-hover:scale-105 transition-transform duration-300">
                <Image
                  src="/logo-q8.png"
                  alt="Q8 Design Logo"
                  width={150}
                  height={50}
                  priority
                  className="md:h-10 h-8 w-auto object-contain"
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item, index) => (
                <div key={item._id || index} className="relative group">
                  {item.children && item.children.length > 0 ? (
                    <>
                      <button
                        className={`flex items-center space-x-1 px-3 py-2 rounded-lg font-medium transition-all duration-300 ${
                          isTransparentNav
                            ? "text-white hover:text-white/90 hover:bg-white/10"
                            : isActivePath(item.href)
                            ? "q8-text-brand q8-bg-light"
                            : "q8-text-secondary hover:q8-text-brand hover:q8-bg-light"
                        }`}
                      >
                        <span>{item.name}</span>
                        <FaChevronDown className="text-xs transition-transform group-hover:rotate-180" />
                      </button>

                      {/* Level 2 Dropdown */}
                      <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <div className="p-2">
                          {item.children.map((child2, ci2) => (
                            <div key={child2._id || ci2} className="relative group/sub">
                              {child2.children && child2.children.length > 0 ? (
                                <>
                                  <div className="flex items-center justify-between px-4 py-3 q8-text-oslo-gray hover:q8-text-cod-gray hover:q8-bg-alabaster rounded-xl transition-all duration-300 cursor-default">
                                    <span>{child2.name}</span>
                                    <FaChevronDown className="text-xs -rotate-90" />
                                  </div>
                                  {/* Level 3 Dropdown */}
                                  <div className="absolute left-full top-0 ml-1 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-300">
                                    <div className="p-2">
                                      {child2.children.map((child3, ci3) => (
                                        <Link
                                          key={child3._id || ci3}
                                          href={child3.href}
                                          className="block px-4 py-3 q8-text-oslo-gray hover:q8-text-cod-gray hover:q8-bg-alabaster rounded-xl transition-all duration-300"
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
                                  className="block px-4 py-3 q8-text-oslo-gray hover:q8-text-cod-gray hover:q8-bg-alabaster rounded-xl transition-all duration-300"
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
                      className={`px-3 py-2 rounded-lg font-medium transition-all duration-300 ${
                        isTransparentNav
                          ? "text-white hover:text-white/90 hover:bg-white/10"
                          : isActivePath(item.href)
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

            {/* Mobile Menu Button */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`lg:hidden w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-500 ease-in-out ${
                  isTransparentNav
                    ? "text-white hover:bg-white/10"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
                aria-label="Toggle mobile menu"
              >
                {isMenuOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer */}
        <div
          className={`lg:hidden fixed top-0 left-0 h-screen w-4/5 bg-gradient-to-br from-white to-gray-50 shadow-2xl border-r border-gray-200 z-50 transform transition-all duration-500 ease-out ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-white/80 backdrop-blur-sm">
            <Link href="/" className="q8-logo group flex items-center">
              <Image src="/logo-q8.png" alt="Q8 Design Logo" width={120} height={40} priority className="h-8 w-auto object-contain" />
            </Link>
            <button onClick={() => setIsMenuOpen(false)} className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition">
              <FaTimes />
            </button>
          </div>

          <div className="flex flex-col h-full overflow-y-auto">
            <div className="flex-1 p-6 space-y-3">
              {navigationItems.map((item, index) => (
                <div key={item._id || index}>
                  {item.children && item.children.length > 0 ? (
                    <>
                      <button
                        onClick={() => toggleDropdown(index)}
                        className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl font-bold transition-all duration-300 shadow-sm hover:shadow-md ${
                          isActivePath(item.href)
                            ? "bg-gradient-to-r from-orange-100 to-orange-50 text-orange-800 border border-orange-200"
                            : "bg-white hover:bg-gradient-to-r hover:from-gray-50 hover:to-white text-gray-700 border border-gray-100"
                        }`}
                      >
                        <span className="text-lg">{item.name}</span>
                        <FaChevronDown
                          className={`text-sm transition-transform duration-300 ${
                            activeDropdown === index ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {/* Level 2 mobile */}
                      <div
                        className={`transition-all duration-300 overflow-hidden ${
                          activeDropdown === index ? "max-h-screen opacity-100 mt-2" : "max-h-0 opacity-0"
                        }`}
                      >
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
                                  {/* Level 3 mobile */}
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
                      className={`flex items-center px-5 py-4 rounded-2xl font-bold transition-all duration-300 shadow-sm hover:shadow-md ${
                        isActivePath(item.href)
                          ? "bg-gradient-to-r from-orange-100 to-orange-50 text-orange-800 border border-orange-200"
                          : "bg-white hover:bg-gradient-to-r hover:from-gray-50 hover:to-white text-gray-700 border border-gray-100"
                      }`}
                    >
                      <span className="text-lg">{item.name}</span>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-gradient-to-r from-black/40 to-black/20 backdrop-blur-md lg:hidden transition-opacity duration-500"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
}
