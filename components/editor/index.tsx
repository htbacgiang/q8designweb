import { ChangeEventHandler, FC, useEffect, useState, useCallback, useRef, useMemo } from "react";
import { useEditor, EditorContent, getMarkRange, Range } from "@tiptap/react";
import type { EditorView } from "prosemirror-view";
import { useRouter } from "next/router";

import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import Youtube from "@tiptap/extension-youtube";
import TipTapImage from "@tiptap/extension-image";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import TextAlign from "@tiptap/extension-text-align";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableHeader } from "@tiptap/extension-table-header";
import { TableCell } from "@tiptap/extension-table-cell";

import ToolBar from "./ToolBar";
import EditLink from "./Link/EditLink";
import EditImage from "./Image/EditImage";
import GalleryModal, { ImageSelectionResult } from "./GalleryModal";
import axios from "axios";
import SEOForm, { SeoResult } from "./SeoForm";
import ThumbnailSelector from "./ThumbnailSelector";
import WordCount from "./WordCount";
import { toast } from "react-toastify";

export interface FinalPost extends SeoResult {
  id?: string;
  title: string;
  content: string;
  thumbnail?: File | string;
  focusKeyword: string;
  isDraft?: boolean;
  isFeatured?: boolean; // Bài viết nổi bật
}

interface Props {
  initialValue?: FinalPost;
  btnTitle?: string;
  busy?: boolean;
  onSubmit(post: FinalPost): void;
}

