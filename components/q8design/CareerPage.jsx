import { useState } from "react";
import Image from "next/image";
import { toast } from 'react-toastify';
import { 
  FaBriefcase, 
  FaMapMarkerAlt, 
  FaClock, 
  FaDollarSign,
  FaUsers,
  FaRocket,
  FaHeart,
  FaGraduationCap,
  FaUpload,
  FaDownload,
  FaFileAlt,
  FaCheckCircle,
  FaSearch,
  FaFilter
} from "react-icons/fa";

export default function CareerPage() {
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isApplicationFormOpen, setIsApplicationFormOpen] = useState(false);
  const [applicationData, setApplicationData] = useState({
    fullName: "",
    email: "",
    phone: "",
    position: "",
    experience: "",
    portfolio: "",
    coverLetter: "",
    cv: null
  });

  const companyValues = [
    {
      icon: FaRocket,
      title: "Phát triển không giới hạn",
      description: "Môi trường làm việc năng động, nhiều cơ hội thăng tiến và phát triển kỹ năng chuyên môn."
    },
    {
      icon: FaUsers,
      title: "Đội ngũ đoàn kết",
      description: "Văn hóa làm việc tích cực, đề cao tinh thần đồng đội và hỗ trợ lẫn nhau."
    },
    {
      icon: FaHeart,
      title: "Chế độ đãi ngộ tốt",
      description: "Lương thưởng cạnh tranh, bảo hiểm đầy đủ và nhiều phúc lợi hấp dẫn."
    },
    {
      icon: FaGraduationCap,
      title: "Học hỏi liên tục",
      description: "Được tham gia các khóa đào tạo, hội thảo và cập nhật xu hướng thiết kế mới nhất."
    }
  ];

  const openPositions = [
    {
      id: 1,
      title: "Kiến trúc sư thiết kế",
      department: "design",
      location: "Hà Nội",
      type: "Toàn thời gian",
      level: "Junior - Senior",
      salary: "15-30 triệu",
      description: "Tham gia thiết kế kiến trúc và nội thất cho các dự án nhà phố, biệt thự và chung cư cao cấp.",
      requirements: [
        "Tốt nghiệp chuyên ngành Kiến trúc, Nội thất",
        "Có ít nhất 2 năm kinh nghiệm",
        "Thành thạo AutoCAD, SketchUp, 3D Max, Photoshop",
        "Có tư duy sáng tạo và khả năng làm việc nhóm tốt",
        "Giao tiếp tốt với khách hàng"
      ],
      responsibilities: [
        "Thiết kế bản vẽ kiến trúc và nội thất theo yêu cầu khách hàng",
        "Tạo mô hình 3D và hình ảnh presentation",
        "Phối hợp với đội thi công để đảm bảo chất lượng",
        "Tư vấn giải pháp thiết kế cho khách hàng",
        "Nghiên cứu xu hướng thiết kế mới"
      ],
      benefits: [
        "Lương cơ bản + thưởng dự án",
        "Bảo hiểm xã hội, y tế đầy đủ",
        "Thưởng lễ, tết, sinh nhật",
        "Du lịch công ty hàng năm",
        "Đào tạo kỹ năng chuyên môn"
      ],
      featured: true
    },
    {
      id: 2,
      title: "Kỹ sư giám sát thi công",
      department: "construction",
      location: "Hà Nội",
      type: "Toàn thời gian", 
      level: "Middle - Senior",
      salary: "18-35 triệu",
      description: "Giám sát và quản lý chất lượng thi công các dự án nội thất theo đúng thiết kế và tiêu chuẩn.",
      requirements: [
        "Tốt nghiệp Xây dựng, Kiến trúc hoặc chuyên ngành liên quan",
        "Có từ 3 năm kinh nghiệm thi công nội thất",
        "Hiểu biết về vật liệu và quy trình thi công",
        "Kỹ năng quản lý thời gian và giải quyết vấn đề",
        "Có thể đi công tác các tỉnh"
      ],
      responsibilities: [
        "Giám sát tiến độ và chất lượng thi công",
        "Phối hợp với đơn vị thi công và khách hàng", 
        "Kiểm tra và nghiệm thu công trình",
        "Báo cáo tiến độ dự án định kỳ",
        "Xử lý các vấn đề phát sinh tại công trường"
      ],
      benefits: [
        "Lương cơ bản + phụ cấp đi lại",
        "Bảo hiểm tai nạn lao động",
        "Thưởng hoàn thành dự án đúng hạn",
        "Cơ hội làm việc với nhiều dự án lớn",
        "Phát triển kỹ năng quản lý"
      ],
      featured: true
    },
    {
      id: 3,
      title: "Nhân viên kinh doanh",
      department: "sales",
      location: "Hà Nội / TP.HCM",
      type: "Toàn thời gian",
      level: "Fresher - Middle", 
      salary: "12-25 triệu + hoa hồng",
      description: "Tư vấn và chăm sóc khách hàng, phát triển mối quan hệ kinh doanh trong lĩnh vực thiết kế nội thất.",
      requirements: [
        "Tốt nghiệp Đại học các chuyên ngành liên quan",
        "Có kinh nghiệm bán hàng/tư vấn là lợi thế",
        "Kỹ năng giao tiếp và thuyết phục tốt",
        "Nhiệt tình, chủ động trong công việc",
        "Có phương tiện đi lại"
      ],
      responsibilities: [
        "Tư vấn dịch vụ thiết kế cho khách hàng",
        "Lập báo giá và thương thảo hợp đồng",
        "Chăm sóc khách hàng sau bán hàng",
        "Tìm kiếm và phát triển khách hàng mới",
        "Báo cáo kết quả kinh doanh hàng tháng"
      ],
      benefits: [
        "Lương cố định + hoa hồng hấp dẫn",
        "Thưởng KPI đạt chỉ tiêu",
        "Đào tạo kỹ năng bán hàng",
        "Cơ hội thăng tiến cao",
        "Môi trường làm việc trẻ trung"
      ],
      featured: false
    },
    {
      id: 4,
      title: "Nhân viên chăm sóc khách hàng",
      department: "customercare",
      location: "Hà Nội",
      type: "Toàn thời gian",
      level: "Fresher - Middle",
      salary: "10-18 triệu",
      description: "Hỗ trợ và chăm sóc khách hàng trong suốt quá trình thực hiện dự án, đảm bảo sự hài lòng tối đa.",
      requirements: [
        "Tốt nghiệp Đại học",
        "Có kinh nghiệm CSKH là lợi thế",
        "Kỹ năng giao tiếp và lắng nghe tốt",
        "Kiên nhẫn, tỉ mỉ trong công việc",
        "Sử dụng máy tính văn phòng thành thạo"
      ],
      responsibilities: [
        "Tiếp nhận và xử lý yêu cầu khách hàng",
        "Phối hợp giữa khách hàng và đội thiết kế/thi công",
        "Theo dõi tiến độ dự án và báo cáo khách hàng",
        "Xử lý khiếu nại và phản hồi",
        "Duy trì mối quan hệ lâu dài với khách hàng"
      ],
      benefits: [
        "Lương tháng 13, thưởng lễ tết",
        "Bảo hiểm sức khỏe cao cấp",
        "Nghỉ phép có lương",
        "Đào tạo kỹ năng mềm",
        "Môi trường làm việc chuyên nghiệp"
      ],
      featured: false
    }
  ];

  const departments = [
    { id: "all", name: "Tất cả vị trí", count: openPositions.length },
    { id: "design", name: "Thiết kế", count: openPositions.filter(p => p.department === "design").length },
    { id: "construction", name: "Thi công", count: openPositions.filter(p => p.department === "construction").length },
    { id: "sales", name: "Kinh doanh", count: openPositions.filter(p => p.department === "sales").length },
    { id: "customercare", name: "Chăm sóc KH", count: openPositions.filter(p => p.department === "customercare").length }
  ];

  const teamTestimonials = [
    {
      name: "Văn Sỹ Sơn",
      position: "Kiến trúc sư Senior",
      image: "/images/van-sy-son.jpg",
      quote: "Tại Q8 Design, tôi được làm việc với những dự án thú vị và học hỏi từ đội ngũ chuyên gia giàu kinh nghiệm. Môi trường làm việc rất tích cực và sáng tạo."
    },
    {
      name: "Lê Hồng Tám",
      position: "Thiết kế Nội thất",
      image: "/images/tam.jpg", 
      quote: "Q8 Design không chỉ là nơi làm việc mà còn là nơi tôi phát triển sự nghiệp. Công ty luôn tạo điều kiện để nhân viên học hỏi và thăng tiến."
    },
    {
      name: "Trần Đức Thắng",
      position: "Kỹ sư Thi công",
      image: "/images/pham-quoc-hung.jpg",
      quote: "Tôi cảm thấy tự hào khi tham gia vào những dự án lớn và chất lượng. Đồng nghiệp luôn hỗ trợ nhau và cùng nhau phát triển."
    }
  ];

  const filteredPositions = openPositions.filter(position => {
    const matchesDepartment = filterDepartment === "all" || position.department === filterDepartment;
    const matchesSearch = position.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         position.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDepartment && matchesSearch;
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "cv" && files) {
      const file = files[0];
      if (file) {
        // Validate file type
        const allowedTypes = ['.pdf', '.doc', '.docx'];
        const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
        
        if (allowedTypes.includes(fileExtension)) {
          // Validate file size (max 5MB)
          if (file.size <= 5 * 1024 * 1024) {
            setApplicationData(prev => ({ ...prev, [name]: file }));
            toast.success(`✅ File CV "${file.name}" đã được tải lên thành công!`);
          } else {
            toast.error("❌ File CV quá lớn! Vui lòng chọn file nhỏ hơn 5MB.");
            e.target.value = null;
          }
        } else {
          toast.error("❌ Định dạng file không được hỗ trợ! Vui lòng chọn file PDF, DOC hoặc DOCX.");
          e.target.value = null;
        }
      }
    } else {
      setApplicationData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleApplicationSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!applicationData.fullName || !applicationData.email || !applicationData.phone || !applicationData.position || !applicationData.cv) {
      toast.error("Vui lòng điền đầy đủ thông tin bắt buộc và tải lên CV!");
      return;
    }

    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append("fullName", applicationData.fullName);
      formData.append("email", applicationData.email);
      formData.append("phone", applicationData.phone);
      formData.append("position", applicationData.position);
      formData.append("experience", applicationData.experience);
      formData.append("portfolio", applicationData.portfolio);
      formData.append("coverLetter", applicationData.coverLetter);
      if (applicationData.cv) {
        formData.append("cv", applicationData.cv);
      }

      // Submit to API
      const response = await fetch("/api/career/submit-application", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      
      if (result.success) {
        toast.success("🎉 Đơn ứng tuyển đã được gửi thành công! Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.", {
          autoClose: 5000,
        });
        setIsApplicationFormOpen(false);
        setApplicationData({
          fullName: "",
          email: "",
          phone: "",
          position: "",
          experience: "",
          portfolio: "",
          coverLetter: "",
          cv: null
        });
      } else {
        toast.error(result.message || "Có lỗi xảy ra khi gửi đơn ứng tuyển. Vui lòng thử lại!");
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("❌ Có lỗi xảy ra khi gửi đơn ứng tuyển. Vui lòng thử lại!");
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/doi-ngu-thiet-ke-noi-that-q8design.webp"
            alt="Q8 Design Team"
            fill
            className="object-cover brightness-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40"></div>
        </div>
        
        <div className="relative z-10 text-center text-white max-w-6xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            Kiến tạo giá trị, <br />
            <span className="">Xây dựng sự nghiệp</span> cùng Q8 Design
          </h1>
          <p className="text-xl text-q8-primary-200 max-w-3xl mx-auto leading-relaxed">
            Tại Q8 Design, chúng tôi không chỉ xây dựng những công trình kiến trúc mà còn 
            kiến tạo một môi trường làm việc chuyên nghiệp, đầy cảm hứng.
          </p>
        </div>
      </section>

      {/* Company Culture */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="px-4 py-2 bg-q8-primary-50 text-q8-primary-900 rounded-full text-sm font-medium uppercase tracking-wider">
              Văn hóa doanh nghiệp
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-q8-primary-900 mt-6 mb-4">
              Tại sao chọn Q8 Design?
            </h2>
            <p className="text-lg text-q8-primary-600 max-w-3xl mx-auto">
              Chúng tôi tin rằng mỗi cá nhân đều là một mảnh ghép quan trọng, 
              cùng nhau tạo nên những kiệt tác.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {companyValues.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 bg-q8-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-q8-primary-900 group-hover:scale-110 transition-all duration-300">
                    <Icon className="text-2xl text-q8-primary-900 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-q8-primary-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-q8-primary-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>

    
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 bg-q8-primary-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="px-4 py-2 bg-q8-primary-50 text-q8-primary-900 rounded-full text-sm font-medium uppercase tracking-wider">
              Cơ hội nghề nghiệp
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-q8-primary-900 mt-6 mb-4">
              Các vị trí đang tuyển dụng
            </h2>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col lg:flex-row items-center justify-between mb-12 space-y-4 lg:space-y-0">
            {/* Search */}
            <div className="relative w-full lg:w-96">
              <input
                type="text"
                placeholder="Tìm kiếm vị trí..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-q8-primary-300 rounded-full focus:outline-none focus:ring-2 focus:ring-q8-primary-900 focus:border-transparent"
              />
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-q8-primary-400" />
            </div>

            {/* Department Filter */}
            <div className="flex flex-wrap justify-center gap-3">
              {departments.map((dept) => (
                <button
                  key={dept.id}
                  onClick={() => setFilterDepartment(dept.id)}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                    filterDepartment === dept.id
                      ? "bg-q8-primary-900 text-white shadow-lg"
                      : "bg-white text-q8-primary-600 hover:bg-q8-primary-50 hover:text-q8-primary-900 border border-q8-primary-200"
                  }`}
                >
                  <FaFilter className="inline mr-2" />
                  {dept.name} ({dept.count})
                </button>
              ))}
            </div>
          </div>

          {/* Positions Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredPositions.map((position) => (
              <div key={position.id} className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                {position.featured && (
                  <div className="mb-4">
                    <span className="bg-q8-primary-900 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Vị trí nổi bật
                    </span>
                  </div>
                )}
                
                <h3 className="text-2xl font-bold text-q8-primary-900 mb-3">
                  {position.title}
                </h3>
                
                <div className="grid grid-cols-2 gap-4 mb-6 text-sm text-q8-primary-600">
                  <div className="flex items-center">
                    <FaMapMarkerAlt className="mr-2 text-q8-primary-900" />
                    <span>{position.location}</span>
                  </div>
                  <div className="flex items-center">
                    <FaClock className="mr-2 text-q8-primary-900" />
                    <span>{position.type}</span>
                  </div>
                  <div className="flex items-center">
                    <FaBriefcase className="mr-2 text-q8-primary-900" />
                    <span>{position.level}</span>
                  </div>
                  <div className="flex items-center">
                    <FaDollarSign className="mr-2 text-q8-primary-900" />
                    <span>{position.salary}</span>
                  </div>
                </div>

                <p className="text-q8-primary-700 leading-relaxed mb-6">
                  {position.description}
                </p>

                <div className="flex space-x-3">
                  <button
                    onClick={() => setSelectedPosition(position)}
                    className="flex-1 bg-q8-primary-900 hover:bg-q8-primary-700 text-white font-bold py-3 px-6 rounded-full transition-colors duration-300"
                  >
                    Xem chi tiết
                  </button>
                  <button
                    onClick={() => {
                      setApplicationData(prev => ({ ...prev, position: position.title }));
                      setIsApplicationFormOpen(true);
                      toast.info(`📝 Đang mở form ứng tuyển cho vị trí: ${position.title}`);
                    }}
                    className="flex-1 border-2 border-q8-primary-900 text-q8-primary-900 hover:bg-q8-primary-900 hover:text-white font-bold py-3 px-6 rounded-full transition-all duration-300"
                  >
                    Ứng tuyển ngay
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredPositions.length === 0 && (
            <div className="text-center py-16">
              <div className="text-q8-primary-400 text-6xl mb-4">💼</div>
              <h3 className="text-xl font-bold text-q8-primary-900 mb-2">
                Không tìm thấy vị trí phù hợp
              </h3>
              <p className="text-q8-primary-600 mb-6">
                Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc để xem các vị trí khác.
              </p>
              <button
                onClick={() => {
                  setFilterDepartment("all");
                  setSearchTerm("");
                }}
                className="px-6 py-3 bg-q8-primary-900 text-white rounded-full hover:bg-q8-primary-700 transition-colors"
              >
                Xem tất cả vị trí
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Application Guide */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-q8-primary-900 mb-4">
              Hướng dẫn ứng tuyển
            </h2>
            <p className="text-lg text-q8-primary-600 max-w-2xl mx-auto">
              Quy trình ứng tuyển đơn giản và minh bạch tại Q8 Design
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Gửi CV",
                description: "Gửi hồ sơ ứng tuyển qua form trực tuyến hoặc email"
              },
              {
                step: "2", 
                title: "Sơ tuyển",
                description: "HR sẽ liên hệ trong vòng 3-5 ngày làm việc"
              },
              {
                step: "3",
                title: "Phỏng vấn",
                description: "Phỏng vấn trực tiếp với trưởng bộ phận và HR"
              },
              {
                step: "4",
                title: "Nhận việc",
                description: "Thông báo kết quả và thủ tục nhận việc"
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-q8-primary-900 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-xl">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-q8-primary-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-q8-primary-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Application */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-q8-primary-900 mb-6">
              Sẵn sàng gia nhập đội ngũ Q8 Design?
            </h2>
            <p className="text-xl text-q8-primary-600 mb-8 leading-relaxed">
              Hãy gửi CV của bạn ngay hôm nay và bắt đầu hành trình sự nghiệp 
              đầy cảm hứng cùng chúng tôi!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  setIsApplicationFormOpen(true);
                  toast.info("📄 Mở form ứng tuyển tổng quát");
                }}
                className="inline-flex items-center px-8 py-4 bg-q8-primary-900 text-white font-bold rounded-full hover:bg-q8-primary-700 transition-colors duration-300"
              >
                <FaUpload className="mr-3" />
                Ứng tuyển ngay
              </button>
              <a
                href="/documents/Q8-Design-JD-Template.pdf"
                download
                className="inline-flex items-center px-8 py-4 border-2 border-q8-primary-900 text-q8-primary-900 font-bold rounded-full hover:bg-q8-primary-900 hover:text-white transition-all duration-300"
              >
                <FaDownload className="mr-3" />
                Tải mẫu JD
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Position Detail Modal */}
      {selectedPosition && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-q8-primary-900">
                  {selectedPosition.title}
                </h2>
                <button
                  onClick={() => setSelectedPosition(null)}
                  className="w-10 h-10 bg-q8-primary-100 hover:bg-q8-primary-200 rounded-full flex items-center justify-center transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 text-sm">
                <div className="bg-q8-primary-50 p-4 rounded-xl">
                  <FaMapMarkerAlt className="text-q8-primary-900 mb-2" />
                  <div className="font-medium">Địa điểm</div>
                  <div className="text-q8-primary-600">{selectedPosition.location}</div>
                </div>
                <div className="bg-q8-primary-50 p-4 rounded-xl">
                  <FaClock className="text-q8-primary-900 mb-2" />
                  <div className="font-medium">Loại hình</div>
                  <div className="text-q8-primary-600">{selectedPosition.type}</div>
                </div>
                <div className="bg-q8-primary-50 p-4 rounded-xl">
                  <FaBriefcase className="text-q8-primary-900 mb-2" />
                  <div className="font-medium">Cấp bậc</div>
                  <div className="text-q8-primary-600">{selectedPosition.level}</div>
                </div>
                <div className="bg-q8-primary-50 p-4 rounded-xl">
                  <FaDollarSign className="text-q8-primary-900 mb-2" />
                  <div className="font-medium">Lương</div>
                  <div className="text-q8-primary-600">{selectedPosition.salary}</div>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-q8-primary-900 mb-4">Mô tả công việc</h3>
                  <p className="text-q8-primary-700 leading-relaxed">{selectedPosition.description}</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-q8-primary-900 mb-4">Yêu cầu</h3>
                  <ul className="space-y-2">
                    {selectedPosition.requirements.map((req, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                        <span className="text-q8-primary-700">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-q8-primary-900 mb-4">Trách nhiệm</h3>
                  <ul className="space-y-2">
                    {selectedPosition.responsibilities.map((resp, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-q8-primary-900 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-q8-primary-700">{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-q8-primary-900 mb-4">Quyền lợi</h3>
                  <ul className="space-y-2">
                    {selectedPosition.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <FaHeart className="text-red-500 mt-1 flex-shrink-0" />
                        <span className="text-q8-primary-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex space-x-4 mt-8">
                <button
                  onClick={() => {
                    setApplicationData(prev => ({ ...prev, position: selectedPosition.title }));
                    setIsApplicationFormOpen(true);
                    setSelectedPosition(null);
                    toast.info(`📝 Chuyển đến form ứng tuyển cho vị trí: ${selectedPosition.title}`);
                  }}
                  className="flex-1 bg-q8-primary-900 hover:bg-q8-primary-700 text-white font-bold py-3 px-6 rounded-full transition-colors duration-300"
                >
                  Ứng tuyển ngay
                </button>
                <button
                  onClick={() => setSelectedPosition(null)}
                  className="flex-1 border-2 border-q8-primary-300 text-q8-primary-700 hover:bg-q8-primary-50 font-bold py-3 px-6 rounded-full transition-all duration-300"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Application Form Modal */}
      {isApplicationFormOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-white  w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-q8-primary-900">
                  Ứng tuyển
                </h2>
                <button
                  onClick={() => setIsApplicationFormOpen(false)}
                  className="w-10 h-10 bg-q8-primary-100 hover:bg-q8-primary-200 rounded-full flex items-center justify-center transition-colors"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleApplicationSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-q8-primary-700 mb-2">
                      Họ và tên *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={applicationData.fullName}
                      onChange={handleInputChange}
                      className="w-full py-3 px-4 border border-q8-primary-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-q8-primary-900 focus:border-transparent"
                      placeholder="Nhập họ và tên"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-q8-primary-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={applicationData.email}
                      onChange={handleInputChange}
                      className="w-full py-3 px-4 border border-q8-primary-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-q8-primary-900 focus:border-transparent"
                      placeholder="Nhập email"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-q8-primary-700 mb-2">
                      Số điện thoại *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={applicationData.phone}
                      onChange={handleInputChange}
                      className="w-full py-3 px-4 border border-q8-primary-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-q8-primary-900 focus:border-transparent"
                      placeholder="Nhập số điện thoại"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-q8-primary-700 mb-2">
                      Vị trí ứng tuyển *
                    </label>
                    <select
                      name="position"
                      required
                      value={applicationData.position}
                      onChange={handleInputChange}
                      className="w-full py-3 px-4 border border-q8-primary-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-q8-primary-900 focus:border-transparent"
                    >
                      <option value="">Chọn vị trí</option>
                      {openPositions.map((pos) => (
                        <option key={pos.id} value={pos.title}>{pos.title}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-q8-primary-700 mb-2">
                    Kinh nghiệm làm việc
                  </label>
                  <select
                    name="experience"
                    value={applicationData.experience}
                    onChange={handleInputChange}
                    className="w-full py-3 px-4 border border-q8-primary-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-q8-primary-900 focus:border-transparent"
                  >
                    <option value="">Chọn kinh nghiệm</option>
                    <option value="Không có kinh nghiệm">Không có kinh nghiệm</option>
                    <option value="Dưới 1 năm">Dưới 1 năm</option>
                    <option value="1-2 năm">1-2 năm</option>
                    <option value="3-5 năm">3-5 năm</option>
                    <option value="Trên 5 năm">Trên 5 năm</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-q8-primary-700 mb-2">
                    Link Portfolio (nếu có)
                  </label>
                  <input
                    type="url"
                    name="portfolio"
                    value={applicationData.portfolio}
                    onChange={handleInputChange}
                    className="w-full py-3 px-4 border border-q8-primary-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-q8-primary-900 focus:border-transparent"
                    placeholder="https://..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-q8-primary-700 mb-2">
                    Thư xin việc
                  </label>
                  <textarea
                    name="coverLetter"
                    rows={4}
                    value={applicationData.coverLetter}
                    onChange={handleInputChange}
                    className="w-full py-3 px-4 border border-q8-primary-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-q8-primary-900 focus:border-transparent resize-none"
                    placeholder="Viết ngắn gọn về bản thân và lý do ứng tuyển..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-q8-primary-700 mb-2">
                    Tải lên CV *
                  </label>
                  <div className="border-2 border-dashed border-q8-primary-300 rounded-xl p-6 text-center hover:border-q8-primary-900 transition-colors">
                    <input
                      type="file"
                      name="cv"
                      required
                      accept=".pdf,.doc,.docx"
                      onChange={handleInputChange}
                      className="hidden"
                      id="cv-upload"
                    />
                    <label htmlFor="cv-upload" className="cursor-pointer">
                      <FaFileAlt className="text-4xl text-q8-primary-400 mx-auto mb-3" />
                      <p className="text-q8-primary-600">
                        Kéo thả file hoặc click để chọn
                      </p>
                      <p className="text-sm text-q8-primary-500 mt-1">
                        Hỗ trợ: PDF, DOC, DOCX (tối đa 5MB)
                      </p>
                    </label>
                    {applicationData.cv && (
                      <p className="text-green-600 mt-2">
                        ✓ {applicationData.cv.name}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="flex-1 bg-q8-primary-900 hover:bg-q8-primary-700 text-white font-bold py-3 px-6 rounded-full transition-colors duration-300"
                  >
                    Gửi đơn ứng tuyển
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsApplicationFormOpen(false)}
                    className="flex-1 border-2 border-q8-primary-300 text-q8-primary-700 hover:bg-q8-primary-50 font-bold py-3 px-6 rounded-full transition-all duration-300"
                  >
                    Hủy
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
