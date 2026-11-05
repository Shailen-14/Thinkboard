import { ArrowLeftIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import api from "../axios";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const createNote = async (e) => {
    e.preventDefault();

    if (isLoading) return;

    try {
      setIsLoading(true);
      await api.post("/api/notes", { title, content });
      toast.success("Note created successfully");
      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error creating note");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-20 mt-20">
      <Link to="/" className="inline-flex items-center gap-2 mb-4">
        <ArrowLeftIcon className="size-4" />
        <span className="text-sm md:text-md">Back to home</span>
      </Link>

      <form onSubmit={createNote} className="w-full">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full p-8 min-w-0">
          <legend className="fieldset-legend md:text-lg">Note Details</legend>

          <label className="label">Title</label>
          <input
            type="text"
            className="input w-full max-w-none"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            maxLength={"100"}
          />

          <label className="label">Content</label>
          <textarea
            className="textarea w-full max-w-none min-h-20 sm:min-h-25 md:min-h-30"
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            maxLength={"500"}
          />

          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="btn btn-success w-20 sm:w-28"
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create"}
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default CreatePage;
