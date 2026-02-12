# Q8 Design Website Layout Components

Hệ thống layout hoàn chỉnh cho website Q8 Design - công ty thiết kế và thi công nội thất.

## 📁 Cấu trúc Components

### 🏠 Trang chủ (Homepage)
- `HomePage.jsx` - Trang chủ chính tích hợp tất cả sections
- `HeroSection.jsx` - Hero banner với slider và CTA
- `AboutSection.jsx` - Giới thiệu 4 giá trị cốt lõi
- `ServicesSection.jsx` - Dịch vụ nổi bật với hình ảnh
- `ProjectsSection.jsx` - Gallery dự án + 3D tours
- `TestimonialsSection.jsx` - Đánh giá khách hàng với video
- `BlogSection.jsx` - Tin tức & kiến thức mới nhất
- `Footer.jsx` - Footer với thông tin liên hệ

### 📋 Các trang chính
- `AboutPage.jsx` - Trang giới thiệu chi tiết
- `ServicesPage.jsx` - Trang dịch vụ với phân loại
- `ProjectsPage.jsx` - Trang dự án với bộ lọc
- `ProjectDetailPage.jsx` - Trang chi tiết dự án
- `ContactPage.jsx` - Trang liên hệ & đặt lịch tư vấn
- `CareerPage.jsx` - Trang tuyển dụng

### 🧭 Navigation
- `Navigation.jsx` - Header navigation với dropdown

## 🎨 Thiết kế & Features

### Màu sắc chính
- **Orange**: #F97316 (Primary brand color)
- **Blue**: #3B82F6 (Secondary)
- **Gray**: #1F2937 (Text)
- **White**: #FFFFFF (Background)

### Tính năng nổi bật
- ✅ Responsive design (Mobile-first)
- ✅ Smooth animations & transitions
- ✅ Interactive components
- ✅ SEO optimized structure
- ✅ Accessibility support
- ✅ Modern UI/UX patterns

### Components có tính tương tác
- Image galleries với navigation
- Form liên hệ & đặt lịch tư vấn
- Filter & search cho dự án
- Modal windows
- Dropdown menus
- Carousel testimonials

## 📱 Responsive Breakpoints

```css
- Mobile: < 768px
- Tablet: 768px - 1023px  
- Desktop: 1024px+
- Large: 1280px+
```

## 🚀 Cách sử dụng

### 1. Import components
```jsx
import HomePage from './components/q8design/HomePage';
import Navigation from './components/q8design/Navigation';
```

### 2. Sử dụng trong Next.js pages
```jsx
// pages/index.js
import Navigation from '../components/q8design/Navigation';
import HomePage from '../components/q8design/HomePage';

export default function Home() {
  return (
    <>
      <Navigation />
      <HomePage />
    </>
  );
}
```

### 3. Trang About
```jsx
// pages/gioi-thieu.js
import Navigation from '../components/q8design/Navigation';
import AboutPage from '../components/q8design/AboutPage';

export default function About() {
  return (
    <>
      <Navigation />
      <AboutPage />
    </>
  );
}
```

## 🖼️ Hình ảnh cần thiết

### Tạo thư mục images/q8design/ với các file:
```
/images/q8design/
├── hero-bg.jpg (1920x1080)
├── about-image.jpg (600x400)
├── service-*.jpg (600x400 each)
├── project-*.jpg (600x400 each)
├── team-*.jpg (400x400 each)
├── client-*.jpg (300x300 each)
├── blog-*.jpg (600x400 each)
└── office-workspace.jpg (600x400)
```

### Kích thước khuyến nghị
- **Hero images**: 1920x1080px
- **Service images**: 600x400px
- **Project images**: 800x600px
- **Team photos**: 400x400px
- **Blog thumbnails**: 600x400px

## 📝 Customization

### Thay đổi màu sắc
Chỉnh sửa trong file Tailwind CSS:
```css
colors: {
  orange: {
    500: '#F97316', // Primary brand color
    600: '#EA580C'  // Hover state
  }
}
```

### Cập nhật nội dung
Tất cả text content được hardcode trong components, có thể dễ dàng thay đổi:
- Company info trong `Footer.jsx`
- Navigation items trong `Navigation.jsx`
- Service details trong `ServicesSection.jsx`

### Form integration
Forms hiện tại sử dụng mock data. Để tích hợp thực tế:
1. Tạo API endpoints
2. Thay thế handleSubmit functions
3. Thêm validation libraries (yup, joi, etc.)

## 🛠️ Dependencies

Components này sử dụng:
- Next.js
- React
- Tailwind CSS
- React Icons (fa, si)
- Next Image

## 📞 Support

Layout này được thiết kế dựa trên yêu cầu cụ thể cho Q8 Design. Mọi thay đổi có thể được thực hiện bằng cách chỉnh sửa trực tiếp các component files.

### Cấu trúc trang theo yêu cầu:
✅ Trang chủ với đầy đủ sections
✅ Trang giới thiệu với timeline & team
✅ Trang dịch vụ phân loại chi tiết  
✅ Trang dự án với gallery & filters
✅ Trang liên hệ với form đặt lịch
✅ Trang tuyển dụng với job listings
✅ Responsive trên tất cả devices
✅ Modern UI/UX design
