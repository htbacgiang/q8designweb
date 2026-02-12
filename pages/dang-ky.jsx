import Link from "next/link";
import Head from "next/head";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { getCsrfToken, getSession } from "next-auth/react";
import Router from "next/router";
import { FaUser, FaLock, FaEye, FaEyeSlash, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { pageMetas } from "../utils/metaUtils";
import axios from "axios";

// Schema validation với Yup
const signupValidation = Yup.object({
  username: Yup.string()
    .required("Vui lòng nhập tên người dùng.")
    .min(3, "Tên người dùng phải có ít nhất 3 ký tự."),
  email: Yup.string()
    .required("Vui lòng nhập địa chỉ email.")
    .email("Vui lòng nhập địa chỉ email chính xác."),
  phone: Yup.string()
    .matches(/^(0[3|5|7|8|9])+([0-9]{8})\b$/, "Số điện thoại không hợp lệ")
    .required("Số điện thoại là bắt buộc"),
  password: Yup.string()
    .required("Vui lòng nhập mật khẩu.")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự."),
  confirm_password: Yup.string()
    .required("Vui lòng xác nhận mật khẩu.")
    .oneOf([Yup.ref("password"), null], "Mật khẩu xác nhận không khớp."),
  agree: Yup.boolean()
    .required("Bạn phải đồng ý với Điều khoản & Chính sách bảo mật.")
    .oneOf([true], "Bạn phải đồng ý với Điều khoản & Chính sách bảo mật."),
});

export default function Signup({ csrfToken, meta }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [status, setStatus] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const signUpHandler = async (values, setSubmitting) => {
    try {
      setStatus("Đang đăng ký...");
      console.log("Submitting signup:", values); // Debug
      const { data } = await axios.post(`${baseUrl}/api/auth/signup`, {
        name: values.username,
        email: values.email,
        phone: values.phone,
        password: values.password,
        conf_password: values.confirm_password,
        agree: values.agree,
      });
      console.log("Signup response:", data); // Debug
      setSuccess(data.message);
      setError("");
      setStatus("Đăng ký thành công!");
      toast.success("Đăng ký thành công!");
      setSubmitting(false);
      setTimeout(() => {
        Router.push("/dang-nhap");
      }, 2000);
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
      setStatus("");
      setSuccess("");
      setError(error.response?.data?.message || "Đã xảy ra lỗi.");
      toast.error(error.response?.data?.message || "Đã xảy ra lỗi.");
      setSubmitting(false);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  return (
    <>
      <Head>
        <title>Đăng ký tài khoản - Q8 Design | Thiết kế kiến trúc và nội thất chuyên nghiệp</title>
        <meta name="description" content="Đăng ký tài khoản miễn phí tại Q8 Design để được tư vấn thiết kế kiến trúc và nội thất chuyên nghiệp. Dịch vụ thiết kế nhà phố, biệt thự, chung cư và thi công trọn gói với đội ngũ kiến trúc sư giàu kinh nghiệm." />
        <meta name="keywords" content="đăng ký Q8 Design, tài khoản thiết kế, tư vấn kiến trúc, thiết kế nội thất, thi công trọn gói, kiến trúc sư, nội thất cao cấp" />
        <meta name="author" content="Q8 Design" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://q8design.vn/dang-ky" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://q8design.vn/dang-ky" />
        <meta property="og:title" content="Đăng ký tài khoản - Q8 Design | Thiết kế kiến trúc và nội thất chuyên nghiệp" />
        <meta property="og:description" content="Đăng ký tài khoản miễn phí tại Q8 Design để được tư vấn thiết kế kiến trúc và nội thất chuyên nghiệp. Dịch vụ thiết kế nhà phố, biệt thự, chung cư và thi công trọn gói." />
        <meta property="og:image" content="https://q8design.vn/images/og-dang-ky.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Q8 Design" />
        <meta property="og:locale" content="vi_VN" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://q8design.vn/dang-ky" />
        <meta property="twitter:title" content="Đăng ký tài khoản - Q8 Design | Thiết kế kiến trúc và nội thất chuyên nghiệp" />
        <meta property="twitter:description" content="Đăng ký tài khoản miễn phí tại Q8 Design để được tư vấn thiết kế kiến trúc và nội thất chuyên nghiệp." />
        <meta property="twitter:image" content="https://q8design.vn/images/og-dang-ky.jpg" />
        
        {/* Additional SEO */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Language" content="vi" />
        <meta name="format-detection" content="telephone=yes" />
        <meta name="theme-color" content="#10b981" />
        
        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Đăng ký tài khoản - Q8 Design",
              "description": "Đăng ký tài khoản miễn phí tại Q8 Design để được tư vấn thiết kế kiến trúc và nội thất chuyên nghiệp",
              "url": "https://q8design.vn/dang-ky",
              "isPartOf": {
                "@type": "WebSite",
                "name": "Q8 Design",
                "url": "https://q8design.vn"
              },
              "about": {
                "@type": "Organization",
                "name": "Q8 Design",
                "description": "Công ty thiết kế kiến trúc và nội thất chuyên nghiệp",
                "url": "https://q8design.vn",
                "telephone": "0988116828",
                "email": "info@q8design.vn",
                "serviceType": "Architecture and Interior Design"
              },
              "breadcrumb": {
                "@type": "BreadcrumbList",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Trang chủ",
                    "item": "https://q8design.vn"
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Đăng ký",
                    "item": "https://q8design.vn/dang-ky"
                  }
                ]
              }
            })
          }}
        />
      </Head>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
      />

      <section className="min-h-screen bg-q8-primary-50 flex items-center justify-center p-4">
        {/* Background Pattern */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-30 bg-q8-primary-100"></div>
        </div>

        {/* Main Container */}
        <div className="relative z-10 w-full max-w-md">
          {/* Register Card */}
          <div className="bg-white rounded-3xl shadow-2xl border border-q8-primary-200 overflow-hidden">
            {/* Header */}
            <div className="bg-q8-primary-900 px-8 py-6 text-center">
              <h1 className="text-2xl font-bold text-white mb-2">Tạo tài khoản mới</h1>
              <p className="text-q8-primary-100 text-sm">Tham gia cộng đồng Q8Design ngay hôm nay</p>
            </div>

            {/* Form Container */}
            <div className="p-8">
              <Formik
                initialValues={{
                  username: "",
                  email: "",
                  phone: "",
                  password: "",
                  confirm_password: "",
                  agree: false,
                }}
                validationSchema={signupValidation}
                validateOnChange={true}
                validateOnBlur={true}
                onSubmit={(values, { setSubmitting }) => {
                  console.log("Form values:", values); // Debug
                  if (!values.agree) {
                    toast.error("Bạn phải đồng ý với Điều khoản & Chính sách bảo mật.");
                    setSubmitting(false);
                    return;
                  }
                  signUpHandler(values, setSubmitting);
                }}
              >
                {({ values, setFieldValue, handleChange, errors, touched, isSubmitting }) => (
                  <Form className="space-y-5">
                    <input type="hidden" name="csrfToken" defaultValue={csrfToken} />

                    {/* Username */}
                    <div className="space-y-2">
                      <label className="block text-q8-primary-900 text-sm font-bold">
                        Họ và tên <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaUser className="h-5 w-5 text-q8-primary-600" />
                        </div>
                        <input
                          type="text"
                          name="username"
                          value={values.username}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border border-q8-primary-300 rounded-xl focus:ring-2 focus:ring-q8-primary-900 focus:border-q8-primary-900 transition-colors text-q8-primary-900 placeholder-q8-primary-500"
                          placeholder="Nhập họ và tên"
                          required
                        />
                      </div>
                      {errors.username && touched.username && (
                        <p className="text-red-500 text-sm">{errors.username}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label className="block text-q8-primary-900 text-sm font-bold">
                        Địa chỉ Email <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaEnvelope className="h-5 w-5 text-q8-primary-600" />
                        </div>
                        <input
                          type="email"
                          name="email"
                          value={values.email}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border border-q8-primary-300 rounded-xl focus:ring-2 focus:ring-q8-primary-900 focus:border-q8-primary-900 transition-colors text-q8-primary-900 placeholder-q8-primary-500"
                          placeholder="Nhập địa chỉ email"
                          required
                        />
                      </div>
                      {errors.email && touched.email && (
                        <p className="text-red-500 text-sm">{errors.email}</p>
                      )}
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                      <label className="block text-q8-primary-900 text-sm font-bold">
                        Số điện thoại <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaPhoneAlt className="h-5 w-5 text-q8-primary-600" />
                        </div>
                        <input
                          type="text"
                          name="phone"
                          value={values.phone}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border border-q8-primary-300 rounded-xl focus:ring-2 focus:ring-q8-primary-900 focus:border-q8-primary-900 transition-colors text-q8-primary-900 placeholder-q8-primary-500"
                          placeholder="Nhập số điện thoại"
                          required
                        />
                      </div>
                      {errors.phone && touched.phone && (
                        <p className="text-red-500 text-sm">{errors.phone}</p>
                      )}
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                      <label className="block text-q8-primary-900 text-sm font-bold">
                        Mật khẩu <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaLock className="h-5 w-5 text-q8-primary-600" />
                        </div>
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={values.password}
                          onChange={handleChange}
                          className="w-full pl-10 pr-12 py-3 border border-q8-primary-300 rounded-xl focus:ring-2 focus:ring-q8-primary-900 focus:border-q8-primary-900 transition-colors text-q8-primary-900 placeholder-q8-primary-500"
                          placeholder="Nhập mật khẩu"
                          required
                        />
                        <button
                          type="button"
                          onClick={togglePasswordVisibility}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-q8-primary-600 hover:text-q8-primary-900 transition-colors"
                        >
                          {showPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                        </button>
                      </div>
                      {errors.password && touched.password && (
                        <p className="text-red-500 text-sm">{errors.password}</p>
                      )}
                    </div>

                    {/* Confirm Password */}
                    <div className="space-y-2">
                      <label className="block text-q8-primary-900 text-sm font-bold">
                        Xác nhận mật khẩu <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaLock className="h-5 w-5 text-q8-primary-600" />
                        </div>
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          name="confirm_password"
                          value={values.confirm_password}
                          onChange={handleChange}
                          className="w-full pl-10 pr-12 py-3 border border-q8-primary-300 rounded-xl focus:ring-2 focus:ring-q8-primary-900 focus:border-q8-primary-900 transition-colors text-q8-primary-900 placeholder-q8-primary-500"
                          placeholder="Xác nhận mật khẩu"
                          required
                        />
                        <button
                          type="button"
                          onClick={toggleConfirmPasswordVisibility}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-q8-primary-600 hover:text-q8-primary-900 transition-colors"
                        >
                          {showConfirmPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                        </button>
                      </div>
                      {errors.confirm_password && touched.confirm_password && (
                        <p className="text-red-500 text-sm">{errors.confirm_password}</p>
                      )}
                    </div>

                    {/* Agree to Terms */}
                    <div className="space-y-2">
                      <div className="flex items-start">
                        <input
                          type="checkbox"
                          name="agree"
                          checked={values.agree}
                          onChange={(e) => setFieldValue("agree", e.target.checked)}
                          className="h-4 w-4 text-q8-primary-900 border-q8-primary-300 rounded focus:ring-q8-primary-900 mt-1"
                        />
                        <label className="ml-3 text-sm text-q8-primary-600">
                          Tôi đồng ý với{" "}
                          <Link href="/chinh-sach-bao-mat" className="text-q8-primary-900 hover:text-q8-primary-700 font-medium transition-colors">
                            Điều khoản & Chính sách bảo mật
                          </Link>
                        </label>
                      </div>
                      {errors.agree && touched.agree && (
                        <p className="text-red-500 text-sm">{errors.agree}</p>
                      )}
                    </div>

                    {/* Status Messages */}
                    {status && (
                      <div className={`p-3 rounded-lg text-sm text-center ${
                        status.includes("thành công") 
                          ? "bg-green-50 text-green-700 border border-green-200" 
                          : "bg-red-50 text-red-700 border border-red-200"
                      }`}>
                        {status}
                      </div>
                    )}
                    {success && (
                      <div className="p-3 bg-green-50 text-green-700 border border-green-200 rounded-lg text-sm text-center">
                        {success}
                      </div>
                    )}
                    {error && (
                      <div className="p-3 bg-red-50 text-red-700 border border-red-200 rounded-lg text-sm text-center">
                        {error}
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 bg-q8-primary-900 text-white font-bold rounded-xl hover:bg-q8-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] disabled:transform-none"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Đang tạo tài khoản...
                        </div>
                      ) : (
                        "Tạo tài khoản"
                      )}
                    </button>

                    {/* Link to Login */}
                    <div className="text-center pt-4">
                      <span className="text-q8-primary-600 text-sm">Đã có tài khoản? </span>
                      <Link
                        href="/dang-nhap"
                        className="text-q8-primary-900 hover:text-q8-primary-700 font-bold text-sm transition-colors"
                      >
                        Đăng nhập ngay
                      </Link>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;
  const session = await getSession({ req });
  console.log("Signup session:", session); // Debug

  if (session) {
    console.log("Redirecting to dashboard");
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  const csrfToken = await getCsrfToken(context);

  return {
    props: {
      csrfToken: csrfToken || null,
      meta: pageMetas.register,
    },
  };
}