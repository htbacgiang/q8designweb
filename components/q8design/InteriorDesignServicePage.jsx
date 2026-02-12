import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  FaRulerCombined, 
  FaArrowRight, 
  FaCheckCircle,
  FaStar,
  FaClock,
  FaShieldAlt,
  FaHome,
  FaBuilding,
  FaStore,
  FaCity,
  FaLeaf,
  FaDoorOpen,
  FaRobot,
  FaPalette,
  FaMoneyBillWave,
  FaUsers,
  FaHandshake,
  FaChartLine,
  FaAward,
  FaLightbulb,
  FaQuestionCircle,
  FaPhoneAlt,
  FaEnvelope,
  FaSpa,
  FaTimes,
  FaCouch
} from "react-icons/fa";
import ContactForm from "../header/ContactForm";

export default function InteriorDesignServicePage() {
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false);
  
  // Các loại hình Thiết kế Nội thất Q8 Design thực hiện
  const serviceTypes = [
    {
      icon: FaHome,
      title: "Thiết kế Nội thất Nhà phố & Căn hộ chung cư",
      description: "Đây là loại hình phổ biến nhất, nơi chúng tôi biến những không gian trống thành tổ ấm có cảm xúc và mang đậm dấu ấn cá nhân. Q8 Design chuyên tối ưu hóa công năng cho từng căn phòng, từ phòng khách, bếp, phòng ngủ, đến các khu vực nhỏ như ban công hay logia. Chúng tôi giúp bạn tận dụng tối đa diện tích, đặc biệt là các căn hộ chung cư, để tạo ra một không gian sống vừa hiện đại, vừa tiện nghi.",
      features: [
        "Tối ưu hóa công năng từng căn phòng",
        "Tận dụng tối đa diện tích",
        "Thiết kế hiện đại, tiện nghi",
        "Không gian sống có cảm xúc"
      ],
      image: "/images/thiet-ke-noi-that.jpg"
    },
    {
      icon: FaBuilding,
      title: "Thiết kế Nội thất Biệt thự",
      description: "Dành cho những công trình đòi hỏi sự sang trọng, tinh tế và đẳng cấp. Q8 Design kiến tạo không gian sống xa hoa, thể hiện gu thẩm mỹ tinh xảo của chủ nhân. Chúng tôi chú trọng vào sự đồng bộ giữa kiến trúc và nội thất, từ việc chọn lựa vật liệu cao cấp, đồ nội thất thiết kế riêng, đến hệ thống ánh sáng, âm thanh, để mọi chi tiết đều hoàn hảo và mang lại trải nghiệm sống đẳng cấp.",
      features: [
        "Không gian sang trọng, đẳng cấp",
        "Vật liệu cao cấp, thiết kế riêng",
        "Hệ thống ánh sáng, âm thanh tinh tế",
        "Đồng bộ giữa kiến trúc & nội thất"
      ],
      image: "/images/thiet-ke-noi-that-biet-thu-q8design.jpg"
    },
    {
      icon: FaStore,
      title: "Thiết kế Nội thất Văn phòng & Công trình Thương mại",
      description: "Q8 Design am hiểu rằng không gian làm việc hay kinh doanh là yếu tố then chốt tạo nên bản sắc thương hiệu. Chúng tôi thiết kế các không gian văn phòng mở, linh hoạt để tối ưu năng suất, và các công trình thương mại như showroom, cửa hàng, quán cà phê, giúp thu hút và giữ chân khách hàng. Mỗi thiết kế đều là một chiến lược vận hành, được xây dựng để hỗ trợ tốt nhất cho hoạt động kinh doanh.",
      features: [
        "Không gian văn phòng mở, linh hoạt",
        "Tối ưu năng suất làm việc",
        "Thu hút và giữ chân khách hàng",
        "Thể hiện bản sắc thương hiệu"
      ],
      image: "/images/thiet-ke-noi-that-van-phong-q8design.webp"
    }
  ];

  // Lợi ích khi sử dụng dịch vụ Thiết kế Nội thất Chuyên nghiệp
  const benefits = [
    {
      icon: FaPalette,
      title: "Tối ưu hóa Công năng và Thẩm mỹ",
      description: "Mỗi không gian đều có những đặc điểm riêng. Một kiến trúc sư nội thất giỏi sẽ biết cách tận dụng từng góc nhỏ, phân bổ công năng hợp lý để ngôi nhà không chỉ đẹp mà còn tiện nghi tối đa. Chúng tôi sẽ đảm bảo các yếu tố như ánh sáng, gió tự nhiên được tận dụng triệt để, tạo ra một môi trường sống thoải mái, dễ chịu."
    },
    {
      icon: FaMoneyBillWave,
      title: "Tiết kiệm Chi phí và Thời gian",
      description: "Thiết kế chuyên nghiệp giúp bạn có một kế hoạch chi tiết ngay từ đầu. Điều này giúp kiểm soát chặt chẽ ngân sách, tránh được những sai sót, phát sinh không đáng có trong quá trình thi công. Nhờ vậy, bạn không chỉ tiết kiệm được một khoản chi phí lớn mà còn rút ngắn được thời gian hoàn thiện, có thể dọn vào ở sớm hơn dự kiến."
    },
    {
      icon: FaUsers,
      title: "Định hình Phong cách Sống",
      description: "Ngôi nhà không chỉ là nơi để ở, mà còn là nơi thể hiện cá tính. Q8 Design sẽ giúp bạn định hình một phong cách thiết kế độc đáo, từ sự tinh tế của phong cách tối giản cho đến sự sang trọng của tân cổ điển. Chúng tôi lắng nghe để hiểu câu chuyện của bạn, từ đó thể hiện cá tính riêng qua màu sắc, vật liệu và bố cục, giúp bạn tự hào về không gian sống của mình."
    },
    {
      icon: FaChartLine,
      title: "Nâng cao Giá trị Công trình",
      description: "Một thiết kế nội thất được đầu tư bài bản và có gu thẩm mỹ cao sẽ giúp tăng giá trị bất động sản. Không chỉ về mặt sử dụng, một không gian sống đẹp còn tạo ấn tượng mạnh mẽ với người nhìn, trở thành một khoản đầu tư sinh lời đầy thông minh."
    }
  ];

  // Quy trình thiết kế
  const designProcess = [
    {
      step: "01",
      title: "Khảo sát & Lắng nghe mong muốn của khách hàng",
      description: "Đây là bước đầu tiên và quan trọng nhất. Đội ngũ kiến trúc sư của chúng tôi sẽ gặp gỡ bạn để lắng nghe, thấu hiểu về phong cách sống, sở thích, nhu cầu sử dụng và ngân sách. Chúng tôi cũng sẽ tiến hành khảo sát thực địa để đo đạc chính xác diện tích, đánh giá hiện trạng không gian và nắm bắt các yếu tố kỹ thuật cần thiết."
    },
    {
      step: "02",
      title: "Lên Concept & Moodboard ý tưởng",
      description: "Dựa trên những thông tin đã thu thập, chúng tôi sẽ đề xuất các phương án ý tưởng tổng thể. Concept và Moodboard sẽ được trình bày dưới dạng bảng màu, vật liệu, hình ảnh tham khảo, giúp bạn có cái nhìn rõ ràng về phong cách và cảm xúc của không gian. Bước này đảm bảo hai bên có sự đồng điệu về ý tưởng trước khi triển khai chi tiết."
    },
    {
      step: "03",
      title: "Thiết kế phối cảnh 3D chi tiết",
      description: "Khi ý tưởng được duyệt, chúng tôi sẽ tiến hành dựng phối cảnh 3D chi tiết cho toàn bộ không gian. Với công nghệ 3D hiện đại, bạn sẽ được bước vào ngôi nhà tương lai của mình, chiêm ngưỡng từng góc nhỏ, từ màu sắc, ánh sáng đến cách bố trí đồ nội thất. Giai đoạn này giúp bạn hình dung rõ ràng và đưa ra những chỉnh sửa cuối cùng."
    },
    {
      step: "04",
      title: "Hoàn thiện hồ sơ kỹ thuật & Vật liệu thi công",
      description: "Sau khi bản vẽ 3D được thống nhất, chúng tôi sẽ hoàn thiện bộ hồ sơ kỹ thuật thi công. Hồ sơ này bao gồm các bản vẽ chi tiết về kích thước, kết cấu, điện nước và các thông số kỹ thuật khác. Đây là cơ sở để đội ngũ thi công làm việc, đảm bảo mọi hạng mục được triển khai chính xác, đúng với bản thiết kế ban đầu."
    },
    {
      step: "05",
      title: "Giám sát tác giả & Hậu mãi sau bàn giao",
      description: "Quy trình của chúng tôi không kết thúc khi bản vẽ được bàn giao. Q8 Design sẽ tiếp tục đồng hành bằng việc hỗ trợ giám sát tác giả trong suốt quá trình thi công. Sau khi công trình hoàn thiện, chúng tôi sẽ bàn giao và tiếp tục cung cấp dịch vụ bảo hành, bảo trì để đảm bảo bạn luôn an tâm sử dụng không gian sống của mình."
    }
  ];

  // Phong cách Thiết kế Nội thất Phổ biến
  const designStyles = [
    {
      icon: FaLightbulb,
      title: "Phong cách Hiện đại (Modern)",
      description: "Đây là phong cách phổ biến nhất hiện nay, tập trung vào sự tối giản, đường nét thẳng, và không gian mở. Kiến trúc hiện đại đề cao công năng, loại bỏ các chi tiết rườm rà để tạo cảm giác thông thoáng, gọn gàng. Chúng tôi sử dụng các vật liệu như bê tông, kính, thép, và gam màu trung tính để mang lại vẻ đẹp tinh tế, hợp thời."
    },
    {
      icon: FaStar,
      title: "Phong cách Tân cổ điển (Neoclassical)",
      description: "Phong cách này là sự kết hợp tinh tế giữa vẻ đẹp cổ điển và sự tiện nghi của kiến trúc hiện đại. Tân cổ điển lược bỏ những chi tiết cầu kỳ, chỉ giữ lại các đường nét, hoa văn tinh xảo để tạo sự sang trọng, lãng mạn. Q8 Design sẽ khéo léo sử dụng các cột trụ, phào chỉ và gam màu kem, trắng để mang lại vẻ đẹp vượt thời gian cho công trình."
    },
    {
      icon: FaAward,
      title: "Phong cách Cổ điển (Classical)",
      description: "Dành cho những công trình đòi hỏi sự xa hoa, tráng lệ và bề thế. Kiến trúc cổ điển tập trung vào sự đối xứng, các hoa văn chạm khắc tinh xảo, và hệ thống cột lớn. Mỗi chi tiết đều được chúng tôi trau chuốt tỉ mỉ để tạo nên một tác phẩm nghệ thuật, thể hiện đẳng cấp và quyền uy của gia chủ."
    },
    {
      icon: FaLeaf,
      title: "Phong cách Tối giản (Minimalist)",
      description: "Phong cách này hướng đến sự ít là nhiều. Kiến trúc tối giản chỉ sử dụng những đường nét, hình khối cơ bản và màu sắc đơn giản để tạo ra không gian thoáng đãng, yên bình. Q8 Design sẽ tập trung vào việc tối ưu hóa công năng và sử dụng ánh sáng tự nhiên để biến ngôi nhà trở thành một nơi nghỉ ngơi hoàn hảo."
    },
    {
      icon: FaSpa,
      title: "Scandinavian & Indochine",
      description: "Bên cạnh các phong cách trên, Q8 Design còn am hiểu và thực hiện nhiều phong cách kiến trúc đa dạng khác như Scandinavian, với vẻ đẹp ấm cúng, gần gũi từ gỗ và ánh sáng tự nhiên, hay Indochine, kết hợp nét Á Đông và phương Tây đầy cảm xúc. Dù bạn yêu thích phong cách nào, chúng tôi đều có thể hiện thực hóa."
    }
  ];

  // Xu hướng Thiết kế Nội thất năm 2026
  const trends2026 = [
    {
      icon: FaLeaf,
      title: "Sử dụng vật liệu bền vững, thân thiện môi trường",
      description: "Xu hướng này tập trung vào việc ưu tiên các vật liệu tự nhiên, tái chế hoặc có nguồn gốc bền vững như gỗ tái chế, tre, và các loại vải từ sợi tự nhiên. Việc sử dụng các vật liệu này không chỉ góp phần bảo vệ môi trường mà còn mang lại vẻ đẹp mộc mạc, gần gũi cho không gian sống.",
      image: "/images/xu-huong-vat-lieu-ben-vung-2025.webp"
    },
    {
      icon: FaRobot,
      title: "Ứng dụng công nghệ thông minh trong không gian sống",
      description: "Công nghệ đang dần trở thành một phần không thể thiếu của mọi ngôi nhà. Xu hướng này tập trung vào việc tích hợp các thiết bị thông minh (smarthome) để tối ưu hóa công năng và mang lại sự tiện nghi tối đa. Từ hệ thống chiếu sáng tự động, rèm cửa thông minh, đến các thiết bị điện tử được điều khiển bằng giọng nói, mọi thứ đều phục vụ cho một cuộc sống hiện đại và dễ dàng hơn.",
      image: "/images/xu-huong-khong-gian-mo-2026.webp"
    },
    {
      icon: FaSpa,
      title: "Phong cách Japandi – Hòa quyện tinh tế giữa Nhật Bản & Bắc Âu",
      description: "Japandi là sự kết hợp độc đáo giữa phong cách tối giản của Nhật Bản và sự ấm áp của Scandinavian. Xu hướng này đề cao sự cân bằng, sự tĩnh lặng và các yếu tố tự nhiên. Với phong cách Japandi, không gian sẽ tràn ngập ánh sáng, sử dụng các vật liệu tự nhiên như gỗ, tre, mây và các gam màu trung tính để tạo nên một không gian sống yên bình, hài hòa.",
      image: "/images/xu-huong-phong-cach-nhat-ban-2026.webp"
    },
    {
      icon: FaCouch,
      title: "Thiết kế đa công năng – Tối ưu cho không gian nhỏ",
      description: "Đối với các căn hộ có diện tích khiêm tốn, thiết kế đa công năng là một giải pháp tối ưu. Xu hướng này tập trung vào việc sử dụng các đồ nội thất thông minh, linh hoạt, có thể thay đổi chức năng. Ví dụ, một chiếc bàn có thể biến thành giường, hay một chiếc tủ tường có thể gấp gọn thành bàn ăn. Điều này giúp tối đa hóa công năng sử dụng mà vẫn đảm bảo tính thẩm mỹ cho không gian.",
      image: "/images/xu-huong-khong-gian-mo-2026-3.webp"
    }
  ];

  // Tại sao chọn Q8 Design
  const whyChooseUs = [
    {
      icon: FaStar,
      title: "Đội ngũ Chuyên môn cao & Kinh nghiệm dày dặn",
      description: "Q8 Design được dẫn dắt bởi đội ngũ kiến trúc sư được đào tạo bài bản từ các trường đại học hàng đầu, với tư duy sáng tạo và kinh nghiệm dày dặn trong nhiều dự án. Chúng tôi không chỉ là người thiết kế, mà còn là những chuyên gia am hiểu về kỹ thuật, vật liệu và công năng, đảm bảo mọi bản vẽ đều có tính ứng dụng cao và phù hợp với thực tế."
    },
    {
      icon: FaHandshake,
      title: "Dịch vụ Trọn gói, không phát sinh",
      description: "Chúng tôi cung cấp dịch vụ toàn diện từ thiết kế kiến trúc, nội thất đến thi công trọn gói. Điều này đảm bảo sự đồng nhất và chính xác giữa bản vẽ và sản phẩm cuối cùng, giúp bạn tiết kiệm thời gian, công sức và chi phí quản lý."
    },
    {
      icon: FaAward,
      title: "Chất lượng là lời cam kết",
      description: "Q8 Design đặt sự chỉn chu và tỉ mỉ lên hàng đầu. Mỗi công trình đều được thực hiện với sự giám sát chặt chẽ, từ bản vẽ kỹ thuật đến thi công thực tế, cam kết mang lại sản phẩm bền vững và thẩm mỹ."
    },
    {
      icon: FaMoneyBillWave,
      title: "Minh bạch trong Báo giá",
      description: "Chúng tôi cam kết không phát sinh chi phí một cách không hợp lý, giúp bạn hoàn toàn an tâm. Mọi khoản mục đều được liệt kê rõ ràng ngay từ đầu, đảm bảo tính minh bạch tuyệt đối."
    },
    {
      icon: FaLightbulb,
      title: "Phong cách Độc bản",
      description: "Chúng tôi không chạy theo xu hướng mà tập trung vào bản sắc độc đáo. Mỗi thiết kế là một tác phẩm nghệ thuật, thể hiện câu chuyện riêng của gia chủ và vượt qua mọi giới hạn về sáng tạo."
    }
  ];

  // Câu hỏi thường gặp
  const faqs = [
    {
      icon: FaQuestionCircle,
      question: "Thời gian thiết kế nội thất mất bao lâu?",
      answer: "Thời gian thiết kế phụ thuộc vào quy mô và độ phức tạp của từng công trình. Đối với các dự án nhà ở, thời gian thiết kế thường dao động từ 15 đến 30 ngày kể từ khi hợp đồng được ký kết. Chúng tôi cam kết bàn giao đúng tiến độ đã thỏa thuận."
    },
    {
      icon: FaQuestionCircle,
      question: "Tôi có thể chỉnh sửa bản thiết kế không?",
      answer: "Có. Q8 Design luôn đặt khách hàng làm trung tâm. Trong quá trình làm việc, chúng tôi sẽ lắng nghe và điều chỉnh bản thiết kế theo mong muốn của bạn. Tuy nhiên, để đảm bảo tiến độ và chất lượng, số lần chỉnh sửa sẽ được thỏa thuận rõ ràng trong hợp đồng."
    },
    {
      icon: FaQuestionCircle,
      question: "Có thi công trọn gói không?",
      answer: "Có. Chúng tôi cung cấp dịch vụ trọn gói từ thiết kế đến thi công. Khi bạn chọn gói trọn bộ, phí thiết kế sẽ được khấu trừ vào chi phí thi công, giúp bạn tiết kiệm chi phí và đảm bảo sự đồng bộ giữa thiết kế và thực tế."
    },
    {
      icon: FaQuestionCircle,
      question: "Q8 Design có hỗ trợ bảo hành không?",
      answer: "Có. Q8 Design cam kết bảo hành sản phẩm đã thi công. Chúng tôi cung cấp dịch vụ bảo hành 12 tháng cho phần thi công hoàn thiện."
    }
  ];


  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative md:h-[70vh] h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/service-interior-2.webp"
            alt="Dịch vụ Thiết kế Nội thất Chuyên nghiệp | Q8 Design"
            fill
            className="object-cover brightness-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"></div>
        </div>
        
        <div className="relative z-10 text-center text-white max-w-5xl mx-auto px-4">
          <span className="text-3xl md:text-5xl font-bold mb-8">
            Dịch vụ Thiết kế Nội thất 
            <span className=""> Chuyên nghiệp</span>
          </span>
          <p className="text-lg md:text-xl mt-2 text-q8-primary-100 max-w-5xl mx-auto leading-relaxed mb-8">
            Q8 Design – Chuyên thiết kế nội thất nhà ở, biệt thự, văn phòng và công trình thương mại. Mang đến không gian sống tinh tế, tiện nghi và đậm dấu ấn cá nhân.
          </p>
          <button
            onClick={() => setIsContactPopupOpen(true)}
            className="inline-flex items-center px-8 py-4 bg-q8-primary-900 text-white font-bold rounded-full hover:bg-q8-primary-700 transition-all duration-300 group"
          >
            Tư vấn miễn phí
            <FaArrowRight className="ml-3 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </section>

      {/* I. Giới thiệu về Dịch vụ Thiết kế Nội thất */}
      <section className="py-12 bg-white">
        <div className="">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h2 className="text-2xl md:text-4xl font-bold text-q8-primary-900 mb-6">
                Giới thiệu về Dịch vụ Thiết kế Nội thất
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center mb-8">
              <div className="prose prose-lg max-w-none">
                <p className="text-q8-primary-700 leading-relaxed mb-6 text-lg">
                  Một ngôi nhà hoàn hảo không chỉ đẹp ở bên ngoài mà còn ở sự tinh tế trong từng chi tiết nội thất bên trong. Thiết kế nội thất là bước biến những bức tường vô tri thành một không gian sống có cảm xúc, có câu chuyện và có linh hồn.
                </p>
                <p className="text-q8-primary-700 leading-relaxed mb-6 text-lg">
                  <Link href="/" className="text-q8-primary-900">Q8 Design</Link> tự hào mang đến dịch vụ thiết kế nội thất chuyên nghiệp, nơi mỗi công trình được tạo nên bởi sự thấu hiểu, sáng tạo và tinh tế. Chúng tôi không chỉ trang trí, mà kiến tạo nên một không gian phản ánh phong cách sống của chủ nhân.
                </p>
              </div>
              
              <div className="relative h-[300px] md:h-[400px] rounded-3xl overflow-hidden">
                <Image
                  src="/images/xu-huong-cong-nghe-ai-kien-truc-2026.webp"
                  alt="Kiến trúc sư Q8 Design tư vấn thiết kế nội thất cho khách hàng"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* II. Lợi ích khi sử dụng Dịch vụ Thiết kế Nội thất Chuyên nghiệp */}
      <section className="py-12 bg-q8-primary-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-xl md:text-4xl font-bold text-q8-primary-900 mb-2">
              Lợi ích khi sử dụng Dịch vụ Thiết kế Nội thất Chuyên nghiệp
            </h2>
            <p className="text-lg text-q8-primary-600 max-w-3xl mx-auto">
              Nhiều người lầm tưởng rằng thiết kế nội thất chỉ đơn thuần là việc chọn mua đồ đạc và sắp xếp chúng. Tuy nhiên, đó là một quá trình phức hợp nhằm biến một không gian sống thành một tác phẩm nghệ thuật, đồng thời đảm bảo tính khoa học và tiện nghi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8  mb-12">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex-shrink-0 w-16 h-16 bg-q8-primary-100 rounded-2xl flex items-center justify-center">
                      <Icon className="text-2xl text-q8-primary-900" />
                    </div>
                    <h3 className="text-lg font-bold text-q8-primary-900 flex-1 leading-tight">
                      {benefit.title}
                    </h3>
                  </div>
                  <p className="text-q8-primary-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="relative h-[300px] md:h-[400px] rounded-3xl overflow-hidden ">
            <Image
              src="/images/loi-ich-thiet-ke-noi-that.webp"
              alt="Lợi ích của thiết kế nội thất chuyên nghiệp"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* III. Các loại hình Thiết kế Nội thất Q8 Design thực hiện */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-xl md:text-4xl font-bold text-q8-primary-900 mt-6 mb-2">
              Các loại hình Thiết kế Nội thất Q8 Design thực hiện
            </h2>
            <p className="text-lg text-q8-primary-600 max-w-5xl mx-auto">
              Tại Q8 Design, chúng tôi không ngừng đổi mới để mang đến những giải pháp thiết kế nội thất toàn diện, phù hợp với mọi không gian và phong cách sống.
            </p>
          </div>

          <div className="space-y-8 ">
            {serviceTypes.map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={index} className={`bg-q8-primary-50 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ${index % 2 === 0 ? '' : 'md:flex-row-reverse'} flex flex-col md:flex-row`}>
                  <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex-shrink-0 w-14 h-14 bg-q8-primary-100 rounded-2xl flex items-center justify-center">
                        <Icon className="text-2xl text-q8-primary-900" />
                      </div>
                      <h3 className="text-lg font-bold text-q8-primary-900 flex-1 leading-tight pt-1">
                        {service.title}
                      </h3>
                    </div>
                    <p className="text-q8-primary-600 leading-relaxed mb-6">
                      {service.description}
                    </p>
                    <div className="space-y-3">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-3">
                          <FaCheckCircle className="text-q8-primary-900 flex-shrink-0" />
                          <span className="text-q8-primary-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="md:w-1/2 relative h-64 md:h-auto min-h-[300px]">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* IV. Quy trình Thiết kế Nội thất tại Q8 Design */}
      <section className="py-12 bg-q8-primary-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-xl md:text-4xl font-bold text-q8-primary-900 mt-6 mb-4">
              Quy trình Thiết kế Nội thất tại Q8 Design
            </h2>
            <p className="text-lg text-q8-primary-600 max-w-3xl mx-auto">
              Để đảm bảo mỗi công trình là một tác phẩm hoàn hảo, Q8 Design đã xây dựng một quy trình làm việc khoa học, chặt chẽ, từ khâu lắng nghe ý tưởng cho đến khi công trình được hoàn thiện.
            </p>
          </div>

          <div className="max-w-5xl mx-auto mb-12">
            <div className="space-y-6">
              {designProcess.map((step, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 md:p-8 shadow-md hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-q8-primary-900 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                        {step.step}
                      </div>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-q8-primary-900 flex-1 leading-tight">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-q8-primary-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* V. Báo giá Dịch vụ Thiết kế Nội thất */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="">
            <div className="text-center mb-12">
              <h2 className="text-xl md:text-4xl font-bold text-q8-primary-900 mt-6 mb-4">
                Báo giá Dịch vụ Thiết kế Nội thất – Minh bạch & Hợp lý
              </h2>
              <p className="text-lg text-q8-primary-600 max-w-3xl mx-auto">
                Một trong những băn khoăn lớn nhất của khách hàng khi bắt đầu hành trình kiến tạo không gian là chi phí. Tại Q8 Design, chúng tôi cam kết mang lại sự minh bạch tuyệt đối trong báo giá, giúp bạn dễ dàng lập kế hoạch tài chính và tránh mọi chi phí phát sinh không đáng có.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-q8-primary-50 rounded-3xl p-8 border-2 border-q8-primary-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex-shrink-0 w-14 h-14 bg-q8-primary-900 rounded-2xl flex items-center justify-center">
                    <FaMoneyBillWave className="text-2xl text-white" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-q8-primary-900 flex-1 leading-tight">Cách tính chi phí Thiết kế Nội thất</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-q8-primary-900 mb-2">• Tính theo mét vuông (m²)</h4>
                    <p className="text-q8-primary-600 leading-relaxed">Đây là cách tính phổ biến nhất, phù hợp với các công trình nhà phố, căn hộ. Đơn giá thiết kế sẽ được nhân với tổng diện tích sàn xây dựng, giúp bạn dễ dàng dự trù ngân sách.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-q8-primary-900 mb-2">• Tính theo gói thiết kế trọn bộ</h4>
                    <p className="text-q8-primary-600 leading-relaxed">Phương án này thường được áp dụng cho các dự án lớn như biệt thự. Q8 Design sẽ đưa ra một mức giá trọn gói cho toàn bộ hồ sơ thiết kế, bao gồm cả kiến trúc, nội thất, kết cấu và điện nước, đảm bảo sự đồng bộ và tối ưu chi phí.</p>
                  </div>
                </div>
              </div>

              <div className="bg-q8-primary-50 rounded-3xl p-8 border-2 border-q8-primary-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex-shrink-0 w-14 h-14 bg-q8-primary-900 rounded-2xl flex items-center justify-center">
                    <FaChartLine className="text-2xl text-white" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-q8-primary-900 flex-1 leading-tight">Yếu tố ảnh hưởng đến Chi phí</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <FaCheckCircle className="text-q8-primary-900 flex-shrink-0 mt-1" />
                    <p className="text-q8-primary-700"><strong>Loại hình công trình:</strong> Biệt thự, nhà phố hay công trình thương mại sẽ có mức giá khác nhau do sự phức tạp và quy mô của từng loại.</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <FaCheckCircle className="text-q8-primary-900 flex-shrink-0 mt-1" />
                    <p className="text-q8-primary-700"><strong>Độ phức tạp của thiết kế:</strong> Các phong cách thiết kế phức tạp như tân cổ điển thường yêu cầu nhiều chi tiết, thời gian và công sức hơn so với phong cách hiện đại, tối giản.</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <FaCheckCircle className="text-q8-primary-900 flex-shrink-0 mt-1" />
                    <p className="text-q8-primary-700"><strong>Yêu cầu riêng biệt:</strong> Nếu bạn có các yêu cầu đặc biệt về vật liệu, công năng hoặc cần một thiết kế độc bản hoàn toàn, chi phí có thể sẽ thay đổi.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-1 gap-8 items-center">
              <div className="bg-white rounded-3xl p-8 md:p-12 border-2 border-q8-primary-200 text-center">
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-q8-primary-900">Liên hệ nhận báo giá chi tiết miễn phí</h3>
                <p className="text-lg text-q8-primary-600 mb-4">
                  Chúng tôi luôn có các chương trình khuyến mãi đặc biệt cho khách hàng sử dụng dịch vụ trọn gói (thiết kế & thi công).
                </p>
                <div className="flex justify-center">
                  <button
                    onClick={() => setIsContactPopupOpen(true)}
                    className="inline-flex items-center justify-center px-8 py-4 bg-q8-primary-900 text-white font-bold rounded-full hover:bg-q8-primary-700 transition-all duration-300"
                  >
                    Liên hệ ngay
                    <FaArrowRight className="ml-3" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* VI. Vì sao nên chọn Q8 Design? */}
      <section className="py-12 bg-q8-primary-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-xl md:text-4xl font-bold text-q8-primary-900 mt-6 mb-4">
              Vì sao nên chọn Q8 Design?
            </h2>
            <p className="text-lg text-q8-primary-600 max-w-5xl mx-auto">
              Trong một thị trường đầy rẫy các đơn vị thiết kế và thi công, Q8 Design nổi bật với triết lý kinh doanh tử tế và sự cam kết về chất lượng. Lựa chọn chúng tôi, bạn không chỉ có một ngôi nhà đẹp mà còn có một người bạn đồng hành tin cậy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8  mb-16">
            {whyChooseUs.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex-shrink-0 w-14 h-14 bg-q8-primary-100 rounded-2xl flex items-center justify-center group-hover:bg-q8-primary-900 transition-all duration-300">
                      <Icon className="text-2xl text-q8-primary-900 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h3 className="text-lg font-bold text-q8-primary-900 flex-1 leading-tight">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-q8-primary-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Hình ảnh đội ngũ */}
          <div className="mt-2 ">
            <div className="relative h-[300px] md:h-[450px] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/doi-ngu-thiet-ke-noi-that-q8design.webp"
                alt="Đội ngũ thiết kế nội thất chuyên nghiệp Q8 Design"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* VII. Phong cách Thiết kế Nội thất Phổ biến tại Q8 Design */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-xl md:text-4xl font-bold text-q8-primary-900 mt-6 mb-2">
              Phong cách Thiết kế Nội thất Phổ biến tại Q8 Design
            </h2>
            <p className="text-lg text-q8-primary-600 max-w-6xl mx-auto">
              Q8 Design tự hào am hiểu và chuyên sâu trong nhiều phong cách thiết kế nội thất. Mỗi phong cách đều được chúng tôi nghiên cứu tỉ mỉ để tạo ra một không gian sống không chỉ đẹp mắt mà còn phản ánh trọn vẹn cá tính và gu thẩm mỹ của gia chủ.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8  mb-8">
            {designStyles.map((style, index) => {
              const Icon = style.icon;
              return (
                <div key={index} className="bg-q8-primary-50 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-q8-primary-900 rounded-2xl flex items-center justify-center">
                      <Icon className="text-xl text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-q8-primary-900 flex-1 leading-tight">
                      {style.title}
                    </h3>
                  </div>
                  <p className="text-q8-primary-600 leading-relaxed">
                    {style.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="relative h-36 md:h-[350px] rounded-3xl overflow-hidden ">
            <Image
              src="/images/phong-cach-thiet-ke-noi-that.webp"
              alt="Các phong cách thiết kế nội thất Q8 Design thực hiện"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* VIII. Xu hướng Thiết kế Nội thất năm 2026 */}
      <section className="py-12 bg-q8-primary-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-xl md:text-4xl font-bold text-q8-primary-900 mt-6 mb-2">
              Xu hướng Thiết kế Nội thất năm 2026
            </h2>
            <p className="text-lg text-q8-primary-600 max-w-6xl mx-auto">
              Để kiến tạo nên những không gian sống không chỉ đẹp mà còn mang giá trị bền vững, Q8 Design luôn tiên phong cập nhật các xu hướng mới nhất của ngành nội thất.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
            {trends2026.map((trend, index) => {
              const Icon = trend.icon;
              return (
                <div key={index} className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-q8-primary-200 hover:border-q8-primary-300">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={trend.image}
                      alt={trend.title}
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-q8-primary-900 rounded-xl flex items-center justify-center shadow-lg">
                        <Icon className="text-xl text-white" />
                      </div>
                      <h3 className="text-base font-bold text-q8-primary-900 flex-1 leading-tight">
                        {trend.title}
                      </h3>
                    </div>
                    <p className="text-q8-primary-600 leading-relaxed">
                      {trend.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* IX. Câu hỏi thường gặp (FAQ) */}
      <section className="py-8 bg-q8-primary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-xl md:text-4xl font-bold text-q8-primary-900 mb-4">
                Câu hỏi thường gặp về Thiết kế Nội thất
              </h2>
            </div>

            <div className="space-y-6">
              {faqs.map((faq, index) => {
                const Icon = faq.icon;
                return (
                  <div key={index} className="bg-q8-primary-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-start space-x-4 mb-4">
                      <Icon className="text-2xl text-q8-primary-900 flex-shrink-0 mt-1" />
                      <h3 className="text-lg font-bold text-q8-primary-900">
                        {faq.question}
                      </h3>
                    </div>
                    <p className="text-q8-primary-600 leading-relaxed pl-12">
                      {faq.answer}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* X. Kêu gọi Hành động (CTA) */}
      <section className="py-8 bg-gradient-to-r from-q8-primary-900 to-q8-primary-700">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-6xl mx-auto text-white">
            <p className="text-xl md:text-4xl font-bold mb-3">
              Bạn đã sẵn sàng bắt đầu dự án của mình?
            </p>
            <p className="text-base text-q8-primary-100 leading-relaxed mb-6">
              Nếu bạn đang ấp ủ một ý tưởng về không gian sống hoàn hảo, đừng ngần ngại biến nó thành hiện thực. Thiết kế nội thất không chỉ là một dịch vụ, mà là một hành trình để kiến tạo nên những giá trị bền vững và độc bản.
              Hãy để Q8 Design đồng hành cùng bạn từ những nét phác thảo đầu tiên cho đến khi công trình được hoàn thiện. Chúng tôi cam kết mang lại một quy trình chuyên nghiệp, minh bạch và tận tâm.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setIsContactPopupOpen(true)}
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-q8-primary-900 font-bold rounded-full hover:bg-q8-primary-50 transition-colors duration-300"
              >
                <FaPhoneAlt className="mr-3" />
                Liên hệ tư vấn miễn phí
                <FaArrowRight className="ml-3" />
              </button>
              <Link
                href="/dich-vu"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-all duration-300"
              >
                Xem các dịch vụ khác
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Popup Modal */}
      {isContactPopupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl">
            <button
              onClick={() => setIsContactPopupOpen(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-q8-primary-100 hover:bg-q8-primary-200 rounded-full transition-colors duration-200"
              aria-label="Đóng popup"
            >
              <FaTimes className="text-q8-primary-900 text-xl" />
            </button>
            
            <div className="p-6 md:p-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-q8-primary-900 mb-2">
                  Đăng ký tư vấn miễn phí
                </h2>
                <p className="text-q8-primary-600">
                  Để lại thông tin, chúng tôi sẽ liên hệ tư vấn trong 24h
                </p>
              </div>
              <ContactForm />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

