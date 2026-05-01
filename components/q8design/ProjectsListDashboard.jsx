import { useState, useEffect } from 'react';
import Image from 'next/image';
import ConfirmDialog from './ConfirmDialog';

export default function ProjectsListDashboard({ projects: initialProjects, onEdit, onDelete }) {
  const [projects, setProjects] = useState(initialProjects || []);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState({ isOpen: false, project: null });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Sync projects when prop changes
  useEffect(() => {
    if (initialProjects) {
      setProjects(initialProjects);
    }
  }, [initialProjects]);

  const filteredProjects = projects.filter(project => {
    const matchesFilter = filter === 'all' || project.category === filter;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProjects = filteredProjects.slice(startIndex, endIndex);

  // Reset to page 1 when filter or search changes
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const categoryColors = {
    villa: 'bg-blue-100 text-blue-800',
    apartment: 'bg-green-100 text-green-800',
    townhouse: 'bg-purple-100 text-purple-800',
    commercial: 'bg-orange-100 text-orange-800',
    office: 'bg-orange-100 text-orange-800',
    resort: 'bg-teal-100 text-teal-800',
    restaurant: 'bg-red-100 text-red-800',
    cafe: 'bg-amber-100 text-amber-800',
    showroom: 'bg-indigo-100 text-indigo-800'
  };

  const categoryNames = {
    villa: 'Biệt thự - Vila',
    apartment: 'Căn hộ',
    townhouse: 'Nhà phố',
    commercial: 'Văn phòng',
    office: 'Văn phòng',
    resort: 'Resort',
    restaurant: 'Nhà hàng',
    cafe: 'Cà phê',
    showroom: 'Showroom'
  };

  const handleDeleteClick = (project) => {
    setDeleteConfirm({ isOpen: true, project });
  };

  const handleDeleteConfirm = async () => {
    const { project } = deleteConfirm;
    if (!project) return;

    try {
      if (onDelete) {
        await onDelete(project);
        const projectId = project._id || project.id;
        const updatedProjects = projects.filter(p => (p._id || p.id) !== projectId);
        setProjects(updatedProjects);
        
        // Recalculate filtered projects after deletion
        const updatedFiltered = updatedProjects.filter(p => {
          const matchesFilter = filter === 'all' || p.category === filter;
          const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                               p.location.toLowerCase().includes(searchTerm.toLowerCase());
          return matchesFilter && matchesSearch;
        });
        
        // If current page is empty after deletion, go to previous page
        const updatedTotalPages = Math.ceil(updatedFiltered.length / itemsPerPage);
        if (currentPage > updatedTotalPages && updatedTotalPages > 0) {
          setCurrentPage(updatedTotalPages);
        }
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Danh sách dự án</h2>
        
        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <input
            type="text"
            placeholder="Tìm kiếm dự án..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          
          <select
            value={filter}
            onChange={handleFilterChange}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Tất cả dự án ({projects.length})</option>
            {Object.keys(categoryNames).map(category => {
              const count = projects.filter(p => p.category === category).length;
              if (count > 0) {
                return (
                  <option key={category} value={category}>
                    {categoryNames[category]} ({count})
                  </option>
                );
              }
              return null;
            })}
          </select>
        </div>

        <div className="text-sm text-gray-600">
          Hiển thị {filteredProjects.length > 0 ? startIndex + 1 : 0}-{Math.min(endIndex, filteredProjects.length)} / {filteredProjects.length} dự án
          {filteredProjects.length !== projects.length && ` (Tổng: ${projects.length} dự án)`}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedProjects.map((project) => {
          // Debug log
          console.log('Project:', project.title, 'Gallery:', project.gallery);
          const projectId = project._id || project.id;
          return (
          <div key={projectId} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
            {/* Project Image */}
            <div className="relative h-48 bg-gray-200">
              {project.image ? (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  onError={() => {
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
              
              {/* Badges */}
              <div className="absolute top-2 left-2 flex gap-2">
                <span className={`px-2 py-1 text-xs font-semibold rounded ${categoryColors[project.category] || 'bg-gray-100 text-gray-800'}`}>
                  {categoryNames[project.category] || project.category}
                </span>
                {project.featured && (
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded">
                    ⭐ Nổi bật
                  </span>
                )}
              </div>
            </div>


            {/* Project Info */}
            <div className="p-4">
              <h3 className="font-bold text-lg text-gray-800 mb-1 line-clamp-1">
                {project.title}
              </h3>
              <p className="text-sm text-gray-600 mb-2 line-clamp-1">
                {project.subtitle}
              </p>
              
              <div className="space-y-1 text-sm text-gray-600 mb-3">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">📍</span>
                  <span className="line-clamp-1">{project.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">📐</span>
                  <span>{project.area}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">📅</span>
                  <span>{project.year}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">✅</span>
                  <span>{project.completion}</span>
                </div>
              </div>

              {/* Tags */}
              {project.tags && project.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {project.tags.slice(0, 3).map((tag, idx) => (
                    <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2 pt-3 border-t">
                <button
                  onClick={() => window.open(`/du-an/${project.slug}`, '_blank')}
                  className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 text-sm font-medium rounded hover:bg-blue-100 transition-colors"
                >
                  👁️ Xem
                </button>
                <button
                  onClick={() => onEdit && onEdit(project)}
                  className="flex-1 px-3 py-2 bg-green-50 text-green-600 text-sm font-medium rounded hover:bg-green-100 transition-colors"
                >
                  ✏️ Sửa
                </button>
                <button
                  onClick={() => handleDeleteClick(project)}
                  className="flex-1 px-3 py-2 bg-red-50 text-red-600 text-sm font-medium rounded hover:bg-red-100 transition-colors"
                >
                  🗑️ Xóa
                </button>
              </div>
            </div>
          </div>
          );
        })}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <div className="text-6xl mb-4">📁</div>
          <p className="text-lg font-medium">Không tìm thấy dự án nào</p>
          <p className="text-sm">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
        </div>
      )}

      {/* Pagination */}
      {filteredProjects.length > itemsPerPage && (
        <div className="mt-8 flex items-center justify-between border-t border-gray-200 pt-6">
          <div className="flex flex-1 justify-between sm:hidden">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium ${
                currentPage === 1
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Trước
            </button>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium ${
                currentPage === totalPages
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Sau
            </button>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Trang <span className="font-medium">{currentPage}</span> / <span className="font-medium">{totalPages}</span>
              </p>
            </div>
            <div>
              <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                    currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''
                  }`}
                >
                  <span className="sr-only">Trước</span>
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                  </svg>
                </button>
                
                {/* Page numbers */}
                {(() => {
                  const pages = [];
                  const showEllipsis = totalPages > 7;
                  
                  if (!showEllipsis) {
                    // Show all pages if total pages <= 7
                    for (let i = 1; i <= totalPages; i++) {
                      pages.push(i);
                    }
                  } else {
                    // Always show first page
                    pages.push(1);
                    
                    if (currentPage <= 4) {
                      // Show first 5 pages, ellipsis, last page
                      for (let i = 2; i <= 5; i++) {
                        pages.push(i);
                      }
                      pages.push('ellipsis-end');
                      pages.push(totalPages);
                    } else if (currentPage >= totalPages - 3) {
                      // Show first page, ellipsis, last 5 pages
                      pages.push('ellipsis-start');
                      for (let i = totalPages - 4; i <= totalPages; i++) {
                        pages.push(i);
                      }
                    } else {
                      // Show first page, ellipsis, current-1, current, current+1, ellipsis, last page
                      pages.push('ellipsis-start');
                      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                        pages.push(i);
                      }
                      pages.push('ellipsis-end');
                      pages.push(totalPages);
                    }
                  }
                  
                  return pages.map((page, index) => {
                    if (page === 'ellipsis-start' || page === 'ellipsis-end') {
                      return (
                        <span key={`ellipsis-${index}`} className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300">
                          ...
                        </span>
                      );
                    }
                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                          page === currentPage
                            ? 'z-10 bg-blue-600 text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
                            : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  });
                })()}
                
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                    currentPage === totalPages ? 'cursor-not-allowed opacity-50' : ''
                  }`}
                >
                  <span className="sr-only">Sau</span>
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ isOpen: false, project: null })}
        onConfirm={handleDeleteConfirm}
        title="Xóa dự án"
        message={deleteConfirm.project ? `Bạn có chắc chắn muốn xóa dự án "${deleteConfirm.project.title}"? Hành động này không thể hoàn tác.` : ''}
        confirmText="Xóa dự án"
        cancelText="Hủy"
        type="danger"
      />
    </div>
  );
}

