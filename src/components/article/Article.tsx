import { Article as ArticleInterface } from "src/interfaces/ArticleInterface";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";

interface ArticleProps {
  onDelete: () => void;
  onEdit: () => void;
}

export const Article = ({
  title,
  content,
  date,
  image,
  onDelete,
  onEdit,
}: ArticleProps & ArticleInterface) => {
  return (
    <div className="max-w-[700px] max-h-[650px] border-2 border-gray rounded-md m-auto mt-10 flex flex-col gap-4 p-4 overflow-auto">
      <div className="flex justify-end gap-4">
        <button title="Edit article" onClick={onEdit}>
          <FaEdit color="blue" />
        </button>
        <button title="Delete article" onClick={onDelete}>
          <FaTrash color="red" />
        </button>
      </div>
      <div className="flex justify-between">
        <span>{title}</span> <span>{date?.toString()}</span>
      </div>

      <img src={image} />
      <p className="break-words px-8">{content}</p>
    </div>
  );
};
