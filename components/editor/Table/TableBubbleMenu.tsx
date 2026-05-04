import { FC } from "react";
import { BubbleMenu } from "@tiptap/react/menus";
import type { Editor } from "@tiptap/react";
import { 
  MdBorderAll, 
  MdFormatAlignCenter,
  MdGridOn,
  MdGridOff,
  MdAdd,
  MdRemove
} from "react-icons/md";
import { 
  AiOutlineTable,
  AiOutlineDelete,
  AiOutlinePlus,
  AiOutlineMinus
} from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { RiDeleteBinLine } from "react-icons/ri";

interface Props {
  editor: Editor;
}

const TableBubbleMenu: FC<Props> = ({ editor }): JSX.Element => {
  if (!editor) return <></>;

  const shouldShow = ({ editor }: { editor: Editor }) => {
    return editor.isActive("table");
  };

  return (
    <BubbleMenu
      editor={editor}
      shouldShow={shouldShow}
      options={{ placement: 'top' }}
    >
      <div className="flex items-center gap-1 p-1 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-[999]">
        {/* Row Operations */}
        <div className="flex items-center border-r border-gray-200 dark:border-gray-700 pr-1 mr-1">
          <button
            onClick={() => editor.chain().focus().addRowBefore().run()}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors text-gray-700 dark:text-gray-200 flex flex-col items-center"
            title="Thêm hàng trên"
          >
            <MdAdd size={16} />
            <span className="text-[8px] uppercase font-bold">Hàng ↑</span>
          </button>
          <button
            onClick={() => editor.chain().focus().addRowAfter().run()}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors text-gray-700 dark:text-gray-200 flex flex-col items-center"
            title="Thêm hàng dưới"
          >
            <MdAdd size={16} />
            <span className="text-[8px] uppercase font-bold">Hàng ↓</span>
          </button>
          <button
            onClick={() => editor.chain().focus().deleteRow().run()}
            className="p-2 hover:bg-red-50 dark:hover:bg-red-900/30 text-red-600 rounded transition-colors flex flex-col items-center"
            title="Xóa hàng"
          >
            <MdRemove size={16} />
            <span className="text-[8px] uppercase font-bold">Hàng</span>
          </button>
        </div>

        {/* Column Operations */}
        <div className="flex items-center border-r border-gray-200 dark:border-gray-700 pr-1 mr-1">
          <button
            onClick={() => editor.chain().focus().addColumnBefore().run()}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors text-gray-700 dark:text-gray-200 flex flex-col items-center"
            title="Thêm cột trái"
          >
            <MdAdd size={16} />
            <span className="text-[8px] uppercase font-bold">Cột ←</span>
          </button>
          <button
            onClick={() => editor.chain().focus().addColumnAfter().run()}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors text-gray-700 dark:text-gray-200 flex flex-col items-center"
            title="Thêm cột phải"
          >
            <MdAdd size={16} />
            <span className="text-[8px] uppercase font-bold">Cột →</span>
          </button>
          <button
            onClick={() => editor.chain().focus().deleteColumn().run()}
            className="p-2 hover:bg-red-50 dark:hover:bg-red-900/30 text-red-600 rounded transition-colors flex flex-col items-center"
            title="Xóa cột"
          >
            <MdRemove size={16} />
            <span className="text-[8px] uppercase font-bold">Cột</span>
          </button>
        </div>

        {/* Cell Operations */}
        <div className="flex items-center border-r border-gray-200 dark:border-gray-700 pr-1 mr-1">
          <button
            onClick={() => editor.chain().focus().mergeCells().run()}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors text-gray-700 dark:text-gray-200"
            title="Gộp ô"
          >
            <MdBorderAll size={18} />
          </button>
          <button
            onClick={() => editor.chain().focus().splitCell().run()}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors text-gray-700 dark:text-gray-200"
            title="Tách ô"
          >
            <MdGridOff size={18} />
          </button>
        </div>

        {/* Table Operations */}
        <button
          onClick={() => editor.chain().focus().deleteTable().run()}
          className="p-2 hover:bg-red-600 hover:text-white text-red-600 rounded transition-colors flex flex-col items-center"
          title="Xóa bảng"
        >
          <BsTrash size={18} />
          <span className="text-[8px] uppercase font-bold">Bảng</span>
        </button>
      </div>
    </BubbleMenu>
  );
};

export default TableBubbleMenu;
