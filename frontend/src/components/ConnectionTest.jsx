import React, { useState, useEffect } from "react";
import { pregnancyAPI } from "../utils/api";

const ConnectionTest = () => {
  const [status, setStatus] = useState({
    loading: true,
    data: null,
    error: null,
  });

  useEffect(() => {
    const testConnection = async () => {
      try {
        const response = await pregnancyAPI.healthCheck();
        setStatus({ loading: false, data: response.data, error: null });
      } catch (error) {
        setStatus({ loading: false, data: null, error: error.message });
      }
    };

    testConnection();
  }, []);

  if (status.loading) {
    return (
      <div className="fixed bottom-4 right-4 bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-lg">
        🔄 Testing connection...
      </div>
    );
  }

  if (status.error) {
    return (
      <div className="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg">
        ❌ Backend disconnected: {status.error}
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg">
      ✅ Backend connected - {status.data?.status}
    </div>
  );
};

export default ConnectionTest;
