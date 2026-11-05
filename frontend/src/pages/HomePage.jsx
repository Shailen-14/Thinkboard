import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import api from "../axios";
import Navbar from "../components/Navbar";
import NoteCard from "../components/NoteCard";

const HomePage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/api/notes");
        setNotes(res.data);
      } catch (error) {
        toast.error(error?.response?.data?.message || "Error fetching notes");
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this note?",
    );

    if (!confirmed) return;

    try {
      await api.delete(`/api/notes/${id}`);

      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));

      toast.success("Note deleted successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error deleting note");
      console.error(error);
    }
  };

  return (
    <div className="w-full min-w-0">
      <Navbar />

      <div className="w-full max-w-7xl mx-auto mt-10 md:mt-15 px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-w-0">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="flex flex-col gap-4 min-w-0">
                  <div className="skeleton h-32 w-full"></div>
                  <div className="skeleton h-4 w-28"></div>
                  <div className="skeleton h-4 w-full"></div>
                  <div className="skeleton h-4 w-full"></div>
                </div>
              ))
            : notes.map((note) => (
                <NoteCard
                  key={note._id}
                  note={note}
                  onDelete={handleDelete}
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
