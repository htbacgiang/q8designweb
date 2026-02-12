import { useState, useEffect } from "react";
import Head from "next/head";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaLock, FaEye, FaEyeSlash, FaArrowLeft, FaKey } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { useRouter } from "next/router";

// Schema xác thực với Yup
const resetPasswordValidation = Yup.object({
  newPassword: Yup.string()
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .required("Vui lòng nhập mật khẩu mới"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Mật khẩu xác nhận không khớp")
    .required("Vui lòng xác nhận mật khẩu"),
});

export default function ResetPassword() {
  const router = useRouter();
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [resetCode, setResetCode] = useState(["", "", "", "", "", ""]);
  const [activeInput, setActiveInput] = useState(0);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    if (router.query.email) {
      setEmail(router.query.email);
    }
  }, [router.query.email]);

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

  const initialValues = {
    newPassword: "",
    confirmPassword: "",
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  // Xử lý input mã xác nhận
  const handleCodeChange = (index, value) => {
    if (value.length > 1) return; // Chỉ cho phép 1 ký tự
    
    const newCode = [...resetCode];
    newCode[index] = value;
    setResetCode(newCode);
    
    // Tự động chuyển sang ô tiếp theo
    if (value && index < 5) {
      setActiveInput(index + 1);
    }
  };

  const handleCodeKeyDown = (index, e) => {
    if (e.key === "Backspace" && !resetCode[index] && index > 0) {
      setActiveInput(index - 1);
    }
  };

  const handleCodePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const newCode = [...resetCode];
    
    for (let i = 0; i < pastedData.length && i < 6; i++) {
      newCode[i] = pastedData[i];
    }
    
    setResetCode(newCode);
    setActiveInput(Math.min(pastedData.length, 5));
  };

  // Xử lý gửi lại mã xác nhận
  const handleResendCode = async () => {
    if (resendCooldown > 0 || isResending) return;

    setIsResending(true);
    setStatus("Đang gửi lại mã xác nhận...");

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus("Mã xác nhận mới đã được gửi đến email của bạn!");
        toast.success("Mã xác nhận mới đã được gửi đến email của bạn!");
        setResendCooldown(30); // Bắt đầu bộ đếm ngược 30 giây
      } else {
        setStatus(`Lỗi: ${data.message}`);
        toast.error(data.message);
      }
    } catch (error) {
      setStatus(`Lỗi: ${error.message || "Đã xảy ra lỗi khi gửi lại mã"}`);
      toast.error(error.message || "Đã xảy ra lỗi");
    } finally {
      setIsResending(false);
    }
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    // Kiểm tra mã xác nhận trước khi submit
    if (resetCode.join("").length !== 6) {
      setStatus("Vui lòng nhập đầy đủ 6 chữ số mã xác nhận");
      toast.error("Vui lòng nhập đầy đủ 6 chữ số mã xác nhận");
      return;
    }

    setStatus("Đang đặt lại mật khẩu...");
    setIsLoading(true);
    setSubmitting(true);

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          resetCode: resetCode.join(""),
          newPassword: values.newPassword,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus("Mật khẩu đã được đặt lại thành công!");
        toast.success("Mật khẩu đã được đặt lại thành công!");
        
        // Chuyển hướng đến trang đăng nhập
        setTimeout(() => {
          router.push("/dang-nhap");
        }, 2000);
      } else {
        setStatus(`Lỗi: ${data.message}`);
        toast.error(data.message);
      }
    } catch (error) {
      setStatus(`Lỗi: ${error.message || "Đã xảy ra lỗi khi đặt lại mật khẩu"}`);
      toast.error(error.message || "Đã xảy ra lỗi");
    } finally {
      setSubmitting(false);
      setIsLoading(false);
    }
  };

  if (!email) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-amber-50 flex items-center justify-center p-4">
        {/* Background Pattern */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-30 bg-orange-100"></div>
        </div>

        {/* Main Container */}
        <div className="relative z-10 w-full max-w-md">
          {/* Error Card */}
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-red-600 to-red-700 px-8 py-6 text-center">
              <h1 className="text-2xl font-bold text-white mb-2">Không tìm thấy email</h1>
              <p className="text-red-100 text-sm">Vui lòng quay lại trang quên mật khẩu</p>
            </div>

            {/* Content */}
            <div className="p-8 text-center">
              <div className="text-6xl text-red-500 mb-6">⚠️</div>
              <p className="text-gray-700 mb-6">Email không được tìm thấy trong URL. Vui lòng thử lại từ trang quên mật khẩu.</p>
              <Link
                href="/auth/quen-mat-khau"
                className="w-full inline-flex items-center justify-center bg-gradient-to-r from-orange-600 to-amber-600 text-white px-6 py-3 rounded-xl font-bold hover:from-orange-700 hover:to-amber-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
              >
                <FaArrowLeft className="mr-2" />
                Quay lại trang quên mật khẩu
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Đặt lại mật khẩu - Q8Design | Thiết kế kiến trúc và nội thất chuyên nghiệp</title>
        <meta
          name="description"
          content="Nhập mã xác nhận và mật khẩu mới để đặt lại mật khẩu tài khoản Q8Design. Dịch vụ thiết kế kiến trúc và nội thất chuyên nghiệp."
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
          {/* Reset Password Card */}
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-600 to-amber-600 px-8 py-6 text-center">
              <h1 className="text-2xl font-bold text-white mb-2">Đặt lại mật khẩu</h1>
              <p className="text-orange-100 text-sm">Nhập mã xác nhận và mật khẩu mới</p>
            </div>

            {/* Form Container */}
            <div className="p-8">
              {/* Back Button */}
              <div className="flex items-center mb-6">
                <Link
                  href="/auth/quen-mat-khau"
                  className="text-gray-600 hover:text-orange-600 transition-colors mr-3"
                >
                  <FaArrowLeft className="w-5 h-5" />
                </Link>
                <span className="text-gray-600 text-sm">Quay lại trang quên mật khẩu</span>
              </div>
              
              {/* Email Info */}
              <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-xl">
                <p className="text-gray-700 text-sm text-center">
                  Mã xác nhận đã được gửi đến: <span className="text-orange-600 font-bold">{email}</span>
                </p>
              </div>

              <Formik
                initialValues={initialValues}
                validationSchema={resetPasswordValidation}
                validateOnChange={true}
                validateOnBlur={true}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form className="space-y-6">
                    {/* Mã xác nhận - 6 ô vuông */}
                    <div className="space-y-4">
                      <label className="block text-gray-700 text-sm font-bold text-center">
                        Mã xác nhận <span className="text-red-500">*</span>
                      </label>
                      <div className="flex justify-center gap-3">
                        {resetCode.map((digit, index) => (
                          <input
                            key={index}
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]"
                            maxLength="1"
                            value={digit}
                            onChange={(e) => handleCodeChange(index, e.target.value)}
                            onKeyDown={(e) => handleCodeKeyDown(index, e)}
                            onPaste={handleCodePaste}
                            onFocus={() => setActiveInput(index)}
                            className={`
                              w-12 h-12 text-center text-2xl font-bold rounded-xl border-2 transition-all duration-200
                              ${activeInput === index 
                                ? 'border-orange-500 bg-orange-500/20 shadow-lg shadow-orange-500/25' 
                                : digit 
                                  ? 'border-orange-600 bg-orange-600/10' 
                                  : 'border-gray-300 bg-white'
                              }
                              text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500
                              shadow-sm
                            `}
                            placeholder="0"
                            required
                          />
                        ))}
                      </div>
                      {resetCode.join("").length !== 6 && (
                        <p className="text-red-500 text-sm text-center">
                          Vui lòng nhập đầy đủ 6 chữ số
                        </p>
                      )}
                    </div>

                    {/* Mật khẩu mới */}
                    <div className="space-y-2">
                      <label htmlFor="newPassword" className="block text-gray-700 text-sm font-bold">
                        Mật khẩu mới <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaLock className="h-5 w-5 text-gray-400" />
                        </div>
                        <Field
                          id="newPassword"
                          name="newPassword"
                          type={showPassword ? "text" : "password"}
                          className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors text-gray-900 placeholder-gray-500"
                          placeholder="Nhập mật khẩu mới"
                          required
                        />
                        <button
                          type="button"
                          onClick={togglePasswordVisibility}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                          aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                        >
                          {showPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                        </button>
                      </div>
                      <ErrorMessage
                        name="newPassword"
                        component="p"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    {/* Xác nhận mật khẩu */}
                    <div className="space-y-2">
                      <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold">
                        Xác nhận mật khẩu <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaLock className="h-5 w-5 text-gray-400" />
                        </div>
                        <Field
                          id="confirmPassword"
                          name="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors text-gray-900 placeholder-gray-500"
                          placeholder="Xác nhận mật khẩu mới"
                          required
                        />
                        <button
                          type="button"
                          onClick={toggleConfirmPasswordVisibility}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                          aria-label={showConfirmPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                        >
                          {showConfirmPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                        </button>
                      </div>
                      <ErrorMessage
                        name="confirmPassword"
                        component="p"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    {/* Thông báo trạng thái */}
                    {status && (
                      <div className={`p-3 rounded-xl text-sm text-center ${
                        status.includes("thành công") 
                          ? "bg-green-50 text-green-700 border border-green-200" 
                          : "bg-red-50 text-red-700 border border-red-200"
                      }`}>
                        {status}
                      </div>
                    )}

                    {/* Nút đặt lại mật khẩu */}
                    <button
                      type="submit"
                      disabled={isSubmitting || isLoading || resetCode.join("").length !== 6}
                      className="w-full py-3 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold rounded-xl hover:from-orange-700 hover:to-amber-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] disabled:transform-none"
                    >
                      {isSubmitting || isLoading ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Đang xử lý...
                        </div>
                      ) : (
                        "Đặt lại mật khẩu"
                      )}
                    </button>

                    {/* Gửi lại mã */}
                    <div className="text-center">
                      <button
                        type="button"
                        onClick={handleResendCode}
                        disabled={resendCooldown > 0 || isResending}
                        className={`text-sm font-medium transition-colors ${
                          resendCooldown > 0 || isResending
                            ? "text-gray-400 cursor-not-allowed"
                            : "text-orange-600 hover:text-orange-700"
                        }`}
                      >
                        {isResending
                          ? "Đang gửi..."
                          : resendCooldown > 0
                          ? `Gửi lại mã xác nhận (${resendCooldown}s)`
                          : "Gửi lại mã xác nhận"}
                      </button>
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
