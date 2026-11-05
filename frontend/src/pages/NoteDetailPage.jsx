import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import { ArrowLeftIcon } from "lucide-react";
import api from "../axios";

const NoteDetailPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    let cancelled = false;

    const getNoteData = async () => {
      try {
        setIsLoading(true);
        setHasError(false);

        const res = await api.get(`/api/notes/${id}`);

        if (!cancelled) {
          setTitle(res.data.title);
          setContent(res.data.content);
        }
      } catch (error) {
        if (!cancelled) {
          console.error(error);
          setHasError(true);
          toast.error(error?.response?.data?.message || "Error fetching note");
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    if (id) getNoteData();

    return () => {
      cancelled = true;
    };
  }, [id]);

  return (
    <div className="w-full max-w-4xl mx-auto mt-10 md:mt-30 px-4 sm:px-6 md:px-10">
      <Link to="/" className="inline-flex items-center gap-2 mb-4">
        <ArrowLeftIcon className="size-4" />
        <span className="text-sm md:text-base">Back to home</span>
      </Link>

      {isLoading ? (
        <div className="card bg-base-200 w-full max-w-lg mx-auto shadow-lg mt-4">
          <div className="card-body gap-4">
            <div className="skeleton h-8 w-3/4"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-2/3"></div>
          </div>
        </div>
      ) : hasError ? (
        <div className="text-center mt-10">
          <p className="text-error">Failed to load note.</p>
          <Link to="/" className="btn btn-outline mt-4">
            Go back home
          </Link>
        </div>
      ) : (
        <div className="card bg-base-200 w-full max-w-lg min-w-0 shadow-lg mx-auto border-t-4 border-[#009963] mt-4">
          <div className="card-body min-w-0 p-4 sm:p-8">
            <h2 className="card-title text-base-content wrap-anywhere">
              {title}
            </h2>

            <p className="text-base-content/90 wrap-anywhere whitespace-pre-wrap mt-2">
              {content}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoteDetailPage;
