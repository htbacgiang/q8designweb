import { FC, useCallback, useState, useEffect } from "react";
import { BsBoxArrowUpRight, BsPencilSquare } from "react-icons/bs";
import { BiUnlink } from "react-icons/bi";
import { Editor } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import LinkForm, { linkOption } from "./LinkForm";

interface Props {
  editor: Editor;
}

const EditLink: FC<Props> = ({ editor }): JSX.Element => {
  const [showEditForm, setShowEditForm] = useState(false);

  const handleOnLinkOpenClick = useCallback(() => {
    const { href } = editor.getAttributes("link");
    if (href) {
      window.open(href, "_blank");
    }
  }, [editor]);

  const handleLinkEditClick = () => {
    setShowEditForm(true);
  };

  const handleUnlinkClick = () => {
    editor.commands.unsetLink();
  };

  const handleSubmit = ({ url, openInNewTab }: linkOption) => {
    editor
      .chain()
      .focus()
      .unsetLink()
      .setLink({ href: url, target: openInNewTab ? "_blank" : "" })
      .run();
    setShowEditForm(false);
  };

  const getInitialState = useCallback(() => {
    const { href, target } = editor.getAttributes("link");
    return { url: href, openInNewTab: target ? true : false };
  }, [editor]);

  // Reset form when link is no longer active
  useEffect(() => {
    const handleUpdate = () => {
      if (!editor.isActive("link")) {
        setShowEditForm(false);
      }
    };
    
    editor.on("update", handleUpdate);
    editor.on("selectionUpdate", handleUpdate);
    
    return () => {
      editor.off("update", handleUpdate);
      editor.off("selectionUpdate", handleUpdate);
    };
  }, [editor]);

  return (
    <BubbleMenu
      shouldShow={({ editor }) => editor.isActive("link")}
      editor={editor}
      options={{
        placement: "bottom",
      }}
    >
      <LinkForm
        visible={showEditForm}
        onSubmit={handleSubmit}
        initialState={getInitialState()}
      />
      {!showEditForm && (
        <div className="rounded bg-white dark:bg-gray-800 text-primary-dark dark:text-primary shadow-secondary-dark shadow-md p-3 flex items-center space-x-6 z-50">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleOnLinkOpenClick();
            }}
          >
            <BsBoxArrowUpRight />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleLinkEditClick();
            }}
          >
            <BsPencilSquare />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleUnlinkClick();
            }}
          >
            <BiUnlink />
          </button>
        </div>
      )}
    </BubbleMenu>
  );
};

export default EditLink;
