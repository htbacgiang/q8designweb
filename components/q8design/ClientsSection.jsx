export default function ClientsSection() {
  const clients = [
    { name: "DALTON", sub: null, icon: "lines" },
    { name: "NICK&JOAN", sub: null, icon: "rings" },
    { name: "HUSTON", sub: null, icon: "rings-lg" },
    { name: "SKYLIGHT", sub: null, icon: "star" },
    { name: "PAUL RUDD", sub: "PHOTOGRAPHER", icon: "bracket" },
    { name: "VURNIS", sub: "EST '07", icon: "sofa" },
    { name: "JACKSMITH", sub: null, icon: "grid" },
    { name: "BLAKE STAR", sub: null, icon: "starburst" },
    { name: "BANDUNG HOUSE", sub: null, icon: "house" },
    { name: "BAHAMA MUSEUM", sub: null, icon: "checker" },
    { name: "ANDREAS BIKE", sub: null, icon: "bike" },
    { name: "SOLARIS", sub: null, icon: "gear" },
  ];

  const renderIcon = (icon) => {
    const className = "w-10 h-10 text-q8-primary-700";
    switch (icon) {
      case "lines":
        return (
          <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <rect x="4" y="6" width="2" height="12" rx="1" />
            <rect x="10" y="6" width="2" height="12" rx="1" />
            <rect x="16" y="6" width="2" height="12" rx="1" />
            <rect x="7" y="4" width="2" height="16" rx="1" />
            <rect x="13" y="4" width="2" height="16" rx="1" />
          </svg>
        );
      case "rings":
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="9" />
            <circle cx="12" cy="12" r="6" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        );
      case "rings-lg":
        return (
          <svg className="w-12 h-12 text-q8-primary-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="7" />
            <circle cx="12" cy="12" r="4" />
          </svg>
        );
      case "star":
        return (
          <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z" />
          </svg>
        );
      case "bracket":
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h2M16 4h2a2 2 0 012 2v12a2 2 0 01-2 2h-2" />
          </svg>
        );
      case "sofa":
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M4 10v6h16v-6M4 10a2 2 0 012-2h12a2 2 0 012 2M4 16h16v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2z" />
          </svg>
        );
      case "grid":
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 6h4v4H4V6zM4 14h4v4H4v-4zM14 6h4v4h-4V6zM14 14h4v4h-4v-4z" />
          </svg>
        );
      case "starburst":
        return (
          <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l1.5 4.5H18l-3.5 2.5 1.5 4.5L12 11l-4 2.5 1.5-4.5L6 6.5h4.5L12 2z" />
          </svg>
        );
      case "house":
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 12l9-9 9 9M5 10v10h4v-6h6v6h4V10" />
          </svg>
        );
      case "checker":
        return (
          <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <rect x="2" y="2" width="8" height="8" />
            <rect x="14" y="2" width="8" height="8" />
            <rect x="2" y="14" width="8" height="8" />
            <rect x="14" y="14" width="8" height="8" />
          </svg>
        );
      case "bike":
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="5.5" cy="17.5" r="3.5" />
            <circle cx="18.5" cy="17.5" r="3.5" />
            <path d="M9 17h6M9 12l2-4h3l2 4M14 8h2" />
          </svg>
        );
      case "gear":
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
            <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Section label với đường trang trí */}
        <div className="flex flex-col items-center text-center mb-6">
          <span className="block w-12 h-px bg-amber-600/80 mb-2" aria-hidden />
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700/90">
            Khách hàng của chúng tôi
          </span>
          <span className="block w-12 h-px bg-amber-600/80 mt-2" aria-hidden />
        </div>

        {/* Main heading - serif style */}
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-q8-primary-900 text-center mb-6">
          Khách hàng mơ ước, chúng tôi hiện thực hóa.
        </h2>

        {/* Description */}
        <p className="text-q8-primary-600 text-center max-w-2xl mx-auto mb-12 text-base leading-relaxed">
          Chúng tôi lắng nghe và đồng hành cùng quý khách từ ý tưởng đến hiện thực. Mỗi dự án là cam kết về chất lượng và sự hài lòng.
        </p>

        {/* Client logos grid - 2 rows x 6 cols */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
          {clients.map((client, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-6 rounded-lg border-2 border-dashed border-q8-primary-300 bg-q8-primary-50/50 hover:border-amber-500/50 hover:bg-amber-50/30 transition-colors duration-300"
            >
              <div className="flex-shrink-0 mb-3 flex items-center justify-center">
                {renderIcon(client.icon)}
              </div>
              <span className="text-q8-primary-900 font-semibold text-sm text-center uppercase tracking-wide">
                {client.name}
              </span>
              {client.sub && (
                <span className="text-q8-primary-600 text-xs mt-0.5 uppercase tracking-wider">
                  {client.sub}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
