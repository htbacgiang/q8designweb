import { useState } from "react";
import Image from "next/image";
import { 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope, 
  FaClock,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaPaperPlane,
  FaUser,
  FaHome,
  FaRuler,
  FaDollarSign,
  FaCalendarAlt,
  FaCheckCircle
} from "react-icons/fa";
import { SiZalo } from "react-icons/si";

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState("contact");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    projectType: "",
    area: "",
    budget: "",
    location: "",
    message: "",
    consultationDate: "",
    consultationTime: "",
    consultationType: "office"
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errors, setErrors] = useState({});

  const contactInfo = {
    address: "Đ. Nam An Khánh - KĐT Nam An Khánh - Hà Nội",
    phone: "098 811 68 28",
    email: "info@q8design.vn",
    workingHours: {
      weekdays: "Thứ 2 - Thứ 7: 8:00 - 18:00",
      weekend: "Chủ nhật: 9:00 - 17:00"
    }
  };

  const socialLinks = [
    { name: "Facebook", icon: FaFacebookF, url: "https://facebook.com/q8design", color: "bg-blue-600" },
    { name: "Instagram", icon: FaInstagram, url: "https://instagram.com/q8design", color: "bg-pink-600" },
    { name: "YouTube", icon: FaYoutube, url: "https://youtube.com/@q8design", color: "bg-red-600" },
    { name: "Zalo", icon: SiZalo, url: "https://zalo.me/q8design", color: "bg-blue-500" }
  ];

  const projectTypes = [
    "Thiết kế nội thất căn hộ",
    "Thiết kế nội thất nhà phố", 
    "Thiết kế nội thất biệt thự",
    "Thiết kế kiến trúc",
    "Thi công trọn gói",
    "Cải tạo không gian",
    "Thiết kế thương mại",
    "Khác"
  ];

  const budgetRanges = [
    "Dưới 500 triệu",
    "500 triệu - 1 tỷ",
    "1 - 2 tỷ", 
    "2 - 3 tỷ",
    "3 - 5 tỷ",
    "Trên 5 tỷ",
    "Chưa xác định"
  ];

  const timeSlots = [
    "09:00 - 10:00",
    "10:00 - 11:00", 
    "14:00 - 15:00",
    "15:00 - 16:00",
    "16:00 - 17:00"
  ];

  const validateForm = () => {
    const newErrors = {};

    // Validate required fields
    if (!formData.name.trim()) {
      newErrors.name = 'Họ và tên là bắt buộc';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Số điện thoại là bắt buộc';
    } else {
      // Basic phone validation
      const phoneRegex = /^[0-9+\-\s()]+$/;
      if (!phoneRegex.test(formData.phone)) {
        newErrors.phone = 'Số điện thoại không hợp lệ';
      }
    }

    // Validate email if provided
    if (formData.email && formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Email không hợp lệ';
      }
    }

    // Validate consultation date if provided
    if (formData.consultationDate) {
      const selectedDate = new Date(formData.consultationDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.consultationDate = 'Ngày tư vấn phải là ngày trong tương lai';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form before submitting
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      const response = await fetch('/api/consultation/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus("success");
        setErrors({});
        // Reset form
        setFormData({
          name: "",
          phone: "",
          email: "",
          projectType: "",
          area: "",
          budget: "",
          location: "",
          message: "",
          consultationDate: "",
          consultationTime: "",
          consultationType: "office"
        });
      } else {
        setSubmitStatus("error");
        console.error('API Error:', result.message);
      }
    } catch (error) {
      setSubmitStatus("error");
      console.error('Network Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">

      {/* Contact Information */}
      <section className="py-20 bg-q8-primary-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-q8-primary-900 mb-8">
                Thông tin liên hệ
              </h2>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-q8-primary-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <FaMapMarkerAlt className="text-q8-primary-900 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-q8-primary-900 mb-2">Địa chỉ văn phòng</h3>
                    <p className="text-q8-primary-700 leading-relaxed">{contactInfo.address}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-q8-primary-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <FaPhone className="text-q8-primary-900 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-q8-primary-900 mb-2">Hotline</h3>
                    <a 
                      href={`tel:${contactInfo.phone}`}
                      className="text-q8-primary-900 hover:text-q8-primary-700 font-medium text-lg transition-colors"
                    >
                      {contactInfo.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-q8-primary-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <FaEnvelope className="text-q8-primary-900 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-q8-primary-900 mb-2">Email</h3>
                    <a 
                      href={`mailto:${contactInfo.email}`}
                      className="text-q8-primary-900 hover:text-q8-primary-700 font-medium transition-colors"
                    >
                      {contactInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-q8-primary-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <FaClock className="text-q8-primary-900 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-q8-primary-900 mb-2">Giờ làm việc</h3>
                    <p className="text-q8-primary-700">{contactInfo.workingHours.weekdays}</p>
                    <p className="text-q8-primary-700">{contactInfo.workingHours.weekend}</p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <p className="text-lg font-bold text-q8-primary-900 mb-4">Kết nối với chúng tôi</p>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-12 h-12 ${social.color} rounded-xl flex items-center justify-center text-white hover:scale-110 transition-transform duration-300`}
                      >
                        <Icon className="text-xl" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Map */}
            <div>
              <div className="bg-white rounded-3xl overflow-hidden shadow-lg h-96">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.6931492790413!2d105.73003059999999!3d21.0049339!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313453846a7a3503%3A0xecf0fd0145acf7f2!2sQ8%20Desgin%20Vi%E1%BB%87t%20Nam!5e0!3m2!1svi!2s!4v1760493342624!5m2!1svi!2s" 
                  width="100%" 
                  height="100%" 
                  style={{border: 0}} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact/Booking Form */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {activeTab === "contact" ? (
              /* Contact Form */
              <div>
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-q8-primary-900 mb-4">
                    Gửi yêu cầu tư vấn
                  </h2>
                  <p className="text-lg text-q8-primary-600 max-w-2xl mx-auto">
                    Điền thông tin dưới đây để chúng tôi có thể hỗ trợ bạn tốt nhất. 
                    Chúng tôi sẽ phản hồi trong vòng 24 giờ.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 px-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-2">
                    <div>
                      <label className="block text-sm font-medium text-q8-primary-700 mb-2">
                        Họ và tên *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-q8-primary-900 focus:border-transparent ${
                            errors.name ? 'border-red-500' : 'border-q8-primary-300'
                          }`}
                          placeholder="Nhập họ và tên của bạn"
                        />
                        <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-q8-primary-400" />
                      </div>
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-q8-primary-700 mb-2">
                        Số điện thoại *
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-q8-primary-900 focus:border-transparent ${
                            errors.phone ? 'border-red-500' : 'border-q8-primary-300'
                          }`}
                          placeholder="Nhập số điện thoại"
                        />
                        <FaPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-q8-primary-400" />
                      </div>
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-q8-primary-700 mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-q8-primary-900 focus:border-transparent ${
                          errors.email ? 'border-red-500' : 'border-q8-primary-300'
                        }`}
                        placeholder="Nhập địa chỉ email"
                      />
                      <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-q8-primary-400" />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-q8-primary-700 mb-2">
                        Loại dự án
                      </label>
                      <select
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleInputChange}
                        className="w-full py-3 px-4 border border-q8-primary-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-q8-primary-900 focus:border-transparent"
                      >
                        <option value="">Chọn loại dự án</option>
                        {projectTypes.map((type, index) => (
                          <option key={index} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-q8-primary-700 mb-2">
                        Diện tích (m²)
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="area"
                          value={formData.area}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-4 py-3 border border-q8-primary-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-q8-primary-900 focus:border-transparent"
                          placeholder="VD: 80m², 120m²"
                        />
                        <FaRuler className="absolute left-4 top-1/2 transform -translate-y-1/2 text-q8-primary-400" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-q8-primary-700 mb-2">
                        Ngân sách dự kiến
                      </label>
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        className="w-full py-3 px-4 border border-q8-primary-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-q8-primary-900 focus:border-transparent"
                      >
                        <option value="">Chọn mức ngân sách</option>
                        {budgetRanges.map((range, index) => (
                          <option key={index} value={range}>{range}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-q8-primary-700 mb-2">
                        Vị trí dự án
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-4 py-3 border border-q8-primary-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-q8-primary-900 focus:border-transparent"
                          placeholder="VD: Hà Nội, TP.HCM"
                        />
                        <FaMapMarkerAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-q8-primary-400" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-q8-primary-700 mb-2">
                      Mô tả chi tiết
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full py-3 px-4 border border-q8-primary-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-q8-primary-900 focus:border-transparent resize-none"
                      placeholder="Mô tả chi tiết về dự án, yêu cầu đặc biệt hoặc câu hỏi của bạn..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-q8-primary-900 hover:bg-q8-primary-700 disabled:bg-q8-primary-400 text-white font-bold py-4 px-6 rounded-xl transition-colors duration-300 flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        Đang gửi...
                      </div>
                    ) : (
                      <>
                        <FaPaperPlane className="mr-3" />
                        Gửi yêu cầu tư vấn
                      </>
                    )}
                  </button>
                </form>
              </div>
            ) : (
              /* Booking Form */
              <div>
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-q8-primary-900 mb-4">
                    Đặt lịch tư vấn cùng chuyên gia Q8 Design
                  </h2>
                  <p className="text-lg text-q8-primary-600 max-w-2xl mx-auto">
                    Hãy để các kiến trúc sư giàu kinh nghiệm của chúng tôi lắng nghe và đưa ra 
                    những giải pháp thiết kế phù hợp nhất với bạn.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-q8-primary-700 mb-2">
                        Họ và tên *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full py-3 px-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-q8-primary-900 focus:border-transparent ${
                          errors.name ? 'border-red-500' : 'border-q8-primary-300'
                        }`}
                        placeholder="Nhập họ và tên"
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-q8-primary-700 mb-2">
                        Số điện thoại *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full py-3 px-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-q8-primary-900 focus:border-transparent ${
                          errors.phone ? 'border-red-500' : 'border-q8-primary-300'
                        }`}
                        placeholder="Nhập số điện thoại"
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-q8-primary-700 mb-2">
                      Loại công trình *
                    </label>
                    <select
                      name="projectType"
                      required
                      value={formData.projectType}
                      onChange={handleInputChange}
                      className="w-full py-3 px-4 border border-q8-primary-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-q8-primary-900 focus:border-transparent"
                    >
                      <option value="">Chọn loại công trình</option>
                      {projectTypes.map((type, index) => (
                        <option key={index} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-q8-primary-700 mb-4">
                      Hình thức tư vấn
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <label className="flex items-center p-4 border border-q8-primary-300 rounded-xl cursor-pointer hover:bg-q8-primary-50 transition-colors">
                        <input
                          type="radio"
                          name="consultationType"
                          value="office"
                          checked={formData.consultationType === "office"}
                          onChange={handleInputChange}
                          className="text-q8-primary-900 focus:ring-q8-primary-900"
                        />
                        <div className="ml-3">
                          <div className="font-medium text-q8-primary-900">Tại văn phòng</div>
                          <div className="text-sm text-q8-primary-600">Gặp mặt trực tiếp tại văn phòng Q8 Design</div>
                        </div>
                      </label>
                      
                      <label className="flex items-center p-4 border border-q8-primary-300 rounded-xl cursor-pointer hover:bg-q8-primary-50 transition-colors">
                        <input
                          type="radio"
                          name="consultationType"
                          value="online"
                          checked={formData.consultationType === "online"}
                          onChange={handleInputChange}
                          className="text-q8-primary-900 focus:ring-q8-primary-900"
                        />
                        <div className="ml-3">
                          <div className="font-medium text-q8-primary-900">Trực tuyến</div>
                          <div className="text-sm text-q8-primary-600">Tư vấn qua video call hoặc điện thoại</div>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-q8-primary-700 mb-2">
                        Ngày mong muốn *
                      </label>
                      <input
                        type="date"
                        name="consultationDate"
                        required
                        value={formData.consultationDate}
                        onChange={handleInputChange}
                        min={new Date().toISOString().split('T')[0]}
                        className={`w-full py-3 px-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-q8-primary-900 focus:border-transparent ${
                          errors.consultationDate ? 'border-red-500' : 'border-q8-primary-300'
                        }`}
                      />
                      {errors.consultationDate && (
                        <p className="mt-1 text-sm text-red-600">{errors.consultationDate}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-q8-primary-700 mb-2">
                        Khung giờ mong muốn *
                      </label>
                      <select
                        name="consultationTime"
                        required
                        value={formData.consultationTime}
                        onChange={handleInputChange}
                        className="w-full py-3 px-4 border border-q8-primary-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-q8-primary-900 focus:border-transparent"
                      >
                        <option value="">Chọn khung giờ</option>
                        {timeSlots.map((slot, index) => (
                          <option key={index} value={slot}>{slot}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-q8-primary-700 mb-2">
                      Ghi chú thêm
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full py-3 px-4 border border-q8-primary-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-q8-primary-900 focus:border-transparent resize-none"
                      placeholder="Thông tin thêm về dự án hoặc yêu cầu đặc biệt..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-q8-primary-900 hover:bg-q8-primary-700 disabled:bg-q8-primary-400 text-white font-bold py-4 px-6 rounded-xl transition-colors duration-300 flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        Đang gửi...
                      </div>
                    ) : (
                      <>
                        <FaCalendarAlt className="mr-3" />
                        Gửi yêu cầu đặt lịch
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}

            {/* Success/Error Messages */}
            {submitStatus === "success" && (
              <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-xl">
                <div className="flex items-center">
                  <FaCheckCircle className="text-green-500 text-2xl mr-4" />
                  <div>
                    <h3 className="text-lg font-bold text-green-800 mb-2">
                      Gửi thành công!
                    </h3>
                    <p className="text-green-700">
                      Cảm ơn bạn đã liên hệ với Q8 Design. Chúng tôi sẽ phản hồi trong vòng 24 giờ.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {submitStatus === "error" && (
              <div className="mt-8 p-6 bg-red-50 border border-red-200 rounded-xl">
                <div className="flex items-center">
                  <div className="text-red-500 text-2xl mr-4">⚠️</div>
                  <div>
                    <h3 className="text-lg font-bold text-red-800 mb-2">
                      Có lỗi xảy ra
                    </h3>
                    <p className="text-red-700">
                      Vui lòng thử lại hoặc liên hệ trực tiếp qua hotline: {contactInfo.phone}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
