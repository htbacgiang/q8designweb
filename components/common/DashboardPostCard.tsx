import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../../styles/posts.module.css';

interface DashboardPostCardProps {
  post: {
    id: string;
    slug: string;
    title: string;
    thumbnail?: string;
    status?: string;
    isDraft?: boolean;
    createdAt: string;
  };
  onDeleteClick?: () => void;
  onToggleStatus?: (postId: string, isDraft: boolean) => void;
}

const DashboardPostCard: React.FC<DashboardPostCardProps> = ({ post, onDeleteClick, onToggleStatus }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (onDeleteClick) {
      onDeleteClick();
    }
    setShowDeleteConfirm(false);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setShowDeleteConfirm(false);
    }
  };

  // Đóng modal bằng phím Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showDeleteConfirm) {
        setShowDeleteConfirm(false);
      }
    };

    if (showDeleteConfirm) {
      document.addEventListener('keydown', handleEscape);
      // Ngăn scroll khi modal mở
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [showDeleteConfirm]);

  const handleToggleStatus = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onToggleStatus) {
      onToggleStatus(post.id, !post.isDraft);
    }
  };

  return (
    <>
      <div className={styles.postCard}>
        {post.thumbnail && (
          <Image 
            src={post.thumbnail} 
            alt={post.title}
            width={400}
            height={300}
            className={styles.postImage}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        )}
        <div className={styles.postContent}>
          <h3 className={styles.postTitle}>{post.title}</h3>
          <div className={styles.postMeta}>
            <div className={styles.postDate}>
              📅 {new Date(post.createdAt).toLocaleDateString('vi-VN')}
            </div>
            <span className={`${styles.postStatus} ${
              post.isDraft ? styles.statusDraft : styles.statusPublished
            }`}>
              {post.isDraft ? '📝 Bản nháp' : '✅ Đã xuất bản'}
            </span>
          </div>
          
          <div className={styles.postActions}>
            <Link 
              href={`/dashboard/bai-viet/update/${post.slug}`}
              className={`${styles.actionButton} ${styles.editButton}`}
            >
              ✏️ Chỉnh sửa
            </Link>
            {onToggleStatus && post.isDraft && (
              <button 
                className={`${styles.actionButton} ${styles.publishButton}`}
                onClick={handleToggleStatus}
              >
                🌐 Công khai
              </button>
            )}
            <button 
              className={`${styles.actionButton} ${styles.deleteButton}`}
              onClick={handleDelete}
            >
              🗑️ Xóa
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className={styles.modalOverlay} onClick={handleOverlayClick}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>Xác nhận xóa bài viết</h3>
            </div>
            <div className={styles.modalBody}>
              <p>Bạn có chắc chắn muốn xóa bài viết <strong>&quot;{post.title}&quot;</strong>?</p>
              <p className={styles.modalWarning}>Hành động này không thể hoàn tác!</p>
            </div>
            <div className={styles.modalActions}>
              <button 
                className={`${styles.modalButton} ${styles.cancelButton}`}
                onClick={cancelDelete}
              >
                Hủy bỏ
              </button>
              <button 
                className={`${styles.modalButton} ${styles.confirmDeleteButton}`}
                onClick={confirmDelete}
              >
                Xóa bài viết
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardPostCard;
