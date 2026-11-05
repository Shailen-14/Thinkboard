import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { themeChange } from "theme-change";
import { useEffect } from "react";

import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import NoteDetailPage from "./pages/NoteDetailPage";
import EditPage from "./pages/EditPage";

const App = () => {
  useEffect(() => {
    themeChange(false);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            background: "#1f2937",
            color: "#ffffff",
            border: "1px solid #374151",
          },
        }}
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<NoteDetailPage />} />
        <Route path="/edit/:id" element={<EditPage />} />
      </Routes>
    </div>
  );
};

export default App;
