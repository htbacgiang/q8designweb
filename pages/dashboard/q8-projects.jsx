import { useState, useEffect } from 'react';
import AddProjectForm from '../../components/q8design/AddProjectForm';
import ProjectsListDashboard from '../../components/q8design/ProjectsListDashboard';
import AdminLayout from '../../components/layout/AdminLayout';
import { toast } from 'react-toastify';

export default function Q8ProjectsDashboard() {
  const [activeTab, setActiveTab] = useState('list');
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch projects from Database API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/projects?limit=1000');
        const data = await response.json();
        
        if (data.success && data.data) {
          setProjects(data.data.projects || []);
        } else {
          setError(data.message || 'Lỗi khi tải dữ liệu');
        }
      } catch (err) {
        setError('Lỗi kết nối mạng');
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleProjectAdded = async (projectData) => {
    try {
      // AddProjectForm already handles the API call, we just need to refresh the list
      // Refresh projects list
      const fetchResponse = await fetch('/api/projects?limit=100');
      const fetchData = await fetchResponse.json();
      
      if (fetchData.success && fetchData.data) {
        setProjects(fetchData.data.projects || []);
      } else {
        throw new Error(fetchData.message || 'Lỗi khi tải lại danh sách dự án');
      }
      
      // Clear editing state and switch to list view
      setTimeout(() => {
        setEditingProject(null);
        setActiveTab('list');
      }, 1000);
    } catch (error) {
      console.error('Error refreshing projects list:', error);
      setError(error.message || 'Lỗi khi tải lại danh sách');
      toast.error(error.message || 'Lỗi khi tải lại danh sách');
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setActiveTab('add');
  };

  const handleDelete = async (project) => {
    try {
      console.log('Deleting project:', project);
      
      const projectId = project._id || project.id;
      const response = await fetch(`/api/projects/delete?id=${projectId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      console.log('Delete response status:', response.status);
      
      const result = await response.json();
      console.log('Delete result:', result);
      
      if (result.success) {
        toast.success('Xóa dự án thành công!');
        // Refresh projects list
        const fetchResponse = await fetch('/api/projects?limit=1000');
        const data = await fetchResponse.json();
        if (data.success && data.data) {
          setProjects(data.data.projects || []);
        }
      } else {
        const errorMessage = result.message || 'Lỗi khi xóa dự án';
        setError(errorMessage);
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      const errorMessage = 'Lỗi khi xóa dự án: ' + error.message;
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <AdminLayout title="Q8 Design - Quản lý dự án">
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Q8 Design Dashboard
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  Quản lý dự án thiết kế nội thất
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-700">
                    Tổng số dự án
                  </div>
                  <div className="text-2xl font-bold text-blue-600">
                    {projects.length}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Tabs Navigation */}
        <div className="bg-white border-b">
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-8" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('list')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'list'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                📋 Danh sách dự án
              </button>
              <button
                onClick={() => {
                  setActiveTab('add');
                  setEditingProject(null);
                }}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'add'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {editingProject && activeTab === 'add' ? '✏️ Chỉnh sửa dự án' : '➕ Thêm dự án mới'}
              </button>
              <button
                onClick={() => setActiveTab('stats')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'stats'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                📊 Thống kê
              </button>
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-600">Đang tải dữ liệu...</span>
            </div>
          )}
          
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex">
                <div className="text-red-600">
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Lỗi</h3>
                  <div className="mt-2 text-sm text-red-700">{error}</div>
                </div>
              </div>
            </div>
          )}
          
          {!loading && !error && activeTab === 'list' && (
            <>
              {projects.length === 0 ? (
                <div className="bg-white shadow-lg rounded-lg p-8 text-center">
                  <div className="text-gray-500 mb-4">
                    <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Chưa có dự án nào</h3>
                  <p className="text-gray-500 mb-4">
                    Database chưa có dữ liệu dự án. Hãy thêm dự án đầu tiên hoặc import dữ liệu mẫu!
                  </p>
                  <div className="flex gap-4 justify-center">
                    <button
                      onClick={() => setActiveTab('add')}
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      ➕ Thêm dự án đầu tiên
                    </button>
                    <button
                      onClick={() => {
                        // Note: Import functionality can be added later if needed
                        alert('Chức năng import sẽ được thêm sau. Bạn có thể thêm dự án thủ công bằng nút "Thêm dự án đầu tiên"');
                      }}
                      className="inline-flex items-center px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
                    >
                      📥 Import dữ liệu mẫu
                    </button>
                  </div>
                </div>
              ) : (
                <ProjectsListDashboard 
                  projects={projects} 
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              )}
            </>
          )}
          
          {!loading && !error && activeTab === 'add' && (
            <AddProjectForm 
              onSuccess={handleProjectAdded} 
              editingProject={editingProject}
            />
          )}
          
          {!loading && !error && activeTab === 'stats' && (
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Thống kê dự án</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-500">
                  <div className="text-blue-600 text-sm font-medium mb-2">
                    Biệt thự - vila
                  </div>
                  <div className="text-3xl font-bold text-gray-800">
                    {projects.filter(p => p.category === 'villa').length}
                  </div>
                </div>
                
                <div className="bg-purple-50 rounded-lg p-6 border-l-4 border-purple-500">
                  <div className="text-purple-600 text-sm font-medium mb-2">
                    Nhà phố
                  </div>
                  <div className="text-3xl font-bold text-gray-800">
                    {projects.filter(p => p.category === 'townhouse').length}
                  </div>
                </div>
                
                <div className="bg-green-50 rounded-lg p-6 border-l-4 border-green-500">
                  <div className="text-green-600 text-sm font-medium mb-2">
                    Căn hộ
                  </div>
                  <div className="text-3xl font-bold text-gray-800">
                    {projects.filter(p => p.category === 'apartment').length}
                  </div>
                </div>
                
                <div className="bg-orange-50 rounded-lg p-6 border-l-4 border-orange-500">
                  <div className="text-orange-600 text-sm font-medium mb-2">
                    Văn phòng
                  </div>
                  <div className="text-3xl font-bold text-gray-800">
                    {projects.filter(p => p.category === 'commercial').length}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-yellow-50 rounded-lg p-6 border-l-4 border-yellow-500">
                  <div className="text-yellow-600 text-sm font-medium mb-2">
                    Dự án nổi bật
                  </div>
                  <div className="text-3xl font-bold text-gray-800">
                    {projects.filter(p => p.featured).length}
                  </div>
                  <div className="text-sm text-gray-600 mt-2">
                    {projects.length > 0 ? ((projects.filter(p => p.featured).length / projects.length) * 100).toFixed(1) : 0}% tổng dự án
                  </div>
                </div>
                
                <div className="bg-indigo-50 rounded-lg p-6 border-l-4 border-indigo-500">
                  <div className="text-indigo-600 text-sm font-medium mb-2">
                    Có mô hình 3D
                  </div>
                  <div className="text-3xl font-bold text-gray-800">
                    {projects.filter(p => p.has3D).length}
                  </div>
                  <div className="text-sm text-gray-600 mt-2">
                    {projects.length > 0 ? ((projects.filter(p => p.has3D).length / projects.length) * 100).toFixed(1) : 0}% tổng dự án
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Trạng thái dự án
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Hoàn thành</span>
                    <div className="flex items-center gap-3">
                      <div className="w-48 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full"
                          style={{ 
                            width: `${projects.length > 0 ? (projects.filter(p => p.completion === 'Hoàn thành').length / projects.length) * 100 : 0}%` 
                          }}
                        />
                      </div>
                      <span className="font-semibold text-gray-800 w-12 text-right">
                        {projects.filter(p => p.completion === 'Hoàn thành').length}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Đang thi công</span>
                    <div className="flex items-center gap-3">
                      <div className="w-48 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ 
                            width: `${projects.length > 0 ? (projects.filter(p => p.completion === 'Đang thi công').length / projects.length) * 100 : 0}%` 
                          }}
                        />
                      </div>
                      <span className="font-semibold text-gray-800 w-12 text-right">
                        {projects.filter(p => p.completion === 'Đang thi công').length}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Thiết kế</span>
                    <div className="flex items-center gap-3">
                      <div className="w-48 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-yellow-500 h-2 rounded-full"
                          style={{ 
                            width: `${projects.length > 0 ? (projects.filter(p => p.completion === 'Thiết kế').length / projects.length) * 100 : 0}%` 
                          }}
                        />
                      </div>
                      <span className="font-semibold text-gray-800 w-12 text-right">
                        {projects.filter(p => p.completion === 'Thiết kế').length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

