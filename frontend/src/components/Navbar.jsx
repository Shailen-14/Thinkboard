import { PlusIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-base-300 shadow-lg flex justify-between items-center gap-3 px-4 py-3 sm:px-6 md:px-10 md:py-4">
      <Link to={"/"} className="shrink-0">
        <h1 className="text-lg sm:text-xl md:text-2xl tracking-tight font-bold">
          Thinkboard
        </h1>
      </Link>
      <div className="flex gap-3 sm:gap-6 items-center">
        <button
          className="btn btn-success btn-sm sm:btn-md"
          onClick={() => navigate("/create")}
        >
          <span className="hidden sm:inline">Create Note</span>
          <PlusIcon className="size-5" />
        </button>
        <label className="flex cursor-pointer items-center gap-1 sm:gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-4 sm:size-5"
          >
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
          </svg>
          <input
            type="checkbox"
            value="forest"
            className="toggle toggle-sm sm:toggle-md theme-controller"
            data-set-theme="forest"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-4 sm:size-5"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </label>
      </div>
    </nav>
  );
};

export default Navbar;
