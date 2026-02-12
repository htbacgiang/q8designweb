import { ChangeEventHandler, FC, useEffect, useState } from "react";
import classnames from "classnames";
import slugify from "slugify";
import SeoAnalysisV2 from "./SeoAnalysisV2";

// Ánh xạ ký tự tiếng Việt
const vietnameseCharMap: { [key: string]: string } = {
  á: "a",
  à: "a",
  ả: "a",
  ã: "a",
  ạ: "a",
  ă: "a",
  ắ: "a",
  ằ: "a",
  ẳ: "a",
  ẵ: "a",
  ặ: "a",
  â: "a",
  ấ: "a",
  ầ: "a",
  ẩ: "a",
  ẫ: "a",
  ậ: "a",
  é: "e",
  è: "e",
  ẻ: "e",
  ẽ: "e",
  ẹ: "e",
  ê: "e",
  ế: "e",
  ề: "e",
  ể: "e",
  ễ: "e",
  ệ: "e",
  í: "i",
  ì: "i",
  ỉ: "i",
  ĩ: "i",
  ị: "i",
  ó: "o",
  ò: "o",
  ỏ: "o",
  õ: "o",
  ọ: "o",
  ô: "o",
  ố: "o",
  ồ: "o",
  ổ: "o",
  ỗ: "o",
  ộ: "o",
  ơ: "o",
  ớ: "o",
  ờ: "o",
  ở: "o",
  ỡ: "o",
  ợ: "o",
  ú: "u",
  ù: "u",
  ủ: "u",
  ũ: "u",
  ụ: "u",
  ư: "u",
  ứ: "u",
  ừ: "u",
  ử: "u",
  ữ: "u",
  ự: "u",
  ý: "y",
  ỳ: "y",
  ỷ: "y",
  ỹ: "y",
  ỵ: "y",
  đ: "d",
  Á: "A",
  À: "A",
  Ả: "A",
  Ã: "A",
  Ạ: "A",
  Ă: "A",
  Ắ: "A",
  Ằ: "A",
  Ẳ: "A",
  Ẵ: "A",
  Ặ: "A",
  Â: "A",
  Ấ: "A",
  Ầ: "A",
  Ẩ: "A",
  Ẫ: "A",
  Ậ: "A",
  É: "E",
  È: "E",
  Ẻ: "E",
  Ẽ: "E",
  Ẹ: "E",
  Ê: "E",
  Ế: "E",
  Ề: "E",
  Ể: "E",
  Ễ: "E",
  Ệ: "E",
  Í: "I",
  Ì: "I",
  Ỉ: "I",
  Ĩ: "I",
  Ị: "I",
  Ó: "O",
  Ò: "O",
  Ỏ: "O",
  Õ: "O",
  Ọ: "O",
  Ô: "O",
  Ố: "O",
  Ồ: "O",
  Ổ: "O",
  Ỗ: "O",
  Ộ: "O",
  Ơ: "O",
  Ớ: "O",
  Ờ: "O",
  Ở: "O",
  Ỡ: "O",
  Ợ: "O",
  Ú: "U",
  Ù: "U",
  Ủ: "U",
  Ũ: "U",
  Ụ: "U",
  Ư: "U",
  Ứ: "U",
  Ừ: "U",
  Ử: "U",
  Ữ: "U",
  Ự: "U",
  Ý: "Y",
  Ỳ: "Y",
  Ỷ: "Y",
  Ỹ: "Y",
  Ỵ: "Y",
  Đ: "D",
};

// Cấu hình slugify để hỗ trợ tiếng Việt
slugify.extend(vietnameseCharMap);

export interface SeoResult {
  meta: string;
  slug: string;
  tags: string;
  category: string;
  focusKeyword: string;
}

interface Props {
  initialValue?: SeoResult;
  title?: string;
  editor?: any;
  onChange(result: SeoResult): void;
}

const commonInput =
  "w-full bg-transparent outline-none border-2 border-secondary-dark focus:border-primary-dark focus:dark:border-primary rounded transition text-dark dark:text-primary p-2";

