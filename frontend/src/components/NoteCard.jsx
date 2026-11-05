import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const NoteCard = ({ note, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div className="card bg-base-200 w-full min-w-0 hover:shadow-lg transition-all duration-200 border-t-4 border-[#009963]">
      <div className="card-body min-w-0">
        <Link to={`/note/${note._id}`} className="min-w-0">
          <h3 className="card-title text-base-content line-clamp-1 break-all">
            {note.title}
          </h3>

          <p className="text-base-content/70 line-clamp-3 break-all mt-2">
            {note.content}
          </p>
        </Link>

        <div className="card-actions justify-between items-center mt-3">
          <span className="text-sm text-base-content/60">
            {new Date(note.createdAt).toLocaleDateString()}
          </span>

          <div className="flex items-center gap-1">
            <button
              type="button"
              className="btn btn-ghost btn-xs"
              onClick={() => navigate(`/edit/${note._id}`)}
            >
              <PenSquareIcon className="size-4" />
            </button>

            <button
              type="button"
              className="btn btn-ghost btn-xs text-error"
              onClick={() => onDelete(note._id)}
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
