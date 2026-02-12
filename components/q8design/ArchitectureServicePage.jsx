import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  FaArrowRight, 
  FaCheckCircle,
  FaStar,
  FaClock,
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
  FaTimes
} from "react-icons/fa";
import ContactForm from "../header/ContactForm";

export default function ArchitectureServicePage() {
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false);
  // Các loại hình thiết kế Kiến trúc phổ biến
  const serviceTypes = [
    {
      icon: FaHome,
      title: "Thiết kế Kiến trúc Nhà phố – Nhà liền kề",
      description: "Loại hình này phù hợp với các gia đình sống tại những khu đô thị lớn, nơi diện tích đất hạn chế. Thiết kế nhà phố đòi hỏi sự tối ưu hóa không gian, đảm bảo công năng sử dụng hiệu quả mà vẫn giữ được tính thẩm mỹ, hiện đại.",
      features: [
        "Tối ưu không gian trong đô thị",
        "Đầy đủ ánh sáng tự nhiên",
        "Thiết kế hiện đại, thông thoáng",
        "Giải pháp sáng tạo cho không gian nhỏ"
      ],
      image: "/images/thiet-ke-nha-pho-hien-dai-q8design.webp"
    },
    {
      icon: FaBuilding,
      title: "Thiết kế Biệt thự Cao cấp – Villa Nghỉ dưỡng",
      description: "Đây là loại hình dành cho những khách hàng tìm kiếm không gian sống đẳng cấp, sang trọng và riêng tư. Thiết kế biệt thự và villa nghỉ dưỡng đòi hỏi sự sáng tạo không giới hạn, kết hợp hài hòa giữa kiến trúc, cảnh quan và nội thất.",
      features: [
        "Thiết kế độc đáo, đẳng cấp",
        "Kết hợp kiến trúc & cảnh quan",
        "Không gian riêng tư, sang trọng",
        "Vẻ đẹp trường tồn theo thời gian"
      ],
      image: "/images/thiet-ke-biet-thu-cao-cap-q8design.jpg"
    },
    {
      icon: FaStore,
      title: "Thiết kế Văn phòng – Công trình Công cộng",
      description: "Không gian làm việc không chỉ là nơi làm việc, mà còn là nơi khơi nguồn cảm hứng và thúc đẩy sự sáng tạo. Dịch vụ thiết kế văn phòng của Q8 Design tập trung vào việc tạo ra môi trường làm việc chuyên nghiệp, tối ưu công năng và thể hiện văn hóa doanh nghiệp.",
      features: [
        "Môi trường làm việc chuyên nghiệp",
        "Tối ưu công năng sử dụng",
        "Thể hiện văn hóa doanh nghiệp",
        "Hiệu quả trong vận hành"
      ],
      image: "/images/thiet-ke-van-phong-chuyen-nghiep-q8design.webp"
    },
    {
      icon: FaCity,
      title: "Thiết kế Resort, Khách sạn, Quán cà phê, Showroom",
      description: "Đối với các dự án kinh doanh, thiết kế kiến trúc là yếu tố then chốt tạo nên bản sắc thương hiệu. Chúng tôi am hiểu tầm quan trọng của việc thiết kế không gian có hồn, kể được một câu chuyện riêng, từ đó thu hút và giữ chân khách hàng.",
      features: [
        "Không gian có hồn, kể câu chuyện",
        "Thu hút và giữ chân khách hàng",
        "Tính ứng dụng cao cho kinh doanh",
        "Khẳng định vị thế thương hiệu"
      ],
      image: "/images/thiet-ke-resort-showroom-q8design.webp"
    }
  ];

  // Lợi ích khi sử dụng dịch vụ
  const benefits = [
    {
      icon: FaPalette,
      title: "Đảm bảo Thẩm mỹ, Công năng và Phong thủy",
      description: "Một kiến trúc sư giỏi sẽ là người kiến tạo không gian, đảm bảo ngôi nhà của bạn không chỉ có vẻ ngoài hấp dẫn mà còn đáp ứng đầy đủ công năng sử dụng. Chúng tôi sẽ phân bổ không gian hợp lý, tối ưu ánh sáng và gió tự nhiên, tạo ra một môi trường sống thoải mái."
    },
    {
      icon: FaMoneyBillWave,
      title: "Tiết kiệm Chi phí và Thời gian",
      description: "Thiết kế kiến trúc chuyên nghiệp giúp bạn có một kế hoạch chi tiết, chính xác ngay từ đầu. Điều này giúp tránh được những sai sót, phát sinh không đáng có trong quá trình thi công. Nhờ vậy, bạn sẽ tiết kiệm được một khoản chi phí lớn và rút ngắn thời gian hoàn thiện công trình."
    },
    {
      icon: FaChartLine,
      title: "Tăng Giá trị Công trình",
      description: "Một công trình được thiết kế bài bản và có gu thẩm mỹ độc đáo sẽ có giá trị cao hơn hẳn so với những ngôi nhà được xây dựng một cách tùy hứng. Thiết kế chuyên nghiệp không chỉ tăng giá trị sử dụng mà còn là một khoản đầu tư sinh lời."
    },
    {
      icon: FaUsers,
      title: "Tạo Dấu ấn Cá nhân – Thể hiện Phong cách Sống",
      description: "Cuối cùng, ngôi nhà là tấm gương phản chiếu cá tính của bạn. Dịch vụ thiết kế kiến trúc của Q8 Design sẽ giúp bạn hiện thực hóa những ý tưởng độc đáo, từ phong cách tối giản, hiện đại đến tân cổ điển. Chúng tôi lắng nghe để hiểu câu chuyện của bạn."
    }
  ];

  // Quy trình thiết kế
  const designProcess = [
    {
      step: "01",
      title: "Lắng nghe & Thấu hiểu Tầm nhìn của bạn",
      description: "Đây là giai đoạn cốt lõi, nơi chúng tôi áp dụng nguyên tắc đầu tiên là lắng nghe. Chúng tôi không chỉ tiếp nhận yêu cầu, mà còn dành thời gian để thấu hiểu câu chuyện, phong cách sống và những giá trị mà bạn muốn kiến tạo. Sau đó, đội ngũ kiến trúc sư sẽ tiến hành khảo sát thực địa một cách tỉ mỉ."
    },
    {
      step: "02",
      title: "Biến Ý tưởng thành Bản vẽ Sơ bộ",
      description: "Dựa trên sự thấu hiểu ở Bước 1, chúng tôi sẽ chia sẻ sự sáng tạo để hiện thực hóa ý tưởng của bạn. Chúng tôi sẽ đề xuất các phương án bố trí mặt bằng, ý tưởng kiến trúc tổng thể, và phác thảo phối cảnh 3D ban đầu. Đây là giai đoạn bạn sẽ cảm nhận được sự sáng tạo và chuyên môn của đội ngũ Q8 Design."
    },
    {
      step: "03",
      title: "Hoàn thiện Hồ sơ Kỹ thuật Thi công",
      description: "Khi bản vẽ ý tưởng đã được duyệt, chúng tôi sẽ chuyển sang giai đoạn chính xác trong thực thi. Bộ hồ sơ kỹ thuật thi công được hoàn thiện một cách chi tiết đến từng milimet, bao gồm bản vẽ kết cấu, điện nước, vật liệu, và các chi tiết kỹ thuật khác. Đây là 'kim chỉ nam' cho đội ngũ thi công."
    },
    {
      step: "04",
      title: "Giám sát Tác giả và Hậu mãi",
      description: "Quy trình của chúng tôi không kết thúc khi bản vẽ được bàn giao. Q8 Design sẽ tiếp tục đồng hành bằng việc hỗ trợ giám sát tác giả trong suốt quá trình thi công. Điều này đảm bảo công trình thực tế giống hệt với bản vẽ thiết kế. Sau khi bàn giao, chúng tôi sẽ tiếp tục duy trì liên lạc và cung cấp các dịch vụ hậu mãi."
    }
  ];

  // Xu hướng thiết kế 2026
  const trends2026 = [
    {
      icon: FaLeaf,
      title: "Kiến trúc Xanh – Giải pháp bền vững cho tương lai",
      description: "Kiến trúc xanh không chỉ là việc sử dụng các vật liệu thân thiện với môi trường như gỗ tái chế, tre, và gạch không nung, mà còn là việc tích hợp thiên nhiên vào không gian sống. Xu hướng này hướng đến việc tối ưu hóa hiệu quả năng lượng, sử dụng ánh sáng và gió tự nhiên.",
      image: "/images/xu-huong-kien-truc-xanh-2026.webp"
    },
    {
      icon: FaDoorOpen,
      title: "Không gian mở đa chức năng",
      description: "Nhu cầu về một không gian sống linh hoạt đang trở nên phổ biến. Không gian mở đa chức năng xóa bỏ các bức tường cứng nhắc, kết nối phòng khách, bếp và phòng ăn thành một khu vực chung. Điều này không chỉ giúp tối ưu hóa diện tích mà còn tạo ra sự gắn kết giữa các thành viên trong gia đình.",
      image: "/images/xu-huong-cong-nghe-ai-kien-truc-2026.webp"
  
    },
    {
      icon: FaRobot,
      title: "Ứng dụng Công nghệ trong Thiết kế và Thi công",
      description: "Công nghệ AI và thực tế ảo (VR) đang cách mạng hóa ngành kiến trúc. Q8 Design ứng dụng các công nghệ tiên tiến để tạo ra các mô phỏng 3D chân thực, giúp khách hàng hình dung không gian của mình một cách sống động nhất. Điều này giúp quá trình thiết kế nhanh chóng và chính xác hơn.",
      image: "/images/xu-huong-khong-gian-mo-2026.webp"

    },
    {
      icon: FaSpa,
      title: "Phong cách Nhật Bản – Đề cao sự Tinh tế và Tối giản",
      description: "Phong cách kiến trúc Nhật Bản với vẻ đẹp tối giản nhưng tinh tế đang ngày càng được ưa chuộng. Xu hướng này tập trung vào các đường nét sạch sẽ, vật liệu tự nhiên và sự hài hòa với môi trường xung quanh. Chúng tôi sẽ khéo léo sử dụng các yếu tố như gỗ, ánh sáng tự nhiên để tạo ra một không gian sống yên bình.",
      image: "/images/xu-huong-phong-cach-nhat-ban-2026.webp"
    }
  ];

  // Tại sao chọn Q8 Design
  const whyChooseUs = [
    {
      icon: FaStar,
      title: "Kinh nghiệm & Đội ngũ Kiến trúc sư Chuyên môn cao",
      description: "Q8 Design được dẫn dắt bởi đội ngũ kiến trúc sư tốt nghiệp từ các trường đại học hàng đầu, với tư duy sáng tạo và kinh nghiệm dày dặn trong nhiều dự án. Chúng tôi không chỉ là người thiết kế, mà còn là những chuyên gia am hiểu về kỹ thuật, vật liệu và công năng."
    },
    {
      icon: FaAward,
      title: "Chất lượng là lời cam kết",
      description: "Q8 Design đặt sự chỉn chu và tỉ mỉ lên hàng đầu. Mỗi công trình đều được thực hiện với sự giám sát chặt chẽ, từ bản vẽ kỹ thuật đến thi công thực tế, cam kết mang lại sản phẩm bền vững và thẩm mỹ."
    },
    {
      icon: FaLightbulb,
      title: "Sáng tạo không ngừng",
      description: "Chúng tôi không chạy theo xu hướng mà tập trung vào bản sắc độc đáo. Mỗi thiết kế là một tác phẩm nghệ thuật, thể hiện câu chuyện riêng của gia chủ và vượt qua mọi giới hạn về sáng tạo."
    },
    {
      icon: FaClock,
      title: "Linh hoạt về ngân sách & tiến độ",
      description: "Q8 Design luôn lắng nghe và tìm kiếm giải pháp tối ưu nhất, phù hợp với ngân sách và thời gian của bạn. Chúng tôi cam kết không phát sinh chi phí một cách không hợp lý, giúp bạn hoàn toàn an tâm."
    },
    {
      icon: FaHandshake,
      title: "Dịch vụ trọn gói",
      description: "Chúng tôi cung cấp dịch vụ toàn diện từ thiết kế kiến trúc, nội thất đến thi công trọn gói. Điều này đảm bảo sự đồng nhất và chính xác giữa bản vẽ và sản phẩm cuối cùng, giúp bạn tiết kiệm thời gian, công sức và chi phí quản lý."
    }
  ];

  // Câu hỏi thường gặp
  const faqs = [
    {
      icon: FaQuestionCircle,
      question: "Thiết kế kiến trúc mất bao lâu?",
      answer: "Thời gian thiết kế phụ thuộc vào quy mô và độ phức tạp của từng công trình. Đối với các công trình nhà ở, biệt thự, thời gian thiết kế thường dao động từ 30 đến 45 ngày kể từ khi hợp đồng được ký kết. Chúng tôi sẽ có lịch trình làm việc chi tiết và cam kết bàn giao đúng tiến độ."
    },
    {
      icon: FaQuestionCircle,
      question: "Tôi có thể chỉnh sửa bản vẽ không?",
      answer: "Chắc chắn rồi. Tại Q8 Design, chúng tôi luôn đặt khách hàng làm trung tâm. Trong quá trình làm việc, chúng tôi sẽ lắng nghe và điều chỉnh bản vẽ theo mong muốn của bạn. Tuy nhiên, để đảm bảo tiến độ và chất lượng, số lần chỉnh sửa sẽ được thỏa thuận rõ ràng trong hợp đồng."
    },
    {
      icon: FaQuestionCircle,
      question: "Phí thiết kế có được trừ khi thi công không?",
      answer: "Có. Khi bạn sử dụng dịch vụ trọn gói (thiết kế và thi công) của Q8 Design, chúng tôi sẽ có chính sách hoàn lại phí thiết kế, giúp bạn tối ưu hóa chi phí đầu tư. Đây là một trong những ưu đãi đặc biệt của chúng tôi, nhằm mang lại lợi ích tốt nhất cho khách hàng."
    },
    {
      icon: FaQuestionCircle,
      question: "Có hỗ trợ giám sát công trình không?",
      answer: "Có. Q8 Design cung cấp dịch vụ hỗ trợ giám sát tác giả trong suốt quá trình thi công. Đội ngũ kiến trúc sư của chúng tôi sẽ có mặt tại công trình để đảm bảo mọi hạng mục thi công đều tuân thủ đúng bản vẽ thiết kế, từ đó đảm bảo chất lượng và tính thẩm mỹ cho công trình của bạn."
    }
  ];


  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative md:h-[70vh] h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/service-architecture.webp"
            alt="Dịch vụ Thiết kế Kiến trúc: Kiến tạo Không gian Sống Đẳng cấp | Q8 Design"
            fill
            className="object-cover brightness-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"></div>
        </div>
        
        <div className="relative z-10 text-center text-white max-w-5xl mx-auto px-4">
          
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6">
          Dịch vụ Thiết kế Kiến trúc: <br />
            <span className="">Kiến tạo Không gian Sống Đẳng cấp</span>
          </h1>
          <p className="text-lg md:text-xl text-q8-primary-100 max-w-5xl mx-auto leading-relaxed mb-8">
          Kiến tạo không gian sống mơ ước của bạn với dịch vụ thiết kế kiến trúc chuyên nghiệp từ Q8 Design. Chúng tôi cam kết đồng hành cùng bạn để tạo ra những công trình độc đáo, bền vững, phản ánh trọn vẹn phong cách và cá tính riêng.
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

      {/* I. Giới thiệu về Dịch vụ Thiết kế Kiến trúc */}
      <section className="py-12 bg-white ">
        <div className="">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h2 className="text-2xl md:text-4xl font-bold text-q8-primary-900 mb-6">
                Dịch vụ Thiết kế Kiến trúc
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center mb-8">
              <div className="prose prose-lg max-w-none">
                <p className="text-q8-primary-700 leading-relaxed mb-6 text-lg">
                  Tại Việt Nam, khi nhu cầu về một không gian sống không chỉ dừng lại ở việc &quot;có nơi để ở&quot;, mà còn là nơi thể hiện cá tính và phong cách sống, thì vai trò của kiến trúc sư lại càng trở nên quan trọng. Một ngôi nhà đẹp, một không gian làm việc hiệu quả, hay một công trình thương mại ấn tượng đều cần sự đầu tư đúng mức ngay từ bản vẽ đầu tiên.
                </p>
                <p className="text-q8-primary-700 leading-relaxed mb-6 text-lg">
                  Tuy nhiên, việc tự mình lên ý tưởng và hiện thực hóa ngôi nhà mơ ước là một thách thức không hề nhỏ. Đó là lý do vì sao dịch vụ thiết kế kiến trúc ra đời, trở thành cầu nối vững chắc biến mọi ý tưởng thành hiện thực.
                </p>
                <p className="text-q8-primary-700 leading-relaxed text-lg">
                  <Link href="/" className="text-q8-primary-900 ">Q8 Design</Link> tự hào là một công ty thiết kế kiến trúc tiên phong trong lĩnh vực này. Với đội ngũ kiến trúc sư được đào tạo bài bản và có kinh nghiệm dày dặn, chúng tôi không chỉ mang đến những bản vẽ chất lượng mà còn đồng hành cùng khách hàng trong suốt hành trình kiến tạo không gian sống hoàn hảo.
                </p>
              </div>
              
              <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden">
                <Image
                  src="/images/gioi-thieu-dich-vu-thiet-ke-kien-truc-q8design.webp"
                  alt="Kiến trúc sư Q8 Design tư vấn thiết kế kiến trúc cho khách hàng"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* II. Lợi ích khi sử dụng Dịch vụ Thiết kế Kiến trúc Chuyên nghiệp */}
      <section className="py-12 bg-q8-primary-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-xl md:text-4xl font-bold text-q8-primary-900 mb-2">
              Lợi ích khi sử dụng Dịch vụ Thiết kế Kiến trúc
            </h2>
            <p className="text-lg text-q8-primary-600 max-w-3xl mx-auto">
              Nhiều người lầm tưởng rằng thiết kế kiến trúc chỉ đơn thuần là vẽ một bản sơ đồ. Tuy nhiên, đó là một quá trình phức tạp nhằm biến ý tưởng thành hiện thực một cách khoa học và tối ưu.
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

        </div>
      </section>

      {/* III. Các loại hình thiết kế Kiến trúc phổ biến */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-xl md:text-4xl font-bold text-q8-primary-900 mt-6 mb-2">
              Các loại hình thiết kế Kiến trúc phổ biến
            </h2>
            <p className="text-lg text-q8-primary-600 max-w-5xl mx-auto">
              Q8 Design cung cấp một hệ sinh thái dịch vụ đa dạng, đáp ứng mọi nhu cầu kiến tạo không gian sống và kinh doanh.
            </p>
          </div>

          <div className="space-y-8 ">
            {serviceTypes.map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={index} className={`bg-q8-primary-50 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ${index % 2 === 0 ? '' : 'md:flex-row-reverse'} flex flex-col md:flex-row`}>
                  <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
                    {/* Icon và Tiêu đề trên cùng 1 dòng */}
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

      {/* IV. Quy trình Thiết kế Kiến trúc Chuyên nghiệp tại Q8 Design */}
      <section className="py-12 bg-gradient-to-br from-q8-primary-50 to-q8-primary-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-xl md:text-4xl font-bold text-q8-primary-900 mt-6 mb-4">
              Quy trình Thiết kế Kiến trúc Chuyên nghiệp tại Q8 Design
            </h2>
            <p className="text-lg text-q8-primary-600 max-w-3xl mx-auto">
              Tại Q8 Design, chúng tôi tin rằng một quy trình chuẩn mực không chỉ là các bước làm việc, mà còn là một hành trình đồng hành cùng khách hàng, từ ý tưởng ban đầu cho đến khi công trình hoàn thành.
            </p>
          </div>

          <div className="max-w-5xl mx-auto mb-12">
            <div className="space-y-6">
              {designProcess.map((step, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 md:p-8 shadow-md hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-br from-q8-primary-900 to-q8-primary-700 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
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

      {/* V. Báo giá Dịch vụ Thiết kế Kiến trúc */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="">
            <div className="text-center mb-12">
            
              <h2 className="text-xl md:text-4xl font-bold text-q8-primary-900 mt-6 mb-4">
                Báo giá Dịch vụ Thiết kế Kiến trúc: Minh bạch & Tối ưu
              </h2>
              <p className="text-lg text-q8-primary-600 max-w-3xl mx-auto">
                Một trong những băn khoăn lớn nhất của khách hàng khi bắt đầu xây dựng ngôi nhà là chi phí. Tại Q8 Design, chúng tôi cam kết mang lại sự minh bạch tuyệt đối trong báo giá.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gradient-to-br from-q8-primary-50 to-white rounded-3xl p-8 border-2 border-q8-primary-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex-shrink-0 w-14 h-14 bg-q8-primary-900 rounded-2xl flex items-center justify-center">
                    <FaMoneyBillWave className="text-2xl text-white" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-q8-primary-900 flex-1 leading-tight">Cách tính chi phí</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-q8-primary-900 mb-2">• Tính theo mét vuông (m²)</h4>
                    <p className="text-q8-primary-600 leading-relaxed">Đơn giá thiết kế được nhân với tổng diện tích sàn xây dựng. Phù hợp với nhà ở, biệt thự quy mô vừa và nhỏ.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-q8-primary-900 mb-2">• Tính theo gói thiết kế</h4>
                    <p className="text-q8-primary-600 leading-relaxed">Áp dụng cho dự án phức tạp, mức giá trọn gói cho toàn bộ hồ sơ thiết kế bao gồm kiến trúc, kết cấu, điện nước và nội thất.</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-q8-primary-50 to-white rounded-3xl p-8 border-2 border-q8-primary-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex-shrink-0 w-14 h-14 bg-q8-primary-900 rounded-2xl flex items-center justify-center">
                    <FaChartLine className="text-2xl text-white" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-q8-primary-900 flex-1 leading-tight">Yếu tố ảnh hưởng</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <FaCheckCircle className="text-q8-primary-900 flex-shrink-0 mt-1" />
                    <p className="text-q8-primary-700"><strong>Loại hình công trình:</strong> Biệt thự, nhà phố hay công trình thương mại</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <FaCheckCircle className="text-q8-primary-900 flex-shrink-0 mt-1" />
                    <p className="text-q8-primary-700"><strong>Độ phức tạp:</strong> Phong cách cổ điển, tân cổ điển yêu cầu nhiều chi tiết hơn</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <FaCheckCircle className="text-q8-primary-900 flex-shrink-0 mt-1" />
                    <p className="text-q8-primary-700"><strong>Yêu cầu riêng:</strong> Vật liệu đặc biệt, thiết kế độc bản hoàn toàn</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-1 gap-8 items-center">
              <div className="bg-white rounded-3xl p-8 md:p-12 border-2 border-q8-primary-200">
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-q8-primary-900">Nhận báo giá chi tiết miễn phí</h3>
                <p className="text-lg text-q8-primary-600 mb-4">
                  Chúng tôi luôn có các chương trình khuyến mãi đặc biệt cho khách hàng sử dụng dịch vụ trọn gói (thiết kế & thi công).
                </p>
                <div className="flex justify-center">
                  <Link
                    href="/lien-he"
                    className="inline-flex items-center justify-center px-8 py-4 bg-q8-primary-900 text-white font-bold rounded-full hover:bg-q8-primary-700 transition-all duration-300"
                  >
                    Liên hệ ngay
                    <FaArrowRight className="ml-3" />
                  </Link>
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
              Trong một thị trường đầy rẫy các đơn vị thiết kế và thi công, Q8 Design nổi bật với triết lý kinh doanh tử tế và sự cam kết về chất lượng.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
            {whyChooseUs.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  {/* Icon và Tiêu đề trên cùng 1 dòng */}
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
          <div className="mt-16 ">
            <div className="relative h-[300px] md:h-[450px] rounded-3xl overflow-hidden shadow-2xl mb-12">
              <Image
                src="/images/doi-ngu-thiet-ke-noi-that-q8design (2).webp"
                alt="Đội ngũ kiến trúc sư Q8 Design chuyên nghiệp và tận tâm"
                fill
                className="object-cover"
              />
            </div>
          </div>

     
        </div>
      </section>

      {/* VII. Xu hướng Thiết kế Kiến trúc Thịnh hành năm 2026 */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-xl md:text-4xl font-bold text-q8-primary-900 mt-6 mb-2">
              Xu hướng Thiết kế Kiến trúc Thịnh hành 2026
            </h2>
            <p className="text-lg text-q8-primary-600 max-w-6xl mx-auto">
              Để luôn bắt kịp nhịp sống hiện đại và đáp ứng nhu cầu ngày càng cao của khách hàng, Q8 Design không ngừng cập nhật các xu hướng mới nhất.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8  mb-8">
            {trends2026.map((trend, index) => {
              const Icon = trend.icon;
              return (
                <div key={index} className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-q8-primary-200 hover:border-q8-primary-300">
                  {/* Hình ảnh minh họa */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={trend.image}
                      alt={trend.title}
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  </div>
                  
                  {/* Nội dung */}
                  <div className="p-4">
                    {/* Icon và Tiêu đề trên cùng 1 dòng */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-q8-primary-900 to-q8-primary-700 rounded-xl flex items-center justify-center shadow-lg">
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


      {/* VIII. Câu hỏi thường gặp */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="">
            <div className="text-center mb-8">
              <h2 className="text-xl md:text-4xl font-bold text-q8-primary-900 mb-4">
                Câu hỏi thường gặp về Thiết kế Kiến trúc
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

      {/* IX. Kêu gọi Hành động (CTA) */}
      <section className="py-8 bg-gradient-to-r from-q8-primary-900 to-q8-primary-700">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-6xl mx-auto text-white">
            <p className="text-xl md:text-4xl font-bold mb-3">
              Bạn đã sẵn sàng bắt đầu dự án của mình?
            </p>
            <p className="text-base text-q8-primary-100 leading-relaxed mb-6">
              Nếu bạn đang ấp ủ một ý tưởng về không gian sống hoàn hảo, đừng ngần ngại biến nó thành hiện thực. Thiết kế kiến trúc không chỉ là một dịch vụ, mà là một hành trình để kiến tạo nên những giá trị bền vững và độc bản.
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
            {/* Close Button */}
            <button
              onClick={() => setIsContactPopupOpen(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-q8-primary-100 hover:bg-q8-primary-200 rounded-full transition-colors duration-200"
              aria-label="Đóng popup"
            >
              <FaTimes className="text-q8-primary-900 text-xl" />
            </button>
            
            {/* Contact Form */}
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