const Editor: FC<Props> = ({
  initialValue,
  btnTitle = "Đăng bài",
  busy = false,
  onSubmit,
}): JSX.Element => {
  const router = useRouter();
  const [selectionRange, setSelectionRange] = useState<Range>();
  const [showGallery, setShowGallery] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [savingDraft, setSavingDraft] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [isDraft, setIsDraft] = useState(true); // Mặc định là nháp khi tạo mới
  const [isFeatured, setIsFeatured] = useState(false); // Mặc định không phải bài nổi bật
  const [images, setImages] = useState<{ src: string; altText?: string; id?: string }[]>([]);
  const [seoInitialValue, setSeoInitialValue] = useState<SeoResult>();
  const [post, setPost] = useState<FinalPost>({
    title: "",
    content: "",
    meta: "",
    tags: "",
    slug: "",
    category:"",
    focusKeyword: "",
  });
  const [hasContent, setHasContent] = useState(false); // Track if editor has actual content
  const [contentChanged, setContentChanged] = useState(false); // Track if content has been changed
  const lastSaveRef = useRef<number>(0); // Track last save time to prevent too frequent saves
  const contentChangeTimeoutRef = useRef<NodeJS.Timeout | null>(null); // Debounce content change
  const postRef = useRef(post); // Ref để tránh stale closure trong auto-save
  const contentChangedRef = useRef(false); // Ref để tránh re-render do contentChanged
  const hasContentRef = useRef(false); // Ref để tránh re-render do hasContent
  const postIdRef = useRef<string | undefined>(undefined); // Ref để track post.id và tránh re-render không cần thiết
  const isDraftRef = useRef<boolean>(true); // Ref để track isDraft và tránh re-render không cần thiết
  const isSubmittingRef = useRef<boolean>(false); // Ref để chặn auto-save khi đã bấm Đăng bài (tránh tạo thêm nháp)

  // Kiểm tra xem có phải đang tạo bài viết mới không
  const isCreatingNewPost = !initialValue?.id;
  
  // Debug để kiểm tra giá trị
  console.log("Editor debug:", { 
    initialValue, 
    hasId: !!initialValue?.id, 
    isCreatingNewPost,
    btnTitle 
  });

  const fetchImages = async () => {
    const { data } = await axios("/api/image");
    setImages(data.images);
  };

  const handleImageUpload = async (imageData: File | { file: File; altText: string }) => {
    setUploading(true);
    const formData = new FormData();
    
    // Kiểm tra xem có phải là object chứa file và altText không
    if (typeof imageData === 'object' && 'file' in imageData && 'altText' in imageData) {
      formData.append("image", imageData.file);
      formData.append("altText", imageData.altText);
    } else {
      // Fallback cho trường hợp chỉ có file
      formData.append("image", imageData as File);
      formData.append("altText", "");
    }
    
    const { data } = await axios.post("/api/image", formData);
    setUploading(false);

    // Tránh nhân bản trong thư viện: chỉ thêm nếu chưa có ảnh cùng src hoặc id
    setImages(prev => {
      const exists = prev.some(img => img.src === data.src || (data.id && img.id === data.id));
      if (exists) return prev;
      return [{ src: data.src, altText: data.altText, id: data.id }, ...prev];
    });
  };

  // Cập nhật refs khi state thay đổi
  useEffect(() => {
    postRef.current = post;
    postIdRef.current = post.id;
  }, [post]);
  
  // Cập nhật isDraft ref khi state thay đổi
  useEffect(() => {
    isDraftRef.current = isDraft;
  }, [isDraft]);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6], // Hỗ trợ tất cả các level heading
        },
      }),
      Underline,
      TextStyle,
      Color,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Link.configure({
        autolink: false,
        linkOnPaste: false,
        openOnClick: false,
        HTMLAttributes: {
          target: "",
        },
      }),
      Placeholder.configure({
        placeholder: "Viết bài nhớ chuẩn SEO",
      }),
      Youtube.configure({
        HTMLAttributes: {
          class: "w-full aspect-video",
        },
      }),
      TipTapImage.extend({
        addAttributes() {
          return {
            ...this.parent?.(),
            'data-show-caption': {
              default: 'false',
              parseHTML: element => element.getAttribute('data-show-caption') || 'false',
              renderHTML: attributes => {
                if (!attributes['data-show-caption']) {
                  return {};
                }
                return {
                  'data-show-caption': attributes['data-show-caption'],
                };
              },
            },
          };
        },
      }).configure({
        HTMLAttributes: {
          class: "mx-auto",
        },
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    
    editorProps: {
      handleClick(view: EditorView, pos: number, event: MouseEvent) {
        const { state } = view;
        const selectionRange = getMarkRange(
          state.doc.resolve(pos),
          state.schema.marks.link
        );
        if (selectionRange) setSelectionRange(selectionRange);
      },
      attributes: {
        class:
          "blog prose prose-lg focus:outline-none dark:prose-invert max-w-full mx-auto h-full",
      },
    },
  });

  const editorRef = useRef(editor); // Ref để tránh stale closure trong auto-save

  // Cập nhật editor ref
  useEffect(() => {
    editorRef.current = editor;
  }, [editor]);

  const handleImageSelection = (result: ImageSelectionResult) => {
    editor
      ?.chain()
        .focus()
        .setImage({ src: result.src, alt: result.altText })
        .run();
    };

    const handleSubmit = () => {
      if (!editor) return;
      
      // Đảm bảo postRef được cập nhật với giá trị mới nhất từ state trước khi validate
      // Sử dụng cả ref và state để đảm bảo lấy giá trị mới nhất
      const currentPostFromRef = postRef.current;
      const currentPostFromState = post;
      
      // Lấy category từ nhiều nguồn để đảm bảo có giá trị
      // Ưu tiên: state > ref > seoInitialValue > initialValue
      const categoryFromState = currentPostFromState.category?.trim() || '';
      const categoryFromRef = currentPostFromRef.category?.trim() || '';
      const categoryFromSeo = seoInitialValue?.category?.trim() || '';
      const categoryFromInitial = initialValue?.category?.trim() || '';
      
      const finalCategory = categoryFromState || categoryFromRef || categoryFromSeo || categoryFromInitial;
      
      // Ưu tiên giá trị từ state nếu có (mới hơn), fallback về ref
      const currentPost = {
        ...currentPostFromRef,
        ...currentPostFromState,
        // Đảm bảo category được lấy từ nhiều nguồn
        category: finalCategory,
      };
      
      // Cập nhật ref với giá trị mới nhất
      postRef.current = currentPost;
      
      isSubmittingRef.current = true; // Chặn auto-save tạo thêm nháp khi đang submit
      
      // Validation: Kiểm tra các trường bắt buộc
      const editorContent = editor.getHTML().trim();
      const hasActualContent = !!(editorContent && editorContent !== '<p></p>' && editorContent !== '<p><br></p>');
      
      // Kiểm tra tiêu đề
      if (!currentPost.title || currentPost.title.trim() === '') {
        toast.error("Vui lòng nhập tiêu đề bài viết!");
        isSubmittingRef.current = false; // Reset khi validation fail
        return;
      }
      
      // Kiểm tra nội dung
      if (!hasActualContent) {
        toast.error("Vui lòng nhập nội dung bài viết!");
        isSubmittingRef.current = false; // Reset khi validation fail
        return;
      }
      
      // Kiểm tra slug
      if (!currentPost.slug || currentPost.slug.trim() === '') {
        toast.error("Vui lòng nhập slug cho bài viết!");
        isSubmittingRef.current = false; // Reset khi validation fail
        return;
      }
      
      // Kiểm tra danh mục - debug log để kiểm tra
      const categoryValue = finalCategory;
      console.log('Category check:', { 
        category: categoryValue, 
        fromState: categoryFromState,
        fromRef: categoryFromRef,
        fromSeo: categoryFromSeo,
        fromInitial: categoryFromInitial,
        finalCategory: categoryValue,
        isEmpty: !categoryValue 
      });
      
      if (!categoryValue) {
        toast.error("Vui lòng chọn danh mục cho bài viết!");
        isSubmittingRef.current = false; // Reset khi validation fail
        return;
      }
      
      // Kiểm tra meta description
      if (!currentPost.meta || currentPost.meta.trim() === '') {
        toast.error("Vui lòng nhập meta description cho bài viết!");
        isSubmittingRef.current = false; // Reset khi validation fail
        return;
      }
      
      // Từ khóa chính (Focus Keyword) không bắt buộc
      
      // Luôn ưu tiên id từ ref (đã được set ngay khi lưu nháp) để tránh tạo bài mới thay vì publish nháp
      const idToUse = postIdRef.current ?? currentPost.id;
      onSubmit({ ...currentPost, id: idToUse, content: editorContent, isDraft, isFeatured });
    };

    const saveDraft = useCallback(async () => {
      if (!editor || !isCreatingNewPost) return;
      
      // Chỉ lưu nháp khi có ít nhất tiêu đề bài viết
      if (!post.title || post.title.trim() === '') {
        return;
      }
      
      // Tránh lưu quá thường xuyên (ít nhất 5 giây giữa các lần lưu)
      const now = Date.now();
      if (now - lastSaveRef.current < 5000) {
        return;
      }
      
      // Nếu đã có tiêu đề, cho phép lưu nháp (kể cả chưa có nội dung)
      // Logic này áp dụng cho cả manual save và auto-save
      const editorContent = editor.getHTML().trim();
      
      setSavingDraft(true);
      lastSaveRef.current = now;
      const saveStartTime = now; // Lưu thời gian bắt đầu để dùng trong catch
      try {
        const formData = new FormData();
        formData.append("title", post.title || "Nháp bài viết");
        formData.append("content", editorContent);
        formData.append("meta", post.meta || "");
        formData.append("slug", post.slug || `draft-${Date.now()}`);
        formData.append("category", post.category || "");
        
        // Xử lý tags an toàn hơn
        let tagsArray: string[] = [];
        if (post.tags) {
          if (typeof post.tags === 'string') {
            tagsArray = post.tags.split(',').filter((tag: string) => tag.trim() !== '');
          } else if (Array.isArray(post.tags)) {
            tagsArray = (post.tags as any[]).filter((tag: any) => typeof tag === 'string');
          }
        }
        // Đảm bảo luôn gửi một mảng hợp lệ
        formData.append("tags", JSON.stringify(tagsArray || []));
        
        if (post.id) {
          formData.append("postId", post.id);
        }
        
        if (post.thumbnail instanceof File) {
          formData.append("thumbnail", post.thumbnail);
        }

        const { data } = await axios.post("/api/posts/draft", formData);
        
        // Cập nhật post ID nếu là nháp mới - chỉ update khi giá trị thực sự thay đổi
        if (!postIdRef.current && data.post._id) {
          postIdRef.current = data.post._id;
          setPost(prev => {
            if (prev.id === data.post._id) return prev; // Tránh re-render không cần thiết
            return { ...prev, id: data.post._id };
          });
        }
        
        // Quan trọng: cập nhật thumbnail thành URL từ server để lần save sau không gửi lại file → tránh upload 2 lần
        const thumbUrl = data.post?.thumbnail?.url;
        if (thumbUrl && post.thumbnail instanceof File) {
          setPost(prev => ({ ...prev, thumbnail: thumbUrl }));
        }
        
        // Đảm bảo trạng thái là nháp - chỉ update khi cần thiết
        if (!isDraftRef.current) {
          isDraftRef.current = true;
          setIsDraft(true);
        }
        
        // Reset contentChanged flag sau khi lưu thành công
        contentChangedRef.current = false;
        setContentChanged(false);
        
        // Toast thành công (chỉ hiển thị khi manual save, không hiển thị khi auto-save)
        // Không hiển thị toast để tránh làm phiền người dùng
      } catch (error) {
        console.error("Lỗi lưu nháp:", error);
        // Chỉ hiển thị lỗi khi manual save (thời gian lưu < 1 giây nghĩa là user click)
        const timeSinceStart = Date.now() - saveStartTime;
        if (timeSinceStart < 1000) {
          toast.error("Có lỗi xảy ra khi lưu nháp bài viết!");
        }
      } finally {
        setSavingDraft(false);
      }
    }, [editor, post.title, post.meta, post.slug, post.category, post.tags, post.id, post.thumbnail, isCreatingNewPost]);

    const publishDraft = useCallback(async () => {
      if (!post.id) {
        return;
      }
      
      setPublishing(true);
      try {
        const { data } = await axios.put("/api/posts/draft", {
          postId: post.id,
          isDraft: false
        });
        
        // Cập nhật trạng thái local - chỉ update khi giá trị thực sự thay đổi
        if (isDraftRef.current) {
          isDraftRef.current = false;
          setIsDraft(false);
        }
        
        // Toast thành công
        toast.success("Bài viết đã được công khai thành công!");
        
        // Chuyển hướng ngay lập tức để tránh các state update tiếp theo gây re-render
        router.push("/dashboard/bai-viet");
      } catch (error: any) {
        console.error("Lỗi công khai bài viết:", error);
        toast.error("Có lỗi xảy ra khi công khai bài viết!");
        setPublishing(false);
      }
    }, [post.id, router]);

    // Track content changes với debounce để tránh re-render liên tục
    useEffect(() => {
      if (!editor) return;
      
      const handleUpdate = () => {
        const editorContent = editor.getHTML().trim();
        const hasActualContent = !!(editorContent && editorContent !== '<p></p>' && editorContent !== '<p><br></p>');
        
        // Cập nhật refs trước, sau đó mới update state để tránh re-render không cần thiết
        hasContentRef.current = hasActualContent;
        setHasContent(hasActualContent);
        
        // Debounce việc set contentChanged để tránh re-render liên tục
        if (contentChangeTimeoutRef.current) {
          clearTimeout(contentChangeTimeoutRef.current);
        }
        contentChangeTimeoutRef.current = setTimeout(() => {
          contentChangedRef.current = true;
          setContentChanged(true);
        }, 1000); // Chờ 1 giây sau khi ngừng gõ mới đánh dấu là đã thay đổi
      };
      
      editor.on('update', handleUpdate);
      
      return () => {
        editor.off('update', handleUpdate);
        if (contentChangeTimeoutRef.current) {
          clearTimeout(contentChangeTimeoutRef.current);
        }
      };
    }, [editor]);

    // Tự động lưu nháp mỗi 30 giây chỉ khi tạo bài viết mới và có tiêu đề và (có nội dung hoặc đã thay đổi)
    // Sử dụng refs để tránh re-render loop do dependencies thay đổi
    useEffect(() => {
      if (!isCreatingNewPost) return;
      
      const autoSaveInterval = setInterval(() => {
        const currentPost = postRef.current;
        const currentEditor = editorRef.current;
        const hasTitle = currentPost.title && currentPost.title.trim() !== '';
        
        // Không auto-save nếu đang publishing, đã bấm Đăng bài, hoặc đã publish (isDraft = false)
        if (publishing || isSubmittingRef.current || !isDraftRef.current) return;
        
        // Chỉ auto-save nếu có thay đổi và đã qua ít nhất 30 giây từ lần lưu cuối
        if (currentEditor && hasTitle) {
          const editorContent = currentEditor.getHTML().trim();
          const hasActualContent = !!(editorContent && editorContent !== '<p></p>' && editorContent !== '<p><br></p>');
          
          // Sử dụng refs để tránh re-render do dependencies thay đổi
          if (hasActualContent || contentChangedRef.current || currentPost.id) {
            const now = Date.now();
            if (now - lastSaveRef.current >= 30000) {
              // Gọi saveDraft trực tiếp với current values
              const performAutoSave = async () => {
                if (!currentEditor || !hasTitle || publishing || isSubmittingRef.current) return;
                
                const now = Date.now();
                if (now - lastSaveRef.current < 5000) return;
                
                setSavingDraft(true);
                lastSaveRef.current = now;
                try {
                  const formData = new FormData();
                  formData.append("title", currentPost.title || "Nháp bài viết");
                  formData.append("content", editorContent);
                  formData.append("meta", currentPost.meta || "");
                  formData.append("slug", currentPost.slug || `draft-${Date.now()}`);
                  formData.append("category", currentPost.category || "");
                  
                  let tagsArray: string[] = [];
                  if (currentPost.tags) {
                    if (typeof currentPost.tags === 'string') {
                      tagsArray = currentPost.tags.split(',').filter((tag: string) => tag.trim() !== '');
                    } else if (Array.isArray(currentPost.tags)) {
                      tagsArray = (currentPost.tags as any[]).filter((tag: any) => typeof tag === 'string');
                    }
                  }
                  formData.append("tags", JSON.stringify(tagsArray || []));
                  
                  if (currentPost.id) {
                    formData.append("postId", currentPost.id);
                  }
                  
                  if (currentPost.thumbnail instanceof File) {
                    formData.append("thumbnail", currentPost.thumbnail);
                  }

                  const { data } = await axios.post("/api/posts/draft", formData);
                  
                  // Cập nhật post ID nếu là nháp mới - chỉ update khi giá trị thực sự thay đổi
                  if (!postIdRef.current && data.post._id) {
                    postIdRef.current = data.post._id;
                    // Cập nhật postRef trước để tránh stale closure
                    postRef.current = { ...postRef.current, id: data.post._id };
                    setPost(prev => {
                      if (prev.id === data.post._id) return prev; // Tránh re-render không cần thiết
                      return { ...prev, id: data.post._id };
                    });
                  }
                  
                  // Cập nhật thumbnail thành URL từ server để lần save sau không gửi lại file → tránh upload 2 lần
                  const thumbUrl = data.post?.thumbnail?.url;
                  if (thumbUrl && currentPost.thumbnail instanceof File) {
                    postRef.current = { ...postRef.current, thumbnail: thumbUrl };
                    setPost(prev => (prev.thumbnail instanceof File ? { ...prev, thumbnail: thumbUrl } : prev));
                  }
                  
                  // Đảm bảo trạng thái là nháp - chỉ update khi cần thiết
                  if (!isDraftRef.current) {
                    isDraftRef.current = true;
                    setIsDraft(true);
                  }
                  
                  // Reset contentChanged flag
                  contentChangedRef.current = false;
                  setContentChanged(false);
                } catch (error) {
                  console.error("Lỗi auto-save nháp:", error);
                } finally {
                  setSavingDraft(false);
                }
              };
              
              performAutoSave();
            }
          }
        }
      }, 30000);

      return () => clearInterval(autoSaveInterval);
    }, [isCreatingNewPost, publishing]); // Sử dụng isDraftRef thay vì isDraft để tránh re-render





    const updateTitle: ChangeEventHandler<HTMLInputElement> = ({ target }) =>
      setPost(prev => ({ ...prev, title: target.value }));

    const updateSeoValue = (result: SeoResult) => {
      setPost(prev => {
        const updated = { ...prev, ...result };
        // Cập nhật ref ngay lập tức để đảm bảo giá trị mới nhất
        postRef.current = updated;
        return updated;
      });
    };

    const updateThumbnail = (file: File) => setPost({ ...post, thumbnail: file });

    useEffect(() => {
      if (editor && selectionRange) {
        editor.commands.setTextSelection(selectionRange);
      }
    }, [editor, selectionRange]);

    useEffect(() => {
      fetchImages();
    }, []);

    useEffect(() => {
      if (initialValue) {
        // Đảm bảo category được trim và set đúng cách
        const normalizedInitialValue = {
          ...initialValue,
          category: initialValue.category ? initialValue.category.trim() : "",
        };
        setPost(normalizedInitialValue);
        // Cập nhật ref ngay lập tức
        postRef.current = normalizedInitialValue;
        
        // Đảm bảo content được set đúng cách, giữ nguyên HTML structure bao gồm h2, h3
        if (editor && initialValue.content) {
          editor.commands.setContent(initialValue.content);
        }

        const { meta, slug, tags, category, focusKeyword } = normalizedInitialValue;
        setSeoInitialValue({ meta, slug, tags, category, focusKeyword });
        
        // Cập nhật trạng thái nháp từ initialValue
        // Nếu đang edit bài viết có sẵn, giữ nguyên trạng thái isDraft từ database
        // Nếu tạo mới (không có id), mặc định là draft
        const newIsDraft = initialValue.isDraft ?? true;
        if (isDraftRef.current !== newIsDraft) {
          isDraftRef.current = newIsDraft;
          setIsDraft(newIsDraft);
        }
        
        // Cập nhật post ID ref
        if (postIdRef.current !== initialValue.id) {
          postIdRef.current = initialValue.id;
        }
        
        // Cập nhật trạng thái nổi bật
        setIsFeatured(initialValue.isFeatured ?? false);
        
        // Check if initial content exists
        const content = initialValue.content || '';
        const hasInitialContent = content.trim() !== '' && 
          content.trim() !== '<p></p>' && 
          content.trim() !== '<p><br></p>';
        hasContentRef.current = hasInitialContent;
        contentChangedRef.current = false;
        setHasContent(hasInitialContent);
        setContentChanged(false); // Reset khi load initial value
      } else {
        // Reset states when no initial value
        hasContentRef.current = false;
        contentChangedRef.current = false;
        postIdRef.current = undefined;
        isDraftRef.current = true;
        setHasContent(false);
        setContentChanged(false);
      }
    }, [initialValue, editor]);

    // Reset isSubmittingRef khi busy thay đổi từ true về false (submit hoàn thành)
    useEffect(() => {
      if (!busy && isSubmittingRef.current) {
        isSubmittingRef.current = false;
      }
    }, [busy]);

    // Memoize button visibility conditions để tránh re-render không cần thiết
    const showDraftButton = useMemo(() => isCreatingNewPost, [isCreatingNewPost]);
    // Nút "Công khai" chỉ hiển thị khi chỉnh sửa bài viết nháp đã tồn tại, không hiển thị khi tạo mới
    const showPublishButton = useMemo(() => !isCreatingNewPost && post.id && isDraft, [isCreatingNewPost, post.id, isDraft]);

      return (
      <>
        <div className="editor-container">
          {/* Fixed Header Section - Luôn ở vị trí cố định trên đầu */}
          <div className="fixed-header">
            {/* Top Controls Row */}
            <div className="header-top-row">
              <ThumbnailSelector
                initialValue={post.thumbnail as string}
                onChange={updateThumbnail}
                images={images}
                uploading={uploading}
                onFileSelect={handleImageUpload}
                onImageFromGallery={(imageUrl) => {
                  setPost(prev => ({ ...prev, thumbnail: imageUrl }));
                }}
              />
              <div className="editor-button-container">
                {/* Draft save button - chỉ hiển thị khi tạo bài viết mới */}
                {showDraftButton && (
                  <button
                    onClick={saveDraft}
                    disabled={savingDraft || !post.title || post.title.trim() === ''}
                    className={`editor-button save-draft ${savingDraft ? 'loading' : ''} ${(!post.title || post.title.trim() === '') ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {savingDraft ? (
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                      </svg>
                    )}
                    {savingDraft ? "Đang lưu..." : "Lưu nháp"}
                  </button>
                )}
                
                {/* Publish draft button - chỉ hiển thị khi tạo bài viết mới, có post.id và bài viết là nháp */}
                  {showPublishButton && (
                    <button
                      onClick={publishDraft}
                      disabled={publishing}
                      className={`editor-button publish ${publishing ? 'loading' : ''}`}
                    >
                      {publishing ? (
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                      {publishing ? "Đang công khai..." : "Công khai"}
                    </button>
                  )}
                
                <button
                  onClick={handleSubmit}
                  disabled={busy}
                  className={`editor-button submit ${busy ? 'loading' : ''}`}
                >
                  {busy ? (
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  )}
                  {busy ? "Đang đăng..." : btnTitle}
                </button>
              </div>
            </div>
            
            {/* Title Input */}
            <div className="title-section">
              <input
                type="text"
                className="post-title-input w-full"
                placeholder="Tiêu đề bài viết"
                onChange={updateTitle}
                value={post.title}
              />
            </div>
            
            {/* ToolBar - Luôn ở vị trí cố định */}
            <ToolBar
              editor={editor}
              onOpenImageClick={() => setShowGallery(true)}
            />
          </div>
          
          {/* Content Section - Mở rộng xuống dưới */}
          <div className="content-section">
            {editor ? <EditLink editor={editor} /> : null}
            {editor ? <EditImage editor={editor} /> : null}
            <div className="editor-content">
              <EditorContent editor={editor} className="min-h-[300px]" />
            </div>
            
            {/* Word Count & Reading Time */}
            <div className="my-3">
              <WordCount editor={editor} />
            </div>
            
            <div className="h-[1px] w-full bg-secondary-dark dark:bg-secondary-light my-3" />
            
            {/* SEO Form Section */}
            <div className="seo-form-section">
              <SEOForm
                onChange={updateSeoValue}
                title={post.title}
                editor={editor}
                initialValue={seoInitialValue}
              />
            </div>
            
            {/* Featured Post Checkbox */}
            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="w-5 h-5 text-q8-primary-900 border-gray-300 rounded focus:ring-q8-primary-900 focus:ring-2"
                />
                <span className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Đánh dấu bài viết nổi bật
                </span>
                <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                  (Chỉ hiển thị tối đa 4 bài nổi bật ở trang chủ)
                </span>
              </label>
            </div>
          </div>
        </div>

        <GalleryModal
          visible={showGallery}
          onClose={() => setShowGallery(false)}
          onSelect={handleImageSelection}
          images={images}
          onFileSelect={handleImageUpload}
          uploading={uploading}
        />

      </>
    );
  };

  export default Editor;
