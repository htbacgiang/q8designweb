import Head from "next/head";
import { FaShieldAlt, FaLock, FaEye, FaUserShield, FaDatabase, FaCog, FaExclamationTriangle, FaCheckCircle, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import DefaultLayout from "../components/layout/DefaultLayout";
export default function PrivacyPolicyPage() {
  return (
    <DefaultLayout>
      <Head>
        <title>Chính sách bảo mật - Q8 Design</title>
        <meta name="description" content="Chính sách bảo mật thông tin cá nhân của Q8 Design - Công ty thiết kế và thi công nội thất hàng đầu Việt Nam" />
        <meta name="keywords" content="chính sách bảo mật, bảo vệ thông tin, quyền riêng tư, Q8 Design, thiết kế nội thất" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Chính sách bảo mật - Q8 Design" />
        <meta property="og:description" content="Chính sách bảo mật thông tin cá nhân của Q8 Design - Công ty thiết kế và thi công nội thất hàng đầu Việt Nam" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://q8design.vn/chinh-sach-bao-mat" />
        <meta property="og:site_name" content="Q8 Design" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Chính sách bảo mật - Q8 Design" />
        <meta name="twitter:description" content="Chính sách bảo mật thông tin cá nhân của Q8 Design - Công ty thiết kế và thi công nội thất hàng đầu Việt Nam" />
        <link rel="canonical" href="https://q8design.vn/chinh-sach-bao-mat" />
      </Head>

      <div className="min-h-screen bg-q8-primary-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-q8-primary-900 to-q8-primary-700 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto text-center">
              <div className="mb-6">
                <FaShieldAlt className="text-6xl mx-auto mb-4 opacity-80" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Chính sách bảo mật
              </h1>
              <p className="text-xl text-q8-primary-100 leading-relaxed">
                Cam kết bảo vệ thông tin cá nhân và quyền riêng tư của khách hàng
              </p>
              <p className="text-sm text-q8-primary-200 mt-4">
                Cập nhật lần cuối: {new Date().toLocaleDateString('vi-VN')}
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
                
                {/* Introduction */}
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-q8-primary-900 mb-4 flex items-center">
                    <FaUserShield className="text-q8-primary-900 mr-3" />
                    1. Giới thiệu
                  </h2>
                  <p className="text-q8-primary-700 leading-relaxed mb-4">
                    Q8 Design cam kết bảo vệ quyền riêng tư và thông tin cá nhân của khách hàng. 
                    Chính sách bảo mật này giải thích cách chúng tôi thu thập, sử dụng, lưu trữ và bảo vệ 
                    thông tin cá nhân của bạn khi sử dụng dịch vụ thiết kế và thi công nội thất.
                  </p>
                  <p className="text-q8-primary-700 leading-relaxed">
                    Việc bạn sử dụng dịch vụ của chúng tôi có nghĩa là bạn đã đọc, hiểu và đồng ý 
                    với chính sách bảo mật này.
                  </p>
                </div>

                {/* Information Collection */}
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-q8-primary-900 mb-4 flex items-center">
                    <FaDatabase className="text-q8-primary-900 mr-3" />
                    2. Thu thập thông tin
                  </h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-bold text-q8-primary-800 mb-3">2.1. Thông tin chúng tôi thu thập</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-q8-primary-50 border-l-4 border-q8-primary-700 p-4">
                          <h4 className="font-bold text-q8-primary-800 mb-2">Thông tin cá nhân:</h4>
                          <ul className="list-disc list-inside text-q8-primary-700 space-y-1 text-sm">
                            <li>Họ tên, giới tính, ngày sinh</li>
                            <li>Số điện thoại, địa chỉ email</li>
                            <li>Địa chỉ nhà/doanh nghiệp</li>
                            <li>Thông tin liên hệ khẩn cấp</li>
                          </ul>
                        </div>
                        <div className="bg-q8-primary-50 border-l-4 border-q8-primary-600 p-4">
                          <h4 className="font-bold text-q8-primary-800 mb-2">Thông tin dự án:</h4>
                          <ul className="list-disc list-inside text-q8-primary-700 space-y-1 text-sm">
                            <li>Loại công trình (nhà ở, văn phòng, thương mại)</li>
                            <li>Diện tích và yêu cầu thiết kế</li>
                            <li>Ngân sách dự kiến</li>
                            <li>Hình ảnh hiện trạng (nếu có)</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-q8-primary-800 mb-3">2.2. Phương thức thu thập</h3>
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3">
                          <FaCheckCircle className="text-q8-primary-700 mt-1 flex-shrink-0" />
                          <div>
                            <p className="font-medium text-q8-primary-800">Đăng ký tư vấn trực tuyến</p>
                            <p className="text-q8-primary-600 text-sm">Thông qua form liên hệ trên website</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <FaCheckCircle className="text-q8-primary-700 mt-1 flex-shrink-0" />
                          <div>
                            <p className="font-medium text-q8-primary-800">Gọi điện thoại</p>
                            <p className="text-q8-primary-600 text-sm">Khi bạn gọi hotline tư vấn</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <FaCheckCircle className="text-q8-primary-700 mt-1 flex-shrink-0" />
                          <div>
                            <p className="font-medium text-q8-primary-800">Gặp trực tiếp</p>
                            <p className="text-q8-primary-600 text-sm">Tại văn phòng hoặc công trình</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <FaCheckCircle className="text-q8-primary-700 mt-1 flex-shrink-0" />
                          <div>
                            <p className="font-medium text-q8-primary-800">Email và tin nhắn</p>
                            <p className="text-q8-primary-600 text-sm">Qua email, Zalo, Facebook Messenger</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Information Usage */}
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-q8-primary-900 mb-4 flex items-center">
                    <FaCog className="text-q8-primary-900 mr-3" />
                    3. Sử dụng thông tin
                  </h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-bold text-q8-primary-800 mb-3">3.1. Mục đích sử dụng</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        {[
                          {
                            title: "Cung cấp dịch vụ",
                            items: [
                              "Tư vấn thiết kế và thi công",
                              "Lập báo giá chi tiết",
                              "Thực hiện dự án theo yêu cầu",
                              "Hỗ trợ sau bán hàng"
                            ]
                          },
                          {
                            title: "Giao tiếp",
                            items: [
                              "Liên hệ tư vấn và báo giá",
                              "Cập nhật tiến độ dự án",
                              "Thông báo ưu đãi và sự kiện",
                              "Hỗ trợ kỹ thuật"
                            ]
                          },
                          {
                            title: "Cải thiện dịch vụ",
                            items: [
                              "Phân tích nhu cầu khách hàng",
                              "Nâng cao chất lượng dịch vụ",
                              "Phát triển sản phẩm mới",
                              "Đào tạo nhân viên"
                            ]
                          },
                          {
                            title: "Tuân thủ pháp luật",
                            items: [
                              "Thực hiện nghĩa vụ thuế",
                              "Báo cáo theo quy định",
                              "Giải quyết tranh chấp",
                              "Bảo vệ quyền lợi hợp pháp"
                            ]
                          }
                        ].map((section, index) => (
                          <div key={index} className="bg-q8-primary-50 rounded-lg p-4">
                            <h4 className="font-bold text-q8-primary-800 mb-3">{section.title}</h4>
                            <ul className="list-disc list-inside text-q8-primary-700 space-y-1 text-sm">
                              {section.items.map((item, itemIndex) => (
                                <li key={itemIndex}>{item}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-q8-primary-800 mb-3">3.2. Chia sẻ thông tin</h3>
                      <div className="bg-q8-primary-50 border-l-4 border-q8-primary-500 p-4">
                        <p className="text-q8-primary-700 mb-3">
                          <strong>Nguyên tắc:</strong> Chúng tôi không bán, cho thuê hoặc chia sẻ thông tin cá nhân 
                          của bạn với bên thứ ba vì mục đích thương mại.
                        </p>
                        <p className="text-q8-primary-700">
                          <strong>Ngoại lệ:</strong> Chỉ chia sẻ trong các trường hợp:
                        </p>
                        <ul className="list-disc list-inside text-q8-primary-700 space-y-1 mt-2 text-sm">
                          <li>Có sự đồng ý rõ ràng của bạn</li>
                          <li>Yêu cầu của cơ quan pháp luật có thẩm quyền</li>
                          <li>Bảo vệ quyền lợi hợp pháp của Q8 Design</li>
                          <li>Đối tác tin cậy (được ký thỏa thuận bảo mật)</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Data Protection */}
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-q8-primary-900 mb-4 flex items-center">
                    <FaLock className="text-q8-primary-900 mr-3" />
                    4. Bảo vệ thông tin
                  </h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-bold text-q8-primary-800 mb-3">4.1. Biện pháp bảo mật</h3>
                      <div className="grid md:grid-cols-3 gap-6">
                        <div className="text-center p-4 bg-q8-primary-50 rounded-lg border border-q8-primary-200">
                          <FaShieldAlt className="text-3xl text-q8-primary-700 mx-auto mb-3" />
                          <h4 className="font-bold text-q8-primary-800 mb-2">Mã hóa dữ liệu</h4>
                          <p className="text-q8-primary-600 text-sm">Sử dụng SSL/TLS để bảo vệ thông tin truyền tải</p>
                        </div>
                        <div className="text-center p-4 bg-q8-primary-50 rounded-lg border border-q8-primary-200">
                          <FaEye className="text-3xl text-q8-primary-700 mx-auto mb-3" />
                          <h4 className="font-bold text-q8-primary-800 mb-2">Kiểm soát truy cập</h4>
                          <p className="text-q8-primary-600 text-sm">Chỉ nhân viên được ủy quyền mới có thể truy cập</p>
                        </div>
                        <div className="text-center p-4 bg-q8-primary-50 rounded-lg border border-q8-primary-200">
                          <FaDatabase className="text-3xl text-q8-primary-700 mx-auto mb-3" />
                          <h4 className="font-bold text-q8-primary-800 mb-2">Lưu trữ an toàn</h4>
                          <p className="text-q8-primary-600 text-sm">Dữ liệu được lưu trữ trên server bảo mật cao</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-q8-primary-800 mb-3">4.2. Thời gian lưu trữ</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-q8-primary-300">
                          <thead>
                            <tr className="bg-q8-primary-100">
                              <th className="border border-q8-primary-300 px-4 py-2 text-left">Loại thông tin</th>
                              <th className="border border-q8-primary-300 px-4 py-2 text-left">Thời gian lưu trữ</th>
                              <th className="border border-q8-primary-300 px-4 py-2 text-left">Ghi chú</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="border border-q8-primary-300 px-4 py-2">Thông tin cá nhân cơ bản</td>
                              <td className="border border-q8-primary-300 px-4 py-2">5 năm</td>
                              <td className="border border-q8-primary-300 px-4 py-2">Sau khi hoàn thành dự án</td>
                            </tr>
                            <tr>
                              <td className="border border-q8-primary-300 px-4 py-2">Hồ sơ dự án</td>
                              <td className="border border-q8-primary-300 px-4 py-2">10 năm</td>
                              <td className="border border-q8-primary-300 px-4 py-2">Để bảo hành và hỗ trợ</td>
                            </tr>
                            <tr>
                              <td className="border border-q8-primary-300 px-4 py-2">Thông tin thanh toán</td>
                              <td className="border border-q8-primary-300 px-4 py-2">7 năm</td>
                              <td className="border border-q8-primary-300 px-4 py-2">Theo quy định thuế</td>
                            </tr>
                            <tr>
                              <td className="border border-q8-primary-300 px-4 py-2">Hình ảnh công trình</td>
                              <td className="border border-q8-primary-300 px-4 py-2">Vĩnh viễn</td>
                              <td className="border border-q8-primary-300 px-4 py-2">Với sự đồng ý của khách hàng</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

                {/* User Rights */}
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-q8-primary-900 mb-4 flex items-center">
                    <FaUserShield className="text-q8-primary-900 mr-3" />
                    5. Quyền của khách hàng
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <FaCheckCircle className="text-q8-primary-700 mt-1 flex-shrink-0" />
                          <div>
                            <h4 className="font-bold text-q8-primary-800">Quyền truy cập</h4>
                            <p className="text-q8-primary-600 text-sm">Xem thông tin cá nhân đã cung cấp</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <FaCheckCircle className="text-q8-primary-700 mt-1 flex-shrink-0" />
                          <div>
                            <h4 className="font-bold text-q8-primary-800">Quyền chỉnh sửa</h4>
                            <p className="text-q8-primary-600 text-sm">Cập nhật thông tin không chính xác</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <FaCheckCircle className="text-q8-primary-700 mt-1 flex-shrink-0" />
                          <div>
                            <h4 className="font-bold text-q8-primary-800">Quyền xóa</h4>
                            <p className="text-q8-primary-600 text-sm">Yêu cầu xóa thông tin cá nhân</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <FaCheckCircle className="text-q8-primary-700 mt-1 flex-shrink-0" />
                          <div>
                            <h4 className="font-bold text-q8-primary-800">Quyền hạn chế</h4>
                            <p className="text-q8-primary-600 text-sm">Hạn chế xử lý thông tin cá nhân</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <FaCheckCircle className="text-q8-primary-700 mt-1 flex-shrink-0" />
                          <div>
                            <h4 className="font-bold text-q8-primary-800">Quyền di chuyển</h4>
                            <p className="text-q8-primary-600 text-sm">Xuất dữ liệu sang định dạng khác</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <FaCheckCircle className="text-q8-primary-700 mt-1 flex-shrink-0" />
                          <div>
                            <h4 className="font-bold text-q8-primary-800">Quyền phản đối</h4>
                            <p className="text-q8-primary-600 text-sm">Phản đối việc xử lý thông tin</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cookies and Tracking */}
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-q8-primary-900 mb-4">6. Cookies và theo dõi</h2>
                  
                  <div className="space-y-4">
                    <div className="bg-q8-primary-50 border-l-4 border-q8-primary-700 p-4">
                      <h3 className="text-lg font-bold text-q8-primary-800 mb-2">6.1. Cookies</h3>
                      <p className="text-q8-primary-700 mb-3">
                        Chúng tôi sử dụng cookies để cải thiện trải nghiệm người dùng và phân tích lưu lượng truy cập website.
                      </p>
                      <ul className="list-disc list-inside text-q8-primary-700 space-y-1 text-sm">
                        <li><strong>Cookies cần thiết:</strong> Đảm bảo website hoạt động bình thường</li>
                        <li><strong>Cookies phân tích:</strong> Thu thập thông tin về cách sử dụng website</li>
                        <li><strong>Cookies chức năng:</strong> Ghi nhớ lựa chọn của bạn</li>
                        <li><strong>Cookies quảng cáo:</strong> Hiển thị quảng cáo phù hợp (nếu có)</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-q8-primary-800 mb-2">6.2. Quản lý Cookies</h3>
                      <p className="text-q8-primary-700">
                        Bạn có thể kiểm soát và xóa cookies thông qua cài đặt trình duyệt. 
                        Tuy nhiên, việc vô hiệu hóa cookies có thể ảnh hưởng đến chức năng của website.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Policy Updates */}
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-q8-primary-900 mb-4 flex items-center">
                    <FaExclamationTriangle className="text-q8-primary-900 mr-3" />
                    7. Cập nhật chính sách
                  </h2>
                  
                  <div className="space-y-4">
                    <p className="text-q8-primary-700">
                      Chúng tôi có thể cập nhật chính sách bảo mật này theo thời gian để phù hợp với 
                      các thay đổi trong hoạt động kinh doanh hoặc quy định pháp luật.
                    </p>
                    
                    <div className="bg-q8-primary-50 border-l-4 border-q8-primary-900 p-4">
                      <h3 className="text-lg font-bold text-q8-primary-800 mb-2">Thông báo thay đổi</h3>
                      <ul className="list-disc list-inside text-q8-primary-700 space-y-1 text-sm">
                        <li>Đăng thông báo trên website ít nhất 30 ngày trước khi có hiệu lực</li>
                        <li>Gửi email thông báo đến khách hàng đã đăng ký</li>
                        <li>Cập nhật ngày &quot;Cập nhật lần cuối&quot; ở đầu trang</li>
                        <li>Lưu trữ các phiên bản cũ để tham khảo</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-q8-primary-900 mb-4">8. Liên hệ</h2>
                  
                  <div className="bg-q8-primary-50 rounded-lg p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-bold text-q8-primary-800 mb-3">Q8 Design</h3>
                        <div className="space-y-2 text-q8-primary-700">
                          <div className="flex items-center space-x-3">
                            <FaMapMarkerAlt className="text-q8-primary-900" />
                            <span>Đ. Nam An Khánh - KĐT Nam An Khánh - Hà Nội</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <FaPhone className="text-q8-primary-900" />
                            <a href="tel:0988116828" className="hover:text-q8-primary-700">098 811 68 28</a>
                          </div>
                          <div className="flex items-center space-x-3">
                            <FaEnvelope className="text-q8-primary-900" />
                            <a href="mailto:info@q8design.vn" className="hover:text-q8-primary-700">info@q8design.vn</a>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-q8-primary-800 mb-3">Khiếu nại về bảo mật</h3>
                        <p className="text-q8-primary-700 text-sm mb-3">
                          Nếu bạn có bất kỳ câu hỏi, khiếu nại hoặc yêu cầu nào liên quan đến 
                          chính sách bảo mật này, vui lòng liên hệ với chúng tôi.
                        </p>
                        <div className="text-sm text-q8-primary-600">
                          <p><strong>Thời gian phản hồi:</strong> Trong vòng 24-48 giờ</p>
                          <p><strong>Phương thức:</strong> Email, điện thoại hoặc gặp trực tiếp</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Final Notice */}
                <div className="border-t border-q8-primary-200 pt-8">
                  <div className="bg-q8-primary-50 border border-q8-primary-200 rounded-lg p-6">
                    <h3 className="text-lg font-bold text-q8-primary-800 mb-3">Lưu ý quan trọng</h3>
                    <p className="text-q8-primary-700 leading-relaxed">
                      Chính sách bảo mật này được xây dựng dựa trên các nguyên tắc bảo vệ dữ liệu cá nhân 
                      và tuân thủ các quy định pháp luật Việt Nam. Chúng tôi cam kết bảo vệ thông tin cá nhân 
                      của bạn với mức độ cao nhất và sử dụng thông tin một cách có trách nhiệm.
                    </p>
                    <p className="text-q8-primary-700 mt-3">
                      Cảm ơn bạn đã tin tưởng và lựa chọn Q8 Design làm đối tác thiết kế và thi công nội thất.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>
      </div>
    </DefaultLayout>
  );
}