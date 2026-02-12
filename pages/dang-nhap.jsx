import { useState, useEffect } from "react";
import Head from "next/head";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { getCsrfToken, getProviders, getSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaGoogle, FaFacebook, FaCoffee } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { pageMetas } from "../utils/metaUtils";

import Link from "next/link";

// Schema xác thực với Yup
const loginValidation = Yup.object({
  login_email: Yup.string()
    .required("Vui lòng nhập email hoặc số điện thoại.")
    .test("is-email-or-phone", "Vui lòng nhập email hoặc số điện thoại hợp lệ.", (value) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^[0-9]{10,11}$/;
      return emailRegex.test(value) || phoneRegex.test(value);
    }),
  login_password: Yup.string().required("Vui lòng nhập mật khẩu."),
});

export default function Signin({ providers, callbackUrl, csrfToken, meta }) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showResendButton, setShowResendButton] = useState(false);
  const [resendEmail, setResendEmail] = useState("");
  const [isResending, setIsResending] = useState(false);

  // Kiểm tra error từ URL parameters
  useEffect(() => {
    if (router.query.error) {
      let errorMessage;
      switch (router.query.error) {
        case "CredentialsSignin":
          errorMessage = "Email/số điện thoại hoặc mật khẩu không đúng. Vui lòng kiểm tra lại thông tin đăng nhập.";
          break;
        case "EmailNotVerified":
          errorMessage = "Tài khoản chưa được kích hoạt. Vui lòng kiểm tra email để kích hoạt tài khoản trước khi đăng nhập.";
          setShowResendButton(true);
          break;
        case "OAuthAccountNotLinked":
          errorMessage = "Email này đã được sử dụng để đăng ký tài khoản khác.";
          break;
        case "AccessDenied":
          errorMessage = "Bạn không có quyền truy cập vào tài khoản này.";
          break;
        default:
          errorMessage = "Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại.";
      }
      setStatus(`Lỗi: ${errorMessage}`);
      toast.error(errorMessage);
      
      // Xóa error parameter khỏi URL
      router.replace('/dang-nhap', undefined, { shallow: true });
    }
  }, [router.query.error, router]);

  // Tải email/số điện thoại từ localStorage
  const initialValues = {
    login_email: typeof window !== "undefined" ? localStorage.getItem("savedEmail") || "" : "",
    login_password: "",
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleResendVerification = async () => {
    if (!resendEmail || !resendEmail.includes("@")) {
      toast.error("Vui lòng nhập email hợp lệ để gửi lại xác minh.");
      return;
    }

    setIsResending(true);
    try {
      const response = await fetch("/api/auth/resendVerification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: resendEmail }),
      });

      const data = await response.json();
      
      if (response.ok) {
        toast.success("Email xác minh đã được gửi lại thành công!");
        setShowResendButton(false);
        setResendEmail("");
      } else {
        toast.error(data.message || "Có lỗi xảy ra khi gửi email.");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra khi gửi email.");
    } finally {
      setIsResending(false);
    }
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    setStatus("Đang đăng nhập...");
    setSubmitting(true);

    try {
      const isPhone = /^[0-9]{10,11}$/.test(values.login_email);
      
      // Gọi API login để kiểm tra thông tin trước
      const loginResponse = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: isPhone ? null : values.login_email,
          phone: isPhone ? values.login_email : null,
          password: values.login_password,
        }),
      });

      const loginData = await loginResponse.json();

      if (!loginData.success) {
        // Hiển thị thông báo lỗi chính xác từ API
        setStatus(`Lỗi: ${loginData.message}`);
        toast.error(loginData.message);
        
        // Nếu là lỗi email chưa xác minh, hiển thị nút gửi lại
        if (loginData.error === "EMAIL_NOT_VERIFIED") {
          setShowResendButton(true);
          setResendEmail(values.login_email);
        }
        
        return;
      }

      // Nếu API login thành công, tiếp tục với NextAuth
      const res = await signIn("credentials", {
        redirect: false,
        email: isPhone ? null : values.login_email,
        phone: isPhone ? values.login_email : null,
        password: values.login_password,
        callbackUrl,
      });

      if (res?.error) {
        setStatus(`Lỗi: ${loginData.message}`);
        toast.error(loginData.message);
      } else {
        setStatus("Đăng nhập thành công!");
        toast.success("Đăng nhập thành công!");
        if (rememberMe) {
          localStorage.setItem("savedEmail", values.login_email);
        } else {
          localStorage.removeItem("savedEmail");
        }

        // Lấy thông tin session để kiểm tra role
        const session = await getSession();
        const redirectUrl = session?.user?.role === "admin" ? "/dashboard" : (callbackUrl || "/");

        setTimeout(() => router.push(redirectUrl), 1000);
      }
    } catch (error) {
      setStatus(`Lỗi: ${error.message || "Đã xảy ra lỗi khi đăng nhập"}`);
      toast.error(error.message || "Đã xảy ra lỗi");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSocialSignIn = async (providerId) => {
    setStatus(`Đang đăng nhập bằng ${providerId}...`);
    try {
      const res = await signIn(providerId, { redirect: false, callbackUrl });
      if (res?.error) {
        setStatus(`Lỗi: ${res.error}`);
        toast.error(`Lỗi khi đăng nhập bằng ${providerId}: ${res.error}`);
      } else {
        setStatus("Đăng nhập thành công!");
        toast.success(`Đăng nhập bằng ${providerId} thành công!`);

        // Lấy thông tin session để kiểm tra role
        const session = await getSession();
        const redirectUrl = session?.user?.role === "admin" ? "/dashboard" : (callbackUrl || "/");

        setTimeout(() => router.push(redirectUrl), 1000);
      }
    } catch (error) {
      setStatus(`Lỗi: ${error.message || "Đã xảy ra lỗi khi đăng nhập"}`);
      toast.error(`Lỗi khi đăng nhập bằng ${providerId}`);
    }
  };

  return (
    <>
      <Head>
        <title>Đăng nhập - Q8 Design | Thiết kế kiến trúc và nội thất chuyên nghiệp</title>
        <meta
          name="description"
          content="Đăng nhập vào Q8 Design để truy cập các dịch vụ thiết kế kiến trúc và nội thất chuyên nghiệp. Đăng nhập bằng email, số điện thoại hoặc Google."
        />
        <meta
          name="keywords"
          content="Q8 Design, đăng nhập, thiết kế kiến trúc, nội thất, tư vấn thiết kế, kiến trúc sư, thi công trọn gói"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="noindex, nofollow" />
        <meta property="og:title" content="Đăng nhập - Q8 Design | Thiết kế kiến trúc và nội thất chuyên nghiệp" />
        <meta
          property="og:description"
          content="Đăng nhập để truy cập các dịch vụ thiết kế kiến trúc và nội thất chuyên nghiệp của Q8 Design. Tư vấn thiết kế nhà phố, biệt thự, chung cư."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://q8design.vn/dang-nhap" />
        <meta property="og:image" content="/images/q8-design-banner.jpg" />
        <meta property="og:site_name" content="Q8 Design" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Đăng nhập - Q8 Design | Thiết kế kiến trúc và nội thất chuyên nghiệp" />
        <meta
          name="twitter:description"
          content="Đăng nhập để truy cập các dịch vụ thiết kế kiến trúc và nội thất chuyên nghiệp."
        />
        <meta name="twitter:image" content="/images/q8-design-banner.jpg" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://q8design.vn/dang-nhap" />
        <meta httpEquiv="content-language" content="vi" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Đăng nhập - Q8 Design",
            description:
              "Đăng nhập vào Q8 Design để truy cập các dịch vụ thiết kế kiến trúc và nội thất chuyên nghiệp.",
            url: "https://q8design.vn/dang-nhap",
            publisher: {
              "@type": "Organization",
              name: "Q8 Design",
              logo: {
                "@type": "ImageObject",
                url: "/images/q8-design-logo.png",
              },
            },
          })}
        </script>
      </Head>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
      />

      <div className="min-h-screen bg-q8-primary-50 flex items-center justify-center p-4">
        {/* Background Pattern */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-30 bg-q8-primary-100"></div>
        </div>

        {/* Main Container */}
        <div className="relative z-10 w-full max-w-md">
          {/* Login Card */}
          <div className="bg-white rounded-3xl shadow-2xl border border-q8-primary-200 overflow-hidden">
            {/* Header */}
            <div className="bg-q8-primary-900 px-8 py-6 text-center">
              <h1 className="text-2xl font-bold text-white mb-2">Chào mừng trở lại</h1>
              <p className="text-q8-primary-100 text-sm">Đăng nhập để tiếp tục với Q8Design</p>
            </div>

            {/* Form Container */}
            <div className="p-8">
            <Formik
              enableReinitialize
              initialValues={initialValues}
              validationSchema={loginValidation}
              validateOnChange={true}
              validateOnBlur={true}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-6">
                  <input type="hidden" name="csrfToken" defaultValue={csrfToken} />

                  {/* Email hoặc Số điện thoại */}
                    <div className="space-y-2">
                      <label htmlFor="login_email" className="block text-q8-primary-900 text-sm font-bold">
                        Email hoặc Số điện thoại <span className="text-red-500">*</span>
                      </label>
                  <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaEnvelope className="h-5 w-5 text-q8-primary-600" />
                        </div>
                        <Field
                          id="login_email"
                          name="login_email"
                          type="text"
                          className="w-full pl-10 pr-4 py-3 border border-q8-primary-300 rounded-xl focus:ring-2 focus:ring-q8-primary-900 focus:border-q8-primary-900 transition-colors text-q8-primary-900 placeholder-q8-primary-500"
                          placeholder="Nhập email hoặc số điện thoại"
                          required
                        />
                    </div>
                    <ErrorMessage
                      name="login_email"
                      component="p"
                        className="text-red-500 text-sm"
                    />
                  </div>

                  {/* Mật khẩu */}
                    <div className="space-y-2">
                      <label htmlFor="login_password" className="block text-q8-primary-900 text-sm font-bold">
                        Mật khẩu <span className="text-red-500">*</span>
                      </label>
                  <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaLock className="h-5 w-5 text-q8-primary-600" />
                        </div>
                        <Field
                          id="login_password"
                          name="login_password"
                          type={showPassword ? "text" : "password"}
                          className="w-full pl-10 pr-12 py-3 border border-q8-primary-300 rounded-xl focus:ring-2 focus:ring-q8-primary-900 focus:border-q8-primary-900 transition-colors text-q8-primary-900 placeholder-q8-primary-500"
                          placeholder="Nhập mật khẩu"
                          required
                        />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-q8-primary-600 hover:text-q8-primary-900 transition-colors"
                        aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                      >
                          {showPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                      </button>
                    </div>
                    <ErrorMessage
                      name="login_password"
                      component="p"
                        className="text-red-500 text-sm"
                    />
                  </div>

                    {/* Lưu thông tin và Quên mật khẩu */}
                    <div className="flex items-center justify-between">
                  <div className="flex items-center">
                        <input
                          id="remember_me"
                          type="checkbox"
                          name="remember_me"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          className="h-4 w-4 text-q8-primary-900 border-q8-primary-300 rounded focus:ring-q8-primary-900"
                        />
                        <label htmlFor="remember_me" className="ml-2 text-sm text-q8-primary-600">
                          Ghi nhớ đăng nhập
                    </label>
                      </div>
                      <Link
                        href="/auth/quen-mat-khau"
                        className="text-sm text-q8-primary-900 hover:text-q8-primary-700 font-medium transition-colors"
                      >
                        Quên mật khẩu?
                      </Link>
                  </div>

                  {/* Thông báo trạng thái */}
                  {status && (
                      <div className={`p-3 rounded-lg text-sm text-center ${
                        status.includes("thành công") 
                          ? "bg-green-50 text-green-700 border border-green-200" 
                          : "bg-red-50 text-red-700 border border-red-200"
                      }`}>
                      {status}
                      </div>
                  )}

                    {/* Nút đăng nhập */}
                    <button
                      type="submit"
                      disabled={isSubmitting || status === "Đang đăng nhập..."}
                      className="w-full py-3 bg-q8-primary-900 text-white font-bold rounded-xl hover:bg-q8-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] disabled:transform-none"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Đang xử lý...
                        </div>
                      ) : (
                        "Đăng nhập"
                      )}
                  </button>

                  {/* Resend Verification Email */}
                  {showResendButton && (
                      <div className="p-4 bg-q8-primary-50 border border-q8-primary-200 rounded-xl">
                      <div className="text-center mb-3">
                          <p className="text-q8-primary-800 font-medium mb-1">
                          Tài khoản chưa được kích hoạt?
                        </p>
                          <p className="text-q8-primary-700 text-sm">
                            Nhập email để gửi lại liên kết kích hoạt
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="email"
                          value={resendEmail}
                          onChange={(e) => setResendEmail(e.target.value)}
                          placeholder="Nhập email của bạn"
                            className="flex-1 px-3 py-2 border border-q8-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-q8-primary-900 focus:border-transparent text-sm"
                        />
                        <button
                          type="button"
                          onClick={handleResendVerification}
                          disabled={isResending}
                            className="px-4 py-2 bg-q8-primary-900 text-white font-bold rounded-lg hover:bg-q8-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                        >
                          {isResending ? "Đang gửi..." : "Gửi lại"}
                        </button>
                      </div>
                    </div>
                  )}

                    {/* Divider */}
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-q8-primary-300"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-q8-primary-600">Hoặc đăng nhập bằng</span>
                      </div>
                    </div>

                    {/* Social Login Button */}
                    <button
                      type="button"
                      onClick={() => handleSocialSignIn("google")}
                      className="w-full py-3 bg-white border border-q8-primary-300 text-q8-primary-900 font-bold rounded-xl hover:bg-q8-primary-50 transition-all duration-300 flex items-center justify-center gap-3 shadow-sm hover:shadow-md"
                    >
                      <FaGoogle className="text-red-500 h-5 w-5" />
                      Đăng nhập bằng Google
                    </button>

                    {/* Link to Register */}
                    <div className="text-center pt-4">
                      <span className="text-q8-primary-600 text-sm">Chưa có tài khoản? </span>
                      <Link
                        href="/dang-ky"
                        className="text-q8-primary-900 hover:text-q8-primary-700 font-bold text-sm transition-colors"
                      >
                        Đăng ký ngay
                      </Link>
                    </div>
                </Form>
              )}
            </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { req, query } = context;
  const session = await getSession({ req });
  const callbackUrl = query.callbackUrl || process.env.NEXT_PUBLIC_DEFAULT_REDIRECT || "/";

  if (session) {
    return {
      redirect: {
        destination: callbackUrl,
      },
    };
  }

  const csrfToken = await getCsrfToken(context);
  const providers = await getProviders();

  return {
    props: {
      providers: providers || { google: {}, facebook: {} },
      csrfToken: csrfToken || null,
      callbackUrl,
      meta: pageMetas.login,
    },
  };
}