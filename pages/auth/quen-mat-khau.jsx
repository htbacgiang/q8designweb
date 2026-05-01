import { useState, useEffect } from "react";
import Head from "next/head";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaEnvelope, FaArrowLeft } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

// Schema xác thực với Yup
const forgotPasswordValidation = Yup.object({
  email: Yup.string()
    .email("Vui lòng nhập email hợp lệ")
    .required("Vui lòng nhập email"),
});

export default function ForgotPassword() {
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  const initialValues = {
    email: "",
  };

  // Bộ đếm ngược cho nút gửi lại mã
  useEffect(() => {
    let timer;
    if (resendCooldown > 0) {
      timer = setTimeout(() => {
        setResendCooldown(resendCooldown - 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  const handleSubmit = async (values, { setSubmitting }) => {
    setStatus("Đang gửi mã xác nhận...");
    setIsLoading(true);
    setSubmitting(true);

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus("Mã xác nhận đã được gửi đến email của bạn!");
        toast.success("Mã xác nhận đã được gửi đến email của bạn!");
        setResendCooldown(30); // Bắt đầu bộ đếm ngược 30 giây
        
        // Chuyển hướng đến trang nhập mã xác nhận
        setTimeout(() => {
          window.location.href = `/auth/dat-lai-mat-khau?email=${encodeURIComponent(values.email)}`;
        }, 2000);
      } else {
        setStatus(`Lỗi: ${data.message}`);
        toast.error(data.message);
      }
    } catch (error) {
      setStatus(`Lỗi: ${error.message || "Đã xảy ra lỗi khi gửi email"}`);
      toast.error(error.message || "Đã xảy ra lỗi");
    } finally {
      setSubmitting(false);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Quên mật khẩu - Q8Design | Thiết kế kiến trúc và nội thất chuyên nghiệp</title>
        <meta
          name="description"
          content="Quên mật khẩu? Nhập email để nhận mã xác nhận đặt lại mật khẩu từ Q8Design. Dịch vụ thiết kế kiến trúc và nội thất chuyên nghiệp."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-amber-50 flex items-center justify-center p-4">
        {/* Background Pattern */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-30 bg-orange-100"></div>
        </div>

        {/* Main Container */}
        <div className="relative z-10 w-full max-w-md">
          {/* Forgot Password Card */}
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-600 to-amber-600 px-8 py-6 text-center">
              <h1 className="text-2xl font-bold text-white mb-2">Quên mật khẩu</h1>
              <p className="text-orange-100 text-sm">Nhập email để nhận mã xác nhận đặt lại mật khẩu</p>
            </div>

            {/* Form Container */}
            <div className="p-8">
              {/* Back Button */}
              <div className="flex items-center mb-6">
                <Link
                  href="/dang-nhap"
                  className="text-gray-600 hover:text-orange-600 transition-colors mr-3"
                >
                  <FaArrowLeft className="w-5 h-5" />
                </Link>
                <span className="text-gray-600 text-sm">Quay lại đăng nhập</span>
              </div>

              <Formik
                initialValues={initialValues}
                validationSchema={forgotPasswordValidation}
                validateOnChange={true}
                validateOnBlur={true}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form className="space-y-6">
                    {/* Email */}
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-gray-700 text-sm font-bold">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaEnvelope className="h-5 w-5 text-gray-400" />
                        </div>
                        <Field
                          id="email"
                          name="email"
                          type="email"
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors text-gray-900 placeholder-gray-500"
                          placeholder="Nhập email của bạn"
                          required
                        />
                      </div>
                      <ErrorMessage
                        name="email"
                        component="p"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    {/* Thông báo trạng thái */}
                    {status && (
                      <div className={`p-3 rounded-lg text-sm text-center ${
                        status.includes("thành công") || status.includes("đã được gửi") 
                          ? "bg-green-50 text-green-700 border border-green-200" 
                          : "bg-red-50 text-red-700 border border-red-200"
                      }`}>
                        {status}
                      </div>
                    )}

                    {/* Nút gửi mã */}
                    <button
                      type="submit"
                      disabled={isSubmitting || isLoading || resendCooldown > 0}
                      className="w-full py-3 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold rounded-xl hover:from-orange-700 hover:to-amber-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] disabled:transform-none"
                    >
                      {isSubmitting || isLoading ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Đang gửi...
                        </div>
                      ) : resendCooldown > 0 ? (
                        `Gửi lại mã xác nhận (${resendCooldown}s)`
                      ) : (
                        "Gửi mã xác nhận"
                      )}
                    </button>

                    {/* Link to Login */}
                    <div className="text-center pt-4">
                      <span className="text-gray-600 text-sm">Nhớ mật khẩu? </span>
                      <Link
                        href="/dang-nhap"
                        className="text-orange-600 hover:text-orange-700 font-bold text-sm transition-colors"
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
      </div>
    </>
  );
}
