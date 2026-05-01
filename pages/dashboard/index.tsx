import { useRouter } from "next/router";
import AdminLayout from "../../components/layout/AdminLayout";
import Heading from "../../components/backend/Heading";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('stats');

  useEffect(() => {
    if (status === "loading") return;
    
    if (!session) {
      router.push("/dang-nhap");
      return;
    }

    if ((session.user as any)?.role !== "admin") {
      router.push("/");
      return;
    }

    setIsLoading(false);
  }, [session, status, router]);

  // Loading state
  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-xl font-bold">Đang tải Dashboard...</div>
      </div>
    );
  }

  // Not authenticated
  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-xl font-bold">Vui lòng đăng nhập...</div>
      </div>
    );
  }

  // Not admin
  if ((session.user as any)?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-xl font-bold text-red-600">Bạn không có quyền truy cập trang này</div>
      </div>
    );
  }

  return (
    <AdminLayout title="Dashboard - Q8 Design">
      <Heading title="Dashboard - Quản lý Q8 Design" />
      <div className="p-8 bg-gray-50 min-h-screen overflow-x-hidden max-w-full">
      </div>
    </AdminLayout>
  );
}