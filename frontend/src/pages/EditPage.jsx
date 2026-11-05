import { ArrowLeftIcon } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../axios";

const EditPage = () => {
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedContent, setUpdatedContent] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getNoteData = async () => {
      try {
        const res = await api.get(`/api/notes/${id}`);
        setTitle(res.data.title);
        setContent(res.data.content);
        setUpdatedTitle(res.data.title);
        setUpdatedContent(res.data.content);
      } catch (error) {
        console.log(error);
      }
    };

    getNoteData();
  }, []);

  const updateNote = async (e) => {
    e.preventDefault();

    if (isLoading) return;

    try {
      setIsLoading(true);
      await api.put(`/api/notes/${id}`, {
        title: updatedTitle,
        content: updatedContent,
      });
      toast.success("Note updated successfully");
      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error updating note");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-8 md:px-20 mt-20">
      <Link to="/" className="inline-flex items-center gap-2 mb-4">
        <ArrowLeftIcon className="size-4" />
        <span className="text-sm md:text-md">Back to home</span>
      </Link>

      <form onSubmit={updateNote} className="w-full">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full p-8 min-w-0">
          <legend className="fieldset-legend md:text-lg">Note Details</legend>

          <label className="label">Title</label>
          <input
            type="text"
            className="input w-full max-w-none"
            placeholder="Title"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
            required
            maxLength={"100"}
          />

          <label className="label">Content</label>
          <textarea
            className="textarea w-full max-w-none min-h-20 sm:min-h-25 md:min-h-30"
            placeholder="Content"
            value={updatedContent}
            onChange={(e) => setUpdatedContent(e.target.value)}
            required
            maxLength={"500"}
          />

          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="btn btn-success w-20 sm:w-28"
              disabled={
                isLoading ||
                title === updatedTitle &&
                content === updatedContent
              }
            >
              {isLoading ? "Updating..." : "Update"}
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default EditPage;
