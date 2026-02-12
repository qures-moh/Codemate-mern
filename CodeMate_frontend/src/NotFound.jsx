import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center">
      <h1 className="text-7xl font-bold text-primary">404</h1>

      <p className="mt-4 text-xl font-semibold">
        Oops! Page not found
      </p>

      <p className="mt-2 text-gray-500">
        The page you’re looking for doesn’t exist.
      </p>

      <button
        className="btn btn-primary mt-6"
        onClick={() => navigate("/feed")}
      >
        Go to Feed
      </button>
    </div>
  );
};

export default NotFound;
