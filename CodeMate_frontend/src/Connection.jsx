import api from "./utils/api";
import { useEffect, useState } from "react";

const Connection = () => {
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchConnections = async () => {
    try {
      const res = await api.get("/user/connections");
      console.log("API Response:", res.data);

      // backend sends array directly
      setConnections(res.data || []);
    } catch (err) {
      console.error(err);
      setConnections([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-10 text-gray-500">
        Loading connections...
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto my-6 px-4">
      <h1 className="text-3xl font-semibold text-center mb-6">
        Connections
      </h1>

      {connections.length === 0 ? (
        <p className="text-center text-gray-500">
          No connections found
        </p>
      ) : (
        connections.map((user) => {
          const { _id, firstName, lastName, photoUrl } = user;

          return (
            <div
              key={_id}
              className="bg-white rounded-xl shadow-md p-4 flex items-center gap-4 mb-4"
            >
              {/* Avatar */}
              <img
                src={photoUrl || "/default-avatar.png"}
                alt={`${firstName} ${lastName}`}
                className="w-14 h-14 rounded-full object-cover border"
              />

              {/* User Info */}
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">
                  {firstName} {lastName}
                </h3>
              </div>

              {/* Action (future use) */}
              <button className="px-4 py-1.5 text-sm rounded-lg bg-blue-900 text-white hover:bg-blue-800 transition">
                Message
              </button>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Connection;