const SEOForm: FC<Props> = ({
  initialValue,
  title = "",
  editor,
  onChange,
}): JSX.Element => {
  // Initialize state with all SeoResult fields, including tags
  const [values, setValues] = useState<SeoResult>({
    meta: "",
    slug: "",
    tags: "",
    category: "",
    focusKeyword: "",
  });
  
  // Track if slug has been manually edited
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false);

  const handleChange: ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
  > = ({ target }) => {
    let { name, value } = target;
    if (name === "meta") value = value.substring(0, 250);
    
    // Trim category để đảm bảo khớp với các option trong select
    if (name === "category") {
      value = value.trim();
    }
    
    // If slug is being edited manually
    if (name === "slug") {
      // If slug is cleared, allow auto-generation again
      if (!value || value.trim() === "") {
        setIsSlugManuallyEdited(false);
      } else {
        // Otherwise, mark as manually edited
        setIsSlugManuallyEdited(true);
      }
    }
    
    const newValues = { ...values, [name]: value };
    setValues(newValues);
    onChange(newValues);
  };

  // Only auto-generate slug from title if:
  // 1. Slug is empty (always allow auto-generation when empty)
  // 2. Slug exists but hasn't been manually edited
  useEffect(() => {
    if (title) {
      // If slug is empty, always auto-generate
      // If slug exists but hasn't been manually edited, auto-generate
      if (!values.slug || !isSlugManuallyEdited) {
        const slug = slugify(title.toLowerCase(), {
          strict: true,
        });
        setValues((prevValues) => {
          const newValues = { ...prevValues, slug };
          onChange(newValues);
          return newValues;
        });
      }
    }
  }, [title, values.slug, isSlugManuallyEdited, onChange]);

  useEffect(() => {
    if (initialValue) {
      const hasExistingSlug = !!initialValue.slug;
      // Trim category để đảm bảo khớp với các option trong select
      const categoryValue = initialValue.category ? initialValue.category.trim() : "";
      const newValues = {
        meta: initialValue.meta || "",
        slug: slugify(initialValue.slug || "", {
          strict: true,
        }),
        tags: initialValue.tags || "",
        category: categoryValue,
        focusKeyword: initialValue.focusKeyword || "",
      };
      setValues(newValues);
      // Luôn gọi onChange khi khởi tạo từ initialValue để đảm bảo post state được cập nhật
      // Sử dụng setTimeout để đảm bảo state đã được set trước khi gọi onChange
      setTimeout(() => {
        onChange(newValues);
      }, 0);
      // If initialValue has a slug, it means it's been set before, so mark as manually edited
      // This prevents auto-generation from overwriting existing slug
      // If slug is empty, allow auto-generation from title
      setIsSlugManuallyEdited(hasExistingSlug);
    } else {
      // Reset when initialValue is cleared
      setIsSlugManuallyEdited(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValue]);

  const { meta, slug, category, focusKeyword } = values;

  // Danh sách các category options
  const categoryOptions = [
    "Thiết kế kiến trúc",
    "Thiết kế nội thất",
    "Thi công xây dựng",
    "Cải tạo không gian",
    "Xu hướng thiết kế",
    "Dự án hoàn thành",
    "Tin tức công ty",
  ];

  // Kiểm tra xem category hiện tại có trong danh sách options không
  // Nếu không có và category có giá trị, thêm nó vào để hiển thị
  const displayOptions = [...categoryOptions];
  if (category && category.trim() !== '' && !categoryOptions.includes(category.trim())) {
    displayOptions.push(category.trim());
  }

  return (
    <div className="space-y-6">
      <h3 className="seo-form-title">
        <span>🔍</span>
        Tối ưu SEO
      </h3>
      
      {/* Focus Keyword */}
      <div className="seo-form-group">
        <label className="seo-form-label">
          Từ khóa chính:
        </label>
        <input
          type="text"
          name="focusKeyword"
          value={focusKeyword}
          onChange={handleChange}
          className="seo-form-input"
          placeholder="Nhập từ khóa chính để phân tích SEO"
        />
      </div>
      
      <div className="seo-form-grid">
        <div className="seo-form-group">
          <label className="seo-form-label">
            Danh mục:
          </label>
          <select
            name="category"
            value={category}
            onChange={handleChange}
            className="seo-form-input"
          >
            <option value="" disabled>
              Chọn một danh mục
            </option>
            {displayOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        
        <div className="seo-form-group">
          <Input
            value={slug}
            onChange={handleChange}
            name="slug"
            placeholder="Tối ưu đường dẫn"
            label="Slug: "
          />
        </div>
      </div>

      <div className="seo-form-group">
        <label className="seo-form-label">
          Meta Description:
        </label>
        <div className="relative">
          <textarea
            name="meta"
            value={meta}
            onChange={handleChange}
            className="seo-form-input seo-form-textarea"
            placeholder="Meta description 160-200 ký tự thì ok"
          ></textarea>
          <p className="absolute bottom-3 right-3 text-dark dark:text-white text-sm">
            {meta.length}/250
          </p>
        </div>
      </div>

      {/* SEO Analysis */}
      <div className="mt-6">
        <h4 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
          🔍 Phân tích SEO
        </h4>
        
        {!focusKeyword ? (
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg">
            <p className="text-blue-800 dark:text-blue-200 text-center">
              💡 Nhập từ khóa chính ở trên để bắt đầu phân tích SEO
            </p>
          </div>
        ) : (
          <div>
            <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg mb-4">
              <p className="text-green-800 dark:text-green-200 text-center">
                ✅ Từ khóa: &quot;{focusKeyword}&quot; - Đang phân tích...
              </p>
            </div>
            {(() => {
              try {
                return (
                  <SeoAnalysisV2
                    editor={editor}
                    title={title}
                    meta={meta}
                    slug={slug}
                    focusKeyword={focusKeyword}
                  />
                );
              } catch (error) {
                console.error('Error rendering SeoAnalysis:', error);
                return (
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg">
                    <p className="text-red-800 dark:text-red-200 text-center">
                      ❌ Lỗi khi tải phân tích SEO. Vui lòng thử lại.
                    </p>
                  </div>
                );
              }
            })()}
          </div>
        )}
      </div>
    </div>
  );
};

const Input: FC<{
  name?: string;
  value?: string;
  placeholder?: string;
  label?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}> = ({ name, value, placeholder, label, onChange }) => {
  return (
    <label className="block relative">
      <span className="seo-form-label">
        {label}
      </span>

      <input
        type="text"
        name={name}
        value={value}
        placeholder={placeholder}
        className="seo-form-input"
        onChange={onChange}
      />
    </label>
  );
};

export default SEOForm;