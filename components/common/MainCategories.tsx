import { FC, useState } from "react";

interface Props {
  onCategorySelect: (category: string | null) => void; // Hàm xử lý khi danh mục được chọn
}

const MainCategories: FC<Props> = ({ onCategorySelect }) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const handleCategoryClick = (category: string | null) => {
    setActiveCategory(category);
    onCategorySelect(category);
  };

  const categories = [
    { key: null, label: "Tất cả" },
    { key: "Thiết kế kiến trúc", label: "Thiết kế kiến trúc" },
    { key: "Thiết kế nội thất", label: "Thiết kế nội thất" },
    { key: "Thi công xây dựng", label: "Thi công xây dựng" },
    { key: "Cải tạo không gian", label: "Cải tạo không gian" },
    { key: "Xu hướng ", label: "Xu hướng" },
    { key: "Dự án hoàn thành", label: "Dự án hoàn thành" },
    { key: "Tin tức công ty", label: "Tin tức công ty" },
  ];

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-8xl">
        {/* Categories Filter */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-2">
          {categories.map((category) => (
            <button
              key={category.key || 'all'}
              onClick={() => handleCategoryClick(category.key)}
              className={`px-3 md:px-5 py-3 rounded-full font-medium transition-all duration-300 border ${
                activeCategory === category.key
                  ? "bg-q8-primary-900 text-white border-q8-primary-900 shadow-lg transform scale-105"
                  : "bg-white hover:bg-q8-primary-50 text-q8-primary-600 hover:text-q8-primary-900 border-q8-primary-200 hover:border-q8-primary-300"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};

export default MainCategories;
