import Head from 'next/head';
import Link from 'next/link';
import DefaultLayout from '../components/layout/DefaultLayout';
import { pageMetas } from '../utils/metaUtils';

export default function TuVan({ meta }) {
  return (
    <DefaultLayout
      title={meta?.title}
      desc={meta?.description}
      thumbnail={meta?.og?.image}
      meta={meta}
    >
      <div className="h-[80px]"></div>

      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50 py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-700 to-emerald-900 bg-clip-text text-transparent mb-3">
              🏗️ Tư vấn chuyên gia thiết kế kiến trúc
            </h1>
            <p className="text-emerald-600 text-lg mb-2">
              Đồng hành cùng khách hàng từ ý tưởng đến hoàn thiện dự án
            </p>
            <p className="text-gray-500 text-sm">
              Kiến trúc sư giàu kinh nghiệm, hỗ trợ 24/7
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-emerald-100">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-emerald-900">Tư vấn trực tuyến</h2>
              </div>
              <p className="text-gray-600 mb-4">
                Tư vấn 1-1 với kiến trúc sư chuyên khoa thiết kế kiến trúc
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Tư vấn video call trực tiếp</li>
                <li>• Chat hỗ trợ 24/7</li>
                <li>• Đánh giá nhu cầu thiết kế cá nhân hóa</li>
                <li>• Kế hoạch thiết kế và thi công chi tiết</li>
              </ul>
            </div>

            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-emerald-100">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-green-900">Đồng hành toàn diện</h2>
              </div>
              <p className="text-gray-600 mb-4">
                Hỗ trợ khách hàng trong suốt hành trình từ ý tưởng đến hoàn thiện dự án
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Tư vấn trước khi thiết kế</li>
                <li>• Quản lý dự án thiết kế</li>
                <li>• Hỗ trợ thi công và hoàn thiện</li>
                <li>• Theo dõi chất lượng lâu dài</li>
              </ul>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-emerald-100 mb-8">
            <h3 className="text-2xl font-bold text-emerald-900 mb-6 text-center">
              📞 Thông tin liên hệ
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h4 className="font-bold text-emerald-800 mb-2">Điện thoại</h4>
                <p className="text-gray-600">+84 948 907 686</p>
                <p className="text-sm text-gray-500">Hỗ trợ 24/7</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h4 className="font-bold text-green-800 mb-2">Email</h4>
                <p className="text-gray-600">info.q8design@gmail.com</p>
                <p className="text-sm text-gray-500">Phản hồi trong 24h</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h4 className="font-bold text-emerald-800 mb-2">Địa chỉ</h4>
                <p className="text-gray-600">Đồng Xung, Đồng Tân</p>
                <p className="text-sm text-gray-500">Ứng Hòa, Hà Nội</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="text-center">
            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-emerald-100">
              <h3 className="text-2xl font-bold text-emerald-900 mb-4">
                🚀 Đặt lịch tư vấn ngay
              </h3>
              <p className="text-gray-600 mb-6">
                Liên hệ với chúng tôi để được tư vấn chuyên sâu về thiết kế kiến trúc và đồng hành trong suốt hành trình dự án
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="tel:+84948907686">
                  <button className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-8 py-3 rounded-lg hover:from-emerald-700 hover:to-emerald-800 transition-all duration-200 font-bold shadow-md hover:shadow-lg transform hover:scale-[1.02]">
                    📞 Gọi ngay
                  </button>
                </a>

                <a href="mailto:info.q8design@gmail.com">
                  <button className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-3 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 font-bold shadow-md hover:shadow-lg transform hover:scale-[1.02]">
                    ✉️ Gửi email
                  </button>
                </a>
              </div>

              <div className="mt-6 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                <p className="text-sm text-emerald-800">
                  💡 <strong>Lưu ý:</strong> Để được tư vấn hiệu quả nhất, vui lòng chuẩn bị sẵn các chỉ số đường huyết gần đây, thông tin về tuần thai và tình trạng sức khỏe hiện tại.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      meta: pageMetas.consultation
    },
  };
}
