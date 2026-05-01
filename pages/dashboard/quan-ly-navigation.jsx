import { useState, useEffect, useCallback } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import {
  Plus, Trash2, Edit2, ChevronDown, ChevronRight,
  GripVertical, Save, X, Check, AlertCircle, Menu,
  Link as LinkIcon, Eye, EyeOff, Layers
} from "lucide-react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

// ─── Helpers ────────────────────────────────────────────────────────────────
function genId() {
  return "_" + Math.random().toString(36).slice(2, 9);
}

function newItem(overrides = {}) {
  return { _tempId: genId(), name: "", href: "", isActive: true, children: [], ...overrides };
}

// ─── Inline Edit Input ───────────────────────────────────────────────────────
function InlineEdit({ value, onChange, placeholder, className = "" }) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 bg-white transition ${className}`}
    />
  );
}

// ─── Level 3 Item Row ────────────────────────────────────────────────────────
function Level3Row({ item, onUpdate, onDelete, dragHandleProps }) {
  return (
    <div className="flex items-center gap-2 pl-2 py-1.5 group bg-white hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-gray-100">
      <div {...dragHandleProps} className="p-1 cursor-grab active:cursor-grabbing text-gray-300 hover:text-gray-500">
        <GripVertical className="w-4 h-4" />
      </div>
      <div className="w-1.5 h-1.5 rounded-full bg-gray-300 shrink-0" />
      <InlineEdit value={item.name} onChange={(v) => onUpdate({ ...item, name: v })} placeholder="Tên menu cấp 3" className="flex-1 min-w-0" />
      <InlineEdit value={item.href} onChange={(v) => onUpdate({ ...item, href: v })} placeholder="/duong-dan" className="flex-1 min-w-0" />
      <button onClick={onDelete} className="opacity-0 group-hover:opacity-100 p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition">
        <Trash2 className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

// ─── Level 2 Item Row ────────────────────────────────────────────────────────
function Level2Row({ item, index, parentIndex, onUpdate, onDelete, dragHandleProps }) {
  const [expanded, setExpanded] = useState(false);

  const updateChild3 = (idx, updated) => {
    const children = [...(item.children || [])];
    children[idx] = updated;
    onUpdate({ ...item, children });
  };

  const deleteChild3 = (idx) => {
    const children = (item.children || []).filter((_, i) => i !== idx);
    onUpdate({ ...item, children });
  };

  const addChild3 = () => {
    const children = [...(item.children || []), newItem()];
    onUpdate({ ...item, children });
    setExpanded(true);
  };

  const children3 = item.children || [];

  return (
    <div className="border border-gray-100 rounded-xl bg-gray-50/60 group">
      <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-xl shadow-sm border border-gray-100">
        <div {...dragHandleProps} className="p-1 cursor-grab active:cursor-grabbing text-gray-300 hover:text-gray-500">
          <GripVertical className="w-4 h-4" />
        </div>
        <button onClick={() => setExpanded(!expanded)} className="p-1 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded transition shrink-0">
          {expanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>
        <InlineEdit value={item.name} onChange={(v) => onUpdate({ ...item, name: v })} placeholder="Tên menu cấp 2" className="flex-1 min-w-0" />
        <InlineEdit value={item.href} onChange={(v) => onUpdate({ ...item, href: v })} placeholder="/duong-dan" className="flex-1 min-w-0" />
        <button onClick={addChild3} title="Thêm menu cấp 3" className="p-1.5 text-blue-400 hover:text-blue-600 hover:bg-blue-50 rounded transition shrink-0">
          <Plus className="w-4 h-4" />
        </button>
        <button onClick={onDelete} className="opacity-0 group-hover:opacity-100 p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition shrink-0">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Level 3 children */}
      {expanded && (
        <div className="px-3 pb-3 space-y-1 border-t border-gray-100 mt-1 pt-2">
          {children3.length === 0 ? (
            <p className="text-xs text-gray-400 pl-8 py-1">Chưa có menu cấp 3</p>
          ) : (
            <Droppable droppableId={`LEVEL3-${parentIndex}-${index}`} type={`LEVEL3-${parentIndex}-${index}`}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-1">
                  {children3.map((c3, idx) => (
                    <Draggable key={c3._id || c3._tempId} draggableId={c3._id || c3._tempId} index={idx}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          style={{ ...provided.draggableProps.style, opacity: snapshot.isDragging ? 0.5 : 1 }}
                        >
                          <Level3Row
                            item={c3}
                            onUpdate={(u) => updateChild3(idx, u)}
                            onDelete={() => deleteChild3(idx)}
                            dragHandleProps={provided.dragHandleProps}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          )}
          <button onClick={addChild3} className="flex items-center gap-1.5 text-xs text-blue-500 hover:text-blue-700 pl-8 py-1.5 hover:bg-blue-50 rounded-lg transition w-full mt-1">
            <Plus className="w-3.5 h-3.5" /> Thêm menu cấp 3
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Level 1 Item Card ────────────────────────────────────────────────────────
function Level1Card({ item, index, onUpdate, onDelete, dragHandleProps }) {
  const [expanded, setExpanded] = useState(false);

  const updateChild2 = (idx, updated) => {
    const children = [...(item.children || [])];
    children[idx] = updated;
    onUpdate({ ...item, children });
  };

  const deleteChild2 = (idx) => {
    const children = (item.children || []).filter((_, i) => i !== idx);
    onUpdate({ ...item, children });
  };

  const addChild2 = () => {
    const children = [...(item.children || []), newItem()];
    onUpdate({ ...item, children });
    setExpanded(true);
  };

  const toggleActive = () => onUpdate({ ...item, isActive: !item.isActive });

  const children2 = item.children || [];
  const hasChildren = children2.length > 0;

  return (
    <div className={`rounded-2xl border transition-all duration-200 ${item.isActive ? "border-gray-200 bg-white shadow-sm hover:shadow" : "border-gray-100 bg-gray-50 opacity-80"}`}>
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3">
        {/* Drag Handle */}
        <div {...dragHandleProps} className="p-1.5 cursor-grab active:cursor-grabbing text-gray-300 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
          <GripVertical className="w-5 h-5" />
        </div>

        <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center shrink-0">{index + 1}</span>

        <InlineEdit value={item.name} onChange={(v) => onUpdate({ ...item, name: v })} placeholder="Tên menu chính" className="flex-1 min-w-0 font-medium text-base py-2" />
        <InlineEdit value={item.href} onChange={(v) => onUpdate({ ...item, href: v })} placeholder="/duong-dan" className="flex-1 min-w-0 text-gray-500 py-2" />

        <div className="flex items-center gap-1 shrink-0">
          <button onClick={toggleActive} title={item.isActive ? "Ẩn menu" : "Hiện menu"} className={`p-2 rounded-lg transition ${item.isActive ? "text-green-500 hover:bg-green-50" : "text-gray-400 hover:bg-gray-100"}`}>
            {item.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          </button>

          <button onClick={() => setExpanded(!expanded)} title="Quản lý sub-menu" className={`p-2 rounded-lg transition ${expanded ? "bg-blue-50 text-blue-600" : "text-gray-400 hover:bg-gray-100 hover:text-gray-600"}`}>
            <Layers className="w-4 h-4" />
          </button>

          <button onClick={addChild2} title="Thêm menu cấp 2" className="p-2 text-blue-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition">
            <Plus className="w-4 h-4" />
          </button>

          <button onClick={onDelete} title="Xóa menu" className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Badge */}
      {hasChildren && !expanded && (
        <div className="px-4 pb-3 pl-14">
          <button onClick={() => setExpanded(true)} className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 rounded-lg px-3 py-1.5 transition">
            <ChevronDown className="w-3.5 h-3.5" />
            Hiển thị {children2.length} sub-menu
          </button>
        </div>
      )}

      {/* Level 2 children */}
      {expanded && (
        <div className="px-4 pb-4 space-y-2 border-t border-gray-100 pt-3 mt-1 bg-gray-50/30 rounded-b-2xl">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 pl-2">Menu cấp 2</p>
          {children2.length === 0 ? (
            <p className="text-sm text-gray-400 py-3 pl-2">Chưa có menu cấp 2. Nhấn + để thêm.</p>

          ) : (
            <Droppable droppableId={`LEVEL2-${index}`} type={`LEVEL2-${index}`}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-2 min-h-[50px]">
                  {children2.map((c2, idx) => (
                    <Draggable key={c2._id || c2._tempId} draggableId={c2._id || c2._tempId} index={idx}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          style={{ ...provided.draggableProps.style, opacity: snapshot.isDragging ? 0.5 : 1 }}
                        >
                          <Level2Row
                            item={c2}
                            index={idx}
                            parentIndex={index}
                            onUpdate={(u) => updateChild2(idx, u)}
                            onDelete={() => deleteChild2(idx)}
                            dragHandleProps={provided.dragHandleProps}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          )}
          <button onClick={addChild2} className="flex items-center justify-center gap-2 py-2.5 px-3 bg-white text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-xl transition w-full border-2 border-dashed border-blue-200 hover:border-blue-300 font-medium text-sm mt-2">
            <Plus className="w-4 h-4" /> Thêm menu cấp 2
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function QuanLyNavigation() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const [dirty, setDirty] = useState(false);
  // Add an internal state to prevent hydration mismatch with dnd
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  // Auth guard
  useEffect(() => {
    if (status === "loading") return;
    if (!session || session.user?.role !== "admin") router.push("/dang-nhap");
  }, [session, status, router]);

  // Fetch
  useEffect(() => {
    fetch("/api/navigation")
      .then((r) => r.json())
      .then((d) => { if (d.success) setItems(d.items || []); })
      .catch(() => showToast("Lỗi tải dữ liệu menu", "error"))
      .finally(() => setLoading(false));
  }, []);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const updateItem = (idx, updated) => {
    const next = [...items];
    next[idx] = updated;
    setItems(next);
    setDirty(true);
  };

  const deleteItem = (idx) => {
    setItems(items.filter((_, i) => i !== idx));
    setDirty(true);
  };

  const addItem = () => {
    setItems([...items, newItem({ order: items.length })]);
    setDirty(true);
  };

  const onDragEnd = (result) => {
    const { source, destination, type } = result;
    if (!destination) return;
    if (source.index === destination.index) return;

    if (type === "LEVEL1") {
      const newItems = Array.from(items);
      const [reorderedItem] = newItems.splice(source.index, 1);
      newItems.splice(destination.index, 0, reorderedItem);
      setItems(newItems);
      setDirty(true);
      return;
    }

    if (type.startsWith("LEVEL2-")) {
      const parentIdx = parseInt(type.split("-")[1], 10);
      const newItems = [...items];
      const parent = { ...newItems[parentIdx] };
      const children = Array.from(parent.children || []);
      const [reorderedItem] = children.splice(source.index, 1);
      children.splice(destination.index, 0, reorderedItem);
      parent.children = children;
      newItems[parentIdx] = parent;
      setItems(newItems);
      setDirty(true);
      return;
    }

    if (type.startsWith("LEVEL3-")) {
      const [, parentIdx, child2Idx] = type.split("-");
      const newItems = [...items];
      const parent = { ...newItems[parentIdx] };
      const children2 = [...(parent.children || [])];
      const child2 = { ...children2[child2Idx] };
      const children3 = Array.from(child2.children || []);
      const [reorderedItem] = children3.splice(source.index, 1);
      children3.splice(destination.index, 0, reorderedItem);
      child2.children = children3;
      children2[child2Idx] = child2;
      parent.children = children2;
      newItems[parentIdx] = parent;
      setItems(newItems);
      setDirty(true);
      return;
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/navigation", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      const data = await res.json();
      if (data.success) {
        setItems(data.items || items);
        setDirty(false);
        showToast("Lưu navigation thành công!", "success");
      } else {
        showToast(data.message || "Lỗi lưu dữ liệu", "error");
      }
    } catch {
      showToast("Lỗi kết nối server", "error");
    } finally {
      setSaving(false);
    }
  };

  if (status === "loading" || loading || !isBrowser) {
    return (
      <AdminLayout title="Quản lý Navigation">
        <div className="flex items-center justify-center min-h-[70vh]">
          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full" />
            <p className="text-gray-500 font-medium">Đang tải dữ liệu menu...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Quản lý Navigation - Q8 Design">
      <div className="min-h-screen bg-gray-50/50 p-6">
        {/* Header */}
        <div className="container mx-auto container">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-200">
                <Menu className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Quản lý Menu Navigation</h1>
                <p className="text-sm text-gray-500 mt-1">Kéo thả để sắp xếp, thêm, sửa, xóa menu 1, 2, 3 tầng</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {dirty && (
                <span className="flex items-center gap-1.5 text-xs font-medium text-amber-700 bg-amber-50 border border-amber-200 rounded-full px-3 py-1.5 shadow-sm">
                  <AlertCircle className="w-4 h-4" /> Chưa lưu
                </span>
              )}
              <button
                onClick={handleSave}
                disabled={saving || !dirty}
                className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl shadow-md shadow-blue-200 transition-all duration-200 active:scale-95"
              >
                {saving ? (
                  <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                ) : (
                  <Save className="w-5 h-5" />
                )}
                {saving ? "Đang lưu..." : "Lưu thay đổi"}
              </button>
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-x-6 gap-y-3 mb-8 p-4 bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center">1</span>
              Menu cấp 1 (thanh nav chính)
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <ChevronRight className="w-4 h-4 text-gray-400" />
              Menu cấp 2 (dropdown)
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <div className="w-2 h-2 rounded-full bg-gray-400" />
              Menu cấp 3 (sub-dropdown)
            </div>
            <div className="flex items-center gap-3 text-sm font-medium text-gray-700 ml-auto bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
              <span className="flex items-center gap-1.5"><Eye className="w-4 h-4 text-green-500" /> Hiện</span>
              <span className="text-gray-300">|</span>
              <span className="flex items-center gap-1.5"><EyeOff className="w-4 h-4 text-gray-400" /> Ẩn</span>
            </div>
          </div>

          {/* Items List */}
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="space-y-4">
              {items.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
                  <Menu className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600 font-medium text-lg">Chưa có menu nào</p>
                  <p className="text-gray-400 mt-2">Nhấn nút bên dưới để bắt đầu tạo menu đầu tiên</p>
                </div>
              ) : (
                <Droppable droppableId="LEVEL1" type="LEVEL1">
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-4">
                      {items.map((item, idx) => (
                        <Draggable key={item._id || item._tempId} draggableId={item._id || item._tempId} index={idx}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              style={{ ...provided.draggableProps.style, opacity: snapshot.isDragging ? 0.7 : 1 }}
                            >
                              <Level1Card
                                item={item}
                                index={idx}
                                onUpdate={(u) => updateItem(idx, u)}
                                onDelete={() => deleteItem(idx)}
                                dragHandleProps={provided.dragHandleProps}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              )}
            </div>
          </DragDropContext>

          {/* Add new */}
          <button
            onClick={addItem}
            className="mt-6 w-full flex items-center justify-center gap-2 py-4 border-2 border-dashed border-blue-300 hover:border-blue-500 text-blue-600 hover:text-blue-700 rounded-2xl bg-blue-50/50 hover:bg-blue-50 transition-all duration-200 font-semibold text-base shadow-sm hover:shadow"
          >
            <Plus className="w-5 h-5" /> Thêm menu cấp 1 mới
          </button>

          {/* Bottom Space */}
          <div className="h-20" />
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-xl text-sm font-semibold transition-all duration-300 transform translate-y-0 opacity-100 ${toast.type === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"}`}>
          {toast.type === "success" ? <Check className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          {toast.msg}
        </div>
      )}
    </AdminLayout>
  );
}
