import { useState, useEffect } from 'react';

export const useProjects = (options = {}) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [categoryCounts, setCategoryCounts] = useState(null);
  const [completionCounts, setCompletionCounts] = useState(null);

  const {
    category = 'all',
    featured = false,
    limit = 10,
    page = 1,
    search = '',
    sort = 'createdAt',
    order = 'desc'
  } = options;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);

        let url = '/api/projects?';
        const params = new URLSearchParams();

        if (category && category !== 'all') params.append('category', category);
        if (featured) params.append('featured', 'true');
        if (limit) params.append('limit', limit.toString());
        if (page) params.append('page', page.toString());
        if (search) params.append('search', search);
        if (sort) params.append('sort', sort);
        if (order) params.append('order', order);

        url += params.toString();

        const response = await fetch(url);
        const data = await response.json();

        if (data.success) {
          setProjects(data.data.projects);
          setPagination(data.data.pagination);
          setCategoryCounts(data.data.categories || null);
          setCompletionCounts(data.data.completion || null);
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
  }, [category, featured, limit, page, search, sort, order]);

  return {
    projects,
    loading,
    error,
    pagination,
    categoryCounts,
    completionCounts,
    refetch: () => {
      setLoading(true);
      // Trigger re-fetch by updating a dependency
    }
  };
};

export const useFeaturedProjects = (limit = 3) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedProjects = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/projects/featured?limit=${limit}`);
        const data = await response.json();

        if (data.success) {
          setProjects(data.data);
        } else {
          setError(data.message || 'Lỗi khi tải dự án tiêu biểu');
        }
      } catch (err) {
        setError('Lỗi kết nối mạng');
        console.error('Error fetching featured projects:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProjects();
  }, [limit]);

  return {
    projects,
    loading,
    error
  };
};

export const useProject = (slug) => {
  const [project, setProject] = useState(null);
  const [relatedProjects, setRelatedProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;

    const fetchProject = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/projects/${slug}`);
        const data = await response.json();

        if (data.success) {
          setProject(data.data.project);
          setRelatedProjects(data.data.relatedProjects);
        } else {
          setError(data.message || 'Không tìm thấy dự án');
        }
      } catch (err) {
        setError('Lỗi kết nối mạng');
        console.error('Error fetching project:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [slug]);

  return {
    project,
    relatedProjects,
    loading,
    error
  };
};
